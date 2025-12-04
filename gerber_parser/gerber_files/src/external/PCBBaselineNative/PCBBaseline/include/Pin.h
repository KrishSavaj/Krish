#ifndef PIN_H
#define PIN_H

#include <iostream>
#include <string>
#include "Coordinate.h" // Include the header file for the Coordinate class
#include <nlohmann/json.hpp>

namespace PCBDesign {
    // Enum for pin types
    enum class PinType { INPUT, OUTPUT, IN_OUT, POWER, GROUND, CLOCK };

    class Pin {
    private:
        int pinNumber;         // Pin number
        PinType type;          // Pin type (e.g., input, output, etc.)
        Coordinate position;   // Pin position on the PCB

    public:
        // Constructor
        Pin(int pinNumber, PinType type, float x, float y, float angle = 0.0);

        // Getters
        int getPinNumber() const;
        PinType getType() const;
        Coordinate getPosition() const;

        // Setters
        void setPinNumber(int number);
        void setType(PinType t);
        void setX(float xCoord);
        void setY(float yCoord);

        // Display the pin details
        void display() const;
        void dump(std::ostream& out) const;
        // Convert PinType to string for display
        static std::string PinTypeToString(PinType type);
        nlohmann::json toJSON() const;

    };
}
#endif // PIN_HPP
