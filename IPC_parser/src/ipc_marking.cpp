#include <sstream>
#include "./include/ipc_marking.h"


using namespace std;

IPCMarking :: IPCMarking(TreeNode &packagePtr){

    markingUsage = packagePtr.attributes[0].second;


    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);

    // addAttr("markingUsage", ValueType::STRING, &markingUsage, false, stc);

    addUSerSpecials(packagePtr);
}


void IPCMarking :: addUSerSpecials(TreeNode &markingPtr) {
    for (size_t i = 0; i < markingPtr.children.size(); i++) {
       
        if (markingPtr.children[i].name == "UserSpecial") {
            // cout <<" ****************** "<<"Adding UserSpecial: " << markingPtr.children[i].name <<" ****************** "<< endl;
            userSpecials.push_back(new IPCUserSpecial(markingPtr.children[i]));
        }
        if (markingPtr.children[i].name == "Location") {
            locations.push_back(new IPCLocation(markingPtr.children[i]));
        }
        if (markingPtr.children[i].name == "UserPrimitiveRef") {
            userPrimitiveRefs.push_back(new IPCUserPrimitiveRef(markingPtr.children[i]));
        }
    }
}

string IPCMarking::toXML(int indent) {
    string indentStr(indent, ' ');
    ostringstream oss;
    oss << indentStr << "<Marking "
        << "markingUsage=\"" << markingUsage << "\">\n";
    // Output Location first
    for(size_t i = 0; i < locations.size(); i++){
        oss << locations[i]->toXML(indent + 3);
    }
    // Output UserPrimitiveRef
    for(size_t i = 0; i < userPrimitiveRefs.size(); i++){
        oss << userPrimitiveRefs[i]->toXML(indent + 3);
    }
    // Output UserSpecials
    for(size_t i = 0; i < userSpecials.size(); i++){
        oss << userSpecials[i]->toXML(indent + 3);
    }
    oss << indentStr << "</Marking>\n";
    return oss.str();
}

void IPCMarking::IPCMarkingDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent <<"Marking [ ";
    cout << "markingUsage: " << markingUsage;
    cout << "]" <<endl;
    for(size_t i =0 ; i < userSpecials.size(); i++){
        userSpecials[i]->IPCUserSpecialDisplay(depth + 1);
    }
    
}



