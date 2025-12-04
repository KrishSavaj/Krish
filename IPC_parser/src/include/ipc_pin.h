#ifndef IPC_PIN
#define IPC_PIN

// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include <string>
#include "tree_node.h"


class StandardPrimitiveRefs{ // : public virtual GUIComponent {
    private:
        std::string primitiveID;
    public:
        StandardPrimitiveRefs();
        StandardPrimitiveRefs(TreeNode &primitivePtr);
        std::string toXML(int indent);

};
class PinLocation {// : public virtual GUIComponent {   
private:
    std::string pinX;
    std::string pinY;
public:
    PinLocation(TreeNode &pinLocationPtr);
    std::string toXML(int indent);
    // void PinLocationDisplay(int depth);

};

class IPCPinRef {// : public virtual GUIComponent {
private:
    std::string pin;
    std::string componentRef;
public:
    IPCPinRef();
    IPCPinRef(TreeNode &pinRefPtr);
    std::string toXML(int indent);
    
};

class IPCPin {// : public virtual GUIComponent {
private:
    enum ElectricalType{
        ELECTRICAL,
        MECHANICAL,
        UNDEFINED,
    };
    enum PinType {
        SURFACE,
        THRU,  
        BLIND,
    };
    std::string pinNumber ;
    ElectricalType electriclType;
    PinType pinType;
    PinLocation *pinLocation;
    StandardPrimitiveRefs *standardPrimitiveRefs;

    // std::string pinOrientation;
    // std::string pinX;
    // std::string pinY;
public:
    IPCPin(TreeNode &pinPtr);
    void IPCPinDisplay(int depth);
    std::string toXML(int indent);
};


#endif // IPC_PACKAGE
