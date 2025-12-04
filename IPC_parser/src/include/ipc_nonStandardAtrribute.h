#ifndef IPC_NONSTANDARDATTRIBUTE_H
#define IPC_NONSTANDARDATTRIBUTE_H


#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"


class IPCNonStandardAttribute {// : public virtual GUIComponent {
    private:
        std::string name;
        std::string value;
        enum class Type {
            STRING,
            INTEGER,
            DOUBLE,
            BOOLEAN
        };
        Type type;

    public:
        IPCNonStandardAttribute(TreeNode &nonStandardAttributePtr);
        std::string toXML(int indent);
        void IPCNonStandardAttributeDisplay(int depth);
};




#endif // IPC_NONSTANDARDATTRIBUTE_H



