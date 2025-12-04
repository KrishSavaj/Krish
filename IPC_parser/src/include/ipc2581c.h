#ifndef IPC2581C_H
#define IPC2581C_H

#include <iostream>
#include <vector>
#include <sstream>
// #include "../../../PCBBaseline/include/GUIComponent.h" 
// #include "../../../PCBBaseline/include/magic_enum.hpp"

#include "ecad.h"
#include "ipc_history.h"
#include "ipc_content.h"
#include "ipc_logistic_header.h"
#include "ipc_bom.h"
#include "ipc_avl.h"


#include "tree_node.h"

using namespace std;


class IPC2581c { // :public virtual GUIComponent{
    private:
        string revision;
        string xmlns;
        string xmlns_xsi;
        string xmlns_xsd;
        string xsi_schema_location;
        IPCEcad* ecadNode = nullptr;
        IPCHistoryRecord* historyNode = nullptr;
        IPCContent* contentNode = nullptr;
        IPCLogisticHeader* LogisticNode = nullptr;
        IPCBOM* bomNode = nullptr;
        IPCAvl* avlNode = nullptr;

        // TreeNode* ecadPtr = nullptr;

    public:
        IPC2581c();
        IPC2581c(TreeNode &rootNode);
        // IPC2581c(string revision, string xmlns, string xmlns_xsi, string xmlns_xsd, string xsi_schema_location);

        // ~IPC2581c();
        void display(int depth);
        void extractIPC2581cData(TreeNode& rootTree);
        std::string toXML(int indent = 0);
        void saveToXMLFile(const std::string& filename);
        
 
      
    
};




#endif





  // void extractIPCEcad(TreeNode *ecadPtr);