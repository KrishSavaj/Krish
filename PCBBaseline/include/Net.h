#ifndef NET_H
#define NET_H

#include <iostream>
#include <string>
#include <vector>
#include "Pin.h"  // Include the Pin class
#include "Wire.h" // Include the Wire class

namespace PCBDesign {
    // Enum to represent net types
    enum class NetType {
        SIGNAL,
        GROUND,
        POWER,
        ANALOG
    };

    // Class to represent a net in the PCB
    class Net {
    private:
        int id;                          // Unique ID for the net
        std::string name;                // Name of the net (e.g., "VCC", "GND")
        NetType type;                    // Type of the net (e.g., SIGNAL, GROUND, etc.)
        std::vector<Pin> pins;           // Vector of pins connected to the net
        std::vector<Wire> wires;         // Vector of wires representing the net

    public:
        // Constructor
        Net(int id, const std::string& name, NetType type);

        // Getters
        int getId() const;
        std::string getName() const;
        NetType getType() const;
        const std::vector<Pin>& getPins() const;
        const std::vector<Wire>& getWires() const;

        // Setters
        void setName(const std::string& newName);
        void setType(NetType newType);

        // Add a pin to the net
        void addPin(const Pin& pinID);

        // Add a wire to the net
        void addWire(const Wire& wire);

        // Display net details
        void display() const;

    private:
        // Convert NetType enum to string
        std::string netTypeToString(NetType type) const;
    };
}
#endif // NET_HPP
