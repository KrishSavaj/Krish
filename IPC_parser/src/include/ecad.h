#ifndef IPCECAD_H
#define IPCECAD_H
// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../"
// #include "../PCBBaseline/include/PCBComponent.h"
#include <iostream>
#include <vector>
#include <string>
#include "tree_node.h"
#include "cad_header.h"
#include "cad_data.h"

class IPCEcad { // : public virtual GUIComponent
private:
    string name;
    IPCCadHeader* cadHeader = nullptr;
    IPCCadData* cadData = nullptr;

public:
    // Constructor
    IPCEcad(string name = "");

    // Destructor
    ~IPCEcad() {}

    void addIPCEcadData(TreeNode &EcadTree);
    
    void ecadDisplay(int depth);
    std::string toXML(int indent);
};

#endif // IPCECAD_H









































 // Ecad.h - Header file
// #ifndef ECAD_H
// #define ECAD_H

// #include <iostream>
// #include <vector>
// #include <string>
// #include "tree_node.hpp"

// using namespace std;


// class Ecad {
// public:
//     string name;
//     // CadHeader header;
//     // CadData data;

//     // Default constructor
//     // Ecad(const string& name = "", const CadHeader& header = CadHeader(), const CadData& data = CadData())
//         // : name(name), header(header), data(data) {}

//     // ~Ecad() {}

//     void extract_ecad_data(TreeNode& EcadTree);
    
//     void print() const {
//         cout << "Ecad Name: " << name << endl;
//         // header.print();
//         // data.print();
//     }
// };

// #endif // ECAD_H



// // class Layer {
// // public:
// //     string name;
// //     string layerFunction;
// //     string polarity;
// //     string side;

// //     // Default constructor
// //     Layer() : name(""), layerFunction(""), polarity(""), side("") {}

// //     // Parameterized constructor
// //     Layer(const string& name, const string& layerFunction, const string& polarity, const string& side)
// //         : name(name), layerFunction(layerFunction), polarity(polarity), side(side) {}

// //     ~Layer() {}

// //     void print() const {
// //         cout << "Layer: " << name << ", Function: " << layerFunction
// //              << ", Polarity: " << polarity << ", Side: " << side << endl;
// //     }
// // };

// // class CadData {
// // public:
// //     vector<Layer> layers;

// //     // Default constructor
// //     CadData() {}

// //     ~CadData() {}

// //     // Add layer with default parameter
// //     void addLayer(const Layer& layer = Layer()) {
// //         layers.push_back(layer);
// //     }

// //     void print() const {
// //         cout << "CadData contains " << layers.size() << " layers." << endl;
// //         for (const auto& layer : layers) {
// //             layer.print();
// //         }
// //     }
// // };

// // class CadHeader {
// // public:
// //     string units;

// //     // Default constructor
// //     CadHeader(const string& units = "") : units(units) {}

// //     ~CadHeader() {}

// //     void print() const {
// //         cout << "CadHeader Units: " << units << endl;
// //     }
// // };

