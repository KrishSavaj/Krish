#pragma once
#include <bits/stdc++.h>
#include "GUIComponent.h"
#include "FeaturesFile.h"
#include "ODBBoardGeometryInfo.h"
using namespace std;

class ODBFeatureLayer : virtual public GUIComponent, public ODBBoardGeometryInfo
{
public:
    ODBFeatureLayer(const FeaturesFile *featuresFile)
        : ODBBoardGeometryInfo(featuresFile)
    {
    }
    // Destructor
    ~ODBFeatureLayer()
    {
    }
};