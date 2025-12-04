#include "./include/ipc_assembly_drawing.h"
#include "./include/ipc_marking.h"
#include "./include/ipc_outline.h"
#include <iostream>
#include <sstream>
#include <vector>


using namespace std;

IPCAssemblyDrawing::IPCAssemblyDrawing(TreeNode &assemblyDrawingPtr){
   
    // cout << "Assembly Drawing Initialized" << endl;

    for(size_t i = 0; i < assemblyDrawingPtr.children.size(); i++) {
        if (assemblyDrawingPtr.children[i].name == "Outline") {
            outline = IPCOutline(assemblyDrawingPtr.children[i]);
        }
        if(assemblyDrawingPtr.children[i].name == "Marking") {
            // cout << "Adding Marking: " << assemblyDrawingPtr.children[i].name << endl;
            markings.push_back(new IPCMarking(assemblyDrawingPtr.children[i]));
        }
    }


}

void IPCAssemblyDrawing::IPCAssemblyDrawingDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "AssemblyDrawing [ " << endl;

    outline.IPCOutlineDisplay(depth + 1);
    // markings.IPCMarkingsDisplay(depth + 1);

    cout << indent << " ]" << endl;       
}

string IPCAssemblyDrawing::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<AssemblyDrawing>\n";

    oss << outline.toXML(indent + 3);
    for(size_t i =0 ; i < markings.size(); i++){
        oss << markings[i]->toXML(indent + 3);
    }

    oss << tab << "</AssemblyDrawing>\n";
    return oss.str();
}


