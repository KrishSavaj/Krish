#include "./include/ipc_xForm.h"
#include <iostream>
#include <sstream>
using namespace std;

IPCXForm::IPCXForm(double rotation) {
    this->rotation = rotation;
}

IPCXForm::IPCXForm(TreeNode &xformPtr) {
    // rotation = 0.0;
    if(xformPtr.attributes.size() > 0){
    for (size_t i = 0; i < xformPtr.attributes.size(); i++) {
        if (xformPtr.attributes[i].first == "rotation") {
            rotation = stod(xformPtr.attributes[i].second);
        }
        }
    }
    else{
        rotation = 0.0;
    }
}

void IPCXForm::IPCXFormDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "XForm [ ";
    cout << "rotation = " << rotation;
    cout << "]" << endl;
}

string IPCXForm::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Xform "
        << "rotation=\"" << rotation << "\"/>\n";
    return oss.str();
}