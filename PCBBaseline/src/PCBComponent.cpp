#include "PCBComponent.h"
#include <fstream>
#include <regex>
#include <sstream>
#include <iostream>
//#include "shapeFwd.h"     // for ShapePtr
//#include <shapes.hpp>  // full Shape definitions
//#include "ast.hpp"

namespace PCBDesign {

// ------------------ Constructors ------------------
PCBComponent::PCBComponent(int id, const std::string& name)
{
    this->id_ = id;
    this->name_ = name;
    this->shapes_ = std::vector<std::shared_ptr<Shape>>();
    this->pins_ = std::vector<Pin>();
}

PCBComponent::PCBComponent(int id, const std::string& name, const std::vector<Shape>& shapes, const std::vector<Pin>& pins)
{
    this->id_ = id;
    this->name_ = name;
    this->shapes_ = std::vector<std::shared_ptr<Shape>>();
    this->pins_ = pins;
}

// ------------------ Getters ------------------
int PCBComponent::getId() const
{
    return this->id_;
}
const std::string& PCBComponent::getName() const
{
    return this->name_;
}

std::vector<std::shared_ptr<Shape>> PCBComponent::getShapes() const
{
    return this->shapes_;
}


// std::vector<Pin> PCBComponent::getPins() const
// {
//     return this->pins_;
// }

// ------------------ Setters ------------------

void PCBComponent::setId(int newId)
{
    this->id_ = newId;
}

void PCBComponent::setName(const std::string& newName)
{
    this->name_ = newName;
}

void PCBComponent::addShape(std::shared_ptr<Shape> newShape)
{
    shapes_.push_back(newShape); // assuming `shapes` is a vector of shared_ptr<Shape>
}


void PCBComponent::addPin(const Pin& newPin)
{
    this->pins_.emplace_back(newPin);
}

void PCBComponent::addSubcomponent(const std::shared_ptr<PCBComponent>& newComponent)
{
    this->subcomponents_.emplace_back(newComponent);
}
  void PCBComponent::dump(std::ostream &out) const {
    out << "Component ["<< id_ <<"] "<< name_ << "\n";
    out << "  Shapes:\n";
    for (auto &s : shapes_)  s->dump(out);    // see next step
    out << "  Pins:\n";
    for (auto &p : pins_)    p.dump(out);
    out << "  Subcomponents:\n";
    for (auto &sc : subcomponents_) sc->dump(out);
  }

void PCBComponent::display() const
{
    std::cout << "ID: " << id_ << ", Name: " << name_ << "\n";
    std::cout << "Shapes:\n";
    for (const auto& shape : shapes_) {
        shape->display();
    }
    std::cout << "Pins:\n";
    for (const auto& pin : pins_) {
        pin.display();
    }
}

// ----------- Extraction function for Gerber component placement -----------

std::vector<PCBComponent> PCBComponent::extractComponentsFromGerber(const std::string& gerberFilePath) {
    std::ifstream file(gerberFilePath);
    std::string line;
    std::vector<PCBComponent> components;

    std::regex refRegex("%TO.C,([^*]*)\\*");
    std::regex coordRegex("X(-?\\d+)Y(-?\\d+)D03\\*");

    std::string currentRef = "";
    std::vector<Pin> currentPins;

    while (std::getline(file, line)) {
        std::smatch match;

        if (std::regex_search(line, match, refRegex)) {
            if (!currentRef.empty() && !currentPins.empty()) {
                PCBComponent component(0, currentRef);
                for (const auto& pin : currentPins) {
                    component.addPin(pin);
                }
                components.push_back(component);
                currentPins.clear();
            }
            currentRef = match[1];
        }

        if (std::regex_search(line, match, coordRegex)) {
            float x = std::stof(match[1]) / 1e6f;
            float y = std::stof(match[2]) / 1e6f;
            Pin newPin(currentPins.size() + 1, PinType::IN_OUT, x, y);
            currentPins.push_back(newPin);
        }
    }

    if (!currentRef.empty() && !currentPins.empty()) {
        PCBComponent component(0, currentRef);
        for (const auto& pin : currentPins) {
            component.addPin(pin);
        }
        components.push_back(component);
    }

    return components;
}
void PCBComponent::setPosition(float x, float y) {
    posX_ = x;
    posY_ = y;
    std::cout << "Component positioned at (" << x << ", " << y << ")\n";
}

void PCBComponent::setRotation(float angle) {
    rotation_ = angle;
    std::cout << "Component rotated to " << angle << " degrees\n";
}

void PCBComponent::setMirrored(bool m) {
    mirrored_ = m;
    std::cout << "Component mirrored: " << std::boolalpha << m << "\n";
}

void PCBComponent::setUnit(int unitNumber) {
    unit_ = unitNumber;
    std::cout << "Component unit set to " << unitNumber << "\n";
}

void PCBComponent::setDoNotPopulate(bool dnp) {
    doNotPopulate_ = dnp;
    std::cout << "Do-not-populate: " << std::boolalpha << dnp << "\n";
}

void PCBComponent::setUUID(const std::string& uuid) {
    uuid_ = uuid;
    std::cout << "Component UUID: " << uuid << "\n";
}

void PCBComponent::addInstancePosition(float x, float y) {
    instancePositions_.emplace_back(x, y);
    std::cout << "Added instance position (" << x << ", " << y << ")\n";
}

void PCBComponent::addInstanceUUID(const std::string& uuid) {
    instanceUUIDs_.push_back(uuid);
    std::cout << "Added instance UUID: " << uuid << "\n";
}

} // namespace PCBDesign

