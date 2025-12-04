#ifndef IPC_PADSTACKDEF_H
#define IPC_PADSTACKDEF_H

#include <string>
#include <vector>
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_xForm.h"
#include "ipc_location.h"
#include "ipc_pin.h"


enum class PlattingStatus {
    PLATED,
    NONPLATED,
    VIA
};

enum class PadUseType {
    REGULAR,
    ANTIPAD,
    THERMAL,
    OTHER
};

class PadstackHoleDef{
    private:
    std::string name;
    unsigned int diameter;
    unsigned int minusTol;
    
    double x;
    double y;

    public:
        PadstackHoleDef(TreeNode &padstackHoleDefPtr);
        std::string toXML(int indent);
};

class PadstackPadDef{
    private:
    std::string layerRef;
    PadUseType padUse;
    std::string comment;
    PlattingStatus plattingStatus;
    IPCLocation *location = nullptr;
    IPCXForm *xForm = nullptr;
    StandardPrimitiveRefs *standardPrimitiveRefs = nullptr;
    
    bool hasPadUse = false;
    bool hasPlattingStatus = false;

    public:
        PadstackPadDef(TreeNode &padstackPadDefPtr);
        std::string toXML(int indent);
};



class IPCPadStackDef {
private:
    std::string name;
    std::vector<PadstackHoleDef*> padstackHoleDefs;
    std::vector<PadstackPadDef*> padstackPadDefs;
public:
    IPCPadStackDef(TreeNode &padStackDefPtr);
    std::string toXML(int indent);
};
#endif