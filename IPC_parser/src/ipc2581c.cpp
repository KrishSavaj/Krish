#include <sstream>
#include <iostream>
#include <string>
#include "./include/ipc2581c.h"
// #include "ipc2581c.h"



using namespace std;

IPC2581c::IPC2581c(TreeNode &rootNode)  
{
    
    extractIPC2581cData(rootNode);

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);


    // addAttr("revision", ValueType::STRING, &this->revision, false, stc);
    // addAttr("xmlns", ValueType::STRING, &this->xmlns, false, stc);
    // addAttr("xmlns_xsi", ValueType::STRING, &this->xmlns_xsi, false, stc);
    // addAttr("xmlns_xsd", ValueType::STRING, &this->xmlns_xsd, false, stc);
    // addAttr("xsi_schema_location", ValueType::STRING, &this->xsi_schema_location, false, stc);


    

}

// Function to extract and assign data to IPC2581c's members
void IPC2581c::extractIPC2581cData(TreeNode& rootNode) {
    if (rootNode.attributes.size() < 5) {
        cerr << "Error: Not enough attributes in TreeNode!" << endl;
        return;
    }
    // cout<< "print "<<endl;
    revision = rootNode.attributes[0].second;
    xmlns = rootNode.attributes[1].second;
    xmlns_xsi = rootNode.attributes[2].second;
    xmlns_xsd = rootNode.attributes[3].second;
    xsi_schema_location = rootNode.attributes[4].second;

    for (size_t i = 0; i<rootNode.children.size();i++) {
        // cout << "Child Node: " << rootNode.children[i].name << endl;
        if (rootNode.children[i].name == "Ecad") { 

            // cout << "***************************Ecad Node found********************" << endl;
            ecadNode  = new IPCEcad(rootNode.children[i].name);
            ecadNode->addIPCEcadData(rootNode.children[i]);
        
        }
        if(rootNode.children[i].name == "HistoryRecord") {

            // cout << "***************************History Node found********************" << endl;
            historyNode = new IPCHistoryRecord(rootNode.children[i]);

        }
        if(rootNode.children[i].name == "Content") {

            // cout << "***************************Content Node found********************" << endl;
            contentNode = new IPCContent(rootNode.children[i]);

        }
        if(rootNode.children[i].name == "LogisticHeader") {

            // cout << "***************************Content Node found********************" << endl;
            LogisticNode = new IPCLogisticHeader(rootNode.children[i]);

        }



        if(rootNode.children[i].name == "Bom") {

            // cout << "***************************BOM Node found********************" << endl;
            bomNode = new IPCBOM(rootNode.children[i]);

        }
        if(rootNode.children[i].name == "Avl") {
            
            // cout << "***************************AVL Node found********************" << endl;
            avlNode = new IPCAvl(rootNode.children[i]);
            
        }


    }


}



// Print function definition
void IPC2581c::display(int depth = 0) {
    string indent(depth * 4, ' ');
    cout << indent << "┌─ IPC2581C Standard ──────────" << endl;
    cout << indent << "│ Revision: " << revision << endl;
    cout << indent << "│ xmlns: " << xmlns << endl;
    cout << indent << "│ xmlns:xsi: " << xmlns_xsi << endl;
    cout << indent << "│ xmlns:xsd: " << xmlns_xsd << endl;
    cout << indent << "│ xsi:schema_location: " << xsi_schema_location << endl;
  
    historyNode->IPCHistoryRecordDisplay(depth + 1);
    ecadNode->ecadDisplay(depth + 1);



    cout<<"\n\n";
    // cout << "GUI Components: " << endl;
    // getGUIstring();
    // cout<<"\n\n";
    
    
}



std::string IPC2581c::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<IPC-2581 "
        << "revision=\"" << revision << "\" "
        << "xmlns=\"" << xmlns << "\" "
        << "xmlns:xsi=\"" << xmlns_xsi << "\" "
        << "xmlns:xsd=\"" << xmlns_xsd << "\" "
        << "xsi:schemaLocation=\"" << xsi_schema_location << "\">\n";


    if(contentNode) {
        oss << contentNode->toXML(indent + 4);
    }
    if(LogisticNode) {
        oss << LogisticNode->toXML(indent + 4);
    }
    if(historyNode) {
        oss << historyNode->toXML(indent + 4);
    }
    if(bomNode) {
        oss << bomNode->toXML(indent + 4);
    }
    if(ecadNode) {
        oss << ecadNode->toXML(indent + 4);
    }
    if(avlNode) {
        oss << avlNode->toXML(indent + 4);
    }


    oss << tab << "</IPC-2581>\n";
    return oss.str();
}


void IPC2581c::saveToXMLFile(const std::string& filename) {
    std::ofstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    file << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    file << this->toXML();  // calling the member toXML()
    file.close();
}



