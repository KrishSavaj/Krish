#ifndef IPC_PADSTACK_H
#define IPC_PADSTACK_H

#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"


class IPCPadStack{ // : public virtual GUIComponent {
    private:
        std::string padstackName;
        std::string holeSize;
        std::string shape;
        std::string sizeX;
        std::string sizeY;
        std::string rotation;
        std::string offsetX;
        std::string offsetY;
        std::string plating;
        std::string antiPadSizeX;
        std::string antiPadSizeY;
        std::string antiPadShape;
        std::string solderMaskExpansion;

    public:
        IPCPadStack(TreeNode &padStackPtr);
        std::string toXML(int indent);
        // void IPCPadStackDisplay(int depth);
};


#endif // IPC_PADSTACK_H