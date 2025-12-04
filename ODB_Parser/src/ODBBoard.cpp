#include <bits/stdc++.h>
#include <string>
#include <enums.h>
#include "ODBLayer.h"
#include "ODBComponent.h"
#include "ODBFeatureLayer.h"
#include "ODBAttributeLayer.h"
#include "ODBAttrListperBoard.h"
#include "ODBNetListDataPerBoard.h"
#include "ODBBoardHeaderInfo.h"
#include "StepHdrFile.h"
#include "StepDirectory.h"
#include "ComponentsFile.h"
#include "FeaturesFile.h"
#include "AttrListFile.h"
#include "NetlistFile.h"
#include "GUIComponent.h"
// #include "BaselineBoard.h"
#include "ODBBoard.h"
#include "ODBLayer.h"
using namespace std;
using namespace Odb::Lib;
namespace fs = std::filesystem;
// using namespace PCBDesign;

void ODBBoard::createODBLayerForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const map<std::string, std::shared_ptr<LayerDirectory>> &layers = step->GetLayersByName();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers");
    std::cout << "Layers in the step: " << layers.size() << std::endl;
    for (const pair<std::string, std::shared_ptr<LayerDirectory>> layer : layers)
    {
        ODBLayer *odbLayer = new ODBLayer();
        odbLayer->createODBLayer(layer.second, odbLayer);
        odbBoard->addLayer(layer.first, odbLayer);
    }
}
void ODBBoard::createAttrListFileForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const AttrListFile &CurrAttrListFile = step->GetAttrListFile();
    if (!CurrAttrListFile.GetAttributes().empty())
    {
        ODBAttrListperBoard *AttrList = new ODBAttrListperBoard(&CurrAttrListFile);
        odbBoard->addAttrList(AttrList);
        AttrList->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/attr_list.txt");
    }
}
// Corrected code for ODBBoard::createNetListDataforBoard
void ODBBoard::createNetListDataforBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const auto &CurrNetList = step->GetNetlistsByName();
    if (CurrNetList.empty())
    {
        std::cout << "No Netlist found in the file" << std::endl;
        return;
    }

    std::cout << "Netlist found in the file" << std::endl;
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/netlists");
    cout << "directory created for netlists" << endl;
    for (const auto &netlist : CurrNetList)
    {
        fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/netlists/" + netlist.second->GetName());
        std::cout << "Creating NetListData for: " << netlist.second->GetName() << std::endl;
        ODBNetListDataPerBoard *NetListData = new ODBNetListDataPerBoard(*netlist.second);

        odbBoard->addNetListData(NetListData);
        // Write the NetListData to a file
        NetListData->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/netlists/" + netlist.second->GetName() + "/netlist_data.txt");
        std::cout << "NetListData for " << netlist.second->GetName() << " written to file." << std::endl;
    }
}

void ODBBoard::createODBBoardHdrFileForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const StepHdrFile &hdr = step->GetStepHdrFile();
    cout << "StepHdrFile found in the file" << endl;
    ODBBoardHeaderInfo *boardHdrInfo = new ODBBoardHeaderInfo(hdr);
    boardHdrInfo->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/board_hdr_info.txt");
    odbBoard->addBoardHeaderInfo(boardHdrInfo);
}
void ODBBoard::createODBBoardGeometryInfo(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const FeaturesFile &profileFile = step->GetProfileFile(); // Correct file containing geometry

    // Create a new board geometry info object with all required inputs
    if (profileFile.GetFeatureRecords().empty())
    {
        std::cout << "No geometry data found in the file" << std::endl;
        return;
    }
    std::cout << "Geometry data found in the file" << std::endl;
    ODBBoardGeometryInfo *boardGeometryInfo = new ODBBoardGeometryInfo(&profileFile);
    // Write the geometry info to a file
    boardGeometryInfo->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/board_geometry_info.txt");
    std::cout << "Board geometry info written to file." << std::endl;

    // Add the constructed geometry info to the ODB board
    odbBoard->addBoardGeometryInfo(boardGeometryInfo);
}

void ODBBoard::createODBBoardEdaData(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard)
{
    const auto &edaDataFile = step->GetEdaDataFile();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/eda");
    cout << "directory created for netlists" << endl;
    if (!edaDataFile.GetPath().empty())
    {
        std::cout << "EdaDataFile found in the file" << std::endl;
        ODBBoardEdaData *boardEdaData = new ODBBoardEdaData(&edaDataFile);
        boardEdaData->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/eda/board_eda_data.txt");
        odbBoard->addBoardEdaData(boardEdaData);
    }
}
void ODBBoard::printLayerData()
{
    for (ODBLayer *layers : this->Layers)
    {
        cout << "------------------------------------startofonelayer---------------------------------------" << endl;
        layers->printLayer();
        cout << "------------------------------------endofonelayer---------------------------------------" << endl;
    }
}
void ODBBoard::printAttrLists()
{
    for (ODBAttrListperBoard *attrlist : this->AttrLists)
    {
        cout << "------------------------------------startofoneAttrPair---------------------------------------" << endl;
        // cout << "UNITS: " << attrlist->Attr_Units << " NAME: " << attrlist->Attr_Name << " VALUE: " << attrlist->Attr_Value << endl;
        attrlist->getGUIstring();
        cout << "------------------------------------endofoneAttrPair---------------------------------------" << endl;
    }
}
void ODBBoard::printNetListData()
{
    for (ODBNetListDataPerBoard *netlist : this->NetListData)
    {
        cout << "------------------------------------startofoneNetList---------------------------------------" << endl;
        /*cout << "Netlist Name: " << netlist->NetlistName << endl;
        cout << "Units: " << netlist->Units << endl;
        cout << "Optimized: " << netlist->Optimized << endl;
        cout << "Staggered: " << netlist->Staggered << endl;*/
        netlist->getGUIstring();
        cout << "NetRecords: " << endl;
        for (ODBNetRecord *record : netlist->getNetRecords())
        {
            record->getGUIstring();
        }
        cout << "NetPointRecords: " << endl;
        for (ODBNetPointRecord *point : netlist->getNetPointRecords())
        {
            point->getGUIstring();
        }
        // netlist->netRecords->getGUIstring();
        // netlist->netPointRecords->getGUIstring();
        cout << "------------------------------------endofoneNetList---------------------------------------" << endl;
    }
}
void ODBBoard::printODBBoardHdrFileData()
{
    for (ODBBoardHeaderInfo *boardHdrInfo : this->BoardHdrInfo)
    {
        cout << "------------------------------------startofoneBoardHdrInfo---------------------------------------" << endl;
        boardHdrInfo->getGUIstring();
        cout << "=======================================startofBOARDREPEATINFO======================================" << endl;
        for (BoardRepeatRecord *record : boardHdrInfo->getBoardRepeatRecords())
        {
            cout << "------------------------------------startofoneBoardRepeatRecord---------------------------------------" << endl;
            record->getGUIstring();
            cout << "------------------------------------endofoneBoardRepeatRecord---------------------------------------" << endl;
        }
        cout << "=======================================endofBOARDREPEATINFO======================================" << endl;
        cout << "------------------------------------endofoneBoardHdrInfo---------------------------------------" << endl;
    }
}
void ODBBoard::printBoardGeometryInfo()
{
    for (ODBBoardGeometryInfo *boardGeometryInfo : this->BoardGeometryInfo)
    {
        std::cout << "------------------------------------ start of one BoardGeometryInfo ------------------------------------" << std::endl;

        std::cout << boardGeometryInfo->getGUIstring() << std::endl;
        std::cout << "================ Line Features ================" << std::endl;
        for (ODBBoardLineFeature *line : boardGeometryInfo->getLineFeatures())
        {
            std::cout << line->getGUIstring() << std::endl;
        }
        std::cout << "================ Pad Features ================" << std::endl;
        for (ODBBoardPadFeature *pad : boardGeometryInfo->getPadFeatures())
        {
            std::cout << pad->getGUIstring() << std::endl;
        }
        std::cout << "================ Text Features ================" << std::endl;
        for (ODBBoardTextFeature *text : boardGeometryInfo->getTextFeatures())
        {
            std::cout << text->getGUIstring() << std::endl;
        }
        std::cout << "================ Arc Features ================" << std::endl;
        for (ODBBoardArcFeature *arc : boardGeometryInfo->getArcFeatures())
        {
            std::cout << arc->getGUIstring() << std::endl;
        }
        std::cout << "================ Surface Features ================" << std::endl;
        for (ODBBoardSurfaceFeature *surface : boardGeometryInfo->getSurfaceFeatures())
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

        std::cout << "------------------------------------ end of one BoardGeometryInfo ------------------------------------" << std::endl;
    }
}

void ODBBoard::printBoardEdaData()
{
    for (ODBBoardEdaData *boardEdaData : this->BoardEdaData)
    {
        std::cout << "------------------------------------ start of one BoardEdaData ------------------------------------" << std::endl;
        boardEdaData->getGUIstring();
        std::cout << "================ Net Records ================" << std::endl;
        for (EDAnetRecord *net : boardEdaData->getNetRecords())
        {
            std::cout << net->getGUIstring() << std::endl;
            std::cout << "================ Subnet Records ================" << std::endl;
            for (SubnetRecord *subnet : net->getSubnetRecords())
            {
                std::cout << subnet->getGUIstring() << std::endl;
            }
            std::cout << "================ Property Records ================" << std::endl;
            for (ODBPropertyRecord *prop : net->getPropertyRecords())
            {
                std::cout << prop->getGUIstring() << std::endl;
            }
        }
        std::cout << "================ Package Records ================" << std::endl;
        for (EdaPackageRecord *pkg : boardEdaData->getPackageRecords())
        {
            std::cout << pkg->getGUIstring() << std::endl;
            for (auto outline : pkg->getOutlineRecords())
            {
                std::cout << outline->getGUIstring() << std::endl;
            }
            std::cout << "================ Pin Records ================" << std::endl;
            for (ODBPinRecord *pin : pkg->getPinRecords())
            {
                std::cout << pin->getGUIstring() << std::endl;
                std::cout << "================ Pin Outline Records ================" << std::endl;
                for (auto pOutline : pin->getPinOutlineRecords())
                {
                    std::cout << pOutline->getGUIstring() << std::endl;
                }
            }
            std::cout << "================ Property Records ================" << std::endl;
            for (ODBPropertyRecord *prop : pkg->getPropertyRecords())
            {
                std::cout << prop->getGUIstring() << std::endl;
            }
        }
        std::cout << "================ Feature Group Records ================" << std::endl;
        for (EdaFeatureGroupRecord *fg : boardEdaData->getFeatureGroupRecords())
        {
            std::cout << fg->getGUIstring() << std::endl;
        }
        std::cout << "================ Property Records ================" << std::endl;
        for (ODBPropertyRecord *prop : boardEdaData->getPropertyRecords())
        {
            std::cout << prop->getGUIstring() << std::endl;
        }
        std::cout << "------------------------------------ end of one BoardEdaData ------------------------------------" << std::endl;
    }
}
