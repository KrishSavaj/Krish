#ifndef IPC_DICTIONAY_FILL_DESC_H
#define IPC_DICTIONAY_FILL_DESC_H


#include "tree_node.h"
#include <vector>
#include "ipc_shapes.h"
#include "ipc_dictionary_user.h"
#include "ipc_dictionary_color.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"

class ColorGroup{
    private:
        std::string name;
        std::string color;
        ColorRef colorrefs;
        
    public:
        ColorGroup(TreeNode &colorGroupPtr);
        std::string toXML(int indent);
        void ColorGroupDisplay(int depth);  
};

class FillDesc{
    private:
        enum class fillPropertyType{
            HOLLOW,
            HATCH,
            MESH,
            FILL,
            VOID
        };
        fillPropertyType fillProperty;
        double lineWidth;
        double pitch1;
        double pitch2;
        double angle1;
        double angle2;


    public: 
        FillDesc(TreeNode &fillDescPtr);
        std::string toXML(int indent);
        void FillDescDisplay(int depth);
};

class FillDescRef{
    private:
        std::string fillDescID;
    public: 

        FillDescRef(TreeNode &fillDescRefPtr);
        std::string toXML(int indent);
        void FillDescRefDisplay(int depth);

};

class EntryFillDesc{
    private:

        std::string id;
        std::vector<FillDesc*> fillDescs;
    public:
        EntryFillDesc(TreeNode &entryFillDescPtr);
        std::string toXML(int indent);
        void EntryFillDescDisplay(int depth);

};
class IPCDictionryFillDesc{

    private:
        enum class Units{
            MILLIMETER,
            MICRON,
            INCH
        };
        Units unit;
        std::vector<EntryFillDesc*> entryFillDescs;
    public: 
        IPCDictionryFillDesc();
        IPCDictionryFillDesc(TreeNode &fillDescPtr);    
        std::string toXML(int indent);
        void FillDescDisplay(int depth);

};




#endif