#ifndef     IPC_DICTIONAY_COLOR_H
#define     IPC_DICTIONAY_COLOR_H


#include "tree_node.h"
#include "ipc_shapes.h"
#include "ipc_dictionary_user.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"

class Color{
    private:
        int red;
        int green;
        int blue;
    public:
        Color(TreeNode &colorPtr);
        std::string toXML(int indent);
        void ColorDisplay(int depth);  
};

class ColorRef{

    private:
        std::string id;
    public:
        ColorRef(TreeNode &colorRefPtr);
        std::string toXML(int indent);
        void ColorRefDisplay(int depth);    
};



class EntryColor{
    private:
        std::string id;
        vector<Color*> colors;
    public:
        EntryColor(TreeNode &entryColorPtr);
        std::string toXML(int indent);
        void EntryColorDisplay(int depth);
};

class DictionaryColor{ // : public virtual GUIComponent {

    private:
        vector<EntryColor*> entryColors;
    public:
        DictionaryColor(TreeNode &dictionaryColorPtr);
        std::string toXML(int indent);
        void DictionaryColorDisplay(int depth);  
};




#endif // IPC_DICTIONAY_COLOR_H