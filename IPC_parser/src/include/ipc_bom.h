#ifndef IPC_BOM_H
#define IPC_BOM_H


// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_bom_header.h"
#include "ipc_bom_item.h"

class IPCBOM { // : public virtual GUIComponent {

private:
    std::string name;
    IPCBOMHeader *bomHeader = nullptr;
    std::vector<IPCBOMItem*> bomItems;

public:
    IPCBOM(TreeNode &bomPtr);
    void IPCBOMDisplay(int depth);
    string toXML(int depth);
    ~IPCBOM();


};



#endif // IPC_BOM_H