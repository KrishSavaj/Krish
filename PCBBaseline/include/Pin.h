#ifndef PIN_H
#define PIN_H

#include <iostream>
#include <string>
#include "Coordinate.h"  // holds x and y

namespace PCBDesign {

    enum class PinType { INPUT, OUTPUT, IN_OUT, POWER, GROUND, CLOCK, PASSIVE };

    class Pin {
    public:
        // Constructor
        Pin(int pinNumber,
            PinType type,
            float x,
            float y,
            float angle = 0.0f);

        // Getters
        int getPinNumber() const;
        PinType getType() const;
        Coordinate getPosition() const;
        const std::string& getNetName() const;

        // Setters
        void setPinNumber(int number);
        void setType(PinType t);
        void setX(float xCoord);
        void setY(float yCoord);
        void setNetName(const std::string& n);

        // Display / debug
        void display() const;
        void dump(std::ostream& out) const;

        // Convert PinType to string
        static std::string PinTypeToString(PinType t);

    private:
        int pinNumber;
        PinType type;
        Coordinate position;
        std::string netName;
    };

} // namespace PCBDesign

#endif // PIN_H
