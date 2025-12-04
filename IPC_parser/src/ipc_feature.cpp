#include "./include/ipc_feature.h"

#include <iostream>
#include <sstream>
using namespace std;

IPCFeature::IPCFeature() {
    // Constructor implementation (if needed)

}
IPCFeature :: IPCFeature(TreeNode &featurePtr) {
    for (size_t i = 0; i < featurePtr.children.size(); i++) {
        if (featurePtr.children[i].name == "UserSpecial") {
            IPCUserSpecial* userSpecial = new IPCUserSpecial(featurePtr.children[i]);
            userSpecials.push_back(userSpecial);
        }
        if(featurePtr.children[i].name == "Location"){
            IPCLocation* location = new IPCLocation(featurePtr.children[i]);
            locations.push_back(location);
        }
        if(featurePtr.children[i].name == "Line"){
            IPCLine* line = new IPCLine(featurePtr.children[i]);
            lines.push_back(line);
        }
        if(featurePtr.children[i].name == "UserPrimitiveRef"){
            IPCUserPrimitiveRef* userPrimitiveRef = new IPCUserPrimitiveRef(featurePtr.children[i]);
            userPrimitiveRefs.push_back(userPrimitiveRef);
        }
    }
    
}

void IPCFeature::IPCFeatureDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Feature: " << endl;
    // for (const auto& userSpecial : userSpecials) {
    //     userSpecial.IPCUserSpecialDisplay(depth + 1);
    // }
}

string IPCFeature::toXML(int indent){
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Features>\n";
    
    // Location MUST come first (IPC-2581 standard)
    for (size_t i = 0; i < locations.size(); i++) {
        IPCLocation* loc = locations[i];
        oss << loc->toXML(indent + 4);
    }
    
    // Then Lines
    for (size_t i = 0; i < lines.size(); i++) {
        IPCLine* line = lines[i];
        oss << line->toXML(indent + 4);
    }
    
    // Then UserPrimitiveRefs
    for (size_t i = 0; i < userPrimitiveRefs.size(); i++) {
        oss << userPrimitiveRefs[i]->toXML(indent + 4);
    }

    // Then UserSpecials
    for (size_t i = 0; i < userSpecials.size(); i++) {
        oss << userSpecials[i]->toXML(indent + 4);
    }

    oss << tab << "</Features>\n";



    return oss.str();
}