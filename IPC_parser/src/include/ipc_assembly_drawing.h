#ifndef IPC_ASSEMBLY_DRAWING_H
#define IPC_ASSEMBLY_DRAWING_H

#include "tree_node.h"
#include "ipc_polygon.h"
#include "ipc_marking.h"
#include "ipc_outline.h"
// #include "ipc_dictionary_fillDesc.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include <vector>
#include <string>







class IPCAssemblyDrawing {
    private:
        IPCOutline outline;
        std::vector<IPCMarking*> markings;

    public:
        IPCAssemblyDrawing(TreeNode &assemblyDrawingPtr);
        std::string toXML(int indent);
        void IPCAssemblyDrawingDisplay(int depth);
        
};

#endif // IPC_ASSEMBLY_DRAWING_H