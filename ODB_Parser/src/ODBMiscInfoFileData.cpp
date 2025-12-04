#include "ODBMiscInfoFileData.h"
#include <iomanip>
#include <sstream>
#include <ctime>
using namespace std;

namespace Odb::Lib::FileModel::Design
{

    // =========================
    // Static time formatter
    // =========================
    string ODBMiscInfoFileData::formatTime(const std::chrono::system_clock::time_point &tp)
    {
        time_t time = chrono::system_clock::to_time_t(tp);
        tm tm = *gmtime(&time);

        char buf[32];
        strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", &tm);
        return string(buf);
    }

    // =========================
    // Constructor
    // =========================
    ODBMiscInfoFileData::ODBMiscInfoFileData(const MiscInfoFile *miscInfoFile)
    {
        ProductModelName = miscInfoFile->GetProductModelName();
        JobName = miscInfoFile->GetJobName();
        OdbVersionMajor = miscInfoFile->GetOdbVersionMajor();
        OdbVersionMinor = miscInfoFile->GetOdbVersionMinor();
        OdbSource = miscInfoFile->GetOdbSource();
        CreationDate = miscInfoFile->GetCreationDate();
        SaveDate = miscInfoFile->GetSaveDate();
        SaveApp = miscInfoFile->GetSaveApp();
        SaveUser = miscInfoFile->GetSaveUser();
        Units = miscInfoFile->GetUnits();
        MaxUniqueId = miscInfoFile->GetMaxUniqueId();

        CreationDateStr = formatTime(CreationDate);
        SaveDateStr = formatTime(SaveDate);

        addAttr("Product Model Name", ValueType::STRING, &ProductModelName, false);
        addAttr("Job Name", ValueType::STRING, &JobName, false);
        addAttr("ODB Version Major", ValueType::STRING, &OdbVersionMajor, false);
        addAttr("ODB Version Minor", ValueType::STRING, &OdbVersionMinor, false);
        addAttr("ODB Source", ValueType::STRING, &OdbSource, false);
        addAttr("Creation Date", ValueType::STRING, &CreationDateStr, false);
        addAttr("Save Date", ValueType::STRING, &SaveDateStr, false);
        addAttr("Save App", ValueType::STRING, &SaveApp, false);
        addAttr("Save User", ValueType::STRING, &SaveUser, false);
        addAttr("Units", ValueType::STRING, &Units, false);
        addAttr("Max Unique ID", ValueType::INT, &MaxUniqueId, true);
    }

    // =========================
    // Write to File
    // =========================
    void ODBMiscInfoFileData::writeToFile(const std::string &filename) const
    {
        ofstream ofs(filename);
        if (!ofs.is_open())
            return;

        // ofs << "PRODUCT_MODEL_NAME=" << ProductModelName << "\n";
        ofs << "JOB_NAME=" << JobName << "\n";
        ofs << "ODB_VERSION_MAJOR=" << OdbVersionMajor << "\n";
        ofs << "ODB_VERSION_MINOR=" << OdbVersionMinor << "\n";
        ofs << "ODB_SOURCE=" << OdbSource << "\n";
        ofs << "CREATION_DATE=" << CreationDateStr << "\n";
        ofs << "SAVE_DATE=" << SaveDateStr << "\n";
        ofs << "SAVE_APP=" << SaveApp << "\n";
        ofs << "SAVE_USER=" << SaveUser << "\n";
        ofs << "UNITS=" << Units << "\n";
        ofs << "MAX_UID=" << MaxUniqueId << "\n";

        ofs.close();
    }

} // namespace Odb::Lib::FileModel::Design
