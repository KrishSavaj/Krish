#include "FileArchive.h"
#include "GUIComponent.h"
#include "ODBComponent.h"
#include "ODBObj.h"
#include "ODBBoard.h"
#include "ODBMatrixData.h"
#include "ODBMiscAttrList.h"
#include "ODBStandardFontsFile.h"
#include "ODBSymbolsData.h"
#include "ODBMiscInfoFileData.h"
#include <bits/stdc++.h>
using namespace std;
namespace fs = std::filesystem;
using namespace Odb::Lib::FileModel::Design;

void ODBObj::extractStepData(const FileArchive &archive)
{
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps");
    cout << "making directories for steps" << endl;
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile");
    const auto &steps = archive.GetStepsByName();
    std::cout << "Steps in the archive: " << steps.size() << std::endl;
    // std::map<std::string, std::unique_ptr<ODBComponent>> mp1;
    for (const pair<std::string, std::shared_ptr<StepDirectory>> step : steps)
    {
        std::cout << "\nStep Name: " << step.first << std::endl;
        ODBBoard *ODBBoardObj = new ODBBoard();

        // this is all for ODBBoard
        ODBBoardObj->createODBLayerForBoard(step.second, ODBBoardObj);     // onGoing
        ODBBoardObj->createAttrListFileForBoard(step.second, ODBBoardObj); // done&dusted
        ODBBoardObj->printLayerData();
        ODBBoardObj->printAttrLists();
        ODBBoardObj->createNetListDataforBoard(step.second, ODBBoardObj);
        ODBBoardObj->printNetListData();
        ODBBoardObj->createODBBoardHdrFileForBoard(step.second, ODBBoardObj); // done&dusted
        ODBBoardObj->printODBBoardHdrFileData();
        ODBBoardObj->createODBBoardGeometryInfo(step.second, ODBBoardObj); // onGoing
        ODBBoardObj->printBoardGeometryInfo();
        ODBBoardObj->createODBBoardEdaData(step.second, ODBBoardObj);
        ODBBoardObj->printBoardEdaData();
        //  extractNetListData(stepPtr);
        //  extractEddaDData(stepPtr);
        //  extractAttrListFileFromStep(stepPtr);
        //  extractProfileFileFromStep(stepPtr);
        //  extractStepHdrFileData(stepPtr);
    }
    // return mp1;
}

void ODBObj::extractMatrixFileData(const FileArchive &archive)
{
    const auto &matrixFile = archive.GetMatrixFile();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/matrix");
    if (matrixFile.GetStepRecords().size() > 0 || matrixFile.GetLayerRecords().size() > 0)
    {
        std::cout << "MatrixFile found in the file" << std::endl;
        ODBMatrixData *matrixData = new ODBMatrixData(&matrixFile);
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        cout << "printing Matrix Data:" << endl;
        for (auto &step : matrixData->getStepRecords())
        {
            cout << "Step Record: " << step->getGUIstring() << endl;
        }
        for (auto &layer : matrixData->getLayerRecords())
        {
            cout << "Layer Record: " << layer->getGUIstring() << endl;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // Write the MatrixFile data to a file
        matrixData->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/matrix/matrix_data.txt");
        std::cout << "MatrixFile data written to /home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/matrix/matrix_data.txt" << std::endl;
    }
    else
    {
        std::cout << "No MatrixFile found in the file" << std::endl;
    }
}

void ODBObj::extractMiscAttrListFileData(const FileArchive &archive)
{
    const Odb::Lib::FileModel::Design::AttrListFile &miscAttrListFile = archive.GetMiscAttrListFile();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/misc");
    if (miscAttrListFile.GetAttributes().size() > 0)
    {
        std::cout << "MiscAttrListFile found in the file" << std::endl;
        // Extract and print the attributes from the MiscAttrListFile
        ODBMiscAttrList *miscAttrListObj = new ODBMiscAttrList(&archive);
        std::cout << "Attributes in MiscAttrListFile:" << std::endl;
        cout << miscAttrListObj->getAttrList().size() << endl;
        cout << "printing MiscAttrListFile Data:" << endl;
        cout << miscAttrListObj->getGUIstring() << endl;
        // cout << "printing data via stored string map:" << endl;
        // map<string, string> attrList = miscAttrListObj->getAttrList();
        // for (const auto &attr : attrList)
        // {
        //     std::cout << "Attribute: " << attr.first << " = " << attr.second << std::endl;
        // }
        // Write the MiscAttrListFile data to a file
        miscAttrListObj->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/misc/attr_list.txt");
    }
    else
    {
        std::cout << "No MiscAttrListFile found in the file" << std::endl;
    }
}

void ODBObj::extractStandardFontsFileData(const FileArchive &archive)
{
    const Odb::Lib::FileModel::Design::StandardFontsFile &standardFontsFile = archive.GetStandardFontsFile();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/fonts");
    if (standardFontsFile.GetCharacterBlocks().size() > 0)
    {
        std::cout << "StandardFontsFile found in the file" << std::endl;

        // Extract and print the character blocks from the StandardFontsFile
        ODBStandardFontsFile *standardFontsObj = new ODBStandardFontsFile(&standardFontsFile);

        std::cout << "Character Blocks in StandardFontsFile:" << std::endl;
        std::cout << "Printing StandardFontsFile Data:" << std::endl;
        std::cout << standardFontsObj->getGUIstring() << std::endl;

        for (ODBFontsCharacterBlock *characterBlock : standardFontsObj->getODBFontsCharacterBlocks())
        {
            std::cout << "Character Block: " << characterBlock->getGUIstring() << std::endl;

            for (ODBLineRecord *lineRecord : characterBlock->getODBLineRecords())
            {
                std::cout << "Line Record: " << lineRecord->getGUIstring() << std::endl;
            }
        }
        // Write the StandardFontsFile data to a file
        standardFontsObj->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/fonts/standard_fonts.txt");
        std::cout << "StandardFontsFile data written to /home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/fonts/standard_fonts.txt" << std::endl;
        delete standardFontsObj; // free memory to avoid leak
    }
    else
    {
        std::cout << "No StandardFontsFile found in the file" << std::endl;
    }
}

void ODBObj::extractSymbolsData(const FileArchive &archive)
{

    // Retrieve the map of symbols directories by name
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/symbols");
    const auto &symbolsDirs = archive.GetSymbolsDirectoriesByName();
    std::cout << "Number of Symbols Directories: " << symbolsDirs.size() << std::endl;
    std::cout << "=====================================" << std::endl;
    for (const auto &pair : symbolsDirs)
    {
        ODBSymbolsData *symbolsData = new ODBSymbolsData(&pair.second);
        fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/symbols/" + pair.second->GetName());
        symbolsData->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/symbols/" + pair.second->GetName() + "/symbols_data.txt");
        symbolsDataList.push_back(symbolsData);
    }
}

void ODBObj::printSymbolsData()
{
    for (ODBSymbolsData *symbolsData : symbolsDataList)
    {
        std::cout << "Symbols Directory: " << symbolsData->getGUIstring() << std::endl;

        std::cout << "================ Line Features ================" << std::endl;
        for (ODBBoardLineFeature *line : symbolsData->getLineFeatures())
        {
            std::cout << line->getGUIstring() << std::endl;
        }

        std::cout << "================ Pad Features ================" << std::endl;
        for (ODBBoardPadFeature *pad : symbolsData->getPadFeatures())
        {
            std::cout << pad->getGUIstring() << std::endl;
        }

        std::cout << "================ Text Features ================" << std::endl;
        for (ODBBoardTextFeature *text : symbolsData->getTextFeatures())
        {
            std::cout << text->getGUIstring() << std::endl;
        }

        std::cout << "================ Arc Features ================" << std::endl;
        for (ODBBoardArcFeature *arc : symbolsData->getArcFeatures())
        {
            std::cout << arc->getGUIstring() << std::endl;
        }

        std::cout << "================ Surface Features ================" << std::endl;
        for (ODBBoardSurfaceFeature *surface : symbolsData->getSurfaceFeatures())
        {
            std::cout << surface->getGUIstring() << std::endl;

            std::cout << "================ Contour Polygons ================" << std::endl;
            for (const auto &contourPolygon : surface->getContourPolygons())
            {
                std::cout << contourPolygon->getGUIstring() << std::endl;

                std::cout << "================ Polygon Parts ================" << std::endl;
                for (const auto &polygonPart : contourPolygon->getPolygonParts())
                {
                    std::cout << polygonPart->getGUIstring() << std::endl;
                }
            }
        }

        std::cout << "=====================================" << std::endl;
    }
}

void ODBObj::extractODBMiscInfoFileData(const FileArchive &archive)
{
    const Odb::Lib::FileModel::Design::MiscInfoFile &miscInfoFile = archive.GetMiscInfoFile();
    if (miscInfoFile.GetProductModelName() != "" ||
        miscInfoFile.GetJobName() != "" ||
        miscInfoFile.GetOdbVersionMajor() != "" ||
        miscInfoFile.GetOdbVersionMinor() != "" ||
        miscInfoFile.GetOdbSource() != "" ||
        miscInfoFile.GetCreationDate().time_since_epoch().count() > 0 ||
        miscInfoFile.GetSaveDate().time_since_epoch().count() > 0 ||
        miscInfoFile.GetSaveApp() != "" ||
        miscInfoFile.GetSaveUser() != "" ||
        miscInfoFile.GetUnits() != "" ||
        miscInfoFile.GetMaxUniqueId() > 0)
    {
        std::cout << "ODB Misc Info File found in the file" << std::endl;
        ODBMiscInfoFileData *miscInfoData = new ODBMiscInfoFileData(&miscInfoFile);
        std::cout << "ODB Misc Info File Data:" << std::endl;
        std::cout << miscInfoData->getGUIstring() << std::endl;
        /// home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/misc/attr_list.txt"
        miscInfoData->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/misc/info.txt");
        delete miscInfoData; // free memory to avoid leak
    }
    else
    {
        std::cout << "No ODB Misc Info File found in the file" << std::endl;
    }
}