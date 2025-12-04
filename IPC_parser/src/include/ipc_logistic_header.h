#ifndef  IPC_LOGISTIC_HEADER_H
#define  IPC_LOGISTIC_HEADER_H  



#include "tree_node.h"
#include <vector>
// #include "../../../PCBBaseline/include/GUIComponent.h" 
#include "../../../PCBBaseline/include/magic_enum.hpp"

class Role  { // : public virtual GUIComponent 

    private:
        enum class RoleFunctions {
            SENDER,
            OWNER,
            RECEIVER,
            DESIGNER,
            ENGINEER,
            BUYER,
            CUSTOMERSERVICE,
            DELIVERTO,
            BILLTO,
            OTHER
        };
        std::string roleId;
        RoleFunctions roleFunction;
        std::string description;
        std::string publicKey;
        std::string authority;



    public:
        Role(TreeNode &rolePtr);
        std::string toXML(int indent);
        void RoleDisplay(int depth);

};

class Enterprise {// : public virtual GUIComponent {

    private:
        std::string enterpriseId;
        std::string enterpriseName;
        std::string code;
        std::string codeType;
        std::string address1;
        std::string address2;
        std::string city;
        std::string stateProvince;
        std::string country;
        std::string postalCode;
        std::string phone;
        std::string fax;
        std::string email;
        std::string url;

        //         std::unordered_map<std::string, std::string*> fieldMap = {
        //     {"enterpriseId",     &enterpriseId},
        //     {"enterpriseName",   &enterpriseName},
        //     {"code",             &code},
        //     {"codeType",         &codeType},
        //     {"address1",         &address1},
        //     {"address2",         &address2},
        //     {"city",             &city},
        //     {"stateProvince",    &stateProvince},
        //     {"country",          &country},
        //     {"postalCode",       &postalCode},
        //     {"phone",            &phone},
        //     {"fax",              &fax},
        //     {"email",            &email},
        //     {"url",              &url}
        // };
    
    public:
        Enterprise(TreeNode &enterprisePtr);
        std::string toXML(int indent);
        void EnterpriseDisplay(int depth);

    
};

class Person {// : public virtual GUIComponent {

    private:

        std::string personName;
        std::string eenterpriseRef;
        std::string title;
        std::string email;
        std::string phone;
        std::string fax;
        std::string mailstop;
        std::string publicKey;
        std::string roleRef;
    public:
        Person(TreeNode &personPtr);
        std::string toXML(int indent);
        void PersonDisplay(int depth);

};

class IPCLogisticHeader {// : public virtual GUIComponent {

    private:
    std::vector<Role*> roles;
    std::vector<Enterprise*> enterprises;
    std::vector<Person*> persons;


    public:
        IPCLogisticHeader(TreeNode &logisticHeaderPtr);
        std::string toXML(int indent);
        void IPCLogisticHeaderDisplay(int depth);
        void addRole(TreeNode &rolePtr);
        void addEnterprise(TreeNode &enterprisePtr);
        void addPerson(TreeNode &personPtr);
};

#endif // IPC_LOGISTIC_HEADER_H