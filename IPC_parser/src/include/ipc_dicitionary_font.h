#ifndef IPC_DICTIONAY_FONT_H
#define IPC_DICTIONAY_FONT_H

#include "tree_node.h"
#include "ipc_shapes.h"
#include "ipc_dictionary_user.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"

class Glyph {// : public virtual GUIComponent {
    private:
        int charCode;
        double lowerleftX;
        double lowerleftY;
        double upperrightX;
        double upperrightY;
       
        vector<Arc*> arcs;
        vector<Line*> lines;
        vector<Outline*> outlines;
        vector<PolyLine*> polyLines;

    public:
        Glyph(TreeNode &glyphPtr);
        std::string toXML(int indent);
        void GlyphDisplay(int depth);

};
class FontDefEmbedded{
    private:
        std::string name;
        vector<Glyph*> glyphs;



    public:        
        FontDefEmbedded(TreeNode &fontDefPtr);
        std::string toXML(int indent);
        void FontDefEmbeddedDisplay(int depth);

};

class FontDefExternal {
    private:
        vector<string*> names;
        std::string urn;       
    public:
        FontDefExternal(TreeNode &fontDefPtr);
        std::string toXML(int indent);
        void FontDefExternalDisplay(int depth);

        
};

class EntryFont {// : public virtual GUIComponent {
    private:
        std::string fontID;
        int fontsize;
    public:
        EntryFont(TreeNode &entryFontPtr);
        std::string toXML(int indent);
        void EntryFontDisplay(int depth);

        
};

class IPCDicitionaryFont {// : public virtual GUIComponent {
    private:
        enum class Units{
            MILLIMETER,
            MICRON,
            INCH
        };
        Units unit;
    public:
        IPCDicitionaryFont(TreeNode &ipcDictionaryFontPtr);
        std::string toXML(int indent);
        void IPCDicitionaryFontDisplay(int depth);
};


#endif // IPC_DICTIONAY_FONT_H