#ifndef ACOMPONENT_H
#define ACOMPONENT_H

#include "PCBComponent.h"
#include <vector>
#include <string>
#include <unordered_map>
#include <iostream>

namespace PCBDesign {// Derived class to represent an active component
    class AComponent : public PCBComponent {
    private:
        int activeID; // Unique active ID
        std::vector<std::pair<int, std::string>> pinToNet; // Vector array of pins to nets
        std::unordered_map<std::string, int> netToPin;     // Hash table of net to pin
        double x, y;    // X and Y coordinates
        double angle;   // Angle in degrees

    public:
        // Constructor
        AComponent(int id, const std::string& name, int activeID, double x, double y, double angle);

        // Getters
        int getActiveID() const;
        const std::vector<std::pair<int, std::string>>& getPinToNet() const;
        const std::unordered_map<std::string, int>& getNetToPin() const;
        double getX() const;
        double getY() const;
        double getAngle() const;

        // Setters
        void setActiveID(int newActiveID);
        void setCoordinates(double newX, double newY);
        void setAngle(double newAngle);

        // Add a pin-to-net mapping
        void addPinToNet(int pin, const std::string& net);

        // Display component information
        void display() const;
    };
}

#endif // ACOMPONENT_HPP
