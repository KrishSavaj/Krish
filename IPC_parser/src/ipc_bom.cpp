#include <sstream>
#include "./include/ipc_bom.h"

using namespace std;

IPCBOM::IPCBOM(TreeNode &bomPtr) {
    // cout << "Hello BOM ....."<<endl;
    for (size_t i = 0; i < bomPtr.attributes.size(); i++) {
        // cout << "BOM Attribute: " << bomPtr.attributes[i].first << " = " << bomPtr.attributes[i].second << endl;
        if(bomPtr.attributes[i].first == "name") {
            name = bomPtr.attributes[i].second;
        }
    }
    // cout << "BOM name: " << name << endl;
    for (size_t i = 0; i < bomPtr.children.size(); i++) {
        if (bomPtr.children[i].name == "BomHeader") {
            bomHeader = new IPCBOMHeader(bomPtr.children[i]);
            // cout << "BOM Header found" << endl;
        } else if (bomPtr.children[i].name == "BomItem") {
            bomItems.emplace_back(new IPCBOMItem(bomPtr.children[i]));
            // cout << "BOM Item added" << endl;
        }
    }
}


string IPCBOM::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<Bom name=\"" << name << "\">\n";

    if (bomHeader) {
        oss << bomHeader->toXML(indent + 4);
    }

    for (size_t i = 0; i < bomItems.size(); i++) {
        oss << bomItems[i]->toXML(indent + 4);
    }

    oss << tab << "</Bom>\n";
    return oss.str();
}

IPCBOM::~IPCBOM() {
    delete bomHeader;
    for (auto item : bomItems) {
        delete item;
    }
}
