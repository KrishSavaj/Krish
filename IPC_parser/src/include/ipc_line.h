#ifndef IPC_LINE
#define IPC_LINE

#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include <string>

class LineDesc{
    private:
        enum class LineEnd{
            ROUND,
            SQUARE,
            NONE
        };
        enum class LineProperty{
            SOLID,
            DOTTED,
            DASHED,
            CENTER,
            PHANTOM,
            ERASE
        };

        LineEnd lineEnd;
        LineProperty lineProperty;
        double lineWidth;
        bool hasLineProperty; // Track if lineProperty was explicitly set
    public:
        LineDesc();
        LineDesc(TreeNode &lineDescPtr);
        std::string toXML(int indent);
        void LineDescDisplay(int depth);

};

class IPCLineDescRef {
    private:
        std::string id;
    public:
        IPCLineDescRef();
        IPCLineDescRef(TreeNode &lineDescRefPtr);
        std::string toXML(int indent);
};

class IPCLine {
    private:
        enum LineEnd {
            NONE,
            ROUND,
        };

        double startX;
        double startY;
        double endX;
        double endY;
        LineDesc* lineDesc;
        IPCLineDescRef* lineDescRef;

    public:
        
        IPCLine(TreeNode &linePtr);
        
        void IPCLineDisplay(int depth);
        std::string toXML(int indent);
};


#endif // IPC_LINE_H