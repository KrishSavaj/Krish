#ifndef DATUM_H
#define DATUM_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp" 
#include "tree_node.h"


class IPCDatum {// : public virtual GUIComponent {

private:
    double x;
    double y;

public:
    IPCDatum(TreeNode &datumPtr);
    void IPCDatumDisplay(int depth);
    string toXML(int depth);
};

#endif