#pragma once
#include <iostream>
#include <string>
#include <enums.h>
#include "ODBLayer.h"
#include "ODBComponent.h"
#include "ODBFeatureLayer.h"
#include "ODBAttributeLayer.h"
#include "LayerDirectory.h"
#include "ComponentsFile.h"
#include "FeaturesFile.h"
#include "GUIComponent.h"
using namespace std;
using namespace Odb::Lib::FileModel::Design;
class ODBLayer
{
protected:
    string LayerName;
    // ODBComponent *Component;
    vector<ODBComponent *> Components;
    vector<ODBFeatureLayer *> Features;
    vector<ODBAttrListperBoard *> Attributes;

public:
    ODBLayer()
    {
        LayerName = "";
        Components = {};
        Features = {};
        Attributes = {};
    };
    ~ODBLayer();
    void createODBLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer);
    void extractComponentDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer);
    void extractFeaturesDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer);
    void extractAttributeDataFromLayer(const std::shared_ptr<LayerDirectory> &layer, ODBLayer *odbLayer);
    void addComponent(ODBComponent *component)
    {
        Components.push_back(component);
    }
    void addFeature(ODBFeatureLayer *feature)
    {
        Features.push_back(feature);
    }
    void addAttribute(ODBAttrListperBoard *attribute)
    {
        Attributes.push_back(attribute);
    }
    void printLayer();
};