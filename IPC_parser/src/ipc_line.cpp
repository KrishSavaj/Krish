#include <sstream>
#include "./include/ipc_line.h"

using namespace std;
using namespace magic_enum;

IPCLineDescRef::IPCLineDescRef() {
    id = "";
}

IPCLineDescRef::IPCLineDescRef(TreeNode &lineDescRefPtr) {
    id = "";
    for(size_t i = 0; i < lineDescRefPtr.attributes.size(); i++) {
        if(lineDescRefPtr.attributes[i].first == "id") {
            id = lineDescRefPtr.attributes[i].second;
        }
    }
}

string IPCLineDescRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    if (!id.empty()) {
        oss << tab << "<LineDescRef "
            << "id=\"" << id << "\"/>\n";
    }
    return oss.str();
}


LineDesc::LineDesc() {
    lineEnd = LineEnd::NONE;
    lineProperty = LineProperty::SOLID;
    lineWidth = 0.0;
    hasLineProperty = false;
}
LineDesc::LineDesc(TreeNode &lineDescPtr) {
    lineEnd = LineEnd::NONE;
    lineProperty = LineProperty::SOLID;
    lineWidth = 0.0;
    hasLineProperty = false;
    
    for(size_t i = 0; i < lineDescPtr.attributes.size(); i++) {
        if(lineDescPtr.attributes[i].first == "lineWidth"){
            lineWidth = stod(lineDescPtr.attributes[i].second);
        }
        else if(lineDescPtr.attributes[i].first == "lineEnd"){
            // Use magic_enum to convert string to enum
            auto endType = magic_enum::enum_cast<LineEnd>(lineDescPtr.attributes[i].second);
            if(endType.has_value()) {
                lineEnd = endType.value();
            } else {
                lineEnd = LineEnd::NONE; // Default
            }
        }
        else if(lineDescPtr.attributes[i].first == "lineProperty"){
            // Use magic_enum to convert string to enum
            auto propertyType = magic_enum::enum_cast<LineProperty>(lineDescPtr.attributes[i].second);
            if(propertyType.has_value()) {
                lineProperty = propertyType.value();
                hasLineProperty = true; // Mark that lineProperty was explicitly set
            } else {
                lineProperty = LineProperty::SOLID; // Default
            }
        }
    }

}

IPCLine::IPCLine(TreeNode &linePtr) {
    // Initialize pointers to nullptr
    lineDesc = nullptr;
    lineDescRef = nullptr;
    startX = 0.0;
    startY = 0.0;
    endX = 0.0;
    endY = 0.0;
    
    for(size_t i = 0; i < linePtr.attributes.size(); i++) {
        if(linePtr.attributes[i].first == "startX"){
            startX = stod(linePtr.attributes[i].second);
        }
        else if(linePtr.attributes[i].first == "startY"){
            startY = stod(linePtr.attributes[i].second);
        }
        else if(linePtr.attributes[i].first == "endX"){
            endX = stod(linePtr.attributes[i].second);
        }
        else if(linePtr.attributes[i].first == "endY"){
            endY = stod(linePtr.attributes[i].second);
        }
    }

    for(size_t i = 0; i < linePtr.children.size(); i++) {
        if (linePtr.children[i].name == "LineDesc") {
            lineDesc = new LineDesc(linePtr.children[i]);
        }
        if(linePtr.children[i].name == "LineDescRef") {
            lineDescRef = new IPCLineDescRef(linePtr.children[i]);
        }
    }

}

void LineDesc::LineDescDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "LineDesc [ ";
    cout << "lineWidth = "<< lineWidth << " ";
    cout << "lineEnd = " << magic_enum::enum_name(lineEnd);
    cout << " lineProperty = " << magic_enum::enum_name(lineProperty);
    cout << " ]" << endl;
}


void IPCLine::IPCLineDisplay(int depth) {
    string indent(depth, ' ');
    cout << indent << "Line [ ";
    cout << "startX = "<< startX << " startY = " << startY << " ";
    cout <<  "endX = "<< endX << " endY = " << endY;
    cout << "]" << endl;
    if (lineDesc) {
        lineDesc->LineDescDisplay(depth + 4);
    }
}

string LineDesc::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<LineDesc "
        << "lineWidth=\"" << lineWidth << "\" "
        << "lineEnd=\"" << magic_enum::enum_name(lineEnd) << "\"";
    
    // Only output lineProperty if it was explicitly set in the input
    if (hasLineProperty) {
        oss << " lineProperty=\"" << magic_enum::enum_name(lineProperty) << "\"";
    }
    
    oss << "/>\n";
    return oss.str();
}

string IPCLine::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Line "
        << "startX=\"" << startX << "\" "
        << "startY=\"" << startY << "\" "
        << "endX=\"" << endX << "\" "
        << "endY=\"" << endY << "\">\n";

    if (lineDesc) {
        oss << lineDesc->toXML(indent + 4);
    }
    if (lineDescRef) {
        oss << lineDescRef->toXML(indent + 4);
    }

    oss << tab << "</Line>\n";
    return oss.str();
}