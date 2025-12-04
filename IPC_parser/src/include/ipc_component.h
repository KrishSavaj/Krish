
#ifndef IPC_COMPONENT_H
#define IPC_COMPONENT_H

// #include "../../../PCBBaseline/include/PCBComponent.h"       
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "tree_node.h"
#include "ipc_xForm.h"
#include "ipc_location.h"      
// #include "../../PCBBaseline/include/attribute.h"          

// using namespace PCBDesign;
using namespace std;


// class ComponentXform:   public virtual GUIComponent {   
// private:
//     string rotation;    
// public:
//     ComponentXform(TreeNode &xformPtr);
//     std::string toXML(int indent);
//     void ComponentXformDisplay(int depth);
// };

// class IPCcomponent : public PCBComponent, public virtual GUIComponent {
class IPCcomponent {// : public virtual GUIComponent {
private:
    string refDes;
    string packageRef;
    string layerRef;
    string part; 
    string mountType;
    float xPosition;   
    float yPosition; 
    IPCXForm *xform; 
    IPCLocation *location;



public:
    
    IPCcomponent(TreeNode &ComponentPtr);
    void IPCcomponentDisplay(int depth);
    std::string toXML(int indent);
};

#endif 