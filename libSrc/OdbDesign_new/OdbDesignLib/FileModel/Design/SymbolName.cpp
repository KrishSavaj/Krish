#include "SymbolName.h"
#include "SymbolName.h"

namespace Odb::Lib::FileModel::Design
{
	// SymbolName::SymbolName(const std::string& name, UnitType unitType)
	//	: m_name(name)
	//	, m_unitType(unitType)
	//{
	// }

	SymbolName::SymbolName()
		: m_name(""), m_unitType(UnitType::None)
	{
	}

	std::string SymbolName::GetName() const
	{
		return m_name;
	}

	UnitType SymbolName::GetUnitType() const
	{
		return m_unitType;
	}

	// Helper functions for trimming
	static inline void ltrim(std::string &s)
	{
		s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch)
										{ return !std::isspace(ch); }));
	}

	static inline void rtrim(std::string &s)
	{
		s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch)
							 { return !std::isspace(ch); })
					.base(),
				s.end());
	}

	static inline void trim(std::string &s)
	{
		ltrim(s);
		rtrim(s);
	}

	bool SymbolName::Parse(const std::filesystem::path &path, const std::string &line, int lineNumber)
	{
		std::string trimmedLine = line;
		trim(trimmedLine);

		// Skip $n part
		size_t firstSpace = trimmedLine.find(' ');
		if (firstSpace == std::string::npos)
		{
			throw_parse_error(path, line, "Malformed symbol name line", lineNumber);
		}

		// Get everything after $n
		std::string content = trimmedLine.substr(firstSpace + 1);
		trim(content);

		// Check if line ends with I/M (unit type)
		size_t lastSpace = content.rfind(' ');
		if (lastSpace != std::string::npos)
		{
			std::string possibleUnit = content.substr(lastSpace + 1);
			if (possibleUnit == "I" || possibleUnit == "M")
			{
				m_name = content.substr(0, lastSpace);
				m_unitType = (possibleUnit == "M") ? UnitType::Metric : UnitType::Imperial;
				return true;
			}
		}

		// Default case (no unit specified)
		m_name = content;
		m_unitType = UnitType::None;
		return true;
	}

	// Add this new method to your SymbolName class
	std::string SymbolName::GetOutputString() const
	{
		std::string result = m_name;
		if (m_unitType != UnitType::None)
		{
			result += (m_unitType == UnitType::Metric) ? " M" : " I";
		}
		return result;
	}
	// bool SymbolName::Parse(const std::filesystem::path& path, const std::string& line, int lineNumber)
	// {
	// 	std::stringstream lineStream(line);
	// 	std::string token;

	// 	// $n (index)
	// 	if (!std::getline(lineStream, token, ' '))
	// 	{
	// 		throw_parse_error(path, line, token, lineNumber);
	// 	}

	// 	if (std::getline(lineStream, token, ' '))
	// 	{
	// 		m_name = token;
	// 	}
	// 	else
	// 	{
	// 		throw_parse_error(path, line, token, lineNumber);
	// 	}

	// 	if (std::getline(lineStream, token, ' '))
	// 	{
	// 		switch (token[0])
	// 		{
	// 		case 'M':
	// 			m_unitType = UnitType::Metric;
	// 			break;
	// 		case 'I':
	// 			m_unitType = UnitType::Imperial;
	// 			break;
	// 		}
	// 	}

	// 	return true;
	// }

	std::unique_ptr<Odb::Lib::Protobuf::SymbolName> SymbolName::to_protobuf() const
	{
		auto message = std::make_unique<Odb::Lib::Protobuf::SymbolName>();
		message->set_name(m_name);
		message->set_unittype(static_cast<Odb::Lib::Protobuf::UnitType>(m_unitType));
		return message;
	}

	void SymbolName::from_protobuf(const Odb::Lib::Protobuf::SymbolName &message)
	{
		m_name = message.name();
		m_unitType = static_cast<UnitType>(message.unittype());
	}

	// std::shared_ptr<SymbolName> SymbolName::Parse(const std::string& line)
	//{
	//	return nullptr;
	// }
}