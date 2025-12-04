#ifndef IPC_SHAPES_H
#define IPC_SHAPES_H

#include "tree_node.h"
#include <vector>
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"



class IPCSLineDescGroup { // : public virtual GUIComponent {
    enum class LineDesc{

    };

private:
    double lineWidth;


    

};

class IPCShapePolyBegin  {// : public virtual GUIComponent {
    private:
    double xPosition;
    double yPosition;

    public:
    IPCShapePolyBegin(TreeNode &polyBeginPtr);
    std::string toXML(int indent);
    void IPCShapePolyBeginDisplay(int depth);

};
class IPCShapePolyStepSegment {// : public virtual GUIComponent {
    private:
    double xPosition;
    double yPosition;

    public:
    IPCShapePolyStepSegment(TreeNode &polyStepSegmentPtr);
    std::string toXML(int indent);
    void IPCShapePolyStepSegmentDisplay(int depth);
};


class IPCShapePolyCurve {// : public virtual GUIComponent {

    private:
    double xPosition;
    double yPosition;
    double centerX;
    double centerY;
    bool clockwise;

    public:
    IPCShapePolyCurve(TreeNode &polyCurvePtr);
    std::string toXML(int indent);
    void IPCShapePolyCurveDisplay(int depth);


};
class IPCShapes {// : public virtual GUIComponent {


};








class ButterflyShape : public virtual IPCShapes {
    private:
        enum class Shapes{
            ROUND,
            SQUARE
        };
        Shapes shape;
        double diameter;
        double side;
        

    public:        
        ButterflyShape(TreeNode &butterflyShapePtr);
        std::string toXML(int indent);
        void ButterflyShapeDisplay(int depth);
};


class LineDesc;  // Forward declaration
class FillDesc;  // Forward declaration

class Circle : public virtual IPCShapes {
    private:
        double diameter;
        std::vector<LineDesc*> lineDescs;
        std::vector<FillDesc*> fillDescs;
        // IPCSLineDescGroup *lineDescGroup;

        
    public:
        Circle(TreeNode &circlePtr);
        std::string toXML(int indent);
        void CircleDisplay(int depth);

};
class Polygon : public virtual IPCShapes {
    private:
        IPCShapePolyBegin *polyBegin;
        std::vector<IPCShapePolyStepSegment*> polyStepSegments;
        std::vector<IPCShapePolyCurve*> polyCurves;
    public:
        Polygon(TreeNode &polygonPtr);
        std::string toXML(int indent);
        void PolygonDisplay(int depth);    

};

class Cutout : public virtual IPCShapes {
    private:
        IPCShapePolyBegin *polyBegin;
        std::vector<IPCShapePolyStepSegment*> polyStepSegments;
        std::vector<IPCShapePolyCurve*> polyCurves;

    public:
        Cutout(TreeNode &cutoutPtr);
        std::string toXML(int indent);
        void CutoutDisplay(int depth);      

};
        // IPCSLineDescGroup *lineDescGroup;
class Contour : public virtual IPCShapes {
    private:
        Polygon *polygon;
        std::vector<Cutout*> cutouts;

    public:
        Contour(TreeNode &contourPtr);
        std::string toXML(int indent);
        void ContourDisplay(int depth);
    
};


class Diamond : public virtual IPCShapes{

    private:
        double width;
        double height;

    public:
    
        Diamond(TreeNode &contourPtr);
        std::string toXML(int depth);
        void DiamondDisplay(int depth);




};

class Donut : public virtual   IPCShapes{
    
    private:
        enum class DonutShape{
            ROUND,
            SQUARE,
            HEXAGON,
            OCTAGON
        };
        DonutShape shape;
        double outerDiameter;
        double innerDiameter;

    public:
        Donut(TreeNode &donutPtr);
        std::string toXML(int indent);
        void DonutDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;

};

class Ellipse : public virtual IPCShapes {
    private:
        double width;
        double height;

    public:
        Ellipse(TreeNode &ellipsePtr);
        std::string toXML(int indent);
        void EllipseDisplay(int depth);


};


class Hexagon : public virtual IPCShapes {
    private:
        double length;

    public:
        Hexagon(TreeNode &hexagonPtr);
        std::string toXML(int indent);
        void HexagonDisplay(int depth);

        // IPCSLineDescGroup *lineDescGroup;
};

class Moire : public virtual IPCShapes {
    private:
        double diameter;
        double ringWidth;
        double ringGap;
        int ringNumber;
        double lineWidth;
        double lineLength;
        double lineAngle;

    public:
        Moire(TreeNode &moirePtr);
        std::string toXML(int indent);
        void MoireDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;


};


class Octagon : public virtual IPCShapes {
    private:
        double length;

    public:
        Octagon(TreeNode &octagonPtr);
        std::string toXML(int indent);
        void OctagonDisplay(int depth);

};


class Oval : public virtual IPCShapes {

    private:
        double width;
        double height;

    public:
        Oval(TreeNode &ovalPtr);
        std::string toXML(int indent);
        void OvalDisplay(int depth);

 };


 class RectCenter : public virtual IPCShapes {
    private:
        double width;
        double height;
    public:
        RectCenter(TreeNode &rectCenterPtr);
        std::string toXML(int indent);
        void RectCenterDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;
 }; 

class RectCham : public virtual IPCShapes {


    private:
        double width;
        double height;
        double chamfer;
        bool upperRight;
        bool upperLeft;
        bool lowerRight;
        bool lowerLeft;

    public:
        RectCham(TreeNode &rectChamPtr);
        std::string toXML(int indent);
        void RectChamDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;
    
};

class RectCorner : public virtual IPCShapes {

    private:
        bool lowerLeftX;
        bool lowerLeftY;
        bool upperRightX;
        bool upperRightY;

    public:
        RectCorner(TreeNode &rectCornerPtr);
        std::string toXML(int indent);
        void RectCornerDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;

    

};


class RectRound : public virtual IPCShapes {

    private:
        double width;
        double height;
        double radius;
        bool upperRight;
        bool upperLeft;
        bool lowerRight;
        bool lowerLeft;
    public:
        RectRound(TreeNode &rectRoundPtr);
        std::string toXML(int indent);
        void RectRoundDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;

};


class Thermal : public virtual IPCShapes {
    private:
        enum class ThermalShape{
            ROUND,
            SQUARE,
            HEXAGON,
            OCTAGON
        };
        ThermalShape shape;
        double outerDiameter;
        double innerDiameter;
        int spokeCount;
        double gap;
        double spokeStartAngle;

    public: 
        Thermal(TreeNode &thermalPtr);
        std::string toXML(int indent);
        void ThermalDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;
};

class Triangle : public virtual IPCShapes {
    private:
        double base;
        double height;
    public:
        Triangle(TreeNode &trianglePtr);
        std::string toXML(int indent);
        void TriangleDisplay(int depth);
        // IPCSLineDescGroup *lineDescGroup;
};





#endif // IPC_SHAPES_H