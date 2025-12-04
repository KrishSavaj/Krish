
#ifndef IPC_COMPONENT_H
#define IPC_COMPONENT_H

// #include "../../../PCBBaseline/include/PCBComponent.h"       
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/BaselineBoard.h"          

using namespace PCBDesign;
using namespace std;

// class IPCcomponent : public PCBComponent, public virtual GUIComponent {
class IPCBaselineBoard : public BaselineBoard, public virtual GUIComponent {
private:
    string refDes;
    string packageRef;
    string layerRef; 
    string mountType;
    float xPosition;   
    float yPosition;   
    float rotation;  

public:
    
    IPCcomponent(string refDes, string packageRef, string layerRef, 
                 string part, string mountType, 
                 int xPosition, int yPosition, float rotation);

    void display();
};

#endif 