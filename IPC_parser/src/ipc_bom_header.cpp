#include "./include/ipc_bom_header.h"
#include <iostream>
#include <sstream>


stepRef::stepRef(TreeNode &stepRefPtr) {
    if (stepRefPtr.attributes.size() >= 1) {
        name = stepRefPtr.attributes[0].second;
    } else {
        name = "";
    }
}
void stepRef::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "stepRef: " << name << endl;
}

string stepRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<StepRef name=\"" << name << "\"/>\n";
    return oss.str();
}

IPCBOMHeader::IPCBOMHeader(TreeNode &bomHeaderPtr) {
    for(size_t i = 0; i < bomHeaderPtr.attributes.size(); i++) {
        // cout << "BOM Header Attribute: " << bomHeaderPtr.attributes[i].first << " = " << bomHeaderPtr.attributes[i].second << endl;
        if(bomHeaderPtr.attributes[i].first == "assembly") {
            assembly = bomHeaderPtr.attributes[i].second;
        } else if(bomHeaderPtr.attributes[i].first == "revision") {
            revision = bomHeaderPtr.attributes[i].second;
        } else if(bomHeaderPtr.attributes[i].first == "affecting") {
            affecting = bomHeaderPtr.attributes[i].second;
        }
    }
    for (size_t i = 0; i < bomHeaderPtr.children.size(); i++) {
        // cout << "BOM Header Child: " << bomHeaderPtr.children[i].name << endl;
        if (bomHeaderPtr.children[i].name == "StepRef") {
            stepRefs.emplace_back(new stepRef(bomHeaderPtr.children[i]));
            // cout << "stepRef added" << endl;
        }

    }
}

void IPCBOMHeader::IPCBOMHeaderDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "BOMHeader: " << endl;
    cout << indent << "assembly: " << assembly << endl;
    cout << indent << "revision: " << revision << endl;
    cout << indent << "affecting: " << affecting << endl;
    for (size_t i = 0; i < stepRefs.size(); i++) {
        stepRefs[i]->display(depth + 1);
    }
}

string IPCBOMHeader::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<BomHeader "
        << "revision=\"" << revision << "\" "
        << "assembly=\"" << assembly << "\">\n";
    for(size_t i = 0; i < stepRefs.size(); i++) {
        oss << stepRefs[i]->toXML(indent + 4);
    }
    oss << tab << "</BomHeader>\n";
    return oss.str();
}
