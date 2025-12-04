#include <iostream>
#include <cmath>
#include "Geomclass.h"
using namespace std; 

namespace PCBDesign {

    // ------------------------------
    // Implementations for Base Classes & Original Geometry
    // ------------------------------

    // Shape::display() default implementation.
    void Shape::display() const {
        std::cout << "Generic Shape" << std::endl;
    }

    // Point class constructor.
    Point::Point(double x, double y) : x(x), y(y) {}

    // Print point coordinates.
    void Point::print() const {
        std::cout << "(" << x << ", " << y << ")";
    }

    // LineSegment constructor.
    LineSegment::LineSegment(const Point& p1_, const Point& p2_, float w)
    : p1(p1_), p2(p2_), width(w) {}


    // Calculate the Euclidean length of the line segment.
    double LineSegment::length() const {
        return std::sqrt(std::pow(p2.x - p1.x, 2) + std::pow(p2.y - p1.y, 2));
    }

    // Display line segment details.
   void LineSegment::display() const {
    std::cout << "LineSegment: (" << p1.x << "," << p1.y << ") → ("
              << p2.x << "," << p2.y << ")"
              << " length=" << length()
              << " width=" << width << "\n";
}

    // Rectangle constructor.
    Rectangle::Rectangle(const LineSegment& l1, const LineSegment& l2,
                         const LineSegment& l3, const LineSegment& l4,
                         double width, double height)
        : l1(l1), l2(l2), l3(l3), l4(l4), rect_width(width), rect_height(height) {}

    // Compute rectangle width from segments.
    double Rectangle::width() const {
        return std::min(l1.length(), l2.length());
    }

    // Compute rectangle height from segments.
    double Rectangle::height() const {
        return std::max(l1.length(), l2.length());
    }

    // Display rectangle details.
    void Rectangle::display() const {
        std::cout << "Rectangle:" << std::endl;
        l1.display();
        l2.display();
        l3.display();
        l4.display();
        std::cout << "Width: " << width() << ", Height: " << height() << std::endl;
    }

    // ------------------------------
    // Implementations for Extended Aperture Shapes
    // ------------------------------

   // Circle Aperture Implementation.
    Circle::Circle(const Point& center, double radius) : center(center), radius(radius) {}

    void Circle::display() const {
    std::cout << "Circle: Center (" << center.x << ", " << center.y << "), Radius: " << radius << std::endl;
}

    // LineCenter: a centered line segment.
    LineCenter::LineCenter(const Point& p1, const Point& p2) : LineSegment(p1, p2) {}

    void LineCenter::display() const {
        std::cout << "Line (Center): ";
        p1.print();
        std::cout << " to ";
        p2.print();
        std::cout << ", Length: " << length() << std::endl;
    }

    // LineLowerLeft: line defined with a lower left reference.
    LineLowerLeft::LineLowerLeft(const Point& lowerLeft, const Point& other)
        : LineSegment(lowerLeft, other) {}

    void LineLowerLeft::display() const {
        std::cout << "Line (Lower Left): ";
        p1.print();
        std::cout << " to ";
        p2.print();
        std::cout << ", Length: " << length() << std::endl;
    }

    // Outline: defined by a vector of points.
    Outline::Outline(const std::vector<Point>& pts) : points(pts) {}

    void Outline::display() const {
        std::cout << "Outline: ";
        for (const auto& pt : points) {
            pt.print();
            std::cout << " ";
        }
        std::cout << std::endl;
    }

    // Polygon: regular polygon with a center, number of sides, diameter, and rotation.
    Polygon::Polygon(const Point& center, int numSides, double diameter, double rotation)
        : center(center), numSides(numSides), diameter(diameter), rotation(rotation) {}

    void Polygon::display() const {
        std::cout << "Polygon Aperture: Center ";
        center.print();
        std::cout << ", Sides: " << numSides << ", Diameter: " << diameter 
                  << ", Rotation: " << rotation << "°" << std::endl;
    }

    // Moiré Aperture: complex aperture combining concentric circles and crosshair.
    Moire::Moire(const Point& center, double outsideDiameter, double lineThickness, double gap,
                 int numCircles, double crossHairThickness, double crossHairLength, double rotation)
        : center(center), outsideDiameter(outsideDiameter), lineThickness(lineThickness),
          gap(gap), numCircles(numCircles), crossHairThickness(crossHairThickness),
          crossHairLength(crossHairLength), rotation(rotation) {}

    void Moire::display() const {
        std::cout << "Moire Aperture: Center ";
        center.print();
        std::cout << ", Outside Diameter: " << outsideDiameter
                  << ", Line Thickness: " << lineThickness
                  << ", Gap: " << gap
                  << ", Circles: " << numCircles
                  << ", Cross Hair Thickness: " << crossHairThickness
                  << ", Cross Hair Length: " << crossHairLength
                  << ", Rotation: " << rotation << "°" << std::endl;
    }

    // Thermal Aperture: defined by outer & inner diameters and a crosshair.
    Thermal::Thermal(const Point& center, double outsideDiameter, double insideDiameter, double crossHairThickness)
        : center(center), outsideDiameter(outsideDiameter), insideDiameter(insideDiameter), crossHairThickness(crossHairThickness) {}

    void Thermal::display() const {
        std::cout << "Thermal Aperture: Center ";
        center.print();
        std::cout << ", Outside Diameter: " << outsideDiameter
                  << ", Inside Diameter: " << insideDiameter
                  << ", Cross Hair Thickness: " << crossHairThickness << std::endl;
    }

} // end namespace PCBDesign

// ------------------------------
// End of File
// ------------------------------

