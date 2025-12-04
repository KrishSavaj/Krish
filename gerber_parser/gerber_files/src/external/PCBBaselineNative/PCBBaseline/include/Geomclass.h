// #ifndef RECTANGLE_HPP
// #define RECTANGLE_HPP

// #include <iostream>
// #include <cmath>
// #include <vector>
// #include "PCBObj.h"  // Assumed base class for PCB objects

// namespace PCBDesign {

//     // ------------------------------
//     // Base Classes & Original Implementations
//     // ------------------------------

//     // Base class for all Gerber objects / shapes.
//     class Shape : public PCBObj {
//     public:
//         // Virtual display method for polymorphic behavior.
//         virtual void display() const;
//         virtual ~Shape() {}
//     };

//     // 2D Point class representing a coordinate.
//     class Point {
//     public:
//         double x, y;
//         // Constructor with default values.
//         Point(double x = 0, double y = 0);
//         // Prints the point in (x, y) format.
//         void print() const;
//     };

//     // LineSegment class representing a simple line between two points.
//     class LineSegment : public Shape {
//     public:
//         Point p1, p2;
//         // Constructor initializes endpoints.
//         LineSegment(const Point& p1, const Point& p2);
//         // Calculates the Euclidean length of the line.
//         double length() const;
//         // Overrides display() to show line segment details.
//         void display() const override;
//     };

//     // Rectangle class defined by four line segments.
//     class Rectangle : public Shape {
//     public:
//         LineSegment l1, l2, l3, l4;  // Edges of the rectangle.
//         double rect_width, rect_height;  // Optional width and height parameters.
//         // Constructor initializes the rectangle with its edges and optional dimensions.
//         Rectangle(const LineSegment& l1, const LineSegment& l2, 
//                   const LineSegment& l3, const LineSegment& l4,
//                   double width = -1, double height = -1);
//         // Returns computed width from line segments.
//         double width() const;
//         // Returns computed height from line segments.
//         double height() const;
//         // Overrides display() to output rectangle details.
//         void display() const override;
//     };

//     // ------------------------------
//     // Extended Aperture Shape Classes (Based on AD Parameter Theory)
//     // ------------------------------

//     // 1. Circle Aperture: A circular shape with a center and a radius.
//     class Circle : public Shape {
//     public:
//         Point center;
//         double radius;
//         // Constructor to initialize center and radius.
//         Circle(const Point& center, double radius);
//         // Overrides display() to output circle details.
//         void display() const override;
//     };

//     // 2. Line (Center): A specialized line segment with centered interpretation.
//     class LineCenter : public LineSegment {
//     public:
//         // Inherits constructor from LineSegment.
//         LineCenter(const Point& p1, const Point& p2);
//         // Overrides display() to indicate centered line.
//         void display() const override;
//     };

//     // 3. Line (Lower Left): A line defined using a lower left reference point.
//     class LineLowerLeft : public LineSegment {
//     public:
//         // Constructor takes a lower left point and another point.
//         LineLowerLeft(const Point& lowerLeft, const Point& other);
//         // Overrides display() to indicate lower left reference.
//         void display() const override;
//     };

//     // 4. Outline: Represents an open or closed shape defined by a sequence of points.
//     class Outline : public Shape {
//     public:
//         std::vector<Point> points;
//         // Constructor to initialize with a vector of points.
//         Outline(const std::vector<Point>& pts);
//         // Overrides display() to output the outline.
//         void display() const override;
//     };

//     // 5. Polygon: A regular polygon defined by its center, number of sides, diameter, and rotation.
//     class Polygon : public Shape {
//     public:
//         Point center;
//         int numSides;
//         double diameter;
//         double rotation;  // in degrees
//         // Constructor to initialize all polygon parameters.
//         Polygon(const Point& center, int numSides, double diameter, double rotation);
//         // Overrides display() to output polygon details.
//         void display() const override;
//     };

//     // 6. Moiré Aperture: A complex aperture combining concentric circles and crosshair features.
//     class Moire : public Shape {
//     public:
//         Point center;
//         double outsideDiameter;
//         double lineThickness;
//         double gap;
//         int numCircles;
//         double crossHairThickness;
//         double crossHairLength;
//         double rotation;  // in degrees
//         // Constructor to initialize all parameters for the Moiré aperture.
//         Moire(const Point& center, double outsideDiameter, double lineThickness, double gap,
//               int numCircles, double crossHairThickness, double crossHairLength, double rotation);
//         // Overrides display() to output Moiré aperture details.
//         void display() const override;
//     };

//     // 7. Thermal Aperture: Defined by an outer circle, an inner circle, and a crosshair.
//     class Thermal : public Shape {
//     public:
//         Point center;
//         double outsideDiameter;
//         double insideDiameter;
//         double crossHairThickness;
//         // Constructor to initialize thermal aperture parameters.
//         Thermal(const Point& center, double outsideDiameter, double insideDiameter, double crossHairThickness);
//         // Overrides display() to output thermal aperture details.
//         void display() const override;
//     };

// } // end namespace PCBDesign

// #endif // RECTANGLE_HPP

#ifndef RECTANGLE_HPP
#define RECTANGLE_HPP

#include <iostream>
#include <cmath>
#include <vector>
#include <ostream>
#include "PCBObj.h"  // Assumed base class for PCB objects
#include <nlohmann/json.hpp>


namespace PCBDesign {

    // ------------------------------
    // Base Classes & Updated Implementations
    // ------------------------------

    // Base class for all Gerber objects / shapes.
    class Shape : public PCBObj {
    public:
        // Virtual display method for polymorphic behavior.
        virtual void display() const;
        // Dump to an output stream for serialization/logging
        virtual void dump(std::ostream &out) const {
            out << "    <generic shape>\n";
        }
        virtual ~Shape() {}
        virtual nlohmann::json toJSON() const = 0;
    };

    // 2D Point class representing a coordinate.
    class Point {
    public:
        double x, y;
        // Constructor with default values.
        Point(double x = 0, double y = 0);
        // Prints the point in (x, y) format.
        void print() const;
        // Dump the point to an output stream.
        void dump(std::ostream &out) const {
            out << "    Point(" << x << ", " << y << ")" << std::endl;
        }
        
    };

    // LineSegment class representing a simple line between two points.
    class LineSegment : public Shape {
    public:
        Point p1, p2;
        // Constructor initializes endpoints.
        LineSegment(const Point& p1, const Point& p2);
        // Calculates the Euclidean length of the line.
        double length() const;
        // Overrides display() to show line segment details.
        void display() const override;
        // Overrides dump() to include line segment specifics.
        void dump(std::ostream &out) const override {
            out << "    LineSegment: (" << p1.x << "," << p1.y << ") -> ("
                << p2.x << "," << p2.y << ") length=" << length() << std::endl;
        }
          nlohmann::json toJSON() const override;
    };

    // Rectangle class defined by four line segments.
    class Rectangle : public Shape {
    public:
        LineSegment l1, l2, l3, l4;  // Edges of the rectangle.
        double rect_width, rect_height;  // Optional width and height parameters.
        // Constructor initializes the rectangle with its edges and optional dimensions.
        Rectangle(const LineSegment& l1, const LineSegment& l2, 
                  const LineSegment& l3, const LineSegment& l4,
                  double width = -1, double height = -1);
        // Returns computed width from line segments.
        double width() const;
        // Returns computed height from line segments.
        double height() const;
        // Overrides display() to output rectangle details.
        void display() const override;
        // Overrides dump() to include rectangle specifics.
        void dump(std::ostream &out) const override {
            out << "    Rectangle: width=" << width() << ", height=" << height() << std::endl;
            l1.dump(out);
            l2.dump(out);
            l3.dump(out);
            l4.dump(out);
        }
          nlohmann::json toJSON() const override;
    };

    // ------------------------------
    // Extended Aperture Shape Classes (Based on AD Parameter Theory)
    // ------------------------------

    // 1. Circle Aperture: A circular shape with a center and a radius.
    class Circle : public Shape {
    public:
        Point center;
        double radius;
        // Constructor to initialize center and radius.
        Circle(const Point& center, double radius);
        // Overrides display() to output circle details.
        void display() const override;
        // Overrides dump() to include circle specifics.
        void dump(std::ostream &out) const override {
            out << "    Circle: center=(" << center.x << "," << center.y << "), radius=" << radius << std::endl;
        }
          nlohmann::json toJSON() const override;
    };

    // 2. Line (Center): A specialized line segment with centered interpretation.
    class LineCenter : public LineSegment {
    public:
        // Inherits constructor from LineSegment.
        LineCenter(const Point& p1, const Point& p2);
        // Overrides display() to indicate centered line.
        void display() const override;
        // dump() inherited from LineSegment is sufficient
          nlohmann::json toJSON() const override;
    };

    // 3. Line (Lower Left): A line defined using a lower left reference point.
    class LineLowerLeft : public LineSegment {
    public:
        // Constructor takes a lower left point and another point.
        LineLowerLeft(const Point& lowerLeft, const Point& other);
        // Overrides display() to indicate lower left reference.
        void display() const override;
        // dump() inherited from LineSegment is sufficient
          nlohmann::json toJSON() const override;
    };

    // 4. Outline: Represents an open or closed shape defined by a sequence of points.
    class Outline : public Shape {
    public:
        std::vector<Point> points;
        // Constructor to initialize with a vector of points.
        Outline(const std::vector<Point>& pts);
        // Overrides display() to output the outline.
        void display() const override;
        // Overrides dump() to list all points.
        void dump(std::ostream &out) const override {
            out << "    Outline: " << points.size() << " points" << std::endl;
            for (auto &pt : points) pt.dump(out);
        }
          nlohmann::json toJSON() const override;
    };

    // 5. Polygon: A regular polygon defined by its center, number of sides, diameter, and rotation.
    class Polygon : public Shape {
    public:
        Point center;
        int numSides;
        double diameter;
        double rotation;  // in degrees
        // Constructor to initialize all polygon parameters.
        Polygon(const Point& center, int numSides, double diameter, double rotation);
        // Overrides display() to output polygon details.
        void display() const override;
        // Overrides dump() to include polygon specifics.
        void dump(std::ostream &out) const override {
            out << "    Polygon: center=(" << center.x << "," << center.y
                << "), sides=" << numSides << ", diameter=" << diameter
                << ", rotation=" << rotation << std::endl;
        }
          nlohmann::json toJSON() const override;
    };

    // 6. Moiré Aperture: A complex aperture combining concentric circles and crosshair features.
    class Moire : public Shape {
    public:
        Point center;
        double outsideDiameter;
        double lineThickness;
        double gap;
        int numCircles;
        double crossHairThickness;
        double crossHairLength;
        double rotation;  // in degrees
        // Constructor to initialize all parameters for the Moiré aperture.
        Moire(const Point& center, double outsideDiameter, double lineThickness, double gap,
              int numCircles, double crossHairThickness, double crossHairLength, double rotation);
        // Overrides display() to output Moiré aperture details.
        void display() const override;
        // Overrides dump() to include Moiré specifics.
        void dump(std::ostream &out) const override {
            out << "    Moire: center=(" << center.x << "," << center.y
                << "), outsideDia=" << outsideDiameter << ", lineThk=" << lineThickness
                << ", gap=" << gap << ", circles=" << numCircles
                << ", crossHairThk=" << crossHairThickness << ", crossHairLen=" << crossHairLength
                << ", rotation=" << rotation << std::endl;
        }
          nlohmann::json toJSON() const override;
    };

    // 7. Thermal Aperture: Defined by an outer circle, an inner circle, and a crosshair.
    class Thermal : public Shape {
    public:
        Point center;
        double outsideDiameter;
        double insideDiameter;
        double crossHairThickness;
        // Constructor to initialize thermal aperture parameters.
        Thermal(const Point& center, double outsideDiameter, double insideDiameter, double crossHairThickness);
        // Overrides display() to output thermal aperture details.
        void display() const override;
        // Overrides dump() to include thermal specifics.
        void dump(std::ostream &out) const override {
            out << "    Thermal: center=(" << center.x << "," << center.y
                << "), outsideDia=" << outsideDiameter << ", insideDia=" << insideDiameter
                << ", crossHairThk=" << crossHairThickness << std::endl;
        }
          nlohmann::json toJSON() const override;
    };

} // end namespace PCBDesign

#endif // RECTANGLE_HPP
