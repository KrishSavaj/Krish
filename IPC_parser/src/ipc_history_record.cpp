#include <sstream>
#include "./include/ipc_history.h"

using namespace std;


IPCHistoryRecord :: IPCHistoryRecord(TreeNode &historyPtr){
   

hNumber = stoi(historyPtr.attributes[0].second);
hOrigination = historyPtr.attributes[1].second;
hSoftware = historyPtr.attributes[2].second;
hLastChange = historyPtr.attributes[3].second;
addChildren(historyPtr);

    // Assuming historyPtr has the necessary attributes
    historyDescription = historyPtr.text;

    // Add attributes to the GUIComponent
    // addAttr("hNumber", ValueType::INT, &hNumber, false);
    // addAttr("hOrigination", ValueType::STRING, &hOrigination, false);
    // addAttr("hSoftware", ValueType::STRING, &hSoftware, false);
    // addAttr("hLastChange", ValueType::STRING, &hLastChange, false);
    // addAttr("historyDescription", ValueType::STRING, &historyDescription, false);

    // If hNumber is not needed in the GUIComponent, you can comment it out

// addAttr("hNumber", ValueType::INT, &this->hNumber, false);
    
}

void IPCHistoryRecord::addChildren(TreeNode &historyPtr) {
            // for (const auto &child : historyPtr.children)
            for (size_t i = 0; i<historyPtr.children.size();i++)
             {
                if (historyPtr.children[i].name == "FileRevision") {
                    addFileRevision(historyPtr.children[i]);
                } 
                // else if (historyPtr.children[i].name == "SoftwarePackage") {
                //     addSoftwarePackage(historyPtr.children[i]);
                // } else if (historyPtr.children[i].name == "Certification") {
                //     addCertification(historyPtr.children[i]);
                // }
            }
        }

void IPCHistoryRecord::addFileRevision(TreeNode &fileRevisionPtr) {
    

    // Assuming fileRevisionPtr has the necessary attributes
    fileRevisionId = stoi(fileRevisionPtr.attributes[0].second);
    comment = fileRevisionPtr.attributes[1].second;
    label = fileRevisionPtr.attributes[2].second;

    // Add attributes to the GUIComponent
    // addAttr("fileRevisionId", ValueType::INT, &fileRevisionId, false);
    // addAttr("comment", ValueType::STRING, &comment, false);
    // addAttr("label", ValueType::STRING, &label, false);

    for (size_t i = 0; i<fileRevisionPtr.children.size();i++){

        if (fileRevisionPtr.children[i].name == "SoftwarePackage") {
                    addSoftwarePackage(fileRevisionPtr.children[i]);
                } 
    }

}

void IPCHistoryRecord::addSoftwarePackage(TreeNode &softwarePackagePtr) {
    // Assuming softwarePackagePtr has the necessary attributes
    // cout << "Adding SoftwarePackage attributes" << endl;
    sName = softwarePackagePtr.attributes[0].second;
    sRevision = softwarePackagePtr.attributes[1].second;
    sVendor = softwarePackagePtr.attributes[2].second;

    // Add attributes to the GUIComponent
    // addAttr("hSoftware", ValueType::STRING, &hSoftware, false);

        for (size_t i = 0; i<softwarePackagePtr.children.size();i++){

        if (softwarePackagePtr.children[i].name == "Certification") {
                    addCertification(softwarePackagePtr.children[i]);
                } 
    }
}

void IPCHistoryRecord:: addCertification(TreeNode &certificationPtr) {
    // Assuming certificationPtr has the necessary attributes
    string status = certificationPtr.attributes[0].second;

    if (status == "NONE") {
        certificationStatus = NONE;
    } else if (status == "SELFTEST") {
        certificationStatus = SELFTEST;
    } else if (status == "APPROVED") {
        certificationStatus = APPROVED;
    } else if (status == "RELEASED") {
        certificationStatus = RELEASED;
    } else {
        cerr << "Unknown certification status: " << status << endl;
        return; // or handle error appropriately
    }

    // Add attribute to the GUIComponent
    // addAttr("certificationStatus", ValueType::STRING, &status, false);
}


void IPCHistoryRecord::IPCHistoryRecordDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "HistoryRecord [ ";
    cout << "hNumber = " << hNumber << ", ";
    cout << "hOrigination = " << hOrigination << ", ";
    cout << "hSoftware = " << hSoftware << ", ";
    cout << "hLastChange = " << hLastChange;
    cout << " ]" << endl;
    cout << indent <<indent << "Filerevision [" ;
    cout << "fileRevisionId = " << fileRevisionId << ", ";
    cout << "comment = " << comment << ", ";
    cout << "label = " << label << "]" << endl;

    cout << indent <<indent << indent<< "SoftwarePackage [";
    cout << "name = "<< sName << ", ";
    cout << "revision = " << sRevision << ", "; 
    cout << "vendor = " << sVendor << "]" << endl;
    cout << indent << indent <<indent << indent<< "Certification [ CetificationStatus = "; 
    cout << (certificationStatus == NONE ? "NONE" :
                certificationStatus == SELFTEST ? "SELFTEST" :
                certificationStatus == APPROVED ? "APPROVED" :
                certificationStatus == RELEASED ? "RELEASED" : "UNKNOWN") << "]" << endl;

    // cout << certificationstatus << ";


}

string IPCHistoryRecord::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<HistoryRecord "
        << "number=\"" << hNumber << "\" "
        << "origination=\"" << hOrigination << "\" "
        << "software=\"" << hSoftware << "\" "
        << "lastChange=\"" << hLastChange << "\">\n";

    oss << tab << "  <FileRevision "
        << "fileRevisionId=\"" << fileRevisionId << "\" "
        << "comment=\"" << comment << "\" "
        << "label=\"" << label << "\">\n";

    oss << tab << "     <SoftwarePackage "
        << "name=\"" << sName << "\" "
        << "revision=\"" << sRevision << "\" "
        << "vendor=\"" << sVendor << "\">\n";

    oss << tab << "         <Certification certificationStatus=\""
        << (certificationStatus == NONE ? "NONE" :
            certificationStatus == SELFTEST ? "SELFTEST" :
            certificationStatus == APPROVED ? "APPROVED" :
            certificationStatus == RELEASED ? "RELEASED" : "UNKNOWN") 
        <<"\"/>\n";

    oss << tab << "     </SoftwarePackage>\n";
    oss << tab << " </FileRevision>\n";
    oss << tab << "</HistoryRecord>\n";

    return oss.str();
}


