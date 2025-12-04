// #include <iostream>
// #include <cmath>
// #include "Geomclass.h"
// using namespace std; 

// namespace PCBDesign {

//     // ------------------------------
//     // Implementations for Base Classes & Original Geometry
//     // ------------------------------

//     // Shape::display() default implementation.
//     void Shape::display() const {
//         std::cout << "Generic Shape" << std::endl;
//     }

//     // Point class constructor.
//     Point::Point(double x, double y) : x(x), y(y) {}

//     // Print point coordinates.
//     void Point::print() const {
//         std::cout << "(" << x << ", " << y << ")";
//     }

//     // LineSegment constructor.
//     LineSegment::LineSegment(const Point& p1, const Point& p2) : p1(p1), p2(p2) {}

//     // Calculate the Euclidean length of the line segment.
//     double LineSegment::length() const {
//         return std::sqrt(std::pow(p2.x - p1.x, 2) + std::pow(p2.y - p1.y, 2));
//     }

//     // Display line segment details.
//     void LineSegment::display() const {
//         std::cout << "Line Segment: ";
//         p1.print();
//         std::cout << " , ";
//         p2.print();
//         std::cout << ", Length: " << length() << std::endl;
//     }

//     // Rectangle constructor.
//     Rectangle::Rectangle(const LineSegment& l1, const LineSegment& l2,
//                          const LineSegment& l3, const LineSegment& l4,
//                          double width, double height)
//         : l1(l1), l2(l2), l3(l3), l4(l4), rect_width(width), rect_height(height) {}

//     // Compute rectangle width from segments.
//     double Rectangle::width() const {
//         return std::min(l1.length(), l2.length());
//     }

//     // Compute rectangle height from segments.
//     double Rectangle::height() const {
//         return std::max(l1.length(), l2.length());
//     }

//     // Display rectangle details.
//     void Rectangle::display() const {
//         std::cout << "Rectangle:" << std::endl;
//         l1.display();
//         l2.display();
//         l3.display();
//         l4.display();
//         std::cout << "Width: " << width() << ", Height: " << height() << std::endl;
//     }

//     // ------------------------------
//     // Implementations for Extended Aperture Shapes
//     // ------------------------------

//     // Circle Aperture Implementation.
//     Circle::Circle(const Point& center, double radius) : center(center), radius(radius) {}

//     void Circle::display() const {
//         std::cout << "Circle Aperture: Center ";
//         center.print();
//         std::cout << ", Radius: " << radius << std::endl;
//     }

//     // LineCenter: a centered line segment.
//     LineCenter::LineCenter(const Point& p1, const Point& p2) : LineSegment(p1, p2) {}

//     void LineCenter::display() const {
//         std::cout << "Line (Center): ";
//         p1.print();
//         std::cout << " to ";
//         p2.print();
//         std::cout << ", Length: " << length() << std::endl;
//     }

//     // LineLowerLeft: line defined with a lower left reference.
//     LineLowerLeft::LineLowerLeft(const Point& lowerLeft, const Point& other)
//         : LineSegment(lowerLeft, other) {}

//     void LineLowerLeft::display() const {
//         std::cout << "Line (Lower Left): ";
//         p1.print();
//         std::cout << " to ";
//         p2.print();
//         std::cout << ", Length: " << length() << std::endl;
//     }

//     // Outline: defined by a vector of points.
//     Outline::Outline(const std::vector<Point>& pts) : points(pts) {}

//     void Outline::display() const {
//         std::cout << "Outline: ";
//         for (const auto& pt : points) {
//             pt.print();
//             std::cout << " ";
//         }
//         std::cout << std::endl;
//     }

//     // Polygon: regular polygon with a center, number of sides, diameter, and rotation.
//     Polygon::Polygon(const Point& center, int numSides, double diameter, double rotation)
//         : center(center), numSides(numSides), diameter(diameter), rotation(rotation) {}

//     void Polygon::display() const {
//         std::cout << "Polygon Aperture: Center ";
//         center.print();
//         std::cout << ", Sides: " << numSides << ", Diameter: " << diameter 
//                   << ", Rotation: " << rotation << "°" << std::endl;
//     }

//     // Moiré Aperture: complex aperture combining concentric circles and crosshair.
//     Moire::Moire(const Point& center, double outsideDiameter, double lineThickness, double gap,
//                  int numCircles, double crossHairThickness, double crossHairLength, double rotation)
//         : center(center), outsideDiameter(outsideDiameter), lineThickness(lineThickness),
//           gap(gap), numCircles(numCircles), crossHairThickness(crossHairThickness),
//           crossHairLength(crossHairLength), rotation(rotation) {}

//     void Moire::display() const {
//         std::cout << "Moire Aperture: Center ";
//         center.print();
//         std::cout << ", Outside Diameter: " << outsideDiameter
//                   << ", Line Thickness: " << lineThickness
//                   << ", Gap: " << gap
//                   << ", Circles: " << numCircles
//                   << ", Cross Hair Thickness: " << crossHairThickness
//                   << ", Cross Hair Length: " << crossHairLength
//                   << ", Rotation: " << rotation << "°" << std::endl;
//     }

//     // Thermal Aperture: defined by outer & inner diameters and a crosshair.
//     Thermal::Thermal(const Point& center, double outsideDiameter, double insideDiameter, double crossHairThickness)
//         : center(center), outsideDiameter(outsideDiameter), insideDiameter(insideDiameter), crossHairThickness(crossHairThickness) {}

//     void Thermal::display() const {
//         std::cout << "Thermal Aperture: Center ";
//         center.print();
//         std::cout << ", Outside Diameter: " << outsideDiameter
//                   << ", Inside Diameter: " << insideDiameter
//                   << ", Cross Hair Thickness: " << crossHairThickness << std::endl;
//     }

// } // end namespace PCBDesign

// // ------------------------------
// // End of File
// // ------------------------------
#include "Geomclass.h"
#include <iostream>
#include <cmath>
#include <nlohmann/json.hpp>

namespace PCBDesign {

    // Base implementations
    void Shape::display() const {
        std::cout << "Generic Shape" << std::endl;
    }

    Point::Point(double xVal, double yVal) : x(xVal), y(yVal) {}
    void Point::print() const { std::cout << "(" << x << ", " << y << ")"; }

    LineSegment::LineSegment(const Point& p1, const Point& p2)
        : p1(p1), p2(p2) {}
    double LineSegment::length() const {
        return std::sqrt(std::pow(p2.x - p1.x, 2) + std::pow(p2.y - p1.y, 2));
    }
    void LineSegment::display() const {
        std::cout << "LineSegment: "; p1.print(); std::cout << "->"; p2.print();
        std::cout << ", length=" << length() << std::endl;
    }

    Rectangle::Rectangle(const LineSegment& l1, const LineSegment& l2,
                         const LineSegment& l3, const LineSegment& l4,
                         double w, double h)
        : l1(l1), l2(l2), l3(l3), l4(l4), rect_width(w), rect_height(h) {}
    double Rectangle::width() const { return std::min(l1.length(), l2.length()); }
    double Rectangle::height() const { return std::max(l1.length(), l2.length()); }
    void Rectangle::display() const {
        std::cout << "Rectangle [w=" << width() << ", h=" << height() << "]" << std::endl;
    }

    Circle::Circle(const Point& center, double radius)
        : center(center), radius(radius) {}
    void Circle::display() const {
        std::cout << "Circle center="; center.print();
        std::cout << ", r=" << radius << std::endl;
    }

    LineCenter::LineCenter(const Point& p1, const Point& p2)
        : LineSegment(p1,p2) {}
    void LineCenter::display() const { std::cout << "LineCenter: "; LineSegment::display(); }

    LineLowerLeft::LineLowerLeft(const Point& p1, const Point& p2)
        : LineSegment(p1,p2) {}
    void LineLowerLeft::display() const { std::cout << "LineLowerLeft: "; LineSegment::display(); }

    Outline::Outline(const std::vector<Point>& pts) : points(pts) {}
    void Outline::display() const {
        std::cout << "Outline: ";
        for(auto&p:points){p.print(); std::cout<<" ";}
        std::cout<<std::endl;
    }

    Polygon::Polygon(const Point& c,int n,double d,double r)
        : center(c),numSides(n),diameter(d),rotation(r) {}
    void Polygon::display() const {
        std::cout<<"Polygon sides="<<numSides<<" dia="<<diameter<<" rot="<<rotation<<"\n";
    }

    Moire::Moire(const Point& c,double od,double lt,double g,int nc,double cht,double chl,double r)
        : center(c), outsideDiameter(od), lineThickness(lt), gap(g),
          numCircles(nc), crossHairThickness(cht), crossHairLength(chl), rotation(r) {}
    void Moire::display() const { std::cout<<"Moire display\n"; }

    Thermal::Thermal(const Point& c,double od,double id,double cht)
        : center(c),outsideDiameter(od),insideDiameter(id),crossHairThickness(cht) {}
    void Thermal::display() const { std::cout<<"Thermal display\n"; }

    // JSON methods
    nlohmann::json LineSegment::toJSON() const {
        return { {"type","LineSegment"},{"x1",p1.x},{"y1",p1.y},{"x2",p2.x},{"y2",p2.y} };
    }
    nlohmann::json Rectangle::toJSON() const {
        auto j = nlohmann::json{{"type","Rectangle"},{"width",width()},{"height",height()},{"edges",nlohmann::json::array()}};
        j["edges"].push_back(l1.toJSON());j["edges"].push_back(l2.toJSON());
        j["edges"].push_back(l3.toJSON());j["edges"].push_back(l4.toJSON());
        return j;
    }
    nlohmann::json Circle::toJSON() const { return {{"type","Circle"},{"center",{{"x",center.x},{"y",center.y}}},{"radius",radius}}; }
    nlohmann::json LineCenter::toJSON() const { auto j=LineSegment::toJSON(); j["type"]="LineCenter"; return j; }
    nlohmann::json LineLowerLeft::toJSON() const { auto j=LineSegment::toJSON(); j["type"]="LineLowerLeft"; return j; }
    nlohmann::json Outline::toJSON() const {
        nlohmann::json arr=nlohmann::json::array(); for(auto&p:points) arr.push_back({{"x",p.x},{"y",p.y}});
        return {{"type","Outline"},{"points",arr}};
    }
    nlohmann::json Polygon::toJSON() const { return {{"type","Polygon"},{"sides",numSides},{"diameter",diameter},{"rotation",rotation}}; }
    nlohmann::json Moire::toJSON() const { return {{"type","Moire"}}; }
    nlohmann::json Thermal::toJSON() const { return {{"type","Thermal"}}; }

}
