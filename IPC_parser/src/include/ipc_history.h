#ifndef IPC_HISTORY_H
#define IPC_HISTORY_H



#include "tree_node.h"
// #include "../../../PCBBaseline/include/GUIComponent.h" 

class IPCHistoryRecord {// : public virtual GUIComponent {
    private:
        int hNumber;
        std::string hOrigination;
        std::string hSoftware;
        std::string hLastChange;
        std::string historyDescription;
        int fileRevisionId;
        std::string comment;
        std::string label;
        std::string sName;
        std::string sRevision;
        std::string sVendor;
        enum certificationstatus {
            NONE,
            SELFTEST,
            APPROVED,
            RELEASED
        };
        certificationstatus certificationStatus;

        

    public:
        IPCHistoryRecord(TreeNode &historyPtr);
        // void addHistoryData(TreeNode &historyPtr);
        void addChildren(TreeNode &historyPtr);
        void addFileRevision(TreeNode &fileRevisionPtr);
        void addSoftwarePackage(TreeNode &softwarePackagePtr);
        void addCertification(TreeNode &certificationPtr);
        void IPCHistoryRecordDisplay(int depth);
        std::string toXML(int indent);
};



#endif