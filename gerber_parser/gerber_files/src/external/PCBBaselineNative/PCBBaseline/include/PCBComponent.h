#ifndef PCBCOMPONENT_H
#define PCBCOMPONENT_H

#include <iostream>
#include <string>
#include <vector>
#include "Geomclass.h"
#include "Pin.h"
#include "PCBObj.h"
#include <nlohmann/json.hpp>
#include "FundamentalShape.h"
#include <memory>  

namespace PCBDesign {

class PCBComponent : public PCBObj {
protected:
    int id;
    std::string name;
    //std::vector<Shape> shapes = {};
    std::vector<std::shared_ptr<Shape>> shapes;   // ← change this
    std::vector<Pin> pins = {};
    std::vector<PCBComponent> subcomponents = {};

public:
    // Constructor
    PCBComponent();
    PCBComponent(int id, const std::string& name);
    PCBComponent(int id, const std::string& name,
             const std::vector<std::shared_ptr<Shape>>& shapes,
             const std::vector<Pin>& pins);


    // Getters
    int getId() const;
    std::string getName() const;
    //std::vector<Shape> getShapes() const;
    const std::vector<std::shared_ptr<Shape>>& getShapes() const;  // ← and this
    std::vector<Pin> getPins() const;

    // Setters
    void setId(int newId);
    void setName(const std::string& newName);
    //void addShape(const Shape& newShape);
    void addShape(const std::shared_ptr<Shape>& newShape);         // ← and this
    void addPin(const Pin& newPin);
    void addSubcomponent(const PCBComponent& newComponent);

    // Display
    void display() const;
    void dump(std::ostream& out) const;
    // Gerber extraction
    static std::vector<PCBComponent> extractComponentsFromGerber(const std::string& gerberFilePath);
     nlohmann::json toJSON() const; // Declare the method
};

} // namespace PCBDesign

#endif // PCBCOMPONENT_H


// #ifndef PCBCOMPONENT_H
// #define PCBCOMPONENT_H

// #include <iostream>
// #include <string>
// #include <vector>
// #include "Geomclass.h"
// #include "Pin.h"
// #include "PCBObj.h"

// namespace PCBDesign {

// class PCBComponent : public PCBObj {
// protected:
//     int id;
//     std::string name;
//     std::vector<Shape> shapes={};
//     std::vector<Pin> pins={};
//     std::vector<PCBComponent> subcomponents={};

// public:
//     // Constructor
//     PCBComponent();
//     PCBComponent(int id, const std::string& name);
//     PCBComponent(int id, const std::string& name, const std::vector<Shape>& shapes, const std::vector<Pin>& pins);

//     // Getters
//     int getId() const;
//     std::string getName() const;
//     std::vector<Shape> getShapes() const;
//     std::vector<Pin> getPins() const;

//     // Setters
//     void setId(int newId);
//     void setName(const std::string& newName);
//     void addShape(const Shape& newShape);
//     void addPin(const Pin& newPin);
//     // void addSubcomponent(const PCBComc
// }; // namespace PCBDesign

// #endif 

// // PCBCOMPONENT_HPP
