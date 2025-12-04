#ifndef IPC_AVL_ITEM_H
#define IPC_AVL_ITEM_H


// #include "../../../PCBBaseline/include/GUIComponent.h"
// #include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"

class AvlVendor{

private:
    std::string enterpriseRef;

public:
    AvlVendor(TreeNode &avlVendorPtr);
    string toXML(int depth);
    void display(int depth);
};


class Avlmpn{
private:
    enum class moistureSensitivityDuration {
        UNLIMITED,
        YEAR_1,
        WEEKS_4,
        HOURS_168,
        HOURS_72,
        HOURS_48,
        HOURS_24,
        BAKE
    };
    

    std::string name;
    int rank;
    double cost;
    moistureSensitivityDuration moistureSensitivity;
    bool availability;
    std::string other;
    
public:
    Avlmpn(TreeNode &avlmpnPtr);
    string toXML(int depth);
    void display(int depth);

};

class  AvlVmpn{
private:
    std::string evplVendor;
    std::string evplMpn;
    bool qualified;
    bool choosen;
    vector<Avlmpn*> avlmpns;
    vector<AvlVendor*> avlVendors;


public:
    AvlVmpn(TreeNode &avlVmpnPtr);
    string toXML(int depth);
    void display(int depth);
};





class IPCAvlItem{

private:
    std::string OEMDesignNumber;
    vector<AvlVmpn*> avlVmpns;



public:
    IPCAvlItem(TreeNode &avlItemPtr);
    string toXML(int depth);
    void display(int depth);
};



#endif // IPC_AVL_ITEM_H