#ifndef RECTANGLE_HPP
#define RECTANGLE_HPP

#include <iostream>
#include <cmath>
#include <vector>
#include <ostream>
#include "PCBObj.h"  // Assumed base class for PCB objects



namespace PCBDesign {

    // ------------------------------
    // Base Classes & Updated Implementations
    // ------------------------------

    // Base class for all Gerber objects / shapes.
    class Shape : public PCBObj {
    public:
        virtual ~Shape() = default;  // <-- THIS LINE IS CRUCIAL
        // Virtual display method for polymorphic behavior.
        virtual void display() const;
        // Dump to an output stream for serialization/logging
        virtual void dump(std::ostream &out) const {
            out << "    <generic shape>\n";
        }
        
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
        float width = 0.0f;

        // Constructor initializes endpoints.
       // LineSegment(const Point& p1, const Point& p2);
        LineSegment(const Point& p1, const Point& p2, float w = 0.0f);

        // Calculates the Euclidean length of the line.
        double length() const;
        // Overrides display() to show line segment details.
        void display() const override;
        // Overrides dump() to include line segment specifics.
       void dump(std::ostream &out) const override {
         out << "    LineSegment: (" << p1.x << "," << p1.y << ") -> ("
        << p2.x << "," << p2.y << ") length=" << length()
        << " width=" << width << std::endl;
}

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

            out << "    [Rectangle] dumping l1...\n";
            l1.dump(out);
            out << "    [Rectangle] dumping l2...\n";
            l2.dump(out);
            out << "    [Rectangle] dumping l3...\n";
            l3.dump(out);
            out << "    [Rectangle] dumping l4...\n";
            l4.dump(out);
            out << "    [Rectangle] Done\n";
        }
    };
   
/// An arc segment: start→mid→end, with optional stroke/fill metadata.
class Arc : public Shape {
public:
    // Coordinates
    float x_start, y_start;
    float x_mid,   y_mid;
    float x_end,   y_end;

    // Styling
    float stroke_width;
    std::string stroke_type;
    std::string fill_type;

    /// Construct a full Arc
    Arc(float xs, float ys,
        float xm, float ym,
        float xe, float ye,
        float sw = 0.0f,
        const std::string &stype = "",
        const std::string &ftype = "")
      : Shape(),  // base initialization
        x_start(xs), y_start(ys),
        x_mid(xm),   y_mid(ym),
        x_end(xe),   y_end(ye),
        stroke_width(sw),
        stroke_type(stype),
        fill_type(ftype)
    {}
};

    // ------------------------------
    // Extended Aperture Shape Classes (Based on AD Parameter Theory)
    // ------------------------------

    // 1. Circle Aperture: A circular shape with a center and a radius.
    class Circle : public Shape {
    public:
        Point center;
        double radius;
        Circle(const Point& c, double r); // Only declaration here
        void display() const override;
        // void dump(std::ostream &out) const override {
        //     out << "    Circle: center=(" << center.x << "," << center.y << "), radius=" << radius << std::endl;
        // }
    };


    // 2. Line (Center): A specialized line segment with centered interpretation.
    class LineCenter : public LineSegment {
    public:
        // Inherits constructor from LineSegment.
        LineCenter(const Point& p1, const Point& p2);
        // Overrides display() to indicate centered line.
        void display() const override;
        // dump() inherited from LineSegment is sufficient
    };

    // 3. Line (Lower Left): A line defined using a lower left reference point.
    class LineLowerLeft : public LineSegment {
    public:
        // Constructor takes a lower left point and another point.
        LineLowerLeft(const Point& lowerLeft, const Point& other);
        // Overrides display() to indicate lower left reference.
        void display() const override;
        // dump() inherited from LineSegment is sufficient
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
    };

} // end namespace PCBDesign

#endif // RECTANGLE_HPP
