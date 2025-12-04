// component.cpp
#include "./include/component.h"


using namespace std;

Component::Component(string refDes) {}

string Component::getRefDes() const { return refDes; }
string Component::getPackageRef() const { return packageRef; }
string Component::getLayerRef() const { return layerRef; }
string Component::getPart() const { return part; }
string Component::getMountType() const { return mountType; }
double Component::getStandoff() const { return standoff; }
double Component::getHeight() const { return height; }
double Component::getRotation() const { return rotation; }
double Component::getX() const { return x; }
double Component::gety() const { return y; }

void Component::display() const {
    cout << "Component: " << refDes << "\n"
              << "Package: " << packageRef << "\n"
              << "Layer: " << layerRef << "\n"
              << "Part: " << part << "\n"
              << "Mount Type: " << mountType << "\n"
              << "Standoff: " << standoff << " mm\n"
              << "Height: " << height << " mm\n"
              << "Rotation: " << rotation << " degrees\n";
}

void Component::parseComponents(XMLElement* element, unordered_map<std::string, Component>& components) {
    if (!element) return;
    
    for (XMLElement* comp = element->FirstChildElement("Component"); comp; comp = comp->NextSiblingElement("Component")) {
        std::string refDes = comp->Attribute("refDes");
        double x = 0, y = 0, rotation = 0;
        
        XMLElement* xform = comp->FirstChildElement("Xform");
        if (xform) xform->QueryDoubleAttribute("rotation", &rotation);
        
        XMLElement* location = comp->FirstChildElement("Location");
        if (location) {
            location->QueryDoubleAttribute("x", &x);
            location->QueryDoubleAttribute("y", &y);
        }
        
        components[refDes] = Component(refDes, x, y, rotation);
    }
    
    // Recursively search for more components in child elements
    for (XMLElement* child = element->FirstChildElement(); child; child = child->NextSiblingElement()) {
        parseComponents(child, components);
    }
}
