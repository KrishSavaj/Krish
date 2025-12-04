#ifndef IPC_USER_SPECIAL_H
#define IPC_USER_SPECIAL_H

#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "ipc_line.h"
#include  "ipc_polyline.h"
#include "ipc_shapes.h"

class IPCUserSpecial {// : public virtual GUIComponent {
    private:
    //    vector<IPCLine*> lines;
    //    vector<IPCUserSpecial*> userSpecials;
    //    vector<IPCPolyline*> polylines;
        // std::vector<std::unique_ptr<IPCLine>> lines;
        // std::vector<std::unique_ptr<IPCUserSpecial>> userSpecials;
        // std::vector<std::unique_ptr<IPCPolyline>> polylines;

       std::vector<IPCLine*> lines;
       std::vector<IPCUserSpecial*> userSpecials;
       std::vector<IPCPolyline*> polylines;
       std::vector<Circle*> circles;
    public:
        IPCUserSpecial(TreeNode &userSpecialPtr);
        std::string toXML(int indent);
        void IPCUserSpecialDisplay(int depth);
        // ~IPCUserSpecial();
        
};




#endif // IPC_USER_SPECIAL_H