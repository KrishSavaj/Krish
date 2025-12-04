#include <iostream>
#include <fstream>
#include <vector>
#include "./include/tinyxml2.h"
#include "./include/tree_node.h"
#include "./include/xml_tree_builder.h"
#include "./include/xml_validator.h"
#include "./include/net.h"
#include "./include/polyline.h"
#include "./include/ecad.h"
#include "./include/ipc2581c.h"
#include "./include/ipc_component.h"
// #include "../../PCBBaseline/include/GUIComponent.h"
#include <string>

using namespace std;
using namespace tinyxml2;






int main() {
   
    XMLDocument xmlDoc;
    if (xmlDoc.LoadFile("../test/smallest_circuit.xml") != XML_SUCCESS) {
        cerr << "Error: Unable to load XML file!" << endl;
        return -1;
    }

 
    XMLElement* root = xmlDoc.RootElement();
    if (!root) {
        cerr << "Error: No root element found in the XML file!" << endl;
        return -1;
    }

    
    XmlTreeBuilder treeBuilder;
    TreeNode rootTree = treeBuilder.parseXmlElement(root);

 
    ofstream outFile("../test/tree_output.txt");
    if (!outFile) {
        cerr << "Error: Unable to create output file!" << endl;
        return -1;
    }
    rootTree.writeTreeToFile(outFile);
    outFile.close();

    cout << "Tree structure saved to tree_output.txt \n" << endl;

    // XML Validation
    string xmlPath = "../test/smallest_circuit.xml";
    // string xmlPath = "../test/testcase10-RevC-Assembly.xml"; // Path to the XML file to validate  
    string schemaPath = "../test/xml_shcema.xsd";
    // D:\minor_project\pcbdev\IPC_parser\test\xml_shcema.xsd
    string logFilePath = "../test/validation_log.txt";

    validateXML(xmlPath, schemaPath, logFilePath);
    // cout << "Validation completed. Check the log file: " << logFilePath << "\n\n" << endl;


    IPC2581c *ipc = new IPC2581c(rootTree); 

    // ipc->display(0);
    ipc->saveToXMLFile("../test/output.xml");
    
    cout << "\nIPC2581c data saved to output.xml \n" << endl;

    
    return 0;

}




