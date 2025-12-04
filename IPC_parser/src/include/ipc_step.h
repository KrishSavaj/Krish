#ifndef IPC_STEP_H
#define IPC_STEP_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "tree_node.h"
#include "ipc_component.h"
#include "ipc_datum.h"
#include "ipc_package.h"
#include "ipc_layer_feature.h"
#include "ipc_nonStandardAtrribute.h"
#include "ipc_profile.h"
#include "ipc_padstackdef.h"

class IPCStep {// : public virtual GUIComponent {

private:
    std::string name;
    std::string type;
    std::string stackupRef;
    std::vector<IPCcomponent*> components;
    std::vector<IPCPackage*> ipcPackages;
    std::vector<IPCLayerFeature*> layerFeatures;
    std::vector<IPCNonStandardAttribute*> nonStandardAttributes;
    std::vector<IPCPadStackDef*> padStackDefs;
    IPCProfile *profile = nullptr;

    IPCDatum *datum = nullptr;

public:
    IPCStep(TreeNode &stepPtr);
    void IPCStepDisplay(int depth);
    void addIPCComponent(TreeNode &StepPtr);
    void addIPCDatum(TreeNode &StepPtr);
    void addIPCPackages(TreeNode &StepPtr);
    void addIPCLayerFeature(TreeNode &StepPtr);
    void addIPCNonStandardAttribute(TreeNode &StepPtr);
    void addIPCProfile(TreeNode &StepPtr);
    void addIPCPadStackDef(TreeNode &StepPtr);
    std::string toXML(int indent);

};
#endif 