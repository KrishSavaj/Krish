#include <iostream>
#include <fstream>
#include <regex>
#include <limits>
#include "../include/BaselineBoard.h"
#include <nlohmann/json.hpp> 
using json = nlohmann::json;
namespace PCBDesign {
    // BaselineBoard Class Implementation

    // Constructor
    BaselineBoard::BaselineBoard(double h, double w, double t)
        : height(h), width(w), thickness(t)
    {
        this->components = std::vector<PCBComponent>();
    }

    BaselineBoard::BaselineBoard()
    {
        this->height = 0;
        this->width = 0;
        this->thickness = 0;
        this->components = std::vector<PCBComponent>();
    }

    // Getters
    double BaselineBoard::getHeight() const {
        return height;
    }

    double BaselineBoard::getWidth() const {
        return width;
    }

    double BaselineBoard::getThickness() const {
        return thickness;
    }
    const std::vector<PCBComponent>& BaselineBoard::getComponents() const {
    return components;
    }

    // Setters
    void BaselineBoard::setHeight(double h) {
        height = h;
    }

    void BaselineBoard::setWidth(double w) {
        width = w;
    }

    void BaselineBoard::setThickness(double t) {
        thickness = t;
    }

    // Add a fundamental shape to the board
    void BaselineBoard::addComponent(const PCBComponent& comp) {
        components.emplace_back(comp);
    }

    // Display board details
    void BaselineBoard::display() const {
        std::cout << "Baseline Board Details:" << std::endl;
        std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness << std::endl;

        std::cout << "Components on the board:" << std::endl;
        for(const auto& comp : components) {
            comp.display();
        }
    }
      void BaselineBoard::dumpAsJSON(std::ostream &out) const {
    out << "Baseline Board Details:\n"
        << "  Height: " << height << " mm  Width: " << width
        << " mm  Thickness: " << thickness << " mm\n"
        << "Components:\n";
    for (auto &c : components) c.dump(out);
  }
    // Extract dimensions from Gerber file
    void BaselineBoard::extractDimensionsFromGerber(const std::string& filename) {
        std::ifstream file(filename);
        if (!file.is_open()) {
            std::cerr << "Failed to open file: " << filename << std::endl;
            return;
        }

        std::string line;
        std::regex coordRegex(R"(X(-?\d+)Y(-?\d+))");

        double minX = std::numeric_limits<double>::max();
        double maxX = std::numeric_limits<double>::lowest();
        double minY = std::numeric_limits<double>::max();
        double maxY = std::numeric_limits<double>::lowest();

        while (std::getline(file, line)) {
            std::smatch match;
            if (std::regex_search(line, match, coordRegex)) {
                double x = std::stod(match[1]) / 1000000.0; // Convert from microns to mm
                double y = std::stod(match[2]) / 1000000.0;

                minX = std::min(minX, x);
                maxX = std::max(maxX, x);
                minY = std::min(minY, y);
                maxY = std::max(maxY, y);
            }
        }

        file.close();

        // Use extracted values directly to set dimensions
        setWidth(maxX - minX);
        setHeight(maxY - minY);
        setThickness(1.6); // Default thickness in mm
    }
    void BaselineBoard::dumpAsJSON(std::ostream& os) const {
    using json = nlohmann::json;
    json boardJSON = json::array();

    for (const auto& component : components) {
        boardJSON.push_back(component.toJSON());
    }

    os << boardJSON.dump(2);
}

} // namespace PCBDesign


// #include "../include/BaselineBoard.h"

// namespace PCBDesign {
//         // BaselineBoard Class Implementation

//     // Constructor
//     BaselineBoard::BaselineBoard(double h, double w, double t)
//         : height(h), width(w), thickness(t)
//     {
//         this->components = std::vector<PCBComponent>();
//     }
    
//     BaselineBoard::BaselineBoard()
//     {
//         this->height = 0;
//         this->width = 0;
//         this->thickness = 0;
//         this->components = std::vector<PCBComponent>();
//     }

//     // Getters
//     double BaselineBoard::getHeight() const {
//         return height;
//     }

//     double BaselineBoard::getWidth() const {
//         return width;
//     }

//     double BaselineBoard::getThickness() const {
//         return thickness;
//     }
//     // Setters
//     void BaselineBoard::setHeight(double h) {
//         height = h;
//     }

//     void BaselineBoard::setWidth(double w) {
//         width = w;
//     }

//     void BaselineBoard::setThickness(double t) {
//         thickness = t;
//     }

//     // Add a fundamental shape to the board
//     void BaselineBoard::addComponent(const PCBComponent& comp) {
//         components.emplace_back(comp);
//     }

//     // Display board details
//     void BaselineBoard::display() const {
//         std::cout << "Baseline Board Details:" << std::endl;
//         std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness
//             << std::endl;

//         std::cout << "Components on the board:" << std::endl;
//         for(const auto& comp : components) {
//             comp.display();
//         }
//     }
// }
