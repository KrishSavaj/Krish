#ifndef IPC_POLYGON
#define IPC_POLYGON

// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/Coordinate.h"
#include "tree_node.h"
#include <vector>
#include <string>

using PCBDesign::Coordinate;
class PolyBegin {
    public:
        float x;  
        float y;  
        PolyBegin(float x = 0.0, float y = 0.0);
        void polyBeginDisplay(int depth);
        std::string toXML(int indent);
    };
class PolyStepSegment {  
        
    public:
        float x;  
        float y;  
    
        PolyStepSegment(float x = 0.0, float y = 0.0);
        void polyStepSegmentDisplay(int depth);
        std::string toXML(int indent);
};

class PolyStepCurve {  
        
    private:
        double x;  
        double y;  
        double centreX; 
        double centreY;
        bool clockwise;
    public:

        PolyStepCurve(double x = 0.0, double y = 0.0, double centreX = 0.0, double centreY = 0.0,bool clockwise = true);
        void polyStepCurveDisplay(int depth);
        std::string toXML(int indent);
};

class IPCFillDescRef {
    private:
            enum class fillPropertyType{
            HOLLOW,
            HATCH,
            MESH,
            FILL,
            VOID
        };
        fillPropertyType id;
    public:
        IPCFillDescRef();
        IPCFillDescRef(TreeNode &fillDescRefPtr);
        std::string toXML(int indent);

};

class IPCPolygon {// : public virtual GUIComponent, public virtual Coordinate {

private:

    PolyBegin* begin;  
    std::vector<PolyStepSegment*> steps;
    std::vector<PolyStepCurve*> curves;
    IPCFillDescRef fillDescRef; 
public:



    IPCPolygon(float x = 0.0, float y = 0.0);
    IPCPolygon(TreeNode &polygonPtr, float x, float y);
    void addPolygonElement(TreeNode  &polygonPtr);
    void polygonDisplay(int depth);
    std::string toXML(int indent);


};

class IPCCutout {// : public virtual GUIComponent {

private:
    PolyBegin* begin = nullptr;
    std::vector<PolyStepSegment*> steps;
    std::vector<PolyStepCurve*> curves;

public :
    IPCCutout();
    IPCCutout(TreeNode &cutoutPtr);
    // void addCutoutElement(TreeNode  &cutoutPtr);
    void cutoutDisplay(int depth);
    std::string toXML(int indent);

};



#endif // IPC_POLYGON