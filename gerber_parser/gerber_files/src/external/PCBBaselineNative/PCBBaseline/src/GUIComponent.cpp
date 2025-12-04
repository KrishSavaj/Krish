#include "../include/GUIComponent.h"
#include "../include/attribute.h"

void GUIComponent::addAttr(const string attrName, ValueType type, void *rawValue, bool isOptional, AttrConstraints *constraint)
{
    Attribute *att = new Attribute(attrName, type, rawValue, isOptional, constraint);
    attMap[attrName] = att;
}

string GUIComponent::getValue(const string attrName)
{
    auto it = attMap.find(attrName);
    if (it != attMap.end())
        return it->second->get_value();
    else
        return "";
}

bool GUIComponent::setValue(const string attrName, void* newVal)
{
    string errorMsg = "Invalid value";
    if (!checkValue(attrName, newVal, errorMsg))
    {
        cout << errorMsg << endl;
        return false;
    }
    auto it = attMap.find(attrName);
    if (it != attMap.end())
    {
        it->second->set_value(ValueType::STRING, newVal);
        return true;
    }
    return false;
}

bool GUIComponent::checkValue(const string attrName, void* val, string errorMsg)
{
    auto it = attMap.find(attrName);
    if (it != attMap.end())
        return true;
    errorMsg = "No such attribute " + attrName;
    return false;
}

std::string GUIComponent::getGUIstring()
{
    std::string gui;
    for (auto &it : attMap)
    {
        gui += it.first + "#" + it.second->get_value() + "#TextBox;";
    }
    std::cout << "GUI: " << gui << std::endl;
    return gui;
}
