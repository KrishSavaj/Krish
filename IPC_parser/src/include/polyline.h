#ifndef POLYLINE_H
#define POLYLINE_H

#include <vector>
#include <iostream>

using namespace std;

struct PolySegment {
    double x;
    double y;
};

class Polyline {
public:
    vector<PolySegment> segments;
    string lineDescRef;

    // Constructor
    Polyline();

    // Add a PolySegment
    void addSegment(double x, double y);

    // Set the LineDescRef
    void setLineDescRef(const string& id);

    // Print details of the Polyline
    void print() const;
};

#endif

