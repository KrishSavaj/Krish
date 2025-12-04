#ifndef IPC_DICTIONAY_LINE_DESC_H
#define IPC_DICTIONAY_LINE_DESC_H

#include "tree_node.h"
#include <vector>
#include "ipc_shapes.h"
#include "ipc_dictionary_user.h"
#include "ipc_line.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"


// class LineDesc{
//     private:
//         enum class LineEnd{
//             ROUND,
//             SQUARE,
//             NONE
//         };
//         enum class LineProperty{
//             SOLID,
//             DOTTED,
//             DASHED,
//             CENTER,
//             PHANTOM,
//             ERASE
//         };

//         LineEnd lineEnd;
//         LineProperty lineProperty;
//         double lineWidth;
//     public: 
//         LineDesc(TreeNode &lineDescPtr);
//         std::string toXML(int indent);
//         void LineDescDisplay(int depth);

// };

class LineDescRef{
    private:
        std::string lineDescID;
    public:
        LineDescRef(TreeNode &lineDescRefPtr);
        std::string toXML(int indent);
        void LineDescRefDisplay(int depth);
};
class EntryLineDesc{
    private:
        std::string id;
        std::vector<LineDesc*> lineDescs;
    public:
        EntryLineDesc(TreeNode &entryLineDescPtr);
        std::string toXML(int indent);
        void EntryLineDescDisplay(int depth);     
};

class IPCLineDesc {// : public virtual GUIComponent {
    private:
        enum class Units{
            MILLIMETER,
            MICRON,
            INCH
        };
        Units unit;
        std::vector<EntryLineDesc*> entryLineDescs;
    public:
        IPCLineDesc();
        IPCLineDesc(TreeNode &lineDescPtr);
        std::string toXML(int indent);
        void LineDescDisplay(int depth);     
};
#endif// IPC_DICTIONAY_LINE_DESC_H