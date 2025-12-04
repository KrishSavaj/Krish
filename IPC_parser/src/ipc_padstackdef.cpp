
#include <sstream>
#include "./include/ipc_padstackdef.h"
#include "./include/tree_node.h"
#include <iostream>
using namespace std;

// PadstackHoleDef Implementation
PadstackHoleDef::PadstackHoleDef(TreeNode &padstackHoleDefPtr) {
    name = "";
    diameter = 0;
    minusTol = 0;
    x = 0.0;
    y = 0.0;

    for (size_t i = 0; i < padstackHoleDefPtr.attributes.size(); ++i) {
        const string& attrName = padstackHoleDefPtr.attributes[i].first;
        const string& attrValue = padstackHoleDefPtr.attributes[i].second;
        
        if (attrName == "name") {
            name = attrValue;
        } else if (attrName == "diameter") {
            diameter = stoi(attrValue);
        } else if (attrName == "minusTol") {
            minusTol = stoi(attrValue);
        } else if (attrName == "x") {
            x = stod(attrValue);
        } else if (attrName == "y") {
            y = stod(attrValue);
        }
    }
}

std::string PadstackHoleDef::toXML(int indent) {
    ostringstream xml;
    std::string tab(indent, ' ');
    
    xml << tab << "<PadstackHoleDef";
    if (!name.empty()) {
        xml << " name=\"" << name << "\"";
    }
    if (diameter != 0) {
        xml << " diameter=\"" << diameter << "\"";
    }
    if (minusTol != 0) {
        xml << " minusTol=\"" << minusTol << "\"";
    }
    if (x != 0.0) {
        xml << " x=\"" << x << "\"";
    }
    if (y != 0.0) {
        xml << " y=\"" << y << "\"";
    }
    xml << " />\n";
    
    return xml.str();
}

// PadstackPadDef Implementation
PadstackPadDef::PadstackPadDef(TreeNode &padstackPadDefPtr) {
    layerRef = "";
    padUse = PadUseType::REGULAR;  // Default value
    comment = "";
    plattingStatus = PlattingStatus::PLATED;  // Default value
    location = nullptr;
    xForm = nullptr;
    standardPrimitiveRefs = nullptr;
    hasPadUse = false;
    hasPlattingStatus = false;

    // Parse attributes
    for (size_t i = 0; i < padstackPadDefPtr.attributes.size(); ++i) {
        const string& attrName = padstackPadDefPtr.attributes[i].first;
        const string& attrValue = padstackPadDefPtr.attributes[i].second;
        
        if (attrName == "layerRef") {
            layerRef = attrValue;
        } else if (attrName == "padUse") {
            // Use magic_enum to convert string to enum
            auto enumValue = magic_enum::enum_cast<PadUseType>(attrValue);
            if (enumValue.has_value()) {
                padUse = enumValue.value();
                hasPadUse = true;
            }
        } else if (attrName == "comment") {
            comment = attrValue;
        } else if (attrName == "plattingStatus") {
            // Use magic_enum to convert string to enum
            auto enumValue = magic_enum::enum_cast<PlattingStatus>(attrValue);
            if (enumValue.has_value()) {
                plattingStatus = enumValue.value();
                hasPlattingStatus = true;
            }
        }
    }

    // Parse child elements
    for (size_t i = 0; i < padstackPadDefPtr.children.size(); ++i) {
        const string& childName = padstackPadDefPtr.children[i].name;
        
        if (childName == "Location") {
            location = new IPCLocation(padstackPadDefPtr.children[i]);
        } else if (childName == "XForm") {
            xForm = new IPCXForm(padstackPadDefPtr.children[i]);
        } else if (childName == "StandardPrimitiveRef") {
            standardPrimitiveRefs = new StandardPrimitiveRefs(padstackPadDefPtr.children[i]);
        }
    }
}

std::string PadstackPadDef::toXML(int indent) {
    ostringstream xml;
    std::string tab(indent, ' ');
    
    bool hasChildren = (location != nullptr || xForm != nullptr || standardPrimitiveRefs != nullptr);
    
    xml << tab << "<PadstackPadDef";
    
    // Write attributes only if they exist
    if (!layerRef.empty()) {
        xml << " layerRef=\"" << layerRef << "\"";
    }
    
    // Only write padUse if it was found in the XML
    if (hasPadUse) {
        xml << " padUse=\"" << magic_enum::enum_name(padUse) << "\"";
    }
    
    if (!comment.empty()) {
        xml << " comment=\"" << comment << "\"";
    }
    
    // Only write plattingStatus if it was found in the XML
    if (hasPlattingStatus) {
        xml << " plattingStatus=\"" << magic_enum::enum_name(plattingStatus) << "\"";
    }
    
    if (hasChildren) {
        xml << ">\n";
        
        // Write child elements only if they exist
        if (xForm != nullptr) {
            xml << xForm->toXML(indent + 4);
        }
        if (location != nullptr) {
            xml << location->toXML(indent + 4);
        }
        if (standardPrimitiveRefs != nullptr) {
            xml << standardPrimitiveRefs->toXML(indent + 4);
        }
        
        xml << tab << "</PadstackPadDef>\n";
    } else {
        xml << " />\n";
    }
    
    return xml.str();
}

// IPCPadStackDef Implementation
IPCPadStackDef::IPCPadStackDef(TreeNode &padStackDefPtr) {
    name = "";

    // Parse attributes
    for (size_t i = 0; i < padStackDefPtr.attributes.size(); ++i) {
        const string& attrName = padStackDefPtr.attributes[i].first;
        const string& attrValue = padStackDefPtr.attributes[i].second;
        
        if (attrName == "name") {
            name = attrValue;
        }
    }

    // Parse child elements
    for (size_t i = 0; i < padStackDefPtr.children.size(); ++i) {
        const string& childName = padStackDefPtr.children[i].name;
        
        if (childName == "PadstackHoleDef") {
            padstackHoleDefs.push_back(new PadstackHoleDef(padStackDefPtr.children[i]));
        } else if (childName == "PadstackPadDef") {
            padstackPadDefs.push_back(new PadstackPadDef(padStackDefPtr.children[i]));
        }
    }
}

std::string IPCPadStackDef::toXML(int indent) {
    ostringstream xml;
    std::string tab(indent, ' ');
    
    xml << tab << "<PadStackDef";
    
    // Write name attribute only if it exists
    if (!name.empty()) {
        xml << " name=\"" << name << "\"";
    }
    
    // Check if there are any child elements
    bool hasChildren = (!padstackHoleDefs.empty() || !padstackPadDefs.empty());
    
    if (hasChildren) {
        xml << ">\n";
        
        // Write all PadstackHoleDef children
        for (size_t i = 0; i < padstackHoleDefs.size(); ++i) {
            xml << padstackHoleDefs[i]->toXML(indent + 4);
        }
        
        // Write all PadstackPadDef children
        for (size_t i = 0; i < padstackPadDefs.size(); ++i) {
            xml << padstackPadDefs[i]->toXML(indent + 4);
        }
        
        xml << tab << "</PadStackDef>\n";
    } else {
        xml << " />\n";
    }
    
    return xml.str();
}
