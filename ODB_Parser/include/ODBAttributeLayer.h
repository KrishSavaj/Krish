#pragma once
#include <bits/stdc++.h>
#include "GUIComponent.h"
#include "ODBAttrListperBoard.h"
using namespace std;
class ODBAttributeLayer : virtual public GUIComponent, public ODBAttrListperBoard
{
    // This class is used to represent the attributes of a layer in an ODB file.
    // used multiple inheritance to use the GUIComponent interface and class ODBAttrListperBoard
};