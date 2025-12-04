#include "./include/ipc_nonStandardAtrribute.h"
#include <iostream>
#include <sstream>


using namespace std;

IPCNonStandardAttribute :: IPCNonStandardAttribute(TreeNode &nonStandardAttributePtr) {
    for (std::pair<std::string, std::string> attr : nonStandardAttributePtr.attributes) {
        if (attr.first == "name") {
            name = attr.second;
        } 
        else if (attr.first == "value") {
            value = attr.second;
        } 
        else if (attr.first == "type") {
            if (attr.second == "BOOLEAN") {
                type = Type::BOOLEAN;
            } else if (attr.second == "INTEGER") {
                type = Type::INTEGER;
            } else if (attr.second == "DOUBLE") {
                type = Type::DOUBLE;
            } else {
                type = Type::STRING; // default
            }
        }
    }

    // Constraints
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("name",  ValueType::STRING, &name,  false, stc);
    // addAttr("value", ValueType::STRING, &value, false, stc);
}


void IPCNonStandardAttribute :: IPCNonStandardAttributeDisplay(int depth) {
    string indent(depth * 3, ' ');
    cout << indent;
    cout << "NonStandardAttribute [ Name: " << name ;
    cout << indent << "Value: " << value;
    cout << indent << "Type: ";
    switch(type) {
        case Type::STRING:  cout << "string"; break;
        case Type::INTEGER: cout << "integer"; break;
        case Type::DOUBLE:  cout << "double"; break;
        case Type::BOOLEAN: cout << "boolean"; break;
    }
    cout << " ]" << endl;       
}


std::string IPCNonStandardAttribute :: toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<NonStandardAttribute "
        << "name=\"" << name << "\" "
        << "type=\"";
    switch(type) {  
        case Type::STRING:  oss << "STRING"; break;
        case Type::INTEGER: oss << "INTEGER"; break;
        case Type::DOUBLE:  oss << "DOUBLE"; break;
        case Type::BOOLEAN: oss << "BOOLEAN"; break;
    }
    oss << "\" "
        << "value=\"" << value << "\"/>\n";

    return oss.str();
}