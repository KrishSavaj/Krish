#ifndef COMPONENT_H
#define COMPONENT_H

#include <string>


class Component {
public:
    // Constructor
    Component(std::string refDes);
    
    // Getters
    std::string getRefDes() const;
    std::string getPackageRef() const;
    std::string getLayerRef() const;
    std::string getPart() const;
    std::string getMountType() const;
    double getStandoff() const;
    double getHeight() const;
    double getRotation() const;
    double getX() const;
    double getY() const;
    // double getRotation() const;

    // Display component information
    void display() const;

private:
    std::string refDes;
    std::string packageRef;
    std::string layerRef;
    std::string part;
    std::string mountType;
    double standoff;
    double height;
    double rotation;
    double x;
    double y;


   // Parse XML recursively and collect all components
    static void parseComponents(tinyxml2::XMLElement* element, std::unordered_map<std::string, Component>& components);

};


#endif