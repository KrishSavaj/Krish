#include "ODBNetListDataPerBoard.h"
#include <iomanip>
#include <iostream>
#include <cctype>
using namespace std;
namespace Odb::Lib::FileModel::Design
{
    //------------------------------------------------------------
    // ODBNetRecord
    //------------------------------------------------------------
    ODBNetRecord::ODBNetRecord(int serialNumber, std::string &netName)
        : serialNumber(serialNumber), netName(netName)
    {
        addAttr("Serial Number", ValueType::INT, &serialNumber, false);
        addAttr("Net Name", ValueType::STRING, &netName, false);
    }

    int ODBNetRecord::getSerialNumber() const { return serialNumber; }
    const std::string &ODBNetRecord::getNetName() const { return netName; }

    //------------------------------------------------------------
    // ODBNetPointRecord
    //------------------------------------------------------------
    std::string ODBNetPointRecord::sideToString(AccessSide side)
    {
        switch (static_cast<char>(side))
        {
        case 'T':
            return "Top";
        case 'D':
            return "Down";
        case 'B':
            return "Both";
        case 'I':
            return "Inner";
        default:
            return "Unknown";
        }
    }

    ODBNetPointRecord::AccessSide ODBNetPointRecord::convertSide(char sideChar)
    {
        switch (toupper(sideChar))
        {
        case 'T':
            return static_cast<AccessSide>('T');
        case 'D':
            return static_cast<AccessSide>('D');
        case 'B':
            return static_cast<AccessSide>('B');
        case 'I':
            return static_cast<AccessSide>('I');
        default:
            return static_cast<AccessSide>('T'); // Default to Top
        }
    }

    ODBNetPointRecord::ODBNetPointRecord(const NetlistFile::NetPointRecord &record)
        : netNumber(record.netNumber),
          radius(record.radius),
          x(record.x),
          y(record.y),
          side(convertSide(static_cast<char>(record.side))),
          isStaggered(record.isstaggered),
          epoint(record.epoint),
          exp(record.exp),
          Ldvalue(record.ldvalue),
          staggeredX(record.staggeredX),
          staggeredY(record.staggeredY),
          staggeredRadius(record.staggeredRadius),
          ViaPoint(record.viaPoint),
          epointStr(isprint(epoint) ? std::string(1, epoint) : " "),
          expStr(isprint(exp) ? std::string(1, exp) : " ")
    {
        addAttr("Net Number", ValueType::INT, &netNumber, false);
        addAttr("Radius", ValueType::DOUBLE, &radius, false);
        addAttr("X", ValueType::DOUBLE, &x, false);
        addAttr("Y", ValueType::DOUBLE, &y, false);
        addAttr("E Point", ValueType::STRING, &epointStr, false);
        addAttr("Exp", ValueType::STRING, &expStr, false);

        std::string sideStr = sideToString(side);
        addAttr("Access Side", ValueType::STRING, &sideStr, false);
        addAttr("Ld Value", ValueType::INT, &Ldvalue, false);
        addAttr("Staggered", ValueType::BOOL, &isStaggered, false);
        addAttr("Staggered X", ValueType::DOUBLE, &staggeredX, false);
        addAttr("Staggered Y", ValueType::DOUBLE, &staggeredY, false);
        addAttr("Staggered Radius", ValueType::DOUBLE, &staggeredRadius, false);
        addAttr("Via Point", ValueType::BOOL, &ViaPoint, false);

        cout << "ODBNetPointRecord created with net number: " << netNumber
             << ", radius: " << radius
             << ", coordinates: (" << x << ", " << y << ")"
             << ", side: " << sideToString(side) << endl;

        cout << "E Point: " << epointStr
             << ", Exp: " << expStr
             << ", Staggered: " << (isStaggered ? "Yes" : "No")
             << ", Staggered X: " << staggeredX
             << ", Staggered Y: " << staggeredY
             << ", Staggered Radius: " << staggeredRadius
             << ", Via Point: " << (ViaPoint ? "Yes" : "No")
             << ", Ld Value: " << Ldvalue << endl;
    }

    // Getters
    char ODBNetPointRecord::getSideChar() const noexcept { return static_cast<char>(side); }
    ODBNetPointRecord::AccessSide ODBNetPointRecord::getSide() const noexcept { return side; }
    char ODBNetPointRecord::getEPoint() const noexcept { return epoint; }
    char ODBNetPointRecord::getExp() const noexcept { return exp; }
    unsigned int ODBNetPointRecord::getNetNumber() const noexcept { return netNumber; }
    double ODBNetPointRecord::getRadius() const noexcept { return radius; }
    double ODBNetPointRecord::getX() const noexcept { return x; }
    double ODBNetPointRecord::getY() const noexcept { return y; }
    double ODBNetPointRecord::getStaggeredX() const noexcept { return staggeredX; }
    double ODBNetPointRecord::getStaggeredY() const noexcept { return staggeredY; }
    double ODBNetPointRecord::getStaggeredRadius() const noexcept { return staggeredRadius; }
    bool ODBNetPointRecord::getisStaggered() const noexcept { return isStaggered; }
    int ODBNetPointRecord::getLdvalue() const noexcept { return Ldvalue; }
    bool ODBNetPointRecord::getViaPoint() const noexcept { return ViaPoint; }

    //------------------------------------------------------------
    // ODBNetListDataPerBoard
    //------------------------------------------------------------
    ODBNetListDataPerBoard::ODBNetListDataPerBoard(const NetlistFile &netlistFile)
        : NetlistName(netlistFile.GetName()),
          Units(netlistFile.GetUnits()),
          Optimized(netlistFile.GetOptimized()),
          staggeredStr(magic_enum::enum_name(netlistFile.GetStaggered()))
    {
        addAttr("Netlist Name", ValueType::STRING, &NetlistName, false);
        addAttr("Units", ValueType::STRING, &Units, false);
        addAttr("Optimized", ValueType::BOOL, &Optimized, false);
        addAttr("Staggered", ValueType::STRING, &staggeredStr, false);

        for (const auto &netRecord : netlistFile.GetNetRecords())
        {
            ODBNetRecord *record = new ODBNetRecord(netRecord->serialNumber, netRecord->netName);
            netRecords.push_back(record);
        }

        for (const auto &netPointRecord : netlistFile.GetNetPointRecords())
        {
            ODBNetPointRecord *pointRecord = new ODBNetPointRecord(*netPointRecord);
            netPointRecords.push_back(pointRecord);
        }
    }

    const vector<ODBNetRecord *> &ODBNetListDataPerBoard::getNetRecords() const { return netRecords; }
    const vector<ODBNetPointRecord *> &ODBNetListDataPerBoard::getNetPointRecords() const { return netPointRecords; }
    const string &ODBNetListDataPerBoard::getNetlistName() const { return NetlistName; }
    const string &ODBNetListDataPerBoard::getUnits() const { return Units; }
    bool ODBNetListDataPerBoard::isOptimized() const { return Optimized; }
    const string &ODBNetListDataPerBoard::getStaggered() const { return staggeredStr; }

    void ODBNetListDataPerBoard::writeToFile(const std::string &filename) const
    {
        ofstream outFile(filename);
        if (!outFile.is_open())
        {
            cerr << "Failed to open file: " << filename << endl;
            return;
        }

        outFile << fixed;
        outFile << "UNITS=" << Units << "\n";
        outFile << "H optimize " << (Optimized ? "y" : "n");

        if (staggeredStr == "Yes")
            outFile << " staggered y\n";
        else if (staggeredStr == "No")
            outFile << " staggered n\n";
        else
            outFile << " staggered unknown\n";

        for (const auto &net : netRecords)
            outFile << "$" << net->getSerialNumber() << " " << net->getNetName() << "\n";

        outFile << "#\n#Netlist points\n#\n";

        for (const auto &point : netPointRecords)
        {
            outFile << point->getNetNumber() << " "
                    << defaultfloat << setprecision(3) << point->getRadius() << " "
                    << defaultfloat << setprecision(13) << point->getX() << " "
                    << point->getY() << " "
                    << point->getSideChar() << " ";

            string eStr = isprint(point->getEPoint()) ? string(1, point->getEPoint()) : " ";
            string exStr = isprint(point->getExp()) ? string(1, point->getExp()) : " ";
            outFile << eStr << " " << exStr << " ";

            if (point->getisStaggered())
            {
                outFile << "staggered "
                        << defaultfloat << setprecision(3)
                        << point->getStaggeredX() << " "
                        << point->getStaggeredY() << " "
                        << point->getStaggeredRadius() << " ";
            }

            if (point->getViaPoint())
                outFile << "v ";

            outFile << "ld=" << point->getLdvalue() << "\n";
        }

        outFile.close();
    }

} // namespace Odb::Lib::FileModel::Design
