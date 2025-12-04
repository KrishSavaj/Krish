#ifndef  IPC_SET_H
#define IPC_SET_H


// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_feature.h"
#include "ipc_pad.h"
#include <string>
#include <vector>

class IPCSet {// : public virtual GUIComponent {
   private:
    std::string net;
    std::string polarity;
    std::string padUsage;
    bool testPoint;
    std::string geometry;
    bool plate;
    std::string componentRef;
    std::vector<IPCFeature*> features;
    std::vector<IPCPad*> pads;


   public:
    IPCSet();
    IPCSet(TreeNode &setPtr);
    void IPCSetDisplay(int depth);
    std::string toXML(int indent) const;

};



#endif // IPC_SET_H