#include <sstream>
#include "./include/ipc_polyline.h"



using namespace std;


IPCPolyline::IPCPolyline(TreeNode &polylinePtr) {
    for (size_t i = 0; i < polylinePtr.children.size(); i++) {  
        // cout << "Adding polyline: " << packagePtr.children[i].name<< endl;  
        if (polylinePtr.children[i].name == "PolyBegin") {
            // cout << "Adding polyBegin: " << polylinePtr.children[i].name << endl;
            float x = std::stof(polylinePtr.children[i].attributes[0].second);
            float y = std::stof(polylinePtr.children[i].attributes[1].second);
            begin = new PolyBegin(x,y);

        }

        else if(polylinePtr.children[i].name == "PolyStepSegment"){
            // cout << "Adding pol: " << polylinePtr.children[i].name << endl;
            float x = std::stof(polylinePtr.children[i].attributes[0].second);
            float y = std::stof(polylinePtr.children[i].attributes[1].second);
            steps.push_back(new PolyStepSegment(x,y));
        }
        else if(polylinePtr.children[i].name == "LineDescRef"){
            lineDescRef = new IPCLineDescRef(polylinePtr.children[i]);
        }
    }
}


string IPCPolyline::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Polyline>\n";

    if (begin) {
        oss << begin->toXML(indent + 3);
    }

    for(size_t i =0 ; i < steps.size(); i++){
        oss << steps[i]->toXML(indent + 3);
    }

    if (lineDescRef) {
        oss << lineDescRef->toXML(indent + 3);
    }

    oss << tab << "</Polyline>\n";
    return oss.str();
}

void IPCPolyline::IPCPolylineDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent <<"Polyline"<< endl;

        begin->polyBeginDisplay(depth + 1);

        for(size_t i =0 ; i < steps.size(); i++){
            steps[i]->polyStepSegmentDisplay(depth + 1);
        }

    cout << indent << "LineDescRef: [id = " << lineDescRef->toXML(0) <<"]"<< endl;
}