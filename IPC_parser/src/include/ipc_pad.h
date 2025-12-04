#ifndef IPC_PAD_H
#define IPC_PAD_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_xForm.h"
#include "ipc_location.h"
#include "ipc_feature.h"
#include "ipc_pin.h"

#include <string>


class IPCPad{

private:
std::string padStackDefRef;
IPCXForm *xForm;
IPCLocation *location;
StandardPrimitiveRefs *standardPrimitiveRefs;
IPCPinRef *pinRef;

public:
    IPCPad();
    IPCPad(TreeNode &padPtr);
    void IPCPadDisplay(int depth);
    std::string toXML(int indent);


};



#endif // IPC_PAD_H