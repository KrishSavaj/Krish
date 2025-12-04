#include <sstream>
#include "./include/ipc_bom_item.h"

using namespace std;
using namespace magic_enum;







IPCDocDes::IPCDocDes(TreeNode &docDesPtr) {
    // cout << "Hello DocDes ....."<<endl
    // cout << "DocDes name: " << name << endl;
    for (size_t i = 0; i < docDesPtr.attributes.size(); i++) {
        // cout << "DocDes Attribute: " << docDesPtr.attributes[i].first << " = " << docDesPtr.attributes[i].second << endl;
        if(docDesPtr.attributes[i].first == "name") {
            name = docDesPtr.attributes[i].second;
        } else if(docDesPtr.attributes[i].first == "layerRef") {
            layerRef = docDesPtr.attributes[i].second;
        }
    }

}

void IPCDocDes::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "DocDes: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "layerRef: " << layerRef << endl;
}

string IPCDocDes::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<DocDes "
        << "name=\"" << name << "\" "
        << "layerRef=\"" << layerRef << "\"/>\n";

    return oss.str();
}

IPCMatDes::IPCMatDes(TreeNode &matDesPtr) {
    // cout << "Hello MatDes ....."<<endl
    // cout << "MatDes name: " << name << endl;
    for (size_t i = 0; i < matDesPtr.attributes.size(); i++) {
        // cout << "MatDes Attribute: " << matDesPtr.attributes[i].first << " = " << matDesPtr.attributes[i].second << endl;
        if(matDesPtr.attributes[i].first == "name") {
            name = matDesPtr.attributes[i].second;
        } else if(matDesPtr.attributes[i].first == "layerRef") {
            layeRef = matDesPtr.attributes[i].second;
        }
    }

}

void IPCMatDes::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "MatDes: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "layerRef: " << layeRef << endl;
}

string IPCMatDes::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<MatDes "
        << "name=\"" << name << "\" "
        << "layerRef=\"" << layeRef << "\"/>\n";

    return oss.str();
}

IPCTuning ::IPCTuning(TreeNode &tuningPtr) {
    // cout << "Hello Tuning ....."<<endl
    // cout << "Tuning name: " << name << endl;
    for (size_t i = 0; i < tuningPtr.attributes.size(); i++) {
        // cout << "Tuning Attribute: " << tuningPtr.attributes[i].first << " = " << tuningPtr.attributes[i].second << endl;
        if(tuningPtr.attributes[i].first == "value") {
            value = tuningPtr.attributes[i].second;
        } else if(tuningPtr.attributes[i].first == "comments") {
            comments = tuningPtr.attributes[i].second;
        }
    }

}

void IPCTuning::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Tuning: " << endl;
    cout << indent << "value: " << value << endl;
    cout << indent << "comments: " << comments << endl;
}

string IPCTuning::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Tuning "
        << "value=\"" << value << "\" "
        << "comments=\"" << comments << "\"/>\n";

    return oss.str();
}



IPCFiles::IPCFiles(TreeNode &filesPtr) {
    // cout << "Hello Files ....."<<endl
    // cout << "Files name: " << name << endl;
    for (size_t i = 0; i < filesPtr.attributes.size(); i++) {
        // cout << "Files Attribute: " << filesPtr.attributes[i].first << " = " << filesPtr.attributes[i].second << endl;
        if(filesPtr.attributes[i].first == "name") {
            name = filesPtr.attributes[i].second;
        } else if(filesPtr.attributes[i].first == "crc") {
            crc = filesPtr.attributes[i].second;
        }
    }

}

void IPCFiles::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Files: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "crc: " << crc << endl;
}

string IPCFiles::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Files "
        << "name=\"" << name << "\" "
        << "crc=\"" << crc << "\"/>\n";

    return oss.str();
}

IPCCachedFirmware::IPCCachedFirmware(TreeNode &cachedFirmwarePtr) {
    // cout << "Hello CachedFirmware ....."<<endl
    // cout << "CachedFirmware name: " << name << endl;
    for (size_t i = 0; i < cachedFirmwarePtr.attributes.size(); i++) {
        // cout << "CachedFirmware Attribute: " << cachedFirmwarePtr.attributes[i].first << " = " << cachedFirmwarePtr.attributes[i].second << endl;
        if(cachedFirmwarePtr.attributes[i].first == "hexEncodeBinary") {
            hexEncodeBinary = cachedFirmwarePtr.attributes[i].second;
        }
    }

}


void IPCCachedFirmware::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "CachedFirmware: " << endl;
    cout << indent << "hexEncodeBinary: " << hexEncodeBinary << endl;
}

string IPCCachedFirmware::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<CachedFirmware "
        << "hexEncodeBinary=\"" << hexEncodeBinary << "\"/>\n";

    return oss.str();
}

IPCFirmwareRef::IPCFirmwareRef(TreeNode &firmwareRefPtr) {
    // cout << "Hello FirmwareRef ....."<<endl
    // cout << "FirmwareRef name: " << name << endl;
    for (size_t i = 0; i < firmwareRefPtr.attributes.size(); i++) {
        // cout << "FirmwareRef Attribute: " << firmwareRefPtr.attributes[i].first << " = " << firmwareRefPtr.attributes[i].second << endl;
        if(firmwareRefPtr.attributes[i].first == "id") {
            id = firmwareRefPtr.attributes[i].second;
        }
    }

}

void IPCFirmwareRef::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "FirmwareRef: " << endl;
    cout << indent << "id: " << id << endl;
}

string IPCFirmwareRef::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<FirmwareRef "
        << "id=\"" << id << "\"/>\n";

    return oss.str();
}


IPCFirmware::IPCFirmware(TreeNode &firmwarePtr) {
    // cout << "Hello Firmware ....."<<endl
    // cout << "Firmware name: " << name << endl;
    for (size_t i = 0; i < firmwarePtr.attributes.size(); i++) {
        // cout << "Firmware Attribute: " << firmwarePtr.attributes[i].first << " = " << firmwarePtr.attributes[i].second << endl;
        if(firmwarePtr.attributes[i].first == "progName") {
            progName = firmwarePtr.attributes[i].second;
        } else if(firmwarePtr.attributes[i].first == "progVersion") {
            progVersion = firmwarePtr.attributes[i].second;
        }
    }
    for(size_t i =0;i<firmwarePtr.children.size();i++){
        if(firmwarePtr.children[i].name == "Files" ){
            files.push_back(new IPCFiles(firmwarePtr.children[i]));
        }
        else if(firmwarePtr.children[i].name == "CachedFirmware" ){
            cachedFirmware.push_back(new IPCCachedFirmware(firmwarePtr.children[i]));
        }
        else if(firmwarePtr.children[i].name == "FirmwareRef" ){
            firmwareRef.push_back(new IPCFirmwareRef(firmwarePtr.children[i]));
        }
    }

}

void IPCFirmware::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Firmware: " << endl;
    cout << indent << "progName: " << progName << endl;
    cout << indent << "progVersion: " << progVersion << endl;
    for(size_t i=0;i<files.size();i++){
        files[i]->display(depth+1);
    }
    for(size_t i=0;i<cachedFirmware.size();i++){
        cachedFirmware[i]->display(depth+1);
    }
}

string IPCFirmware::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Firmware "
        << "progName=\"" << progName << "\" "
        << "progVersion=\"" << progVersion << "\"/>\n";
    for(size_t i=0;i<files.size();i++){
        oss << files[i]->toXML(depth+1);
    }
    for(size_t i=0;i<cachedFirmware.size();i++){
        oss << cachedFirmware[i]->toXML(depth+1);
    }

    return oss.str();
}


IPCRefDes::IPCRefDes(TreeNode &refDesPtr) {
    // cout << "Hello RefDes ....."<<endl
    // cout << "RefDes name: " << name << endl;
    for (size_t i = 0; i < refDesPtr.attributes.size(); i++) {
        // cout << "RefDes Attribute: " << refDesPtr.attributes[i].first << " = " << refDesPtr.attributes[i].second << endl;
        if(refDesPtr.attributes[i].first == "name") {
            name = refDesPtr.attributes[i].second;
        } else if(refDesPtr.attributes[i].first == "packageRef") {
            packageRef = refDesPtr.attributes[i].second;
        }
        else if(refDesPtr.attributes[i].first == "populate") {
            populate = (refDesPtr.attributes[i].second == "true" || refDesPtr.attributes[i].second == "1");
        } else if(refDesPtr.attributes[i].first == "layerRef") {
            layeRef = refDesPtr.attributes[i].second;
        }
        
    }

    for(size_t i =0;i<refDesPtr.children.size();i++){
        if(refDesPtr.children[i].name == "Tunning" ){
            tuning.push_back(new IPCTuning(refDesPtr.children[i]));
        }
        else if(refDesPtr.children[i].name == "Firmware" ){
            firmware.push_back(new IPCFirmware(refDesPtr.children[i]));
        }
    }
    

}

void IPCRefDes::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "RefDes: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "packageRef: " << packageRef << endl;
    cout << indent << "populate: " << (populate ? "true" : "false") << endl;
    cout << indent << "layerRef: " << layeRef << endl;
}

string IPCRefDes::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<RefDes "
        << "name=\"" << name << "\" "
        << "packageRef=\"" << packageRef << "\" "
        << "populate=\"" << (populate ? "true" : "false") << "\" "
        << "layerRef=\"" << layeRef << "\"/>\n";
    for(size_t i=0;i<tuning.size();i++){
        oss << tuning[i]->toXML(depth+1);
    }
    for(size_t i=0;i<firmware.size();i++){
        oss << firmware[i]->toXML(depth+1);
    }
    


    return oss.str();
}




IPCToolDes::IPCToolDes(TreeNode &toolDesPtr) {
    // cout << "Hello ToolDes ....."<<endl
    // cout << "ToolDes name: " << name << endl;
    for (size_t i = 0; i < toolDesPtr.attributes.size(); i++) {
        // cout << "ToolDes Attribute: " << toolDesPtr.attributes[i].first << " = " << toolDesPtr.attributes[i].second << endl;
        if(toolDesPtr.attributes[i].first == "name") {
            name = toolDesPtr.attributes[i].second;
        } else if(toolDesPtr.attributes[i].first == "layerRef") {
            layeRef = toolDesPtr.attributes[i].second;
        }
    }

}

void IPCToolDes::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "ToolDes: " << endl;
    cout << indent << "name: " << name << endl;
    cout << indent << "layerRef: " << layeRef << endl;
}

string IPCToolDes::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<ToolDes "
        << "name=\"" << name << "\" "
        << "layerRef=\"" << layeRef << "\"/>\n";

    return oss.str();
}

Measured::Measured(TreeNode &measuredPtr) {
    // cout << "Hello Measured ....."<<endl
    // cout << "Measured name: " << name << endl;
    for (size_t i = 0; i < measuredPtr.attributes.size(); i++) {
        // cout << "Measured Attribute: " << measuredPtr.attributes[i].first << " = " << measuredPtr.attributes[i].second << endl;
        if(measuredPtr.attributes[i].first == "definitionSource") {
            definitionSource = measuredPtr.attributes[i].second;
        } else if(measuredPtr.attributes[i].first == "measuredCharacteristicName") {
            measuredCharacteristicName = measuredPtr.attributes[i].second;
        } else if(measuredPtr.attributes[i].first == "measuredCharacteristicValue") {
            measuredCharacteristicValue = stod(measuredPtr.attributes[i].second);
        }
        else if(measuredPtr.attributes[i].first == "engineeringUnitOfMeasure") {
            engineeringUnitOfMeasure = measuredPtr.attributes[i].second;
        } else if(measuredPtr.attributes[i].first == "engineeringNegativeTolerance") {
            engineeringNegativeTolerance = stod(measuredPtr.attributes[i].second);
        } else if(measuredPtr.attributes[i].first == "engineeringPositiveTolerance") {
            engineeringPositiveTolerance = stod(measuredPtr.attributes[i].second);
        }
    }

}

void Measured::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Measured: " << endl;
    cout << indent << "definitionSource: " << definitionSource << endl;
    cout << indent << "measuredCharacteristicName: " << measuredCharacteristicName << endl;
    cout << indent << "measuredCharacteristicValue: " << measuredCharacteristicValue << endl;
    cout << indent << "engineeringUnitOfMeasure: " << engineeringUnitOfMeasure << endl;
    cout << indent << "engineeringNegativeTolerance: " << engineeringNegativeTolerance << endl;
    cout << indent << "engineeringPositiveTolerance: " << engineeringPositiveTolerance << endl;
}

string Measured::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Measured "
        << "definitionSource=\"" << definitionSource << "\" "
        << "measuredCharacteristicName=\"" << measuredCharacteristicName << "\" "
        << "measuredCharacteristicValue=\"" << measuredCharacteristicValue << "\" "
        << "engineeringUnitOfMeasure=\"" << engineeringUnitOfMeasure << "\" "
        << "engineeringNegativeTolerance=\"" << engineeringNegativeTolerance << "\" "
        << "engineeringPositiveTolerance=\"" << engineeringPositiveTolerance << "\"/>\n";

    return oss.str();
}

Ranged::Ranged(TreeNode &rangedPtr) {
    // cout << "Hello Ranged ....."<<endl
    // cout << "Ranged name: " << name << endl;
    for (size_t i = 0; i < rangedPtr.attributes.size(); i++) {
        // cout << "Ranged Attribute: " << rangedPtr.attributes[i].first << " = " << rangedPtr.attributes[i].second << endl;
        if(rangedPtr.attributes[i].first == "definitionSource") {
            definitionSource = rangedPtr.attributes[i].second;
        } else if(rangedPtr.attributes[i].first == "rangedCharacteristicName") {
            rangedCharacteristicName = rangedPtr.attributes[i].second;
        } else if(rangedPtr.attributes[i].first == "rangedCharacteristicLowerValue") {
            rangedCharacteristicLowerValue = stod(rangedPtr.attributes[i].second);
        }
        else if(rangedPtr.attributes[i].first == "rangedCharacteristicUpperValue") {
            rangedCharacteristicUpperValue = stod(rangedPtr.attributes[i].second);
        } else if(rangedPtr.attributes[i].first == "engineeringUnitOfMeasure") {
            engineeringUnitOfMeasure = rangedPtr.attributes[i].second;
        } else if(rangedPtr.attributes[i].first == "engineeringNegativeTolerance") {
            engineeringNegativeTolerance = stod(rangedPtr.attributes[i].second);
        } else if(rangedPtr.attributes[i].first == "engineeringPositiveTolerance") {
            engineeringPositiveTolerance = stod(rangedPtr.attributes[i].second);
        }
    }

}

void Ranged::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Ranged: " << endl;
    cout << indent << "definitionSource: " << definitionSource << endl;
    cout << indent << "rangedCharacteristicName: " << rangedCharacteristicName << endl;
    cout << indent << "rangedCharacteristicLowerValue: " << rangedCharacteristicLowerValue << endl;
    cout << indent << "rangedCharacteristicUpperValue: " << rangedCharacteristicUpperValue << endl;
    cout << indent << "engineeringUnitOfMeasure: " << engineeringUnitOfMeasure << endl;
    cout << indent << "engineeringNegativeTolerance: " << engineeringNegativeTolerance << endl;
    cout << indent << "engineeringPositiveTolerance: " << engineeringPositiveTolerance << endl;
}

string Ranged::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Ranged "
        << "definitionSource=\"" << definitionSource << "\" "
        << "rangedCharacteristicName=\"" << rangedCharacteristicName << "\" "
        << "rangedCharacteristicLowerValue=\"" << rangedCharacteristicLowerValue << "\" "
        << "rangedCharacteristicUpperValue=\"" << rangedCharacteristicUpperValue << "\" "
        << "engineeringUnitOfMeasure=\"" << engineeringUnitOfMeasure << "\" "
        << "engineeringNegativeTolerance=\"" << engineeringNegativeTolerance << "\" "
        << "engineeringPositiveTolerance=\"" << engineeringPositiveTolerance << "\"/>\n";

    return oss.str();
}

Enumerated::Enumerated(TreeNode &enumeratedPtr) {
    // cout << "Hello Enumerated ....."<<endl
    // cout << "Enumerated name: " << name << endl;
    for (size_t i = 0; i < enumeratedPtr.attributes.size(); i++) {
        // cout << "Enumerated Attribute: " << enumeratedPtr.attributes[i].first << " = " << enumeratedPtr.attributes[i].second << endl;
        if(enumeratedPtr.attributes[i].first == "definitionSource") {
            definitionSource = enumeratedPtr.attributes[i].second;
        } else if(enumeratedPtr.attributes[i].first == "enumeratedCharacteristicName") {
            enumeratedCharacteristicName = enumeratedPtr.attributes[i].second;
        } else if(enumeratedPtr.attributes[i].first == "enumeratedCharacteristicValue") {
            enumeratedCharacteristicValue = enumeratedPtr.attributes[i].second;
        }
    }

}

void Enumerated::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Enumerated: " << endl;
    cout << indent << "definitionSource: " << definitionSource << endl;
    cout << indent << "enumeratedCharacteristicName: " << enumeratedCharacteristicName << endl;
    cout << indent << "enumeratedCharacteristicValue: " << enumeratedCharacteristicValue << endl;
}

string Enumerated::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Enumerated "
        << "definitionSource=\"" << definitionSource << "\" "
        << "enumeratedCharacteristicName=\"" << enumeratedCharacteristicName << "\" "
        << "enumeratedCharacteristicValue=\"" << enumeratedCharacteristicValue << "\"/>\n";

    return oss.str();
}

Textual::Textual(TreeNode &textualPtr) {
    // cout << "Hello Textual ....."<<endl
    // cout << "Textual name: " << name << endl;
    for (size_t i = 0; i < textualPtr.attributes.size(); i++) {
        // cout << "Textual Attribute: " << textualPtr.attributes[i].first << " = " << textualPtr.attributes[i].second << endl;
        if(textualPtr.attributes[i].first == "definitionSource") {
            definitionSource = textualPtr.attributes[i].second;
        } else if(textualPtr.attributes[i].first == "textualCharacteristicName") {
            textualCharacteristicName = textualPtr.attributes[i].second;
        } else if(textualPtr.attributes[i].first == "textualCharacteristicValue") {
            textualCharacteristicValue = textualPtr.attributes[i].second;
        }
    }

}

void Textual::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Textual: " << endl;
    cout << indent << "definitionSource: " << definitionSource << endl;
    cout << indent << "textualCharacteristicName: " << textualCharacteristicName << endl;
    cout << indent << "textualCharacteristicValue: " << textualCharacteristicValue << endl;
}


string Textual::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Textual "
        << "definitionSource=\"" << definitionSource << "\" "
        << "textualCharacteristicName=\"" << textualCharacteristicName << "\" "
        << "textualCharacteristicValue=\"" << textualCharacteristicValue << "\"/>\n";

    return oss.str();
}



IPCCharacteristic ::IPCCharacteristic(TreeNode &characteristicPtr) {
    // cout << "Hello Characteristic ....."<<endl
    // cout << "Characteristic category: " << category << endl;
    for (size_t i = 0; i < characteristicPtr.attributes.size(); i++) {
        // cout << "Characteristic Attribute: " << characteristicPtr.attributes[i].first << " = " << characteristicPtr.attributes[i].second << endl;
        if(characteristicPtr.attributes[i].first == "category") {
            category = characteristicPtr.attributes[i].second;
        }
    }
    for(size_t i =0;i<characteristicPtr.children.size();i++){
        if(characteristicPtr.children[i].name == "Measured" ){
            measured.push_back(new Measured(characteristicPtr.children[i]));
        }
        else if(characteristicPtr.children[i].name == "Ranged" ){
            ranged.push_back(new Ranged(characteristicPtr.children[i]));
        }
        else if(characteristicPtr.children[i].name == "Enumerated" ){
            enumerated.push_back(new Enumerated(characteristicPtr.children[i]));
        }
        else if(characteristicPtr.children[i].name == "Textual" ){
            textual.push_back(new Textual(characteristicPtr.children[i]));
        }
    }

}

void IPCCharacteristic::display(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "Characteristic: " << endl;
    cout << indent << "category: " << category << endl;

    for(size_t i=0;i<measured.size();i++){
        measured[i]->display(depth+1);
    }
    for(size_t i=0;i<ranged.size();i++){
        ranged[i]->display(depth+1);
    }
    for(size_t i=0;i<enumerated.size();i++){
        enumerated[i]->display(depth+1);
    }
    for(size_t i=0;i<textual.size();i++){
        textual[i]->display(depth+1);
    }

}

string IPCCharacteristic::toXML(int depth) {
    std::string tab(depth, ' ');
    ostringstream oss;

    oss << tab << "<Characteristics "
        << "category=\"" << category << "\">\n";
        for(size_t i=0;i<measured.size();i++){
        oss << measured[i]->toXML(depth+4);
    }
    for(size_t i=0;i<ranged.size();i++){
        oss << ranged[i]->toXML(depth+4);
    }
    for(size_t i=0;i<enumerated.size();i++){
        oss << enumerated[i]->toXML(depth+4);
    }
    for(size_t i=0;i<textual.size();i++){
        oss << textual[i]->toXML(depth+4);
    }
    oss << tab << "</Characteristics>\n";
    return oss.str();
}

IPCBOMItem::IPCBOMItem(TreeNode &bomItemPtr) {
    // cout << "Hello BOM Item ....."<<endl
    // cout << "BOM Item name: " << name << endl;
    
    // Initialize category to UNKNOWN by default
    category = BOMCategory::UNKNOWN;
    
    for (size_t i = 0; i < bomItemPtr.attributes.size(); i++) {
        // cout << "BOM Item Attribute: " << bomItemPtr.attributes[i].first << " = " << bomItemPtr.attributes[i].second << endl;
        if(bomItemPtr.attributes[i].first == "category") {
            // Use magic_enum to convert string to enum
            auto cat = magic_enum::enum_cast<BOMCategory>(bomItemPtr.attributes[i].second);
            if(cat.has_value()) {
                category = cat.value();
            }
        } else if(bomItemPtr.attributes[i].first == "OEMDesignNumberRef") {
            OEMDesignNumberRef = bomItemPtr.attributes[i].second;
        } else if(bomItemPtr.attributes[i].first == "quantity") {
            quantity = bomItemPtr.attributes[i].second;
        } else if(bomItemPtr.attributes[i].first == "pinCount") {
            pinCount = stoi(bomItemPtr.attributes[i].second);
        } else if(bomItemPtr.attributes[i].first == "internalPartNumber") {
            internalPartNumber = bomItemPtr.attributes[i].second;
        } else if(bomItemPtr.attributes[i].first == "description") {
            description = bomItemPtr.attributes[i].second;
        }
    }
    for(size_t i =0;i<bomItemPtr.children.size();i++){
        if(bomItemPtr.children[i].name == "DocDes" ){
            docDes.push_back(new IPCDocDes(bomItemPtr.children[i]));
        }
        else if(bomItemPtr.children[i].name == "MatDes" ){
            matDes.push_back(new IPCMatDes(bomItemPtr.children[i]));
        }
        else if(bomItemPtr.children[i].name == "ToolDes" ){
            toolDes.push_back(new IPCToolDes(bomItemPtr.children[i]));
        }
        else if(bomItemPtr.children[i].name == "RefDes" ){
            refDes.push_back(new IPCRefDes(bomItemPtr.children[i]));
        }
        else if(bomItemPtr.children[i].name == "Characteristics" ){
            // cout << "***************************Found Characteristics **********************" << endl;
            characteristic.push_back(new IPCCharacteristic(bomItemPtr.children[i]));
        }
    }

}

void IPCBOMItem::IPCBOMItemDisplay(int depth) {
    string indent(depth * 4, ' ');
    cout << indent << "BOMItem: " << endl;
    cout << indent << "category: " << magic_enum::enum_name(category) << endl;
    cout << indent << "OEMDesignNumberRef: " << OEMDesignNumberRef << endl;
    cout << indent << "quantity: " << quantity << endl;
    cout << indent << "pinCount: " << pinCount << endl;
    cout << indent << "internalPartNumber: " << internalPartNumber << endl;
    cout << indent << "description: " << description << endl;

    for(size_t i=0;i<docDes.size();i++){
        docDes[i]->display(depth+1);
    }
    for (size_t i = 0; i < matDes.size(); i++) {
        matDes[i]->display(depth + 1);
    }
    for(size_t i=0;i<toolDes.size();i++){
        toolDes[i]->display(depth+1);
    }
    for(size_t i=0;i<refDes.size();i++){
        refDes[i]->display(depth+1);
    }
    for(size_t i=0;i<characteristic.size();i++){
        characteristic[i]->display(depth+1);
    }
    
}

string IPCBOMItem::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<BomItem "
        << "category=\"" << magic_enum::enum_name(category) << "\" "
        << "OEMDesignNumberRef=\"" << OEMDesignNumberRef << "\" "
        << "quantity=\"" << quantity << "\" "
        << "pinCount=\"" << pinCount << "\" "
        << "internalPartNumber=\"" << internalPartNumber << "\" "
        << "description=\"" << description << "\">\n";

    for(size_t i=0;i<docDes.size();i++){
        oss << docDes[i]->toXML(indent+1);
    }
    for(size_t i=0;i<matDes.size();i++){
        oss << matDes[i]->toXML(indent+1);
    }
    for(size_t i=0;i<toolDes.size();i++){
        oss << toolDes[i]->toXML(indent+1);
    }
    for(size_t i=0;i<refDes.size();i++){
        oss << refDes[i]->toXML(indent+1);
    }
    for(size_t i=0;i<characteristic.size();i++){
        oss << characteristic[i]->toXML(indent+1);
    }

    oss << tab << "</BomItem>\n";

    return oss.str();
}