#ifndef IPC_XFORM_H
#define IPC_XFORM_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include <string>
#include <vector>

class IPCXForm {
   private:
    double rotation;


   public:
    IPCXForm(double rotation = 0.0);
    IPCXForm(TreeNode &xformPtr);
    std::string toXML(int indent);
    void IPCXFormDisplay(int depth);
};


#endif // IPC_XFORM_H