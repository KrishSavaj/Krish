#ifndef COORDINATE_H
#define COORDINATE_H

#include <string> // Include necessary headers for std::string
namespace PCBDesign {
    // Class to represent a coordinate (x, y)
    class Coordinate {
    public:
        float x; // X-coordinate
        float y; // Y-coordinate
        float angleOfRotation; // Angle

        // Constructor
        Coordinate(float x = 0.0, float y = 0.0, float angleOfRotation = 0.0);

        // Helper function to display coordinates as a string
        std::string toString() const;
    };
}
#endif // COORDINATE_HPP
