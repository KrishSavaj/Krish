#ifndef IPC_LAYER_FEATURE
#define IPC_LAYER_FEATURE



// #include "../../../PCBBaseline/include/GUIComponent.h" 
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"
#include "ipc_set.h"




class IPCLayerFeature { // : public virtual GUIComponent
    private:
        std::string layerRef;
        std::vector<IPCSet*> sets;
        

    public:
        IPCLayerFeature(TreeNode &layerPtr);
        void IPCLayerFeatureDisplay(int depth);
        std::string toXML(int indent);


}; 

#endif