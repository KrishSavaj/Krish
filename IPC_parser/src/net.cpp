#include <iostream>
#include "./include/net.h"

// Constructor
Net::Net(const std::string& name) : netName(name) {}

// Add a polyline to the net
void Net::addPolyline(const Polyline& polyline) {
    polylines.push_back(polyline);
}

// Print details of the Net
void Net::print() const {
    std::cout << "Net Name: " << netName << std::endl;
    for (size_t i = 0; i < polylines.size(); i++) {
        polylines[i].print();
    }
}
