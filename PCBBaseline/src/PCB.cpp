#include "../include/PCB.h"
#include "../include/Wire.h"

namespace PCBDesign {
    // Add a wire to the PCB
    void PCB::addWire(const Wire& wirepcb) {
        wires.push_back(wirepcb);
    }

    // Get all wires
    const std::vector<Wire>& PCB::getWires() const {
        return wires;
    }

    // Display PCB details
    void PCB::display() const {
        for (const auto& Wire : wires) {
            Wire.display(); // Assuming Wire has a toString() method
        }
    }
}
