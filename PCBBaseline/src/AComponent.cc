// #include "../include/AComponent.h"

// namespace PCBDesign {
//     // Constructor
//     AComponent::AComponent(int id, const std::string& name, int activeID, double x, double y, double angle)
//         : PCBComponent(id, name, 1.0, 1.0), activeID(activeID), x(x), y(y), angle(angle) {}

//     // Getters
//     int AComponent::getActiveID() const {
//         return activeID;
//     }

//     const std::vector<std::pair<int, std::string>>& AComponent::getPinToNet() const {
//         return pinToNet;
//     }

//     const std::unordered_map<std::string, int>& AComponent::getNetToPin() const {
//         return netToPin;
//     }

//     double AComponent::getX() const {
//         return x;
//     }

//     double AComponent::getY() const {
//         return y;
//     }

//     double AComponent::getAngle() const {
//         return angle;
//     }

//     // Setters
//     void AComponent::setActiveID(int newActiveID) {
//         activeID = newActiveID;
//     }

//     void AComponent::setCoordinates(double newX, double newY) {
//         x = newX;
//         y = newY;
//     }

//     void AComponent::setAngle(double newAngle) {
//         angle = newAngle;
//     }

//     // Add a pin-to-net mapping
//     void AComponent::addPinToNet(int pin, const std::string& net) {
//         pinToNet.emplace_back(pin, net);
//         netToPin[net] = pin;
//     }

//     // Display component information
//     void AComponent::display() const {
//         PCBComponent::display(); // Call base class display function
//         std::cout << "Active ID: " << activeID << "\n";
//         std::cout << "Coordinates: (" << x << ", " << y << "), Angle: " << angle << " degrees\n";
//         std::cout << "Pin-to-Net Mappings:\n";
//         for (const auto& pair : pinToNet) {
//             std::cout << "  Pin " << pair.first << " -> Net " << pair.second << "\n";
//         }
//         std::cout << "Net-to-Pin Mappings:\n";
//         for (const auto& pair : netToPin) {
//             std::cout << "  Net " << pair.first << " -> Pin " << pair.second << "\n";
//         }
//     }
// }
// src/AComponent.cc
#include "../include/AComponent.h"
#include <iostream>

namespace PCBDesign {

  // Constructor
  AComponent::AComponent(int id,
                         const std::string& name,
                         int activeID,
                         double x,
                         double y,
                         double angle)
    : PCBComponent(id, name, {}, {}),  // adjust ctor args to match your base class
      activeID(activeID),
      x(x),
      y(y),
      angle(angle)
  {}

  // Getters
  int AComponent::getActiveID() const { return activeID; }
  const std::vector<std::pair<int, std::string>>& AComponent::getPinToNet() const { return pinToNet; }
  const std::unordered_map<std::string,int>&     AComponent::getNetToPin() const { return netToPin; }
  double AComponent::getX() const   { return x; }
  double AComponent::getY() const   { return y; }
  double AComponent::getAngle() const { return angle; }

  // Setters
  void AComponent::setActiveID(int newActiveID) { activeID = newActiveID; }
  void AComponent::setCoordinates(double newX, double newY) {
    x = newX; y = newY;
  }
  void AComponent::setAngle(double newAngle) { angle = newAngle; }

  // Mapping helpers
  void AComponent::addPinToNet(int pin, const std::string& net) {
    pinToNet.emplace_back(pin, net);
    netToPin[net] = pin;
  }

  // Display override
  void AComponent::display() const {
    PCBComponent::display();  // print base info
    std::cout << "  Active ID: " << activeID << "\n";
    std::cout << "  Position: (" << x << ", " << y << "), Angle: " << angle << "°\n";
    std::cout << "  Pin→Net:\n";
    for (auto &p : pinToNet)
      std::cout << "    pin " << p.first << " → " << p.second << "\n";
    std::cout << "  Net→Pin:\n";
    for (auto &n : netToPin)
      std::cout << "    net " << n.first << " → pin " << n.second << "\n";
  }

}  // namespace PCBDesign
