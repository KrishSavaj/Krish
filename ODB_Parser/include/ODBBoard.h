#ifndef ODBBOARD_H
#define ODBBOARD_H

#include <iostream>
#include <string>
#include <enums.h>
#include "ODBLayer.h"
#include "ODBComponent.h"
#include "ODBFeatureLayer.h"
#include "ODBAttributeLayer.h"
#include "ODBAttrListperBoard.h"
#include "ODBNetListDataPerBoard.h"
#include "ODBBoardHeaderInfo.h"
#include "ODBBoardGeometryInfo.h"
#include "ODBBoardEdaData.h"
#include "StepDirectory.h"
#include "ComponentsFile.h"
#include "FeaturesFile.h"
#include "GUIComponent.h"
// #include "BaselineBoard.h"
using namespace std;
using namespace Odb::Lib;
// using namespace PCBDesign;

// class ODBBoard : public BaselineBoard
class ODBBoard
{
protected:
    string BoardName;
    vector<ODBLayer *> Layers;
    vector<ODBAttrListperBoard *> AttrLists;
    vector<ODBNetListDataPerBoard *> NetListData;
    vector<ODBBoardHeaderInfo *> BoardHdrInfo;
    vector<ODBBoardGeometryInfo *> BoardGeometryInfo;
    vector<ODBBoardEdaData *> BoardEdaData;

public:
    // Use raw pointers as per your preference, or switch to unique_ptr for safety
    // All of these have to go
    ODBBoard()
    {
        BoardName = "";
        Layers = {};
    }
    void createODBLayerForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void createAttrListFileForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void createNetListDataforBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void createODBBoardHdrFileForBoard(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void createODBBoardGeometryInfo(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void createODBBoardEdaData(const std::shared_ptr<StepDirectory> &step, ODBBoard *odbBoard);
    void printLayerData();
    void printAttrLists();
    void printNetListData();
    void printBoardGeometryInfo();
    void printODBBoardHdrFileData();
    void printBoardEdaData();
    void addLayer(string layerName, ODBLayer *layer)
    {
        this->Layers.push_back(layer);
    }
    void addAttrList(ODBAttrListperBoard *AttrList)
    {
        this->AttrLists.push_back(AttrList);
    }
    void addNetListData(ODBNetListDataPerBoard *netListData)
    {
        this->NetListData.push_back(netListData);
    }
    void addBoardHeaderInfo(ODBBoardHeaderInfo *boardHdrInfo)
    {
        this->BoardHdrInfo.push_back(boardHdrInfo);
    }
    void addBoardGeometryInfo(ODBBoardGeometryInfo *boardGeometryInfo)
    {
        this->BoardGeometryInfo.push_back(boardGeometryInfo);
    }
    void addBoardEdaData(ODBBoardEdaData *boardEdaData)
    {
        this->BoardEdaData.push_back(boardEdaData);
    }
};

#endif
