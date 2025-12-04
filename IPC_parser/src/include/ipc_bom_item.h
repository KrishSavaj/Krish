#ifndef  IPC_BOM_ITEM_H
#define IPC_BOM_ITEM_H

// #include "../../../PCBBaseline/include/GUIComponent.h"
#include "../../../PCBBaseline/include/magic_enum.hpp"
#include "tree_node.h"

// Enum for BOM Item Category
enum class BOMCategory {
    ELECTRICAL,
    PROGRAMMABLE,
    MECHANICAL,
    MATERIAL,
    DOCUMENT,
    UNKNOWN
};


class IPCDocDes{
private:
    std:: string name;
    std:: string layerRef;

public:
    IPCDocDes(TreeNode &docDesPtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCMatDes{
private:
    std::string name;
    std::string layeRef;
public:
    IPCMatDes(TreeNode &matDesPtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCTuning{
private:
    std::string value;
    std::string comments;
public:
    IPCTuning(TreeNode &tuningPtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCFiles{
private:
    std::string name;
    std::string crc;
public:
    IPCFiles(TreeNode &filesPtr);
    string toXML(int depth);
    void display(int depth);

};

class IPCCachedFirmware{
private:
    std::string hexEncodeBinary;

public:
    IPCCachedFirmware(TreeNode &cachedFirmwarePtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCFirmwareRef{
private:
    std::string id;
public:
    IPCFirmwareRef(TreeNode &firmwareRefPtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCFirmware{
private:
    std:: string progName;
    std:: string progVersion;
    vector<IPCFiles*> files;
    vector<IPCCachedFirmware*> cachedFirmware;
    vector<IPCFirmwareRef*> firmwareRef;

public:
    IPCFirmware(TreeNode &firmwarePtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCRefDes{
private:
    std::string name;
    std::string packageRef;
    bool populate;
    std::string layeRef;
    vector<IPCTuning*> tuning;
    vector<IPCFirmware*> firmware;
    // vector<IPCFirmwareRef*> firmwareRef;

public:
    IPCRefDes(TreeNode &refDesPtr);
    string toXML(int depth);
    void display(int depth);
};


class IPCToolDes{

private:
    std:: string name;
    std:: string layeRef;

public:
    IPCToolDes(TreeNode &toolDesPtr);
    string toXML(int depth);
    void display(int depth);

};
class Measured{

private:
    std::string definitionSource;
    std::string measuredCharacteristicName;
    double measuredCharacteristicValue;
    std::string engineeringUnitOfMeasure;
    double engineeringNegativeTolerance;
    double engineeringPositiveTolerance;
public:
    Measured(TreeNode &measuredPtr);
    string toXML(int depth);
    void display(int depth);
};

class Ranged{
private:
    std::string definitionSource;
    std::string rangedCharacteristicName;
    double rangedCharacteristicLowerValue;
    double rangedCharacteristicUpperValue;
    std::string engineeringUnitOfMeasure;
    double engineeringNegativeTolerance;
    double engineeringPositiveTolerance;

public:
    Ranged(TreeNode &rangedPtr);
    string toXML(int depth);
    void display(int depth);

};
class Enumerated{
private:
    std:: string definitionSource;
    std:: string enumeratedCharacteristicName;
    std:: string enumeratedCharacteristicValue;

public:
    Enumerated(TreeNode &enumeratedPtr);
    string toXML(int depth);
    void display(int depth);

};
class Textual{
private:
    std:: string definitionSource;
    std:: string textualCharacteristicName;
    std:: string textualCharacteristicValue;

public:
    Textual(TreeNode &textualPtr);
    string toXML(int depth);
    void display(int depth);
};

class IPCCharacteristic{

private:
    std:: string category;
    vector<Measured*> measured;
    vector<Ranged*> ranged;
    vector<Enumerated*> enumerated;
    vector<Textual*> textual;

public:
    IPCCharacteristic(TreeNode &characteristicPtr);
    string toXML(int depth);
    void display(int depth);

};






// class IPCBOMItem // : public virtual GUIComponent {
class IPCBOMItem {

private:
    BOMCategory category;
    std:: string OEMDesignNumberRef;
    std:: string quantity;
    int pinCount;
    std:: string internalPartNumber;
    std:: string description;
    
    vector<IPCDocDes*> docDes;
    vector<IPCMatDes*> matDes;
    vector<IPCToolDes*> toolDes;
    vector<IPCRefDes*> refDes;
    vector<IPCCharacteristic*> characteristic;

public:
    IPCBOMItem(TreeNode &bomItemPtr);
    void IPCBOMItemDisplay(int depth);
    string toXML(int depth);


};


#endif //  IPC_BOM_ITEM_H