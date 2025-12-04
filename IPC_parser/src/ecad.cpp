// Ecad.cpp - Implementation file
#include "./include/ecad.h"
#include "./include/tree_node.h"
#include <sstream>

using namespace std;

// Constructor
IPCEcad::IPCEcad(string name) : name(name) {
    
    // cout<< "addECAD Data called .. 123 "<<endl;

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("EcadName", ValueType::STRING, &this->name, false, stc);
    

}

// Destructor
// IPCEcad::~IPCEcad() {}

// void IPCEcad::print() const {
//     cout << "Ecad Name: " << name << endl;
// }

void IPCEcad::addIPCEcadData(TreeNode &EcadTree) {

    
    if (!EcadTree.attributes.empty()) {
        name = EcadTree.attributes[0].second; // Assuming the first attribute stores the name
        // cout << "Ecad Name Updated: " << name << endl;
    }

// Iterate over child nodes to find the "CadHeader" node
    for (size_t i = 0; i<EcadTree.children.size();i++) {
        if (EcadTree.children[i].name == "CadHeader") {  // Assuming 'nodeType' identifies node types
            cadHeader = new IPCCadHeader(EcadTree.children[i]);

            
            // cout << "CadHeader Updated: Version=" << version << ", Author=" << author << endl;
            
            break;
        }
    }

    for (size_t i = 0; i<EcadTree.children.size();i++) {
        if (EcadTree.children[i].name == "CadData") {  // Assuming 'nodeType' identifies node types
            // cout <<  "Cad Data: " << EcadTree.children[i].name << endl;
            cadData = new IPCCadData(EcadTree.children[i]);
            // cout <<  "Cad Data: " << EcadTree.children[i].name << endl;
            
            // cout << "CadHeader Updated: Version=" << version << ", Author=" << author << endl;
            
            // break;
        }
    }


    
}

std::string IPCEcad::toXML(int indent = 0){
        string tab(indent, ' ');
        ostringstream oss;
        oss << tab << "<Ecad name=\"" << name << "\">\n";
        if (cadHeader) {
            oss << cadHeader->toXML(indent + 4);
        }
        if (cadData) {
            oss << cadData->toXML(indent + 4);
        }
        oss << tab << "</Ecad>\n";
        return oss.str();
    }

void IPCEcad::ecadDisplay(int depth){
    string indent(depth * 4, ' ');
    cout << indent << "Ecad Name: " << name<< endl;
    // cout << "Cad Header Info: " << cadHeader << endl;
    cadHeader->cadHeaderDisplay(depth + 1);
    cadData->cadDataDisplay(depth + 1);
}










































// // Ecad.cpp - Implementation file
// #include "./include/ecad.hpp"
// #include "./include/tree_node.hpp"

// using namespace std;

// // Layer::Layer(const string& name, const string& layerFunction, const string& polarity, const string& side)
// // //  : name(name), layerFunction(layerFunction), polarity(polarity), side(side) {}
   
// // Layer::~Layer() {}

// // void Layer::print() const {
// //     cout << "Layer: " << name << ", Function: " << layerFunction
// //               << ", Polarity: " << polarity << ", Side: " << side << endl;
// // }

// // CadData::CadData() {}

// // CadData::~CadData() {}

// // void CadData::addLayer(const Layer& layer) {
// //     layers.push_back(layer);
// // }

// // void CadData::print() const {
// //     for (const auto& layer : layers) {
// //         layer.print();
// //     }
// // }

// // CadHeader::CadHeader(const string& units) : units(units) {}

// // CadHeader::~CadHeader() {}

// // void CadHeader::print() const {
// //     cout << "CadHeader Units: " << units << endl;
// // }

// // Ecad::Ecad(const string& name, const CadHeader& header, const CadData& data)
// //     : name(name), header(header), data(data) {}

// // Ecad::~Ecad() {}

// void Ecad::print() const {
//     cout << "Ecad Name: " << name << endl;
//     // header.print();
//     // data.print();
// }
// void Ecad::extract_ecad_data(TreeNode& EcadTree) const {
//     // Implement the logic for extracting the data here.
//     // This could involve parsing XML or reading from a file or data stream.
    
//     // Example (just to show how you might populate the data members):
//     name = EcadTree.attributes[0].second;
//     // header.units = EcadTree.children[0].attributes[0].second;
    
//     // for (const TreeNode& child : EcadTree.children) {
//     //     if (child.name == "Layer") {
//     //         Layer newLayer(child.attributes[0].second, child.attributes[1].second,
//     //                        child.attributes[2].second, child.attributes[3].second);
//     //         data.addLayer(newLayer);
//     //     }
//     // }
// }

