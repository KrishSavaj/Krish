#include "../include/Pin.h"
#include "../include/Coordinate.h"
#include <string>
#include <iostream>
#include <nlohmann/json.hpp>


namespace PCBDesign {
	// Constructor
	Pin::Pin(int pinNumber, PinType type, float x, float y, float angle)
		: pinNumber(pinNumber), type(type), position(x,y,angle) {}

	// Getters
	int Pin::getPinNumber() const { return pinNumber; }
	PinType Pin::getType() const { return type; }
	Coordinate Pin::getPosition() const { return position; }

	// Setters
	void Pin::setPinNumber(int number) { pinNumber = number; }
	void Pin::setType(PinType t) { type = t; }
	void Pin::setX(float xCoord) { position.x = xCoord; }
	void Pin::setY(float yCoord) { position.y = yCoord; }

	void Pin::display() const {
		std::cout << "Pin [Number: " << pinNumber
			<< ", Type: " << PinTypeToString(type)
			<< ", Position: " << position.toString() << "]\n";
	}

	// Convert PinType to string for display
	 std::string Pin::PinTypeToString(PinType type) {
		switch (type) {
		case PinType::INPUT: return "INPUT";
		case PinType::OUTPUT: return "OUTPUT";
		case PinType::IN_OUT: return "IN_OUT";
		case PinType::POWER: return "POWER";
		case PinType::GROUND: return "GROUND";
		case PinType::CLOCK: return "CLOCK";
		default: return "UNKNOWN";
		}
	}
      void Pin::dump(std::ostream& out) const {
      out << "Pin [Number: " << pinNumber
        << ", Type: " << PinTypeToString(type)
        << ", Position: " << position.toString() << "]\n";
}
nlohmann::json Pin::toJSON() const {
    return {
        {"pinNumber", pinNumber},
        {"type", PinTypeToString(type)},
        {"position", {
            {"x", position.x},
            {"y", position.y}
        }}
    };
}


}
