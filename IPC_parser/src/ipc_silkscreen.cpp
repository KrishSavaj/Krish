#include "./include/ipc_silkscreen.h"
#include <iostream>
#include <sstream>

using namespace std;

IPCSilkscreen ::IPCSilkscreen() {
    marking = nullptr;
}


IPCSilkscreen ::IPCSilkscreen (TreeNode &silkscreenPtr) {
    marking = nullptr;
    for (size_t i = 0; i < silkscreenPtr.children.size(); i++) {
        if (silkscreenPtr.children[i].name == "Marking") {
            marking = new IPCMarking(silkscreenPtr.children[i]);
        }
    }
}

void IPCSilkscreen ::silkscreenDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "Silkscreen [ " << endl;

    if (marking != nullptr) {
        marking->IPCMarkingDisplay(depth + 1);
    }

    cout << indent << " ]" << endl;       
}

string IPCSilkscreen ::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Silkscreen>\n";

    if (marking != nullptr) {
        oss << marking->toXML(indent + 3);
    }

    oss << tab << "</Silkscreen>\n";
    return oss.str();
}

IPCSilkscreen ::~IPCSilkscreen() {
    if (marking != nullptr) {
        delete marking;
    }
}

