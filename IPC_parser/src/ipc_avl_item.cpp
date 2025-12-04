#include <sstream>
#include "./include/ipc_avl_item.h"

using namespace std;

AvlVendor::AvlVendor(TreeNode &avlVendorPtr) {
    for (size_t i = 0; i < avlVendorPtr.attributes.size(); i++) {
        // cout << "AvlVendor Attribute: " << avlVendorPtr.attributes[i].first << " = " << avlVendorPtr.attributes[i].second << endl;
        if(avlVendorPtr.attributes[i].first == "enterpriseRef") {
            enterpriseRef = avlVendorPtr.attributes[i].second;
        }
    }
}



void AvlVendor::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "AvlVendor: " << endl;
    cout << indent << "enterpriseRef: " << enterpriseRef << endl;
}

string AvlVendor::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<AvlVendor "
        << "enterpriseRef=\"" << enterpriseRef << "\"/>\n";

    return oss.str();
}


Avlmpn::Avlmpn(TreeNode &avlmpnPtr) {

    for (size_t i = 0; i < avlmpnPtr.attributes.size(); i++) {
        // cout << "Avlmpn Attribute: " << avlmpnPtr.attributes[i].first << " = " << avlmpnPtr.attributes[i].second << endl;
        if(avlmpnPtr.attributes[i].first == "name") {
            name = avlmpnPtr.attributes[i].second;
        } else if(avlmpnPtr.attributes[i].first == "rank") {
            rank = stoi(avlmpnPtr.attributes[i].second);
        } else if(avlmpnPtr.attributes[i].first == "cost") {
            cost = stod(avlmpnPtr.attributes[i].second);
        } else if(avlmpnPtr.attributes[i].first == "moistureSensitivity") {
            std::string msStr = avlmpnPtr.attributes[i].second;
            if (msStr == "UNLIMITED") {
                moistureSensitivity = moistureSensitivityDuration::UNLIMITED;
            } else if (msStr == "1_YEAR") {
                moistureSensitivity = moistureSensitivityDuration::YEAR_1;
            } else if (msStr == "4_WEEKS") {
                moistureSensitivity = moistureSensitivityDuration::WEEKS_4;
            } else if (msStr == "168_HOURS") {
                moistureSensitivity = moistureSensitivityDuration::HOURS_168;
            } else if (msStr == "72_HOURS") {
                moistureSensitivity = moistureSensitivityDuration::HOURS_72;
            } else if (msStr == "48_HOURS") {
                moistureSensitivity = moistureSensitivityDuration::HOURS_48;
            } else if (msStr == "24_HOURS") {
                moistureSensitivity = moistureSensitivityDuration::HOURS_24;
            } else if (msStr == "BAKE") {
                moistureSensitivity = moistureSensitivityDuration::BAKE;
            }
        } else if(avlmpnPtr.attributes[i].first == "availability") {
            availability = (avlmpnPtr.attributes[i].second == "true");
        } else if(avlmpnPtr.attributes[i].first == "other") {
            other = avlmpnPtr.attributes[i].second;
        }
    }
  
}

void Avlmpn::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Avlmpn: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "rank: " << rank << endl;
    cout << indent << "cost: " << cost << endl;
    cout << indent << "moistureSensitivity: " << magic_enum::enum_name(moistureSensitivity) << endl;
    cout << indent << "availability: " << (availability ? "true" : "false") << endl;
    cout << indent << "other: " << other << endl;
}

string Avlmpn::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Avlmpn "
        << "name=\"" << name << "\" "
        << "rank=\"" << rank << "\" "
        << "cost=\"" << cost << "\" "
        << "moistureSensitivity=\"" << magic_enum::enum_name(moistureSensitivity) << "\" "
        << "availability=\"" << (availability ? "true" : "false") << "\" "
        << "other=\"" << other << "\"/>\n";

    return oss.str();
}

AvlVmpn::AvlVmpn(TreeNode &avlVmpnPtr) {

    for (size_t i = 0; i < avlVmpnPtr.attributes.size(); i++) {
        // cout << "AvlVmpn Attribute: " << avlVmpnPtr.attributes[i].first << " = " << avlVmpnPtr.attributes[i].second << endl;
        if(avlVmpnPtr.attributes[i].first == "evplVendor") {
            evplVendor = avlVmpnPtr.attributes[i].second;
        } else if(avlVmpnPtr.attributes[i].first == "evplMpn") {
            evplMpn = avlVmpnPtr.attributes[i].second;
        } else if(avlVmpnPtr.attributes[i].first == "qualified") {
            qualified = (avlVmpnPtr.attributes[i].second == "true");
        } else if(avlVmpnPtr.attributes[i].first == "choosen") {
            choosen = (avlVmpnPtr.attributes[i].second == "true");
        }
    }

    for (size_t i = 0; i < avlVmpnPtr.children.size(); i++) {
        if(avlVmpnPtr.children[i].name == "Avlmpn") {
            Avlmpn* mpn = new Avlmpn(avlVmpnPtr.children[i]);
            avlmpns.push_back(mpn);
        } else if(avlVmpnPtr.children[i].name == "AvlVendor") {
            AvlVendor* vendor = new AvlVendor(avlVmpnPtr.children[i]);
            avlVendors.push_back(vendor);
        }
    }
}

void AvlVmpn::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "AvlVmpn: " << endl;
    cout << indent << "evplVendor: " << evplVendor << endl;
    cout << indent << "evplMpn: " << evplMpn << endl;
    cout << indent << "qualified: " << (qualified ? "true" : "false") << endl;
    cout << indent << "choosen: " << (choosen ? "true" : "false") << endl;

    for(size_t i=0;i<avlmpns.size();i++){
        avlmpns[i]->display(depth+1);
    }
    for(size_t i=0;i<avlVendors.size();i++){
        avlVendors[i]->display(depth+1);
    }
}

string AvlVmpn::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<AvlVmpn "
        << "evplVendor=\"" << evplVendor << "\" "
        << "evplMpn=\"" << evplMpn << "\" "
        << "qualified=\"" << (qualified ? "true" : "false") << "\" "
        << "choosen=\"" << (choosen ? "true" : "false") << "\">\n";

    for(size_t i=0;i<avlmpns.size();i++){
        oss << avlmpns[i]->toXML(depth+1);
    }
    for(size_t i=0;i<avlVendors.size();i++){
        oss << avlVendors[i]->toXML(depth+1);
    }

    oss << tab << "</AvlVmpn>\n";

    return oss.str();
}

IPCAvlItem ::IPCAvlItem(TreeNode &avlItemPtr) {
    for (size_t i = 0; i < avlItemPtr.attributes.size(); i++) {
        // cout << "IPCAvlItem Attribute: " << avlItemPtr.attributes[i].first << " = " << avlItemPtr.attributes[i].second << endl;
        if(avlItemPtr.attributes[i].first == "OEMDesignNumber") {
            OEMDesignNumber = avlItemPtr.attributes[i].second;
        }
    }

    for (size_t i = 0; i < avlItemPtr.children.size(); i++) {
        if(avlItemPtr.children[i].name == "AvlVmpn") {
            AvlVmpn* vmpn = new AvlVmpn(avlItemPtr.children[i]);
            avlVmpns.push_back(vmpn);
        }
    }
}

void IPCAvlItem::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "IPCAvlItem: " << endl;
    cout << indent << "OEMDesignNumber: " << OEMDesignNumber << endl;

    for(size_t i=0;i<avlVmpns.size();i++){
        avlVmpns[i]->display(depth+1);
    }
}

string IPCAvlItem::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<AvlItem "
        << "OEMDesignNumber=\"" << OEMDesignNumber << "\"/>\n";

    return oss.str();
}
