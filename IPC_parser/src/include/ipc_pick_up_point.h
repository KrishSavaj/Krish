#ifndef IPC_PICK_UP_POINT_H
#define IPC_PICK_UP_POINT_H


// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include <string>
#include <vector>


class IPCPickUpPoint {// : public virtual GUIComponent {
    private:

        double x;
        double y;
    public:
        IPCPickUpPoint();
        IPCPickUpPoint(TreeNode &pickUpPointPtr);
        std::string toXML(int indent);
        void IPCPickUpPointDisplay(int depth);
        
};






#endif // IPC_PICK_UP_POINT_H