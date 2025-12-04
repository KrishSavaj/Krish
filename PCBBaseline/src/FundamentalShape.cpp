#include "../include/FundamentalShape.h"

namespace PCBDesign {

// Constructor
FundamentalShape::FundamentalShape(const std::string& type, double x, double y, double d1, double d2)
    : shapeType(type), x(x), y(y), dimension1(d1), dimension2(d2) {}

// Getters
std::string FundamentalShape::getType() const { return shapeType; }
double FundamentalShape::getX() const { return x; }
double FundamentalShape::getY() const { return y; }
double FundamentalShape::getDimension1() const { return dimension1; }
double FundamentalShape::getDimension2() const { return dimension2; }

// Setters
void FundamentalShape::setType(const std::string& type) { shapeType = type; }
void FundamentalShape::setPosition(double newX, double newY) { x = newX; y = newY; }
void FundamentalShape::setDimensions(double d1, double d2) { dimension1 = d1; dimension2 = d2; }

// Display function
void FundamentalShape::display() const {
    std::cout << "Shape Type: " << shapeType << ", Position: (" << x << ", " << y << ")";
    
    if (shapeType == "Rectangle") {
        std::cout << ", Width: " << dimension1 << ", Height: " << dimension2;
    } else if (shapeType == "Circle") {
        std::cout << ", Radius: " << dimension1;
    }

    std::cout << std::endl;
}

} // namespace PCBDesign
