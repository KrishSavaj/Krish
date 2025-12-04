#include "./include/polyline.h"

// Constructor
Polyline::Polyline() {}

// Add a PolySegment
void Polyline::addSegment(double x, double y) {
    PolySegment segment;
    segment.x = x;
    segment.y = y;
    segments.push_back(segment);
}

// Set the LineDescRef
void Polyline::setLineDescRef(const std::string& id) {
    lineDescRef = id;
}

// Print details of the Polyline
void Polyline::print() const {
    std::cout << "Polyline:" << std::endl;
    for (size_t i = 0; i < segments.size(); i++) {
        std::cout << "  Segment - X: " << segments[i].x << ", Y: " << segments[i].y << std::endl;
    }
    std::cout << "  Line Description: " << lineDescRef << std::endl;
}
