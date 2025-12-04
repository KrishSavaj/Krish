#include <sstream>
#include "./include/ipc_avl.h"

using namespace std;

IPCAvl::IPCAvl(TreeNode &avlPtr) {
    for (size_t i = 0; i < avlPtr.attributes.size(); i++) {
        // cout << "Avl Attribute: " << avlPtr.attributes[i].first << " = " << avlPtr.attributes[i].second << endl;
        if(avlPtr.attributes[i].first == "name") {
            name = avlPtr.attributes[i].second;
        }
    }

    for (size_t i = 0; i < avlPtr.children.size(); i++) {
        if(avlPtr.children[i].name == "AvlHeader") {
            avlHeader = new IPCAvlHeader(avlPtr.children[i]);
        } else if(avlPtr.children[i].name == "AvlItem") {
            IPCAvlItem* item = new IPCAvlItem(avlPtr.children[i]);
            avlItems.push_back(item);
        }
    }
}

void IPCAvl::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "IPCAvl: " << endl;
    cout << indent << "name: " << name << endl;

    if(avlHeader) {
        avlHeader->display(depth+1);
    }

    for(size_t i=0;i<avlItems.size();i++){
        avlItems[i]->display(depth+1);
    }
}


string IPCAvl::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Avl "
        << "name=\"" << name << "\">\n";

    if(avlHeader) {
        oss << avlHeader->toXML(depth+1);
    }
    for(size_t i=0;i<avlItems.size();i++){
        oss << avlItems[i]->toXML(depth+1);
    }

  

    oss << tab << "</Avl>\n";

    return oss.str();
}


