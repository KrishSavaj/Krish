#include "../include/Net.h"


namespace PCBDesign {
    // Constructor
    Net::Net(int id, const std::string& name, NetType type)
        : id(id), name(name), type(type) {}

    // Getters
    int Net::getId() const {
        return id;
    }

    std::string Net::getName() const {
        return name;
    }

    NetType Net::getType() const {
        return type;
    }

    const std::vector<Pin>& Net::getPins() const {
        return pins;
    }

    const std::vector<Wire>& Net::getWires() const {
        return wires;
    }

    // Setters
    void Net::setName(const std::string& newName) {
        name = newName;
    }

    void Net::setType(NetType newType) {
        type = newType;
    }

    // Add a pin to the net
    void Net::addPin(const Pin& pinID) {
        pins.push_back(pinID);
    }

    // Add a wire to the net
    void Net::addWire(const Wire& wire) {
        wires.push_back(wire);
    }

    // Display net details
    void Net::display() const {
        std::cout << "Net ID: " << id << ", Name: " << name
            << ", Type: " << netTypeToString(type) << "\n";

        std::cout << "Pins:\n";
        for (const auto& pin : pins) {
            pin.display();
        }

        std::cout << "Wires:\n";
        for (const auto& wire : wires) {
            wire.display();
        }
    }

    // Convert NetType enum to string
    std::string Net::netTypeToString(NetType type) const {
        switch (type) {
        case NetType::SIGNAL: return "Signal";
        case NetType::GROUND: return "Ground";
        case NetType::POWER: return "Power";
        case NetType::ANALOG: return "Analog";
        default: return "Unknown";
        }
    }
}
