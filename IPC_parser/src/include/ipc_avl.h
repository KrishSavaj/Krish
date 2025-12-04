#ifndef IPC_AVL_H
#define IPC_AVL_H


// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_avl_header.h"
#include "ipc_avl_item.h"

class IPCAvl{

private:
    std::string name;
    IPCAvlHeader* avlHeader=nullptr;
    vector<IPCAvlItem*> avlItems;

public:
    IPCAvl(TreeNode &avlPtr);
    string toXML(int depth);
    void display(int depth);

};



#endif // IPC_AVL_H