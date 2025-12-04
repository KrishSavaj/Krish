#include <sstream>
# include "./include/cad_data.h"
# include "./include/ipc_layer.h"
# include "./include/ipc_step.h"
#include<iostream>
#include <string>

using namespace std;

IPCCadData::IPCCadData(TreeNode &cadDataPtr) {
    // cout << "Hello Cad Date ....."<<endl;
    addIPCLayer(cadDataPtr);
    addStep(cadDataPtr);

}


void IPCCadData::addIPCLayer(TreeNode &layer) {
    for (size_t i = 0; i < layer.children.size(); i++) {
        if (layer.children[i].name == "Layer") {
            // cout << "Adding layer: " << layer.children[i].attributes[0].second << endl;
            layers.emplace_back(new IPCLayer(layer.children[i])); // Dynamically allocated
        }
    }
}

void IPCCadData::addStep(TreeNode &stepPtr) {
    for (size_t i = 0; i < stepPtr.children.size(); i++) {
        if (stepPtr.children[i].name == "Step") {
            // cout << "Adding step: " << stepPtr.children[i].attributes[0].second << endl;
            step = new IPCStep(stepPtr.children[i]);
            // step->IPCStepDisplay(1);
        }
    }
}


void IPCCadData::cadDataDisplay(int depth)  {
    string indent(depth * 4, ' ');
    cout << indent << "CadData:"<< endl;
    for(size_t i =0 ; i<layers.size(); i++){
        layers[i]->IPCLayerDisplay(depth + 1);
    }
    if (step != nullptr) {
        step->IPCStepDisplay(depth + 1);
    } else {
        cout << indent << "No step data available." << endl;
    }
    
    

}

string IPCCadData::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<CadData>\n";
    
    for (const auto& layer : layers) {
        oss << layer->toXML(indent + 4);
    }
    
    if (step != nullptr) {
        oss << step->toXML(indent + 4);
    }

    oss << tab << "</CadData>\n";
    
    return oss.str();
}
