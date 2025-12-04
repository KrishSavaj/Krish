#include "./include/ipc_location.h"

#include <iostream>
#include <sstream>
#include <vector>


using namespace std;


IPCLocation::IPCLocation(float x, float y) : x(x), y(y) {

}
IPCLocation::IPCLocation(TreeNode &locationPtr) {
    if(locationPtr.attributes.size() > 0) {
        for(int i =0; i < locationPtr.attributes.size(); i++){
            if(locationPtr.attributes[i].first == "x"){
                x = std::stod(locationPtr.attributes[i].second);
            }
            else if(locationPtr.attributes[i].first == "y"){
                y = std::stod(locationPtr.attributes[i].second);
            }
        }

    } else {
        x = 0.0;
        y = 0.0;
    }

}


void IPCLocation :: IPCLocationDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Location [ ";
    cout << "x = " << x;
    cout << "  y = " << y;
    cout << " ]" << endl;
}

string IPCLocation::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Location "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\"/>\n";
    return oss.str();
}
