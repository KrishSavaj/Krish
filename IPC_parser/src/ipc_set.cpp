#include "./include/ipc_set.h"
#include <iostream>
#include <sstream>

using namespace std;
IPCSet::IPCSet() {
    // Constructor implementation (if needed)
}

IPCSet::IPCSet(TreeNode &setPtr){

    for(size_t i = 0; i < setPtr.attributes.size(); ++i) {
        if (setPtr.attributes[i].first == "net") {
            net = setPtr.attributes[i].second;
        }
        if (setPtr.attributes[i].first == "polarity") {
            polarity = setPtr.attributes[i].second;
        }
        if( setPtr.attributes[i].first == "padUsage") {
            padUsage = setPtr.attributes[i].second;
        }
        if( setPtr.attributes[i].first == "testPoint") {
            testPoint = (setPtr.attributes[i].second == "true" || setPtr.attributes[i].second == "1");
        }
        if( setPtr.attributes[i].first == "geometryUsage") {
            geometry = setPtr.attributes[i].second;
        }
        if ( setPtr.attributes[i].first == "plate") {
            plate = (setPtr.attributes[i].second == "true" || setPtr.attributes[i].second == "1");
        }
        if( setPtr.attributes[i].first == "componentRef") {
            componentRef = setPtr.attributes[i].second;
        }
        
    }

    for(int i=0; i<setPtr.children.size(); i++){
        if(setPtr.children[i].name == "Features"){
            IPCFeature* feature = new IPCFeature(setPtr.children[i]);
            features.push_back(feature);
        }
        if(setPtr.children[i].name == "Pad"){
            IPCPad* pad = new IPCPad(setPtr.children[i]);
            pads.push_back(pad);
        }
     }

}

void IPCSet::IPCSetDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent << "Net: " << net << endl;
    cout << indent << "Polarity: " << polarity << endl;
    cout << indent << "Pad Usage: " << padUsage << endl;
    cout << indent << "Test Point: " << (testPoint ? "true" :
    "false") << endl;
    cout << indent << "Geometry: " << geometry << endl;
    cout << indent << "Plate: " << (plate ? "true" : "false") << endl;
    cout << indent << "Component Ref: " << componentRef << endl;
    
    for(size_t i = 0; i < features.size(); i++) {
        features[i]->IPCFeatureDisplay(depth + 1);
    }
    for(size_t i = 0; i < pads.size(); i++) {
        pads[i]->IPCPadDisplay(depth + 1);
    }
    
}

string IPCSet::toXML(int indent) const {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Set"
        << " net=\"" << net << "\""
        << " polarity=\"" << polarity << "\""
        << " padUsage=\"" << padUsage << "\""
        << " testPoint=\"" << (testPoint ? "true" : "false") << "\""
        << " geometryUsage=\"" << geometry << "\""
        << " plate=\"" << (plate ? "true" : "false") << "\""
        << " componentRef=\"" << componentRef << "\">\n";

    for (size_t i = 0; i < features.size(); i++) {
        IPCFeature* feature = features[i]; 
        oss << feature->toXML(indent + 4);
    }
    for (size_t i = 0; i < pads.size(); i++) {
        IPCPad* pad = pads[i]; 
        oss << pad->toXML(indent + 4); 
    }
    oss << tab << "</Set>\n";
    return oss.str();
}