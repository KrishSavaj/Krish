#include <sstream>
#include "./include/ipc_logistic_header.h"


using namespace std;   


Role::Role(TreeNode &rolePtr) {
    // Assign values to class variables first   
    roleId = rolePtr.attributes[0].second;
    string roleFunctionStr = rolePtr.attributes[1].second;  
    if (roleFunctionStr == "SENDER") {
        roleFunction = RoleFunctions::SENDER;
    } else if (roleFunctionStr == "OWNER") {
        roleFunction = RoleFunctions::OWNER;
    }else if (roleFunctionStr == "RECEIVER") {
        roleFunction = RoleFunctions::RECEIVER;
    }else if (roleFunctionStr == "DESIGNER") {
        roleFunction = RoleFunctions::DESIGNER;
    }else if (roleFunctionStr == "ENGINEER") {
        roleFunction = RoleFunctions::ENGINEER;
    }else if (roleFunctionStr == "BUYER") {
        roleFunction = RoleFunctions::BUYER;
    }else if (roleFunctionStr == "CUSTOMERSERVICE") {
        roleFunction = RoleFunctions::CUSTOMERSERVICE;
    }else if (roleFunctionStr == "DELIVERTO") {
        roleFunction = RoleFunctions::DELIVERTO;
    }else if (roleFunctionStr == "BILLTO") {
        roleFunction = RoleFunctions::BILLTO;
    }
    else if(roleFunctionStr == "OTHER") {
        roleFunction = RoleFunctions::OTHER;
    } 
    if(rolePtr.attributes.size() ==3){
    description = rolePtr.attributes[2].second;
    }
    if(rolePtr.attributes.size() ==4){
    publicKey = rolePtr.attributes[3].second;
    }
    if(rolePtr.attributes.size() ==5){
    authority = rolePtr.attributes[4].second;
    }
}

string Role::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;  

    oss << tab << "<Role "  
        << "roleId=\"" << roleId << "\" "
        << "roleFunction=\"" << magic_enum::enum_name(roleFunction) << "\" "
        << "description=\"" << description << "\" "
        << "publicKey=\"" << publicKey << "\" "
        << "authority=\"" << authority << "\" "
        << "/>\n";
    return oss.str();

}

void Role::RoleDisplay(int depth) {
    std::string tab(depth, ' ');
    cout << tab << "Role ID: " << roleId << endl;
    cout << tab << "Role Function: " << magic_enum::enum_name(roleFunction) << endl;
    cout << tab << "Description: " << description << endl;
    cout << tab << "Public Key: " << publicKey << endl;
    cout << tab << "Authority: " << authority << endl;
}


Enterprise::Enterprise(TreeNode &enterprisePtr) {

    // Assign values to class variables first



        std::unordered_map<std::string, std::string*> fieldMap = {
            {"id",     &enterpriseId},
            {"name",   &enterpriseName},
            {"code",             &code},
            {"codeType",         &codeType},
            {"address1",         &address1},
            {"address2",         &address2},
            {"city",             &city},
            {"stateProvince",    &stateProvince},
            {"country",          &country},
            {"postalCode",       &postalCode},
            {"phone",            &phone},
            {"fax",              &fax},
            {"email",            &email},
            {"url",              &url}
        };
        for (size_t i = 0; i < enterprisePtr.attributes.size(); ++i) {
        const std::string& key = enterprisePtr.attributes[i].first;
        const std::string& value = enterprisePtr.attributes[i].second;

        auto it = fieldMap.find(key);
        if (it != fieldMap.end()) {
            *(it->second) = value;
        }
    }


    // Add attributes to the GUIComponent
    // addAttr("enterpriseId", ValueType::STRING, &enterpriseId, false);
    // addAttr("enterpriseName", ValueType::STRING, &enterpriseName, false);
    // addAttr("code", ValueType::STRING, &code, false);

}

string Enterprise::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    
    oss << tab << "<Enterprise "
        << "enterpriseId=\"" << enterpriseId << "\" "
        << "enterpriseName=\"" << enterpriseName << "\" "
        << "code=\"" << code << "\" "
        << "codeType=\"" << codeType << "\" "
        << "address1=\"" << address1 << "\" "
        << "address2=\"" << address2 << "\" "
        << "city=\"" << city << "\" "
        << "stateProvince=\"" << stateProvince << "\" "
        << "country=\"" << country << "\" "
        << "postalCode=\"" << postalCode << "\" "
        << "phone=\"" << phone << "\" "
        << "fax=\"" << fax << "\" "
        << "email=\"" << email << "\" "
        << "url=\"" << url << "\" "
        << "/>\n";
    return oss.str();

}

void Enterprise::EnterpriseDisplay(int depth) {
    std::string tab(depth, ' ');
    cout << tab << "id: " << enterpriseId << endl;       
    cout << tab << "Enterprise Name: " << enterpriseName << endl;
    cout << tab << "Code: " << code << endl;
    cout << tab << "Code Type: " << codeType << endl;       
    cout << tab << "Address 1: " << address1 << endl;
    cout << tab << "Address 2: " << address2 << endl;
    cout << tab << "City: " << city << endl;
    cout << tab << "State/Province: " << stateProvince << endl;
    cout << tab << "Country: " << country << endl;
    cout << tab << "Postal Code: " << postalCode << endl;
    cout << tab << "Phone: " << phone << endl;
    cout << tab << "Fax: " << fax << endl;
    cout << tab << "Email: " << email << endl;
    cout << tab << "URL: " << url << endl;
}


Person::Person(TreeNode &personPtr) {

    // Assign values to class variables first
    if (personPtr.attributes.size() > 0) personName = personPtr.attributes[0].second;
    if (personPtr.attributes.size() > 1) eenterpriseRef = personPtr.attributes[1].second;
    if (personPtr.attributes.size() > 2) roleRef = personPtr.attributes[2].second;
    if (personPtr.attributes.size() > 3) email = personPtr.attributes[3].second;
    if (personPtr.attributes.size() > 4) phone = personPtr.attributes[4].second;
    if (personPtr.attributes.size() > 5) fax = personPtr.attributes[5].second;
    if (personPtr.attributes.size() > 6) mailstop = personPtr.attributes[6].second;
    if (personPtr.attributes.size() > 7) publicKey = personPtr.attributes[7].second;
    if (personPtr.attributes.size() > 8) title = personPtr.attributes[8].second;

    



}

string Person::toXML(int indent) {

    std::string tab(indent, ' ');
    ostringstream oss;  

    oss << tab << "<Person "
        << "name=\"" << personName << "\" "
        << "enterpriseRef=\"" << eenterpriseRef << "\" "
        << "title=\"" << title << "\" "
        << "email=\"" << email << "\" "
        << "phone=\"" << phone << "\" "
        << "fax=\"" << fax << "\" "
        << "mailstop=\"" << mailstop << "\" "
        << "publicKey=\"" << publicKey << "\" "
        << "roleRef=\"" << roleRef << "\" "
        << "/>\n";
    return oss.str();
}

void Person::PersonDisplay(int depth) {
    std::string tab(depth, ' ');
    cout << tab << "Person Name: " << personName << endl;
    cout << tab << "Enterprise Reference: " << eenterpriseRef << endl;
    cout << tab << "Title: " << title << endl;
    cout << tab << "Email: " << email << endl;
    cout << tab << "Phone: " << phone << endl;
    cout << tab << "Fax: " << fax << endl;
    cout << tab << "Mailstop: " << mailstop << endl;
    cout << tab << "Public Key: " << publicKey << endl;
    cout << tab << "Role Reference: " << roleRef << endl;
}

void IPCLogisticHeader::addRole(TreeNode &rolePtr) {
    Role* newRole = new Role(rolePtr);
    // cout << "Role added with ID: "  << endl;
    roles.push_back(newRole);
    // addAttr("role", ValueType::OBJECT, &newRole, false); // Assuming GUIComponent has a method to add objects
}
void IPCLogisticHeader::addEnterprise(TreeNode &enterprisePtr) {
    Enterprise* newEnterprise =  new Enterprise(enterprisePtr);
    enterprises.push_back(newEnterprise);
    // addAttr("enterprise", ValueType::OBJECT, &newEnterprise, false); // Assuming GUIComponent has a method to add objects
}
void IPCLogisticHeader::addPerson(TreeNode &personPtr) {
    Person* newPerson = new Person(personPtr);
    persons.push_back(newPerson);
    // addAttr("person", ValueType::OBJECT, &newPerson, false); // Assuming GUIComponent has a method to add objects
}

IPCLogisticHeader::IPCLogisticHeader(TreeNode &logisticHeaderPtr) {
    // Parse roles
    for (size_t i = 0; i<logisticHeaderPtr.children.size();i++) {
        if (logisticHeaderPtr.children[i].name == "Role") {
            // cout << "Role found" << endl;
            addRole(logisticHeaderPtr.children[i]);
        }
        if (logisticHeaderPtr.children[i].name== "Enterprise") {
            addEnterprise(logisticHeaderPtr.children[i]);
        }
        else if(logisticHeaderPtr.children[i].name == "Person") {
            addPerson(logisticHeaderPtr.children[i]);
        }
        
}
}
string IPCLogisticHeader::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;  
    oss << tab << "<LogisticHeader>\n";
    //  cout << "Role found to XML"<<roles.size() << endl;
    for (size_t i = 0; i<roles.size();i++) {
        // cout << "Role found to XML" << endl;
        oss << roles[i]->toXML(indent + 4);
    }
    for (const auto& enterprise : enterprises) {
        oss << enterprise->toXML(indent + 4);
    }
    for (const auto& person : persons) {
        oss << person->toXML(indent + 4);
    }
    oss << tab << "</LogisticHeader>\n";
    return oss.str();
}
void IPCLogisticHeader::IPCLogisticHeaderDisplay(int depth) {

    std::string tab(depth, ' ');
    cout << tab << "Logistic Header:" << endl;
    cout << tab << "Roles:" << endl;
    for (const auto& role : roles) {
        role->RoleDisplay(depth + 1);
    }
    cout << tab << "Enterprises:" << endl;
    for (const auto& enterprise : enterprises) {
        enterprise->EnterpriseDisplay(depth + 1);
    }
    cout << tab << "Persons:" << endl;
    for (const auto& person : persons) {
        person->PersonDisplay(depth + 1);
    }
}
