#ifndef IPC_POLYLINE
#define IPC_POLYLINE


// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_polygon.h"
#include "ipc_line.h"
#include <vector>
#include <string>





class IPCPolyline {// : public virtual GUIComponent {
    private:
        PolyBegin* begin;
        std::vector<PolyStepSegment*> steps;
        IPCLineDescRef* lineDescRef;

    public:
        IPCPolyline(TreeNode &polylinePtr);
        std::string toXML(int indent);
        void IPCPolylineDisplay(int depth);
        
};


#endif // IPC_POLYLINE_H