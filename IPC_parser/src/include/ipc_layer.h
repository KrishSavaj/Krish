#ifndef IPC_LAYER
#define IPC_LAYER

// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include <string>
#include "tree_node.h"
class IPCLayer { // : public virtual GUIComponent
    private:
        std::string layerName;
        std::string layerFunction;
        std::string polarity;
        std::string side;
    public:
        IPCLayer(TreeNode &layerPtr);
        void IPCLayerDisplay(int depth);
        std::string toXML(int indent);


};

#endif
