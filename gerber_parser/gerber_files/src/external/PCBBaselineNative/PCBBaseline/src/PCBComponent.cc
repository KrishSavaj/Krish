#include "../include/PCBComponent.h"
#include <fstream>
#include <regex>
#include <sstream>
#include <nlohmann/json.hpp>
#include <memory>

namespace PCBDesign {

// Constructor: initialize members
PCBComponent::PCBComponent(int id, const std::string& name)
    : id(id), name(name), shapes(), pins(), subcomponents() {}

// Overloaded constructor taking shapes & pins
PCBComponent::PCBComponent(int id, const std::string& name,
                           const std::vector<std::shared_ptr<Shape>>& shapes,
                           const std::vector<Pin>& pins)
    : id(id), name(name), shapes(shapes), pins(pins), subcomponents() {}

int PCBComponent::getId() const {
    return id;
}

std::string PCBComponent::getName() const {
    return name;
}

// Now returns the shared_ptr vector
const std::vector<std::shared_ptr<Shape>>& PCBComponent::getShapes() const {
    return shapes;
}

// Pins remain by-value
std::vector<Pin> PCBComponent::getPins() const {
    return pins;
}

void PCBComponent::setId(int newId) {
    id = newId;
}

void PCBComponent::setName(const std::string& newName) {
    name = newName;
}

// Accept shared_ptr<Shape>
void PCBComponent::addShape(const std::shared_ptr<Shape>& newShape) {
    shapes.push_back(newShape);
}

void PCBComponent::addPin(const Pin& newPin) {
    pins.push_back(newPin);
}

void PCBComponent::addSubcomponent(const PCBComponent& newComponent) {
    subcomponents.push_back(newComponent);
}

void PCBComponent::dump(std::ostream &out) const {
    out << "Component [" << id << "] " << name << "\n";
    out << "  Shapes:\n";
    for (auto &shapePtr : shapes)
        shapePtr->dump(out);
    out << "  Pins:\n";
    for (auto &p : pins)
        p.dump(out);
    out << "  Subcomponents:\n";
    for (auto &sc : subcomponents)
        sc.dump(out);
}

void PCBComponent::display() const {
    std::cout << "ID: " << id << ", Name: " << name << "\n";
    std::cout << "Shapes:\n";
    for (const auto& shapePtr : shapes)
        shapePtr->display();
    std::cout << "Pins:\n";
    for (const auto& pin : pins)
        pin.display();
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

// JSON serialization now iterates pointers
nlohmann::json PCBComponent::toJSON() const {
    nlohmann::json j;
    j["id"] = id;
    j["name"] = name;

    j["shapes"] = nlohmann::json::array();
    for (const auto& shapePtr : shapes)
        j["shapes"].push_back(shapePtr->toJSON());

    j["pins"] = nlohmann::json::array();
    for (const auto& pin : pins)
        j["pins"].push_back(pin.toJSON());

    j["subcomponents"] = nlohmann::json::array();
    for (const auto& sub : subcomponents)
        j["subcomponents"].push_back(sub.toJSON());

    return j;
}

} // namespace PCBDesign



// #include "../include/PCBComponent.h"
// #include <fstream>
// #include <regex>
// #include <sstream>
// #include <nlohmann/json.hpp>
// #include <memory>

// namespace PCBDesign {

// PCBComponent::PCBComponent(int id, const std::string& name)
// {
//     this->id = id;
//     this->name = name;
//     this->shapes = std::vector<Shape>();
//     this->pins = std::vector<Pin>();
// }

// PCBComponent::PCBComponent(int id, const std::string& name, const std::vector<Shape>& shapes, const std::vector<Pin>& pins)
// {
//     this->id = id;
//     this->name = name;
//     this->shapes = shapes;
//     this->pins = pins;
// }

// int PCBComponent::getId() const
// {
//     return this->id;
// }

// std::string PCBComponent::getName() const
// {
//     return this->name;
// }

// std::vector<Shape> PCBComponent::getShapes() const
// {
//     return this->shapes;
// }

// std::vector<Pin> PCBComponent::getPins() const
// {
//     return this->pins;
// }

// void PCBComponent::setId(int newId)
// {
//     this->id = newId;
// }

// void PCBComponent::setName(const std::string& newName)
// {
//     this->name = newName;
// }

// void PCBComponent::addShape(const Shape& newShape)
// {
//     this->shapes.emplace_back(newShape);
// }

// void PCBComponent::addPin(const Pin& newPin)
// {
//     this->pins.emplace_back(newPin);
// }

// void PCBComponent::addSubcomponent(const PCBComponent& newComponent)
// {
//     this->subcomponents.emplace_back(newComponent);
// }
//   void PCBComponent::dump(std::ostream &out) const {
//     out << "Component ["<< id <<"] "<< name << "\n";
//     out << "  Shapes:\n";
//     for (auto &s : shapes)  s.dump(out);    // see next step
//     out << "  Pins:\n";
//     for (auto &p : pins)    p.dump(out);
//     out << "  Subcomponents:\n";
//     for (auto &sc : subcomponents) sc.dump(out);
//   }

// void PCBComponent::display() const
// {
//     std::cout << "ID: " << id << ", Name: " << name << "\n";
//     std::cout << "Shapes:\n";
//     for (const auto& shape : shapes) {
//         shape.display();
//     }
//     std::cout << "Pins:\n";
//     for (const auto& pin : pins) {
//         pin.display();
//     }
// }

// // ----------- Extraction function for Gerber component placement -----------

// std::vector<PCBComponent> PCBComponent::extractComponentsFromGerber(const std::string& gerberFilePath) {
//     std::ifstream file(gerberFilePath);
//     std::string line;
//     std::vector<PCBComponent> components;

//     std::regex refRegex("%TO.C,([^*]*)\\*");
//     std::regex coordRegex("X(-?\\d+)Y(-?\\d+)D03\\*");

//     std::string currentRef = "";
//     std::vector<Pin> currentPins;

//     while (std::getline(file, line)) {
//         std::smatch match;

//         if (std::regex_search(line, match, refRegex)) {
//             if (!currentRef.empty() && !currentPins.empty()) {
//                 PCBComponent component(0, currentRef);
//                 for (const auto& pin : currentPins) {
//                     component.addPin(pin);
//                 }
//                 components.push_back(component);
//                 currentPins.clear();
//             }
//             currentRef = match[1];
//         }

//         if (std::regex_search(line, match, coordRegex)) {
//             float x = std::stof(match[1]) / 1e6f;
//             float y = std::stof(match[2]) / 1e6f;
//             Pin newPin(currentPins.size() + 1, PinType::IN_OUT, x, y);
//             currentPins.push_back(newPin);
//         }
//     }

//     if (!currentRef.empty() && !currentPins.empty()) {
//         PCBComponent component(0, currentRef);
//         for (const auto& pin : currentPins) {
//             component.addPin(pin);
//         }
//         components.push_back(component);
//     }

//     return components;
// }


// nlohmann::json PCBComponent::toJSON() const {
//     nlohmann::json j;

//     j["id"] = id;
//     j["name"] = name;

//     // Serialize shapes array
//     j["shapes"] = nlohmann::json::array();
//     for (const auto& shape : shapes) {
//         j["shapes"].push_back(shape.toJSON());  // assuming Shape class has toJSON()
//     }

//     // Serialize pins array
//     j["pins"] = nlohmann::json::array();
//     for (const auto& pin : pins) {
//         j["pins"].push_back(pin.toJSON());  // assuming Pin class has toJSON()
//     }

//     // Serialize subcomponents array
//     j["subcomponents"] = nlohmann::json::array();
//     for (const auto& sub : subcomponents) {
//         j["subcomponents"].push_back(sub.toJSON());
//     }

//     return j;
// }

// } // namespace PCBDesign


// #include "../include/PCBComponent.h"

// namespace PCBDesign {

// PCBComponent::PCBComponent(int id, const std::string& name)
// {
//     this->id = id;
//     this->name = name;
//     this->shapes = std::vector<Shape>();
//     this->pins = std::vector<Pin>();
// }

// PCBComponent::PCBComponent(int id, const std::string& name, const std::vector<Shape>& shapes, const std::vector<Pin>& pins)
// {
//     this->id = id;
//     this->name = name;
//     this->shapes = shapes;
//     this->pins = pins;

// }

// int PCBComponent::getId() const
// {
//     return this->id;

// }

// std::string PCBComponent::getName() const
// {
//     return this->name;

// }

// std::vector<Shape> PCBComponent::getShapes() const
// {
//     return this->shapes;

// }

// std::vector<Pin> PCBComponent::getPins() const
// {
//     return this->pins;

// }

// void PCBComponent::setId(int newId)
// {
//     this->id = newId;

// }

// void PCBComponent::setName(const std::string& newName)
// {
//     this->name = newName;

// }

// void PCBComponent::addShape(const Shape& newShape)
// {
//     this->shapes.emplace_back(newShape);

// }

// void PCBComponent::addPin(const Pin& newPin)
// {
//     this->pins.emplace_back(newPin);

// }

// void PCBComponent::addSubcomponent(const PCBComponent& newComponent)
// {
//     this->subcomponents.emplace_back(newComponent);

// }

// void PCBComponent::display() const
// {
//     std::cout << "ID: " << id << ", Name: " << name << "\n";
//     std::cout << "Shapes:\n";
//     for (const auto& shape : shapes) {
//         shape.display();
//     }
//     std::cout << "Pins:\n";
//     for (const auto& pin : pins) {
//         pin.display();
//     }

// }

// } // namespace PCBDesign
