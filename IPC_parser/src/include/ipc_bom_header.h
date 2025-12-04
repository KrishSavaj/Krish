#ifndef IPC_BOM_HEADER_H
#define IPC_BOM_HEADER_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"

class stepRef {

private:
    std::string name;

public:
    stepRef(TreeNode &stepRefPtr);
    string toXML(int depth);
    void display(int depth); 

};
class IPCBOMHeader {// : public virtual GUIComponent 
private:
    std:: string assembly;
    std:: string revision;
    std:: string affecting;
    vector<stepRef*> stepRefs;

public:
    IPCBOMHeader(TreeNode &bomHeaderPtr);
    void IPCBOMHeaderDisplay(int depth);
    string toXML(int depth);
};




#endif // IPC_BOM_HEADER_H