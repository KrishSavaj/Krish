
#ifndef IPC_DICTIONAY_USER_H
#define IPC_DICTIONAY_USER_H


#include "tree_node.h"
#include <vector>
#include "ipc_shapes.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"





class Arc {// : public virtual GUIComponent {
    private:
        double startX;
        double startY;
        double endX;
        double endY;
        double centerX;
        double centerY;
        bool clockwise;
    
        public:
        Arc(TreeNode &arcPtr);
        std::string toXML(int indent);
        void ArcDisplay(int depth);
};

class Line {// : public virtual GUIComponent {

    private:
        double startX;
        double startY;
        double endX;
        double endY;
    public:
        Line(TreeNode &linePtr);
        std::string toXML(int indent);
        void LineDisplay(int depth);

};

class Outline {// : public virtual GUIComponent {

    private:
        std::vector<Polygon*> polygons;

    public:
        Outline(TreeNode &outlinePtr);
        std::string toXML(int indent);
        void OutlineDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;



};


class PolyLine {
    private:
        IPCShapePolyBegin  *polyBegin;
        std::vector<IPCShapePolyStepSegment*> polyStepSegments;
        std::vector<IPCShapePolyCurve*> polyCurves;
    public:
        PolyLine(TreeNode &polyLinePtr);
        std::string toXML(int indent);
        void PolyLineDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;


};

class Text {// : public virtual GUIComponent {
    private:
        std::string text;
        int  fontsize;
};
class IPCUserSpecial;  // Forward declaration

class EntryUser {// : public virtual GUIComponent {
    private:
        std::string id;
        std::vector<IPCUserSpecial*> userSpecials;

    public:
        EntryUser(TreeNode &entryUserPtr);
        std::string toXML(int indent);
        void EntryUserDisplay(int depth);
};


class IPCDictionaryUser {// : public virtual GUIComponent {
    private:
        enum class Units{
            MILLIMETER,
            MICRON,
            INCH
        };

        Units units;
        std::vector<EntryUser*> entryUsers;
    public:
        IPCDictionaryUser();
        IPCDictionaryUser(TreeNode &userDictPtr);
        std::string toXML(int indent);
        void IPCDictionaryUserDisplay(int depth);
    };




#endif // IPC_SHAPES_H