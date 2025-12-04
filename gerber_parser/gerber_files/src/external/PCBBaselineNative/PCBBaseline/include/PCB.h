#ifndef PCB_H
#define PCB_H

#include <vector>
#include <iostream>
#include "Wire.h" // Include the Wire class definition

namespace PCBDesign {
    class PCB {
    private:
        std::vector<Wire> wires; // List of wires on the PCB

    public:
        // Add a wire to the PCB
        void addWire(const Wire& wirepcb);

        // Get all wires
        const std::vector<Wire>& getWires() const;

        // Display PCB details
        void display() const;
    };
}
#endif // PCB_HPP
