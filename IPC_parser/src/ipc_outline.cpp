#include "./include/ipc_outline.h"
#include "./include/ipc_polygon.h"
// #include "./include/ipc_dictionary_linedesc.h"

#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

// IPCLineDescRef::IPCLineDescRef() {
//     id = "";
// }

// IPCLineDescRef::IPCLineDescRef(TreeNode &lineDescRefPtr) {
//     id = lineDescRefPtr.attributes[0].second;
// }

// string IPCLineDescRef::toXML(int indent) {
//     std::string tab(indent, ' ');
//     ostringstream oss;
//     oss << tab << "<LineDescRef "
//         << "id=\"" << id << "\"/>\n";
//     return oss.str();
// }

IPCOutline::IPCOutline() {
}
IPCOutline::IPCOutline(TreeNode &outlinePtr) {
    for (size_t i = 0; i < outlinePtr.children.size(); i++) {
        if (outlinePtr.children[i].name == "Polygon") {
            polygons.emplace_back( new IPCPolygon(outlinePtr.children[i] , 0.0f,0.0f));
        }
        else if (outlinePtr.children[i].name == "LineDescRef") {
            lineDescRef = IPCLineDescRef(outlinePtr.children[i]);
        }
    }
}


void IPCOutline::IPCOutlineDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "Outline [ " << endl;

    // lineDescRef.IPCLineDescRefDisplay(depth + 1);

    for(size_t i =0 ; i < polygons.size(); i++){
        polygons[i]->polygonDisplay(depth + 1);
    }

    cout << indent << " ]" << endl;       
}


string IPCOutline::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Outline>\n";


    for (const auto& polygon : polygons) {
        oss << polygon->toXML(indent + 3);
    }

    oss << lineDescRef.toXML(indent + 3);

    oss << tab << "</Outline>\n";
    return oss.str();
}