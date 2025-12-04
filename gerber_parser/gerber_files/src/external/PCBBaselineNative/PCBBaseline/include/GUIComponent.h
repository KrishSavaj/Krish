#ifndef GUI_COMPONENT_H
#define GUI_COMPONENT_H

#include <iostream>
#include <string>
#include <map>
#include "attribute.h"

using namespace std;

#define VAR_NAME(var) #var

class GUIComponent
{
protected:
    map<string, Attribute *> attMap;

    void addAttr(const string attrName, ValueType type,  void* rawValue, bool isOptional, AttrConstraints *constraint = nullptr);

public:
    string getValue(const string attrName);
    bool setValue(const string attrName, void* newVal);
    bool checkValue(const string attrName, void* val, string errorMsg);
    string getGUIstring();
};

#endif // GUI_COMPONENT_H