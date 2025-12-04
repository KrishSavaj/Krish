#include <sstream>
#include <iostream>
#include "./include/ipc_step.h"
#include "./include/ipc_component.h"
#include "./include/ipc_datum.h"
// #include<iostream>
// #include "./include/ipc_package.h"
// #include "./include/ipc_layer_feature.h"


using namespace std;

IPCStep :: IPCStep(TreeNode &StepPtr){

    // cout << "Hello Step ....."<<endl;
    name = StepPtr.attributes[0].second;
    type = StepPtr.attributes[1].second;
    // stackupRef = StepPtr.attributes[2].second;
    
    // cout << "Step name: " << name << endl;
    
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("name", ValueType::STRING, &name, false, stc);
    // addAttr("type", ValueType::STRING, &type, false, stc);
    // addAttr("stackupRef", ValueType::STRING, &stackupRef, false, stc);
    
    addIPCDatum(StepPtr);
    addIPCPackages(StepPtr);
    addIPCComponent(StepPtr);
    addIPCLayerFeature(StepPtr);
    addIPCNonStandardAttribute(StepPtr);
    addIPCProfile(StepPtr);
    addIPCPadStackDef(StepPtr);

}


void IPCStep::addIPCComponent(TreeNode &StepPtr ){
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "Component") {
            // cout << "Adding component: " << StepPtr.children[i].attributes[0].second << endl;
            components.emplace_back( new IPCcomponent(StepPtr.children[i]));
            // components.push_back(component); // Store the component if needed
        }
    }
}

void IPCStep::addIPCDatum(TreeNode &StepPtr ){
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "Datum") {
            // cout << "Adding datum: " << StepPtr.children[i].attributes[0].second << endl;
            datum = new IPCDatum(StepPtr.children[i]);
        }
    }
}

void IPCStep::addIPCProfile(TreeNode &StepPtr ){
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "Profile") {
            // cout << "Adding profile: " << StepPtr.children[i].name<< endl;
            profile = new IPCProfile(StepPtr.children[i]);
            // You can store or process the profile as needed
        }
    }
}

void IPCStep::addIPCPackages(TreeNode &StepPtr ){
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "Package") {
            // cout << "Adding package: " << StepPtr.children[i].attributes[0].second << endl;
            ipcPackages.emplace_back( new IPCPackage(StepPtr.children[i]));
            // components.push_back(component); // Store the component if needed
        }
    }
}

void IPCStep::addIPCLayerFeature(TreeNode &StepPtr ){
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "LayerFeature") {
            // cout << "Adding layer feature: " << StepPtr.children[i].attributes[0].second << endl;
            layerFeatures.emplace_back( new IPCLayerFeature(StepPtr.children[i]));
            // components.push_back(component); // Store the component if needed
        }
    }
}

void IPCStep ::addIPCNonStandardAttribute(TreeNode &StepPtr ){

    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "NonstandardAttribute") {
            // cout << "Adding NonStandardAttribute: " << StepPtr.children[i].attributes[0].second << endl;
            nonStandardAttributes.emplace_back( new IPCNonStandardAttribute(StepPtr.children[i]));
            // components.push_back(component); // Store the component if needed
        }
    }
}

void IPCStep::addIPCPadStackDef(TreeNode &StepPtr) {
    for (size_t i = 0; i < StepPtr.children.size(); i++) {
        if (StepPtr.children[i].name == "PadStackDef") {
            // cout << "Adding PadStackDef: " << StepPtr.children[i].attributes[0].second << endl;
            padStackDefs.emplace_back(new IPCPadStackDef(StepPtr.children[i]));
        }
    }
}

void IPCStep::IPCStepDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "Step [ Name: " << name ;
    cout << indent << "Type: " << type;
    // cout << indent << "Stackup Reference: " << stackupRef;
    cout << " ]" << endl;
    for(size_t i =0 ; i < nonStandardAttributes.size(); i++){
        nonStandardAttributes[i]->IPCNonStandardAttributeDisplay(depth + 1);
    }
    if(datum){
        datum->IPCDatumDisplay(depth + 1);
    }
    if(profile){
        profile->profileDisplay(depth + 1);
    }
    for(size_t i =0 ; i < ipcPackages.size(); i++){
        ipcPackages[i]->IPCPackageDisplay(depth + 1);
    }
    for(size_t i =0 ; i < components.size(); i++){
        components[i]->IPCcomponentDisplay(depth + 1);
    }
    for(size_t i =0 ; i < layerFeatures.size(); i++){
        layerFeatures[i]->IPCLayerFeatureDisplay(depth + 1);
    }




    // getGUIstring();
}


string IPCStep::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<Step "
        << "name=\"" << name << "\" "
        << "type=\"" << type << "\">\n";
        // << "side=\"" << stackupRef << "\"/>\n";
    
    for( size_t i =0 ; i < nonStandardAttributes.size(); i++){

        oss << nonStandardAttributes[i]->toXML(indent + 4);
    }
        // Add PadStackDef elements
    for (size_t i = 0; i < padStackDefs.size(); i++) {
        oss << padStackDefs[i]->toXML(indent + 4);
    }
    if (datum) {
        oss << datum->toXML(indent + 4);
    }
    // cout << "Generating XML for Step: " << name << endl;
    if(profile) {
        cout << "Adding profile to XML" << endl;
        oss << profile->toXML(indent + 4);
    }
    

    
    for (size_t i = 0; i < ipcPackages.size(); i++) {
        oss << ipcPackages[i]->toXML(indent + 4);
    }

    for (size_t i = 0; i < components.size(); i++) {
        oss << components[i]->toXML(indent + 4);
    }

    for (size_t i = 0; i < layerFeatures.size(); i++) {
        oss << layerFeatures[i]->toXML(indent + 4);
    }



    oss << tab << "</Step>\n";

    return oss.str();
}


























































// IPCStep :: ~IPCStep();



// IPCStep::IPCStep(TreeNode &StepPtr) {
//     cout << "Hello Step ....." << endl;

//     StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);

//     if (!StepPtr.attributes.empty()) {
//         name = StepPtr.attributes[0].second;
//         cout << "Step name: " << name << endl;
//         addAttr("name", ValueType::STRING, &name, false, stc);
//     }

//     for (size_t i = 1; i < StepPtr.attributes.size(); ++i) {
//         if (StepPtr.attributes[i].first == "type") {
//             type.push_back(StepPtr.attributes[i].second);
//         } else if (StepPtr.attributes[i].first == "stackupRef") {
//             stackupRef.push_back(StepPtr.attributes[i].second);
//         }
//     }

//     if (!type.empty()) {
//         addAttr("type", ValueType::STRING_VECTOR, &type, false, stc);
//     }

//     if (!stackupRef.empty()) {
//         addAttr("stackupRef", ValueType::STRING_VECTOR, &stackupRef, false, stc);
//     }
// }