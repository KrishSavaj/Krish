#include <sstream>

#include "./include/ipc_datum.h"
using namespace std;


IPCDatum::IPCDatum(TreeNode &datumPtr){

    for(size_t i=0; i<datumPtr.attributes.size(); i++){
        if(datumPtr.attributes[i].first == "x"){
            x = std::stod(datumPtr.attributes[i].second);
            // addAttr("x", ValueType::DOUBLE, &x, false, new FloatAttrConstraints(FloatConstraintType::Unbounded));
        }
        else if(datumPtr.attributes[i].first == "y"){
            y = std::stod(datumPtr.attributes[i].second);
            // addAttr("y", ValueType::DOUBLE, &y, false, new FloatAttrConstraints(FloatConstraintType::Unbounded));
        }
    }
}

void IPCDatum::IPCDatumDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "Datum [ x: " << x ;
    cout << indent << "y: " << y;
    cout << " ]" << endl;
    // getGUIstring();
}

string IPCDatum::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Datum "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\"/>\n";

    return oss.str();
}