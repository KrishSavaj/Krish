//#include "../include/PrintFunctions.h"

//int main() {
  //  using namespace PCBDesign;

// std::cout << "Program started!" << std::endl << std::flush;
//     // Create objects
//     PCBComponent comp1(1, "Resistor", 2.5, 1.2);
//     AComponent ac1(2, "Microcontroller", 101, 10.5, 20.3, 90.0);
//     Pin pin1(1, PinType::INPUT, 5.0, 5.0);
//     Pin pin2(2, PinType::OUTPUT, 10.0, 10.0);

//     Wire wire1(Coordinate(5.0, 5.0), Coordinate(10.0, 10.0), AngleWire::DEG_90, 0.5, "Top", ViaType::THROUGH, ViaType::NONE);

//     Via via1("Top", "Bottom", 0.2);

//     FundamentalShape shape1("Rectangle", 10.0, 15.0, 50.0, 30.0);

//     Net net1(1, "VCC", NetType::POWER);
//     net1.addPin(pin1);
//     net1.addPin(pin2);
//     net1.addWire(wire1);

//     // Print all objects
//     printPCBComponent(comp1);
//     printAComponent(ac1);
//     printPin(pin1);
//     printWire(wire1);
//     printVia(via1);
//     printShape(shape1);
//     printNet(net1);

   // return 0;
//}

#include "../include/PrintFunctions.h"
#include "GerberImporter.h"
#include "BaselineBoard.h"
#include <iostream>

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cerr << "Usage: PCBApp <gerber-file>\n";
        return 1;
    }

    PCBDesign::BaselineBoard board;
    PCBDesign::importGerber(argv[1], board);
  board.dumpAsJSON(std::cout);


    return 0;
}


