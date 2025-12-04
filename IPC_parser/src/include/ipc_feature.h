#ifndef IPC_FEATUR_H
#define IPC_FEATUR_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_user_special.h"
#include "ipc_location.h"
#include "ipc_line.h"
#include "ipc_user_primitive_ref.h"
#include <string>
#include <vector>



class IPCFeature {
   private:
    std::vector<IPCUserSpecial*> userSpecials;
    std::vector<IPCLocation*> locations;
    std::vector<IPCLine*> lines;
    std::vector<IPCUserPrimitiveRef*> userPrimitiveRefs;
   public:
    IPCFeature();
    IPCFeature(TreeNode &featurePtr);
    void IPCFeatureDisplay(int depth);
    std::string toXML(int indent);
};

#endif // IPC_FEATUR_H