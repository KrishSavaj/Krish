#ifndef NET_H
#define NET_H

#include <string>
#include <vector>
#include "polyline.h"
using namespace std;

class Net {
public:
    string netName;
    vector<Polyline> polylines;
    
    Net() : netName("") {}      

    // Constructor
    Net(const std::string& name);

    // Add a polyline to the net
    void addPolyline(const Polyline& polyline);

    // Print details of the Net
    void print() const;
};

#endif // NET_HPP
