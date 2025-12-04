#ifndef     IPC_LOCATION
#define     IPC_LOCATION

// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"



class IPCLocation {
    private:
        double x;
        double y;

    public:
        IPCLocation(float x = 0.0, float y = 0.0);
        IPCLocation(TreeNode &locationPtr);
        std::string toXML(int indent);
        void IPCLocationDisplay(int depth);
        
};


#endif // IPC_LOCATION_H