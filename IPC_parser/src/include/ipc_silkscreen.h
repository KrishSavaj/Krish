#ifndef IPC_SILKSCREEN_H
#define IPC_SILKSCREEN_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_marking.h"


class IPCSilkscreen{
    private:
        IPCMarking* marking;
    public:
        IPCSilkscreen();
        IPCSilkscreen(TreeNode &silkscreenPtr);
        std::string toXML(int indent);
        void silkscreenDisplay(int depth);
        ~IPCSilkscreen();
};




#endif // IPC_SILKSCREEN_H