#include <sstream>
// #include "./include/ipc_content.h"
// #include "./include/ipc_dictionary.h"
// // #include "./include/ipc_dictionary_standard.h"

// #include "./include/ipc_dictionary_font.h"
// #include "./include/ipc_dictionary_user.h"
// #include "./include/ipc_dictionary_linedesc.h"
// #include "./include/ipc_dictionary_fillDesc.h"


// using namespace std;


// void IPCDictionryFillDesc :: IPCDictionryFillDesc(TreeNode &fillDescPtr) {
//     // Assign values to class variables first
//     cout<< "FillDesc attributes size: " << fillDescPtr.attributes.size() << endl;
//     string unitStr = fillDescPtr.attributes[0].second;
//     if(unitStr == "MILLIMETER") {
//         unit = Units::MILLIMETER;
//     } else if(unitStr == "MICRON") {
//         unit = Units::MICRON;
//     } else if(unitStr == "INCH") {
//         unit = Units::INCH;
//     } else {
//         // Handle unknown unit case, maybe set a default or throw an error
//         unit = Units::MILLIMETER; // Defaulting to MILLIMETER
//     }

//     StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
//     // Pass addresses of member variables
//     addAttr("unit", ValueType::STRING, &unitStr, false, stc);
    
//     for(size_t i = 0; i < fillDescPtr.children.size(); i++) {
//         if (fillDescPtr.children[i].name == "EntryFillDesc") {
//             TreeNode entryNode = fillDescPtr.children[i];
//             EntryFillDesc *entry = new EntryFillDesc(entryNode); 
//             entryFillDescs.push_back(entry);
//         }
//     }
// }

// string IPCDictionryFillDesc::toXML(int indent) {
//     std::string tab(indent, ' ');
//     ostringstream oss;
//     oss << tab << "<DictionaryFillDesc "
//         << "unit=\"";
//     if(unit == Units::MILLIMETER) {
//         oss << "MILLIMETER";
//     } else if(unit == Units::MICRON) {
//         oss << "MICRON";
//     } else if(unit == Units::INCH) {
//         oss << "INCH";
//     }
//     oss << "\""
//         << ">\n";

//     // for (const auto& entry : entryFillDescs) {
//     //     // oss << entry->toXML(indent + 4);
//     // }

//     oss << tab << "</DictionaryFillDesc>\n";

//     return oss.str();
// } 

