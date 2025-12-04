// #include <bits/stdc++.h>
// #include <enums.h>
// #include <string>
// #include "LayerDirectory.h"
// #include "FeaturesFile.h"
// #include "ComponentsFile.h"
// #include "AttrListFile.h"
// #include "ODBComponent.h"
// #include "ODBFeatureLayer.h"
// #include "ODBAttributeLayer.h"
// #include "ODBLayer.h"

#include <bits/stdc++.h>
#include <string>
#include <enums.h>
#include "ODBLayer.h"
#include "ODBComponent.h"
#include "ODBFeatureLayer.h"
#include "ODBAttributeLayer.h"
#include "LayerDirectory.h"
#include "ComponentsFile.h"
#include "FeaturesFile.h"
#include "ODBBoardGeometryInfo.h"
#include "GUIComponent.h"
#include "ODBAttrListperBoard.h"
namespace fs = std::filesystem;
using namespace std;
using namespace Odb::Lib;
void ODBLayer::createODBLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer)
{
    string LayerName = layer->GetName();
    fs::create_directories("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers/" + LayerName);
    cout << "Creating ODB Layer: " << LayerName << endl;
    extractComponentDataFromLayer(layer, odbLayer);
    extractFeaturesDataFromLayer(layer, odbLayer);  // onGoing
    extractAttributeDataFromLayer(layer, odbLayer); // done&dusted
}
void ODBLayer::extractComponentDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer)
{
    // Call component extraction on this layer
    ODBComponent *component = new ODBComponent(layer->GetComponentsFile());
    if (layer->GetComponentsFile().GetLayerName().empty())
    {
        cout << "No Components File found in this layer." << endl;
    }
    else
    {
        cout << "Components in the file: " << layer->GetComponentsFile().GetLayerName() << endl;
        odbLayer->addComponent(component);
        component->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers/" + layer->GetName() + "/components.txt");
        cout << "Components Data extracted successfully." << endl;
    }
}
void ODBLayer::extractFeaturesDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer)
{
    // Call feature extraction on this layer
    cout << "Extracting Features Data from Layer: " << layer->GetName() << endl;
    const FeaturesFile &currFeaturesFile = layer->GetFeaturesFile();
    if (currFeaturesFile.GetId() == 0)
    {
        cout << "No Features File found in this layer." << endl;
    }
    else
    {
        cout << "calling ODBFeatureLayer constructor" << endl;
        ODBFeatureLayer *feature = new ODBFeatureLayer(&currFeaturesFile);
        odbLayer->addFeature(feature);
        feature->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers/" + layer->GetName() + "/features.txt");
    }
}
void ODBLayer::extractAttributeDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer)
{
    // Call attribute extraction on this layer
    cout << "Extracting Attribute Data from Layer: " << layer->GetName() << endl;
    AttrListFile currAttrListFile = layer->GetAttrListFile();
    if (!currAttrListFile.GetAttributes().empty())
    {

        ODBAttrListperBoard *attribute = new ODBAttrListperBoard(&currAttrListFile);
        odbLayer->addAttribute(attribute);
        attribute->writeToFile("/home/ritik/thought2design/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers/" + layer->GetName() + "/attr_list.txt");
    }
    else
    {
        cout << "No Attributes found in the file" << endl;
    }
}
ODBLayer::~ODBLayer()
{
    // for (auto &component : Components)
    // {
    //     delete component;
    // }
    // for (auto &feature : Features)
    // {
    //     delete feature;
    // }
    // for (auto &attribute : Attributes)
    // {
    //     delete attribute;
    // }
}
void ODBLayer::printLayer()
{
    // print using GUIComponent getGUIString
    for (ODBComponent *EachComponent : this->Components)
    {
        cout << "-----------------------------startofoneComponent------------------------------------" << endl;
        EachComponent->getGUIstring();
        for (ODBComponentRecord *EachComponentRecord : EachComponent->getComponentRecords())
        {
            cout << "-----------------------------startofoneComponentrecord------------------------------------" << endl;
            EachComponentRecord->getGUIstring();
            for (ODBPropertyRecords *EachPropertyRecord : EachComponentRecord->getPropertyRecords())
            {
                cout << "-----------------------------startofoneProperty------------------------------------" << endl;
                EachPropertyRecord->getGUIstring();
                cout << "-----------------------------endofoneProperty------------------------------------" << endl;
            }
            for (ODBtoerpintRecords *EachToeprintRecord : EachComponentRecord->getToeprintRecords())
            {
                cout << "-----------------------------startofoneToeprint------------------------------------" << endl;
                EachToeprintRecord->getGUIstring();
                cout << "-----------------------------endofoneToeprint------------------------------------" << endl;
            }
        }
        cout << "-----------------------------endofoneComponent------------------------------------" << endl;
    }
    for (ODBFeatureLayer *EachFeature : this->Features)
    {
        EachFeature->getGUIstring();
        cout << "-----------------------------startofLineFeature------------------------------------" << endl;
        for (ODBBoardLineFeature *EachLineFeature : EachFeature->getLineFeatures())
        {
            EachLineFeature->getGUIstring();
        }
        cout << "-----------------------------endofLineFeature------------------------------------" << endl;
        cout << "-----------------------------startofPadFeature------------------------------------" << endl;
        for (ODBBoardPadFeature *EachPadFeature : EachFeature->getPadFeatures())
        {
            EachPadFeature->getGUIstring();
        }
        cout << "-----------------------------endofPadFeature------------------------------------" << endl;
        cout << "-----------------------------startofTextFeature------------------------------------" << endl;
        for (ODBBoardTextFeature *EachTextFeature : EachFeature->getTextFeatures())
        {
            EachTextFeature->getGUIstring();
        }
        cout << "-----------------------------endofTextFeature------------------------------------" << endl;
        cout << "-----------------------------startofArcFeature------------------------------------" << endl;
        for (ODBBoardArcFeature *EachArcFeature : EachFeature->getArcFeatures())
        {
            EachArcFeature->getGUIstring();
        }
        cout << "-----------------------------endofArcFeature------------------------------------" << endl;
        cout << "-----------------------------startofSurfaceFeature------------------------------------" << endl;
        // for(ODBBoardSurfaceFeature *EachSurfaceFeature : EachFeature->getSurfaceFeatures())
        for (ODBBoardSurfaceFeature *EachSurfaceFeature : EachFeature->getSurfaceFeatures())
        {
            EachSurfaceFeature->getGUIstring();
            cout << "-----------------------------startofContourPolygon------------------------------------" << endl;
            for (ODBBoardPolygon *EachContourPolygon : EachSurfaceFeature->getContourPolygons())
            {
                EachContourPolygon->getGUIstring();
                cout << "-----------------------------startofPolygonPart------------------------------------" << endl;
                for (ODBBoardPolygonParts *EachPolygonPart : EachContourPolygon->getPolygonParts())
                {
                    EachPolygonPart->getGUIstring();
                }
                cout << "-----------------------------endofPolygonPart------------------------------------" << endl;
            }
            cout << "-----------------------------endofContourPolygon------------------------------------" << endl;
        }
        cout << "-----------------------------endofoneFeature------------------------------------" << endl;
    }

    for (ODBAttrListperBoard *EachAttribute : this->Attributes)
    {
        cout << "used ODBAttrListperBoard to print attributes" << endl;
        EachAttribute->getGUIstring();

        cout << "-----------------------------endofoneFeature------------------------------------" << endl;
    }
}