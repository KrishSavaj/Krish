#include <sstream>
#include "./include/cad_header.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"

#include <iostream>
#include <string>

using namespace std;

// ===================== CadHeader Implementation =====================
IPCCadHeader::IPCCadHeader(TreeNode &cadHeaderPtr) : units(Unit::INCH) {
    
    addCadHeaderData(cadHeaderPtr);
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("units", ValueType::STRING, &this->units, false, stc);
    
    // string unitsStr = string(magic_enum::enum_name(units));
    // addAttr("units", ValueType::STRING, &unitsStr, false);
   
}

// IPCCadHeader::IPCCadHeader(string units) {}

void IPCCadHeader::addCadHeaderData(TreeNode &cadHeaderPtr){
  
    // cout<<"Cad Header Hello" << endl;
   if(cadHeaderPtr.attributes[0].first == "units"){
    units = magic_enum::enum_cast<Unit>(cadHeaderPtr.attributes[0].second).value();
   }
    
}

void IPCCadHeader::cadHeaderDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "CadHeader: "<< endl;
    std::string unitStr = (units == IPCCadHeader::Unit::INCH) ? "INCH" : "MILLIMETER";      
    cout << indent << "   Units: " << unitStr << endl;
    // cout << indent << "   Units: " << units << endl;
}

string IPCCadHeader::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<CadHeader units=\""<< magic_enum::enum_name(units) << "\">\n";
    // oss << tab << "  <units>" << magic_enum::enum_name(units) << "</units>\n";
    oss << tab << "</CadHeader>\n";

    return oss.str();
}


