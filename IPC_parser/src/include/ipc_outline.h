#ifndef IPC_OUTLINE_H
#define IPC_OUTLINE_H

// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "tree_node.h"
#include "ipc_polygon.h"
#include "ipc_line.h"
#include <vector>
#include <string>

// class IPCLineDescRef{
// private:
//     std::string id;
// public:
//     IPCLineDescRef();
//     IPCLineDescRef(TreeNode &lineDescRefPtr);
//     std::string toXML(int indent);

    
// };

class IPCOutline{
private:
    /* data */
    std::vector<IPCPolygon*> polygons;
    IPCLineDescRef lineDescRef;


public:

    IPCOutline();
    IPCOutline(TreeNode &outlinePtr);
    void IPCOutlineDisplay(int depth);
    std::string toXML(int indent);
    // void addIPCLayer(TreeNode &outlinePtr);
    // void addIPCStep(TreeNode &outlinePtr);
    // void addIPCRules(TreeNode &outlinePtr);
    // void addIPCRulesCheck(TreeNode &outlinePtr);
};


#endif