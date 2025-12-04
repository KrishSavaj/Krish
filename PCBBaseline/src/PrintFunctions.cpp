
#include "../include/PrintFunctions.h"
#include <iostream>

namespace PCBDesign {

    // Function to print a PCBComponent
    void printPCBComponent(const PCBComponent& component) {
        std::cout << "PCB Component:\n";
        component.display();
        std::cout << "-----------------------\n";
    }

    // Function to print an AComponent
    void printAComponent(const AComponent& component) {
        std::cout << "Active PCB Component:\n";
        component.display();
        std::cout << "-----------------------\n";
    }

    // Function to print a Net
    void printNet(const Net& net) {
        std::cout << "PCB Net:\n";
        net.display();
        std::cout << "-----------------------\n";
    }

    // Function to print a Pin
    void printPin(const Pin& pin) {
        std::cout << "PCB Pin:\n";
        pin.display();
        std::cout << "-----------------------\n";
    }

    // Function to print a Wire
    void printWire(const Wire& wire) {
        std::cout << "PCB Wire:\n";
        wire.display();
        std::cout << "-----------------------\n";
    }

    // Function to print a Via
    void printVia(const Via& via) {
        std::cout << "PCB Via:\n";
        via.display();
        std::cout << "-----------------------\n";
    }

    // Function to print a FundamentalShape
    void printShape(const FundamentalShape& shape) {
        std::cout << "PCB Shape:\n";
        shape.display();
        std::cout << "-----------------------\n";
    }

} // namespace PCBDesign
