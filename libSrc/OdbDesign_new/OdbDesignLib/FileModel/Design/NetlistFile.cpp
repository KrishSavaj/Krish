#include "NetlistFile.h"
#include "NetlistFile.h"
#include <Logger.h>
#include "../parse_error.h"
#include "../invalid_odb_error.h"
#include <climits>
#include <filesystem>
#include <ostream>
#include "../../Constants.h"
#include <exception>
#include <cctype>
#include <iosfwd>
#include <memory>
#include <string>
#include "../parse_info.h"
#include "../../ProtoBuf/netlistfile.pb.h"

using namespace std::filesystem;

namespace Odb::Lib::FileModel::Design
{
	NetlistFile::NetlistFile(std::filesystem::path path)
		: m_path(path), m_optimized(false), m_staggered(Staggered::Unknown)
	{
	}

	NetlistFile::~NetlistFile()
	{
		m_netRecords.clear();
		m_netRecordsByName.clear();
		m_netPointRecords.clear();
	}

	std::filesystem::path NetlistFile::GetPath() const
	{
		return m_path;
	}

	std::string NetlistFile::GetName() const
	{
		return m_name;
	}

	std::string NetlistFile::GetUnits() const
	{
		return m_units;
	}

	bool NetlistFile::GetOptimized() const
	{
		return m_optimized;
	}

	NetlistFile::Staggered NetlistFile::GetStaggered() const
	{
		return m_staggered;
	}

	const NetlistFile::NetRecord::Vector &NetlistFile::GetNetRecords() const
	{
		return m_netRecords;
	}

	const NetlistFile::NetRecord::StringMap &NetlistFile::GetNetRecordsByName() const
	{
		return m_netRecordsByName;
	}

	const NetlistFile::NetPointRecord::Vector &NetlistFile::GetNetPointRecords() const
	{
		return m_netPointRecords;
	}

	bool NetlistFile::Parse()
	{
		std::ifstream netlistFile;
		int lineNumber = 0;
		std::string line;

		try
		{
			m_name = std::filesystem::path(m_path).filename().string();

			loginfo("Parsing netlist: " + m_name + "...");

			auto netlistFilePath = m_path / "netlist";

			if (!std::filesystem::exists(netlistFilePath))
			{
				auto message = "netlist file does not exist: [" + m_path.string() + "]";
				throw invalid_odb_error(message.c_str());
			}

			else if (!std::filesystem::is_regular_file(netlistFilePath))
			{
				auto message = "netlist file is not a file: [" + m_path.string() + "]";
				throw invalid_odb_error(message.c_str());
			}

			netlistFile.open(netlistFilePath.string(), std::ios::in);
			if (!netlistFile.is_open())
			{
				auto message = "unable to open netlist file: [" + m_path.string() + "]";
				throw invalid_odb_error(message.c_str());
			}

			while (std::getline(netlistFile, line))
			{
				lineNumber++;
				if (!line.empty())
				{
					std::stringstream lineStream(line);

					if (line.find(Constants::COMMENT_TOKEN) == 0)
					{
						// comment line
					}
					else if (line.find(Constants::UNITS_TOKEN) == 0)
					{
						// units line
						std::string token;
						if (!std::getline(lineStream, token, '='))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						else if (!std::getline(lineStream, token, '='))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						m_units = token;
					}
					else if (line.find(HEADER_TOKEN) == 0)
					{
						// header line
						std::string token;

						// H (throw away
						lineStream >> token;

						// optimize(d)
						lineStream >> token;
						if (token != "optimize")
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						char optimized;
						if (!(lineStream >> optimized))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						if (optimized == 'Y' || std::tolower(optimized) == 'y')
						{
							m_optimized = true;
						}
						else if (optimized == 'N' || std::tolower(optimized) == 'n')
						{
							m_optimized = false;
						}
						else
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						// staggered (optional)
						if (lineStream >> token && token == STAGGERED_KEY)
						{
							char staggered;
							if (!(lineStream >> staggered))
							{
								throw_parse_error(m_path, line, token, lineNumber);
							}

							if (staggered == 'Y' || std::tolower(staggered) == 'y')
							{
								m_staggered = Staggered::Yes;
							}
							else if (staggered == 'N' || std::tolower(staggered) == 'n')
							{
								m_staggered = Staggered::No;
							}
							else
							{
								throw_parse_error(m_path, line, token, lineNumber);
							}
						}
						else
						{
							m_staggered = Staggered::Unknown;
						}
					}
					else if (line.find(NetRecord::FIELD_TOKEN) == 0)
					{
						// net record line

						// net serial number
						std::string token;
						if (!(lineStream >> token))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						auto strSerialNumber = token;
						strSerialNumber.erase(0, 1); // remove leading '$'
						auto ulSerialNumber = std::stoul(strSerialNumber);
						if (ulSerialNumber > UINT_MAX)
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						auto unSerialNumber = static_cast<unsigned int>(ulSerialNumber);

						// net name
						if (!(lineStream >> token))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						auto &netName = token;

						auto pNetRecord = std::make_shared<NetRecord>();
						pNetRecord->serialNumber = unSerialNumber;
						pNetRecord->netName = netName;
						m_netRecords.push_back(pNetRecord);
						// m_netRecordsByName[pNetRecord->netName] = pNetRecord;
					}
					else // NetPointRecord (starts with an unsigned int, netNumber)
					{
						std::string token;
						if (!(lineStream >> token))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						// Parse net number
						auto ulNetNumber = std::stoul(token);
						if (ulNetNumber >= UINT_MAX)
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						auto unNetNumber = static_cast<unsigned int>(ulNetNumber);

						auto pNetPointRecord = std::make_shared<NetPointRecord>();
						pNetPointRecord->netNumber = unNetNumber;
						pNetPointRecord->viaPoint = false; // Default to false

						// Parse radius
						if (!(lineStream >> pNetPointRecord->radius))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						// Parse coordinates
						if (!(lineStream >> pNetPointRecord->x) || !(lineStream >> pNetPointRecord->y))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						// Parse side
						std::string sideStr;
						if (!(lineStream >> sideStr) || sideStr.length() != 1)
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						pNetPointRecord->side = static_cast<NetPointRecord::AccessSide>(sideStr[0]);

						// Parse e point and exp
						std::string epointStr, expStr;
						if (!(lineStream >> epointStr) || epointStr.length() != 1 ||
							!(lineStream >> expStr) || expStr.length() != 1)
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						pNetPointRecord->epoint = epointStr[0];
						pNetPointRecord->exp = expStr[0];

						// Parse staggered data and optional flags
						std::string nextToken;
						bool foundLdValue = false;

						while (lineStream >> nextToken)
						{
							if (nextToken == "staggered")
							{
								pNetPointRecord->isstaggered = true;
								if (!(lineStream >> pNetPointRecord->staggeredX >>
									  pNetPointRecord->staggeredY >>
									  pNetPointRecord->staggeredRadius))
								{
									throw_parse_error(m_path, line, token, lineNumber);
								}
							}
							else if (nextToken == "v")
							{
								pNetPointRecord->viaPoint = true;
							}
							else if (nextToken.rfind("ld=", 0) == 0)
							{
								try
								{
									pNetPointRecord->ldvalue = std::stoi(nextToken.substr(3));
									foundLdValue = true;
									break; // LD value is typically the last token
								}
								catch (const std::exception &)
								{
									throw_parse_error(m_path, line, nextToken, lineNumber);
								}
							}
						}

						// Set default LD value if not found
						if (!foundLdValue)
						{
							pNetPointRecord->ldvalue = 0;
						}

						m_netPointRecords.push_back(pNetPointRecord);
					}
					// else // NetPointRecord (starts with an unsigned int, netNumber)
					//  {
					//  	std::string token;
					//  	if (!(lineStream >> token))
					//  	{
					//  		throw_parse_error(m_path, line, token, lineNumber);
					//  	}

					// 	// Parse net number
					// 	auto ulNetNumber = std::stoul(token);
					// 	if (ulNetNumber >= UINT_MAX)
					// 	{
					// 		throw_parse_error(m_path, line, token, lineNumber);
					// 	}
					// 	auto unNetNumber = static_cast<unsigned int>(ulNetNumber);

					// 	auto pNetPointRecord = std::make_shared<NetPointRecord>();
					// 	pNetPointRecord->netNumber = unNetNumber;

					// 	// Parse radius
					// 	if (!(lineStream >> pNetPointRecord->radius))
					// 	{
					// 		throw_parse_error(m_path, line, token, lineNumber);
					// 	}

					// 	// Parse coordinates
					// 	if (!(lineStream >> pNetPointRecord->x) || !(lineStream >> pNetPointRecord->y))
					// 	{
					// 		throw_parse_error(m_path, line, token, lineNumber);
					// 	}

					// 	// Parse side
					// 	std::string sideStr;
					// 	if (!(lineStream >> sideStr) || sideStr.length() != 1)
					// 	{
					// 		throw_parse_error(m_path, line, token, lineNumber);
					// 	}
					// 	pNetPointRecord->side = static_cast<NetPointRecord::AccessSide>(sideStr[0]);

					// 	// Parse e point and exp
					// 	std::string epointStr, expStr;
					// 	if (!(lineStream >> epointStr) || epointStr.length() != 1 ||
					// 		!(lineStream >> expStr) || expStr.length() != 1)
					// 	{
					// 		throw_parse_error(m_path, line, token, lineNumber);
					// 	}
					// 	pNetPointRecord->epoint = epointStr[0];
					// 	pNetPointRecord->exp = expStr[0];

					// 	// Parse staggered data
					// 	std::string nextToken;
					// 	if (lineStream >> nextToken)
					// 	{
					// 		if (nextToken == "staggered")
					// 		{
					// 			pNetPointRecord->isstaggered = true;
					// 			if (!(lineStream >> pNetPointRecord->staggeredX >>
					// 				  pNetPointRecord->staggeredY >>
					// 				  pNetPointRecord->staggeredRadius))
					// 			{
					// 				throw_parse_error(m_path, line, token, lineNumber);
					// 			}

					// 			// After staggered data, look for optional "v" and ld value
					// 			while (lineStream >> nextToken)
					// 			{
					// 				if (nextToken == "v")
					// 				{
					// 					continue; // skip the "v" token
					// 				}
					// 				else if (nextToken.rfind("ld=", 0) == 0)
					// 				{
					// 					try
					// 					{
					// 						pNetPointRecord->ldvalue = std::stoi(nextToken.substr(3));
					// 						break;
					// 					}
					// 					catch (const std::exception &)
					// 					{
					// 						throw_parse_error(m_path, line, nextToken, lineNumber);
					// 					}
					// 				}
					// 			}
					// 		}
					// 		else
					// 		{
					// 			pNetPointRecord->isstaggered = false;
					// 			// Handle case where we might have "v" before ld value
					// 			if (nextToken == "v")
					// 			{
					// 				if (lineStream >> nextToken && nextToken.rfind("ld=", 0) == 0)
					// 				{
					// 					try
					// 					{
					// 						pNetPointRecord->ldvalue = std::stoi(nextToken.substr(3));
					// 					}
					// 					catch (const std::exception &)
					// 					{
					// 						throw_parse_error(m_path, line, nextToken, lineNumber);
					// 					}
					// 				}
					// 			}
					// 			else if (nextToken.rfind("ld=", 0) == 0)
					// 			{
					// 				try
					// 				{
					// 					pNetPointRecord->ldvalue = std::stoi(nextToken.substr(3));
					// 				}
					// 				catch (const std::exception &)
					// 				{
					// 					throw_parse_error(m_path, line, nextToken, lineNumber);
					// 				}
					// 			}
					// 		}
					// 	}
					// 	else
					// 	{
					// 		pNetPointRecord->isstaggered = false;
					// 		pNetPointRecord->ldvalue = 0;
					// 	}

					// 	m_netPointRecords.push_back(pNetPointRecord);
					// }

					/*{
						std::string token;
						if (!(lineStream >> token))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						auto ulNetNumber = std::stoul(token);
						if (ulNetNumber >= UINT_MAX)
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						auto unNetNumber = static_cast<unsigned int>(ulNetNumber);

						auto pNetPointRecord = std::make_shared<NetPointRecord>();
						pNetPointRecord->netNumber = unNetNumber;

						if (!(lineStream >> pNetPointRecord->radius))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						if (!(lineStream >> pNetPointRecord->x))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}

						if (!(lineStream >> pNetPointRecord->y))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						char sideChar;
						if (!(lineStream >> sideChar))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						pNetPointRecord->side = static_cast<NetPointRecord::AccessSide>(sideChar);
						// TODO: parse the rest of the NetPointRecord fields
						char epointChar;
						if (!(lineStream >> epointChar))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						pNetPointRecord->epoint = epointChar;
						char expChar;
						if (!(lineStream >> expChar))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						pNetPointRecord->exp = expChar;
						std::string checkisstaggered="";
						if (!(lineStream >> checkisstaggered))
						{
							throw_parse_error(m_path, line, token, lineNumber);
						}
						if(checkisstaggered == "staggered")
						{
							pNetPointRecord->isstaggered = checkisstaggered;
							if (!(lineStream >> pNetPointRecord->staggeredX))
							{
								throw_parse_error(m_path, line, token, lineNumber);
							}
							if (!(lineStream >> pNetPointRecord->staggeredY))
							{
								throw_parse_error(m_path, line, token, lineNumber);
							}
							if (!(lineStream >> pNetPointRecord->staggeredRadius))
							{
								throw_parse_error(m_path, line, token, lineNumber);
							}
						}
						else
						{
							pNetPointRecord->isstaggered = "not staggered";
						}
						//1 0.002 2.786614173228 0.792322834646 D e e staggered 0 0 0 ld=25
						std::string ldToken;
						if (lineStream >> ldToken) {
							if (ldToken.rfind("ld=", 0) == 0 && ldToken.size() > 3) {
								try {
									pNetPointRecord->ldvlaue = std::stoi(ldToken.substr(3));
								} catch (const std::exception&) {
									throw_parse_error(m_path, line, ldToken, lineNumber);
								}
							}
						}

						m_netPointRecords.push_back(pNetPointRecord);
					}*/
				}
			}

			loginfo("Parsing netlist: " + m_name + " complete");

			netlistFile.close();
		}
		catch (parse_error &pe)
		{
			auto m = pe.toString("Parse Error:");
			logerror(m);
			// cleanup file
			netlistFile.close();
			throw pe;
		}
		catch (std::exception &e)
		{
			parse_info pi(m_path, line, lineNumber);
			const auto m = pi.toString();
			logexception_msg(e, m);
			netlistFile.close();
			throw e;
		}

		return true;
	}

	std::unique_ptr<Protobuf::NetlistFile> NetlistFile::to_protobuf() const
	{
		std::unique_ptr<Protobuf::NetlistFile> pNetlistFileMessage(new Protobuf::NetlistFile);
		pNetlistFileMessage->set_units(m_units);
		pNetlistFileMessage->set_path(m_path.string());
		pNetlistFileMessage->set_name(m_name);
		pNetlistFileMessage->set_optimized(m_optimized);
		pNetlistFileMessage->set_staggered(static_cast<Protobuf::NetlistFile::Staggered>(m_staggered));

		for (const auto &pNetRecord : m_netRecords)
		{
			auto pNetRecordMessage = pNetRecord->to_protobuf();
			pNetlistFileMessage->add_netrecordss()->CopyFrom(*pNetRecordMessage);
		}

		for (const auto &kvNetRecord : m_netRecordsByName)
		{
			(*pNetlistFileMessage->mutable_netrecordsbyname())[kvNetRecord.first] = *kvNetRecord.second->to_protobuf();
		}

		for (const auto &pNetPointRecord : m_netPointRecords)
		{
			auto pNetPointRecordMessage = pNetPointRecord->to_protobuf();
			pNetlistFileMessage->add_netpointrecords()->CopyFrom(*pNetPointRecordMessage);
		}

		return pNetlistFileMessage;
	}

	void NetlistFile::from_protobuf(const Protobuf::NetlistFile &message)
	{
		m_name = message.name();
		m_path = message.path();
		m_units = message.units();
		m_optimized = message.optimized();
		m_staggered = static_cast<Staggered>(message.staggered());

		for (const auto &netRecordMessage : message.netrecordss())
		{
			auto pNetRecord = std::make_shared<NetRecord>();
			pNetRecord->from_protobuf(netRecordMessage);
			m_netRecords.push_back(pNetRecord);
		}

		for (const auto &kvNetRecord : message.netrecordsbyname())
		{
			auto pNetRecord = std::make_shared<NetRecord>();
			pNetRecord->from_protobuf(kvNetRecord.second);
			m_netRecordsByName[pNetRecord->netName] = pNetRecord;
		}

		for (const auto &netPointRecordMessage : message.netpointrecords())
		{
			auto pNetPointRecord = std::make_shared<NetPointRecord>();
			pNetPointRecord->from_protobuf(netPointRecordMessage);
			m_netPointRecords.push_back(pNetPointRecord);
		}
	}

	bool NetlistFile::Save(std::ostream &os)
	{
		os << 'H' << " optimize " << (m_optimized ? 'Y' : 'N') << "staggered " << (m_staggered == Staggered::Yes ? 'Y' : 'N') << std::endl;
		os << Constants::UNITS_TOKEN << " = " << m_units << std::endl;

		for (const auto &netRecord : m_netRecords)
		{
			os << NetRecord::FIELD_TOKEN << netRecord->serialNumber << " " << netRecord->netName << std::endl;
		}

		for (const auto &netPointRecord : m_netPointRecords)
		{
			netPointRecord->Save(os);
			os << std::endl;
		}

		return true;
	}

	bool NetlistFile::Save(const std::filesystem::path &directory)
	{
		auto netlistDir = directory / m_name;
		if (!create_directory(netlistDir))
			return false;

		std::ofstream netlistFile(netlistDir / "netlist");
		if (!netlistFile.is_open())
			return false;
		if (!Save(netlistFile))
			return false;
		netlistFile.close();

		return true;
	}

	std::unique_ptr<Protobuf::NetlistFile::NetRecord> NetlistFile::NetRecord::to_protobuf() const
	{
		std::unique_ptr<Protobuf::NetlistFile::NetRecord> pNetRecordMessage(new Protobuf::NetlistFile::NetRecord);
		pNetRecordMessage->set_serialnumber(serialNumber);
		pNetRecordMessage->set_netname(netName);
		return pNetRecordMessage;
	}

	void NetlistFile::NetRecord::from_protobuf(const Protobuf::NetlistFile::NetRecord &message)
	{
		serialNumber = message.serialnumber();
		netName = message.netname();
	}

	std::unique_ptr<Protobuf::NetlistFile::NetPointRecord> NetlistFile::NetPointRecord::to_protobuf() const
	{
		std::unique_ptr<Protobuf::NetlistFile::NetPointRecord> pNetPointRecordMessage(new Protobuf::NetlistFile::NetPointRecord);
		pNetPointRecordMessage->set_netnumber(netNumber);
		pNetPointRecordMessage->set_radius(radius);
		pNetPointRecordMessage->set_x(x);
		pNetPointRecordMessage->set_y(y);
		pNetPointRecordMessage->set_epoint(std::to_string(epoint));
		pNetPointRecordMessage->set_width(width);
		pNetPointRecordMessage->set_exp(std::to_string(exp));
		pNetPointRecordMessage->set_fiducialpoint(fiducialPoint);
		pNetPointRecordMessage->set_height(height);
		pNetPointRecordMessage->set_commentpoint(commentPoint);
		pNetPointRecordMessage->set_netnumber(netNumber);
		// pNetPointRecordMessage->set_side(static_cast<Protobuf::NetlistFile::NetPointRecord::AccessSide>(side));
		pNetPointRecordMessage->set_side(static_cast<Odb::Lib::Protobuf::NetlistFile::NetPointRecord::AccessSide>(side));
		pNetPointRecordMessage->set_staggeredradius(staggeredRadius);
		pNetPointRecordMessage->set_staggeredx(staggeredX);
		pNetPointRecordMessage->set_staggeredy(staggeredY);
		pNetPointRecordMessage->set_testexecutionside(std::to_string(testExecutionSide));
		pNetPointRecordMessage->set_testpoint(testPoint);
		pNetPointRecordMessage->set_viapoint(viaPoint);
		pNetPointRecordMessage->set_fiducialpoint(fiducialPoint);
		return pNetPointRecordMessage;
	}

	void NetlistFile::NetPointRecord::from_protobuf(const Protobuf::NetlistFile::NetPointRecord &message)
	{
		netNumber = message.netnumber();
		radius = message.radius();
		x = message.x();
		y = message.y();
		if (message.epoint().empty())
		{
			epoint = message.epoint()[0];
		}
		width = message.width();
		if (!message.exp().empty())
		{
			exp = message.exp()[0];
		}
		fiducialPoint = message.fiducialpoint();
		height = message.height();
		commentPoint = message.commentpoint();
		netNumber = message.netnumber();
		// side = static_cast<AccessSide>(message.side());
		side = static_cast<AccessSide>(message.side());
		staggeredRadius = message.staggeredradius();
		staggeredX = message.staggeredx();
		staggeredY = message.staggeredy();
		if (!message.testexecutionside().empty())
		{
			testExecutionSide = message.testexecutionside()[0];
		}
		testPoint = message.testpoint();
		viaPoint = message.viapoint();
		fiducialPoint = message.fiducialpoint();
	}

	bool NetlistFile::NetPointRecord::Save(std::ostream &os)
	{
		return false;
	}

} // namespace Odb::Lib::FileModel::Design