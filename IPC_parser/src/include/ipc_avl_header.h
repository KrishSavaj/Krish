#ifndef IPC_AVL_HEADER_H
#define IPC_AVL_HEADER_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"

class IPCAvlHeader{

private:
    enum class ModRef {
        USERDEF,
        ASSEMBLY,
        FABRICATION,
        DESIGN,
        TEST
    };
    std::string title;
    std::string source;
    std::string date;
    int version;
    std::string comment;
    ModRef modRef;
    std::string author;

public:
    IPCAvlHeader(TreeNode &avlHeaderPtr);
    string toXML(int depth);
    void display(int depth);

};



#endif // IPC_AVL_HEADER_H