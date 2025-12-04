#ifndef IPC_CONTENT_H
#define IPC_CONTENT_H


#include "tree_node.h"
#include "ipc_dictionary_fillDesc.h"
#include "ipc_dictionary_lineDesc.h"
#include "ipc_dictionary_user.h"
#include "ipc_dictionary_color.h"
#include "ipc_line.h"
// #include "ipc_dictionary_font.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 



class FunctionMode{ // : public virtual GUIComponent {
    private:
        std::string mode;
        unsigned int level;
        std::string comment;

    public:
        FunctionMode();
        FunctionMode(TreeNode &functionModePtr);
        // void FunctionModeDisplay(int depth);
        std::string toXML(int indent);
};

class StepRef {// : public virtual GUIComponent {
    private:
        std::string stepName;
        // std::string stepRef;

    public:
        StepRef(TreeNode &stepRefPtr);
        // void StepRefDisplay(int depth);
        std::string toXML(int indent);
};

class LayerRef {// : public virtual GUIComponent {
    private:
        std::string layerName;

    public:
        LayerRef(TreeNode &layerRefPtr);
        // void LayerRefDisplay(int depth);
        std::string toXML(int indent);
};

class BomRef {// : public virtual GUIComponent {
    private:
        std::string bomName;
    public:
        BomRef(TreeNode &bomRefPtr);
        // void BomRefDisplay(int depth);
        std::string toXML(int indent);
};

class AvlRef {// : public virtual GUIComponent {
    private:
        std::string avlName;
    public:
        AvlRef();
        AvlRef(TreeNode &avlRefPtr);
        std::string toXML(int indent);
        // void AvlRefDisplay(int depth);
};

class EntryStandard {// : public virtual GUIComponent {
    private:
        std::string entryId;
        std::vector<RectRound*> rectRounds;
        std::vector<Circle*> circles;
    public:
        EntryStandard(TreeNode &entryStandardPtr);
        std::string toXML(int indent);
        // void EntryStandardDisplay(int depth);
};
class DictionaryStandard {// : public virtual GUIComponent {
    private:
        enum class Unit {
        INCH,
        MILLIMETER,
        CENTIMETER
    };
        Unit units;
        std::vector<EntryStandard*> entryStandards;

    public:
        DictionaryStandard(TreeNode &dictionaryStandardPtr);
        std::string toXML(int indent);
        // void DictionaryStandardDisplay(int depth);


};

class IPCContent { // : public virtual GUIComponent {
    private:
        std::string roleRef;
        FunctionMode* functionModePt; 
        std::vector<StepRef*> stepPt; 
        std::vector<LayerRef*> layerRefs;
        std::vector<BomRef*> bomRefs; 
        AvlRef* avlRefPt;
        DictionaryColor* ColorDict;
        IPCDictionryFillDesc* FillDesc;
        IPCLineDesc* LineDesc;
        DictionaryStandard* StandardDict;
        IPCDictionaryUser* UserDict;

    public:
        IPCContent(TreeNode &contentPtr);
        // void IPCContentDisplay(int depth);
        std::string toXML(int indent);
        void addFunctionMode(TreeNode &functionModePtr);
        void addStepRef(TreeNode &stepRefPtr);
        void addLayerRef(TreeNode &layerRefPtr);
        void addDictionaryFillDesc(TreeNode &dictionaryFillDescPtr);
        void addBomRef(TreeNode &bomRefPtr);
        void addAvlRef(TreeNode &avlRefPtr);
        void addDictionaryStandard(TreeNode &dictionaryStandardPtr);
        void addDictionaryUser(TreeNode &dictionaryUserPtr);
        void addDictionaryColor(TreeNode &dictionaryColorPtr);
        void addDictionaryLineDesc(TreeNode &dictionaryStandardPtr);
        
        // void addDictionaryUser(TreeNode &dictionaryStandardPtr);
};

#endif // IPC_CONTENT_H