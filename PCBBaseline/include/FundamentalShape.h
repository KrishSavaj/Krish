#ifndef FUNDAMENTALSHAPE_H
#define FUNDAMENTALSHAPE_H

#include <iostream>
#include <string>

namespace PCBDesign {

class FundamentalShape {
private:
    std::string shapeType; // Type of shape (e.g., "Rectangle", "Circle")
    double x, y;           // Position of the shape on the board
    double dimension1;     // Width or Radius
    double dimension2;     // Height (for rectangles)

public:
    // Constructor
    FundamentalShape(const std::string& type, double x, double y, double d1, double d2 = 0.0);

    // Getters
    std::string getType() const;
    double getX() const;
    double getY() const;
    double getDimension1() const;
    double getDimension2() const;

    // Setters
    void setType(const std::string& type);
    void setPosition(double newX, double newY);
    void setDimensions(double d1, double d2);

    // Display function
    void display() const;
};

} // namespace PCBDesign

#endif // FUNDAMENTALSHAPE_HPP
