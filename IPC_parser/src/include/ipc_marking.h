#ifndef IPC_MARKING
#define IPC_MARKING

#include "tree_node.h"
#include "ipc_line.h"
#include "ipc_user_special.h"
#include "ipc_location.h"
#include "ipc_user_primitive_ref.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include <string>
#include <vector>

class IPCMarking {// : public virtual GUIComponent {
    private:
        std::string markingUsage;
        std::vector<IPCLocation*> locations;
        std::vector<IPCUserPrimitiveRef*> userPrimitiveRefs;
        std::vector<IPCUserSpecial*> userSpecials;

    public:
        IPCMarking(TreeNode &markingPtr);
        void IPCMarkingDisplay(int depth);
        void addUSerSpecials(TreeNode &markingPtr);
        std::string toXML(int indent);

};

#endif