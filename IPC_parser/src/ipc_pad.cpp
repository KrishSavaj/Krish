#include <sstream>
#include "./include/ipc_pad.h"
#include <iostream>
using namespace std;

IPCPad::IPCPad(){
    padStackDefRef = "";
    xForm = nullptr;
    location = nullptr;
    standardPrimitiveRefs = nullptr;
    pinRef = nullptr;
}

IPCPad::IPCPad(TreeNode &padPtr){
    // Initialize all pointers to nullptr
    xForm = nullptr;
    location = nullptr;
    standardPrimitiveRefs = nullptr;
    pinRef = nullptr;
    
    for (size_t i = 0; i < padPtr.attributes.size(); ++i) {
        // cout<<"Attribute name: "<< padPtr.attributes[i].first << endl;
        if (padPtr.attributes[i].first == "padstackDefRef") {
            padStackDefRef = padPtr.attributes[i].second;
        }
    }

    for(size_t i = 0; i < padPtr.children.size(); ++i) {
        // cout<<"Child name: "<< padPtr.children[i].name << endl;
        if (padPtr.children[i].name == "Xform") {
            xForm = new IPCXForm(padPtr.children[i]);
            // xForm = new IPCXForm(padPtr.children[i]);
        }
        if (padPtr.children[i].name == "Location") {
            location = new IPCLocation(padPtr.children[i]);
        }
        if (padPtr.children[i].name == "StandardPrimitiveRef") {
            standardPrimitiveRefs = new StandardPrimitiveRefs(padPtr.children[i]);
        }
        if (padPtr.children[i].name == "PinRef") {
            pinRef = new IPCPinRef(padPtr.children[i]);
        }
    }
}


void IPCPad::IPCPadDisplay(int depth){
    string indent(depth*2, ' ');
    cout << indent << "Pad:" << endl;
    cout << indent << "  padStackDefRef: " << padStackDefRef << endl;
}

string IPCPad::toXML(int indent){
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Pad padstackDefRef=\"" << padStackDefRef << "\">\n";
    // oss << xForm.toXML(indent + 4);
    if(xForm) {
        oss << xForm->toXML(indent + 4);
    }
    if(location) {
        oss << location->toXML(indent + 4);
    }
    if(standardPrimitiveRefs) {
        oss << standardPrimitiveRefs->toXML(indent + 4);
    }
    if(pinRef) {
        oss << pinRef->toXML(indent + 4);
    }
        oss << tab << "</Pad>\n";

    return oss.str();

}
