#ifndef IPC_DICTIONAY_FIRMWARE_H
#define IPC_DICTIONAY_FIRMWARE_H



#include "tree_node.h"
#include "ipc_shapes.h"
#include "ipc_dictionary_user.h"
// #include "../../../PCBBaseline/include/GUIComponent.h"


class CacheFirmware{

    private:

    std::string hexEncodedBinary;

    public:
        CacheFirmware(TreeNode &cacheFirmwarePtr);
        std::string toXML(int indent);
        void CacheFirmwareDisplay(int depth);

};


class EntryFirmware{
    private:
        std::string id;
        vector<CacheFirmware*> cacheFirmwares;

    public:
        EntryFirmware(TreeNode &entryFirmwarePtr);
        std::string toXML(int indent);
        void EntryFirmwareDisplay(int depth);     
};

class FirmwareRef{

    private:    
        std::string id;
    public:
        FirmwareRef(TreeNode &firmwareRefPtr);
        std::string toXML(int indent);
        void FirmwareRefDisplay(int depth);
};

class DictionaryFirmware {

    private:
    vector<EntryFirmware*> entryFirmwares;
    public:
        DictionaryFirmware(TreeNode &dictionaryFirmwarePtr);
        std::string toXML(int indent);
        void DictionaryFirmwareDisplay(int depth);
};

#endif // IPC_DICTIONAY_FIRMWARE_H