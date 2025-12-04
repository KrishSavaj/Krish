#ifndef IPC_PROFILE_H
#define IPC_PROFILE_H


// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include  "tree_node.h"
#include "ipc_polygon.h"


class IPCProfile {// : public virtual GUIComponent {
private:
    IPCPolygon* polygon = nullptr;
    std::vector<IPCCutout*> cutouts;
public:
    IPCProfile();
    IPCProfile(TreeNode &profilePtr);
    void profileDisplay(int depth);
    std::string toXML(int indent);


};
#endif  // IPC_PROFILE_H