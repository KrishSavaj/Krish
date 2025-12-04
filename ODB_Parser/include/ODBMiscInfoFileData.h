#pragma once

#include <string>
#include <chrono>
#include <fstream>
#include <memory>
#include "GUIComponent.h"
#include "enums.h"
#include "MiscInfoFile.h"

namespace Odb::Lib::FileModel::Design
{
    class ODBMiscInfoFileData : virtual public GUIComponent
    {
    private:
        std::string ProductModelName;
        std::string JobName;
        std::string OdbVersionMajor;
        std::string OdbVersionMinor;
        std::string OdbSource;
        std::chrono::system_clock::time_point CreationDate;
        std::chrono::system_clock::time_point SaveDate;
        std::string SaveApp;
        std::string SaveUser;
        std::string Units;
        int MaxUniqueId;

        std::string CreationDateStr;
        std::string SaveDateStr;

        static std::string formatTime(const std::chrono::system_clock::time_point &tp);

    public:
        explicit ODBMiscInfoFileData(const Odb::Lib::FileModel::Design::MiscInfoFile *miscInfoFile);
        ~ODBMiscInfoFileData() = default;

        void writeToFile(const std::string &filename) const;
    };
}
