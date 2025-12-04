#include <sstream>
#include "./include/ipc_pick_up_point.h"


using namespace std;

IPCPickUpPoint::IPCPickUpPoint() {
    x = 0.0;
    y = 0.0;
}

IPCPickUpPoint::IPCPickUpPoint(TreeNode &pickUpPointPtr) {
        for(int i=0;i<pickUpPointPtr.attributes.size();i++){

        if(pickUpPointPtr.attributes[i].first == "x"){
            x = stod(pickUpPointPtr.attributes[i].second);
        }
        else if(pickUpPointPtr.attributes[i].first == "y"){
            y = stod(pickUpPointPtr.attributes[i].second);
        }

    }

}

void IPCPickUpPoint :: IPCPickUpPointDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "PickUpPoint [ ";
    cout << "x = "<< x << " y = " << y;
    cout << "]" << endl;
}

string IPCPickUpPoint::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<PickUpPoint "
        << "x=\"" << x << "\" "
        << "y=\"" << y << "\"/>\n";
    return oss.str();
}