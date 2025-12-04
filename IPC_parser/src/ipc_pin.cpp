#include <sstream>
#include "./include/ipc_pin.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
using namespace std;

PinLocation :: PinLocation(TreeNode &pinLocationPtr) {
        pinX = pinLocationPtr.attributes[0].second;
        pinY = pinLocationPtr.attributes[1].second;
        // addAttr("pinX", ValueType::STRING, &pinX, false);
        // addAttr("pinY", ValueType::STRING, &pinY, false);
}
StandardPrimitiveRefs :: StandardPrimitiveRefs() {
    primitiveID = "";
    // addAttr("primitiveID", ValueType::STRING, &primitiveID, false);
}

StandardPrimitiveRefs :: StandardPrimitiveRefs(TreeNode &primitivePtr) {
    primitiveID = primitivePtr.attributes[0].second;
    // addAttr("primitiveID", ValueType::STRING, &primitiveID, false);
}

IPCPinRef :: IPCPinRef() {
    pin = "";
    componentRef = "";
    // addAttr("pin", ValueType::STRING, &pin, false);
    // addAttr("componentRef", ValueType::STRING, &componentRef, false);
}


IPCPinRef :: IPCPinRef(TreeNode &pinRefPtr) {
    
    for(size_t i = 0; i < pinRefPtr.attributes.size(); ++i) {
        if (pinRefPtr.attributes[i].first == "pin") {
            pin = pinRefPtr.attributes[i].second;
        }
        if (pinRefPtr.attributes[i].first == "componentRef") {
            componentRef = pinRefPtr.attributes[i].second;
        }
    }
    // addAttr("pin", ValueType::STRING, &pin, false);
    // addAttr("componentRef", ValueType::STRING, &componentRef, false);
}



IPCPin :: IPCPin(TreeNode &pinPtr){

    pinNumber  = pinPtr.attributes[0].second;
    electriclType = magic_enum::enum_cast<ElectricalType>(pinPtr.attributes[1].second).value_or(ElectricalType::ELECTRICAL);
    pinType = magic_enum::enum_cast<PinType>(pinPtr.attributes[2].second).value_or(PinType::SURFACE);
    
    // string ElectricalTypeStr = string(magic_enum::enum_name(electriclType));
    // addAttr("ElectricalType", ValueType :: STRING, &ElectricalTypeStr, false);
    
    // string pinTypeStr = string(magic_enum::enum_name(pinType));
    // addAttr("pinType", ValueType :: STRING, &pinTypeStr, false);

    pinLocation = nullptr;
    standardPrimitiveRefs = nullptr;
    for (size_t i = 0; i < pinPtr.children.size(); i++) {
        if (pinPtr.children[i].name == "Location") {
            pinLocation = new PinLocation(pinPtr.children[i]);
        }
        if (pinPtr.children[i].name == "StandardPrimitiveRef") {
            standardPrimitiveRefs = new StandardPrimitiveRefs(pinPtr.children[i]);
        }
    }
    
}

void IPCPin::IPCPinDisplay(int depth){
    string indent(depth * 3, ' ');
    cout <<indent<< " Pin [";
    cout << " Number: "<<pinNumber;
    cout << " electricalType: "<< magic_enum::enum_name(electriclType);
    cout << " type: " <<magic_enum::enum_name(pinType) <<" ]"<<endl;

}

string PinLocation::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;  
    oss << tab << "<Location "
        << "x=\"" << pinX << "\" "
        << "y=\"" << pinY << "\"/>\n";
    // cout << oss.str();
    return oss.str();
}



string StandardPrimitiveRefs::toXML(int indent) {

    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<StandardPrimitiveRef id=\"" << primitiveID << "\"/>\n";
    // cout << oss.str();
    return oss.str();
}


string IPCPinRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<PinRef "
        << "pin=\"" << pin << "\" "
        << "componentRef=\"" << componentRef << "\"/>\n";
    return oss.str();
}


string IPCPin::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Pin "
        << "number=\"" << pinNumber << "\" "
        << "electricalType=\"" << magic_enum::enum_name(electriclType) << "\" "
        << "type=\"" << magic_enum::enum_name(pinType) << "\">\n";
    if (pinLocation) {
        oss << pinLocation->toXML(indent + 4);
    }
    if (standardPrimitiveRefs) {
        oss << standardPrimitiveRefs->toXML(indent + 4);
    }
        oss << tab << "</Pin>\n"; 

    // cout << oss.str();
    return oss.str();
}

