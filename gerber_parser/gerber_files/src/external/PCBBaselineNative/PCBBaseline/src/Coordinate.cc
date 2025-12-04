#include "../include/Coordinate.h"
#include <string>

namespace PCBDesign {
    Coordinate::Coordinate(float x, float y, float angle) : x(x), y(y), angleOfRotation(angle) {}

    std::string Coordinate::toString() const {
        return "(" + std::to_string(x) + ", " + std::to_string(y) + ") Rotated by " + std::to_string(angleOfRotation) + "Radians";
    }
}