#ifndef CAD_HEADER_H
#define CAD_HEADER_H

#include <iostream>
#include <string>
#include "tree_node.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
// #include "ecad.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"

class IPCCadHeader { // : public virtual GUIComponent
    private:
    enum class Unit {
        INCH,
        MILLIMETER,
        CENTIMETER
    };
        Unit units;
        // std::string units;
    public:
        IPCCadHeader(TreeNode &cadHeaderPtr);

        // IPCCadHeader(string units);

        void addCadHeaderData(TreeNode &EcadTree);

        void cadHeaderDisplay(int depth);
        std::string toXML(int indent);
    };

#endif 