#pragma once

#include <string>
#include <vector>
#include <memory>
#include <fstream>
#include "GUIComponent.h"
#include "NetlistFile.h"
#include "magic_enum.hpp"

namespace Odb::Lib::FileModel::Design
{
    //------------------------------------------------------------
    // ODBNetRecord
    //------------------------------------------------------------
    class ODBNetRecord : public GUIComponent
    {
    private:
        int serialNumber;
        std::string netName;

    public:
        ODBNetRecord(int serialNumber, std::string &netName);

        int getSerialNumber() const;
        const std::string &getNetName() const;
    };

    //------------------------------------------------------------
    // ODBNetPointRecord
    //------------------------------------------------------------
    class ODBNetPointRecord : public GUIComponent
    {
    public:
        using AccessSide = Odb::Lib::FileModel::Design::NetlistFile::NetPointRecord::AccessSide;

    private:
        unsigned int netNumber;
        double radius;
        double x, y;
        AccessSide side;
        bool isStaggered;
        char epoint;
        char exp;
        bool ViaPoint;
        double staggeredX, staggeredY, staggeredRadius;
        int Ldvalue;
        std::string epointStr, expStr;

        static std::string sideToString(AccessSide side);
        static AccessSide convertSide(char sideChar);

    public:
        explicit ODBNetPointRecord(const Odb::Lib::FileModel::Design::NetlistFile::NetPointRecord &record);

        // Getters
        char getSideChar() const noexcept;
        AccessSide getSide() const noexcept;
        char getEPoint() const noexcept;
        char getExp() const noexcept;
        unsigned int getNetNumber() const noexcept;
        double getRadius() const noexcept;
        double getX() const noexcept;
        double getY() const noexcept;
        double getStaggeredX() const noexcept;
        double getStaggeredY() const noexcept;
        double getStaggeredRadius() const noexcept;
        bool getisStaggered() const noexcept;
        int getLdvalue() const noexcept;
        bool getViaPoint() const noexcept;
    };

    //------------------------------------------------------------
    // ODBNetListDataPerBoard
    //------------------------------------------------------------
    class ODBNetListDataPerBoard : virtual public GUIComponent
    {
    private:
        std::string NetlistName;
        std::string Units;
        bool Optimized;
        std::string staggeredStr;

        std::vector<ODBNetRecord *> netRecords;
        std::vector<ODBNetPointRecord *> netPointRecords;

    public:
        explicit ODBNetListDataPerBoard(const Odb::Lib::FileModel::Design::NetlistFile &netlistFile);

        const std::vector<ODBNetRecord *> &getNetRecords() const;
        const std::vector<ODBNetPointRecord *> &getNetPointRecords() const;
        const std::string &getNetlistName() const;
        const std::string &getUnits() const;
        bool isOptimized() const;
        const std::string &getStaggered() const;

        void writeToFile(const std::string &filename) const;
    };
}
