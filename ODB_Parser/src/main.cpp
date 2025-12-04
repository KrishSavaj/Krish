#include "FileArchive.h"
#include "GUIComponent.h"
#include "ODBComponent.h"
#include "ODBBoard.h"
#include "ODBObj.h"
#include <iostream>
#include <string>
#include <iomanip>
#include <enums.h>
#include <bits/stdc++.h>
#include <filesystem> // for std::filesystem::create_directories
namespace fs = std::filesystem;
using namespace std;
// using namespace PCBDesign;
int main()
{
    std::string archiveName = "/home/ritik/thought2design/ODB_Parser/test/ODB_File/designodb_rigidflex.tgz";
    //"/home/ritik/test/designodb_rigidflex.tgz";
    /// home/ritik/test/designodb_rigidflex.tgz";
    //"/home/ritik/ODB_Parser/test/testcase.tgz";
    Odb::Lib::FileModel::Design::FileArchive archive(archiveName);
    // remove this commend to increase the precision of the output, issue is with std:cout -> bydefault it just maintains 6 digit after decimal
    bool status = archive.ParseFileModel();
    if (status)
    {
        std::cout << "File Model Parsed Successfully" << std::endl;
        std::cout << "Extracted Product Name: " << archive.GetProductName() << std::endl;
        ODBObj *ODBObj_MasterObj = new ODBObj();
        fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile");
        ODBObj_MasterObj->extractStepData(archive);              // Ongoing
        ODBObj_MasterObj->extractMatrixFileData(archive);        // done&dusted
        ODBObj_MasterObj->extractMiscAttrListFileData(archive);  // done&dusted
        ODBObj_MasterObj->extractStandardFontsFileData(archive); // done&dusted
        ODBObj_MasterObj->extractSymbolsData(archive);
        ODBObj_MasterObj->extractODBMiscInfoFileData(archive);
        cout << "Printing Symbols Data:" << endl;
        ODBObj_MasterObj->printSymbolsData();
        cout << "Extracting ODB Misc Info File Data:" << endl;
        ODBObj_MasterObj->extractODBMiscInfoFileData(archive);
        // extractStepData(archive);
        // extractMatrixFileData(archive);
        // extractStandardFontsFileData(archive);
        // extractSymbolsDirectoriesData(archive);
        // extractMiscInfoFileData(archive);
        // extractMiscAttrListFile(archive);
    }
    else
    {
        std::cout << "File Model Parsing Failed" << std::endl;
        return -1;
    }

    return 0;
}
