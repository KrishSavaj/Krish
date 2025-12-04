

#include "./include/ipc_component.h"

#include <iostream>
#include <sstream>

using namespace std;


IPCcomponent::IPCcomponent(TreeNode &componentPtr){

// Initialize pointers to nullptr
xform = nullptr;
location = nullptr;

refDes = componentPtr.attributes[0].second;
packageRef = componentPtr.attributes[1].second;;
part = componentPtr.attributes[2].second;;
layerRef = componentPtr.attributes[3].second; 
mountType = componentPtr.attributes[4].second;


// StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
// addAttr("refDes", ValueType::STRING, &refDes, false, stc);

// addAttr("packageRef", ValueType::STRING, &packageRef, false, stc);

// addAttr("layerRef", ValueType::STRING, &layerRef, false, stc);

// addAttr("part", ValueType::STRING, &part, false, stc);

// addAttr("mountType", ValueType::STRING,&mountType, false, stc);

for(int i=0; i<componentPtr.children.size(); i++){
    if(componentPtr.children[i].name == "Xform"){
        xform = new IPCXForm(componentPtr.children[i]);
    }
    else if(componentPtr.children[i].name == "Location"){
        location = new IPCLocation(componentPtr.children[i]);
    }
 }

}


string IPCcomponent::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<Component";
    oss << " refDes=\"" << refDes << "\"";
    oss << " packageRef=\"" << packageRef << "\"";  
    oss << " layerRef=\"" << layerRef << "\"";
    oss << " part=\"" << part << "\"";
    oss << " mountType=\"" << mountType << "\">\n";

    if (xform) {
        oss << xform->toXML(indent + 4);
    }
    if(location) {
        oss << location->toXML(indent + 4);
    }
    oss << tab << "</Component>\n";

    return oss.str();
}

void IPCcomponent::IPCcomponentDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Component [  ";
    cout <<"  refDes: " << refDes;
    cout << "  packageRef: " << packageRef ;
    cout << "  layerRef: " << layerRef ;
    cout << "  part: " << part ;
    cout << "  mountType: " << mountType;
    cout << " ]" << endl ;
   

}
