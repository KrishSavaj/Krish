#include <sstream>
#include "./include/ipc_avl_header.h"

using namespace std;


IPCAvlHeader::IPCAvlHeader(TreeNode &avlHeaderPtr) {

    for (size_t i = 0; i < avlHeaderPtr.attributes.size(); i++) {
        // cout << "AvlHeader Attribute: " << avlHeaderPtr.attributes[i].first << " = " << avlHeaderPtr.attributes[i].second << endl;
        if(avlHeaderPtr.attributes[i].first == "title") {
            title = avlHeaderPtr.attributes[i].second;
        } else if(avlHeaderPtr.attributes[i].first == "source") {
            source = avlHeaderPtr.attributes[i].second;
        } else if(avlHeaderPtr.attributes[i].first == "datetime") {
            date = avlHeaderPtr.attributes[i].second;
        } else if(avlHeaderPtr.attributes[i].first == "version") {
            version = stoi(avlHeaderPtr.attributes[i].second);
        } else if(avlHeaderPtr.attributes[i].first == "comment") {
            comment = avlHeaderPtr.attributes[i].second;
        }else if(avlHeaderPtr.attributes[i].first == "author") {
            author = avlHeaderPtr.attributes[i].second;
        } 
        else if(avlHeaderPtr.attributes[i].first == "modRef") {
            std::string mrStr = avlHeaderPtr.attributes[i].second;
            if (mrStr == "USERDEF") {
                modRef = ModRef::USERDEF;
            } else if (mrStr == "ASSEMBLY") {
                modRef = ModRef::ASSEMBLY;
            } else if (mrStr == "FABRICATION") {
                modRef = ModRef::FABRICATION;
            } else if (mrStr == "DESIGN") {
                modRef = ModRef::DESIGN;
            } else if (mrStr == "TEST") {
                modRef = ModRef::TEST;
            }
        }
    
    }
}

void IPCAvlHeader::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "AvlHeader: " << endl;
    cout << indent << "title: " << title << endl;
    cout << indent << "source: " << source << endl;
    cout << indent << "date: " << date << endl;
    cout << indent << "version: " << version << endl;
    cout << indent << "author: " << author << endl;
    cout << indent << "modRef: " << magic_enum::enum_name(modRef) << endl;
}

string IPCAvlHeader::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<AvlHeader "
        << "title=\"" << title << "\" "
        << "source=\"" << source << "\" "
        << "author=\"" << author << "\" "
        << "datetime=\"" << date << "\" "
        << "version=\"" << version << "\"/>\n";

    return oss.str();
}