#ifndef CAD_DATA_H
#define CAD_DATA_H

#include <vector>
#include <string>
#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
# include "ipc_layer.h"
#include "ipc_step.h"
// using namespace std;


class IPCCadData { // : public virtual GUIComponent
    private:
        std::vector<IPCLayer*> layers;
        IPCStep *step = nullptr;
    public:
        IPCCadData(TreeNode &cadDataPtr);
        void addIPCLayer(TreeNode &layer);
        void addStep(TreeNode &stepPtr);
        void cadDataDisplay(int depth);
        std::string toXML(int indent);
    };

#endif 