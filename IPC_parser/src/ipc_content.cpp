#include <sstream>
#include "./include/ipc_content.h"
#include "./include/ipc_dictionary_fillDesc.h"
#include "./include/ipc_user_special.h"


using namespace std;

IPCContent::IPCContent(TreeNode &contentPtr) {
    // Assign values to class variables first
    roleRef = contentPtr.attributes[0].second;

    // Initialize pointers to nullptr
    functionModePt = nullptr;
    avlRefPt = nullptr;
    ColorDict = nullptr;
    FillDesc = nullptr;
    LineDesc = nullptr;
    StandardDict = nullptr;
    UserDict = nullptr;

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("roleRef", ValueType::STRING, &roleRef, false, stc);
    addFunctionMode(contentPtr); // Assuming the first child is a FunctionMode
    addStepRef(contentPtr); // Assuming the second child is a StepRef
    addLayerRef(contentPtr); // Assuming the third child is a LayerRef  
    addBomRef(contentPtr);
    addAvlRef(contentPtr);
    addDictionaryColor(contentPtr);
    addDictionaryLineDesc(contentPtr);
    addDictionaryFillDesc(contentPtr);
    addDictionaryStandard(contentPtr);
    addDictionaryUser(contentPtr);
}

FunctionMode::FunctionMode() {
    // Default constructor initializes member variables
    mode = "";
    level = 0;
    comment = ""; // Default to empty if no comment is provided

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("mode", ValueType::STRING, &mode, false, stc);
    // addAttr("level", ValueType::INT, &level, false);
    // addAttr("comment", ValueType::STRING, &comment, true, stc);
}

FunctionMode::FunctionMode(TreeNode &functionModePtr) {
    // Assign values to class variables first
    // cout<< "FunctionMode attributes size: " << functionModePtr.attributes.size() << endl;
    mode = functionModePtr.attributes[0].second;
    // cout<<"level: "<<functionModePtr.attributes[1].second<<endl;
    if(functionModePtr.attributes.size() > 1) {
        try {
            // cout<< "Level value: " << functionModePtr.attributes[1].second << endl;
            level = stoi(functionModePtr.attributes[1].second);
        } catch (const std::invalid_argument& e) {
            cerr << "Invalid level value: " << functionModePtr.attributes[1].second << endl;
            level = 0; // Default to 0 if conversion fails
        } catch (const std::out_of_range& e) {
            cerr << "Level value out of range: " << functionModePtr.attributes[1].second << endl;
            level = 0; // Default to 0 if conversion fails
        }
    }
    // level = stoi(functionModePtr.attributes[1].second);
    if(functionModePtr.attributes.size() == 3){
         comment = functionModePtr.attributes[2].second; // Default to empty if no comment is provided
    }


    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("mode", ValueType::STRING, &mode, false, stc);
    // addAttr("level", ValueType::INT, &level, false);
    // if(comment != ""){
    //     addAttr("comment", ValueType::STRING, &comment, true, stc);
    // }
}



StepRef::StepRef(TreeNode &stepRefPtr) {
    // Assign values to class variables first
    stepName = stepRefPtr.attributes[0].second;
   
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("stepName", ValueType::STRING, &stepName, false, stc);

}

LayerRef::LayerRef(TreeNode &layerRefPtr) {
    // Assign values to class variables first
    layerName = layerRefPtr.attributes[0].second;

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("layerName", ValueType::STRING, &layerName, false, stc);
}
IPCDictionryFillDesc :: IPCDictionryFillDesc() {
    unit = Units::MILLIMETER; // safe default
}

IPCDictionryFillDesc :: IPCDictionryFillDesc(TreeNode &fillDescPtr) {
    // Assign values to class variables first
    // cout<< "FillDesc attributes size anish: " << fillDescPtr.attributes.size() << endl;
    string unitStr = fillDescPtr.attributes[0].second;
    if(unitStr == "MILLIMETER") {
        unit = Units::MILLIMETER;
    } else if(unitStr == "MICRON") {
        unit = Units::MICRON;
    } else if(unitStr == "INCH") {
        unit = Units::INCH;
    } else {
        // Handle unknown unit case, maybe set a default or throw an error
        unit = Units::MILLIMETER; // Defaulting to MILLIMETER
    }

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("unit", ValueType::STRING, &unitStr, false, stc);
    
    for(size_t i = 0; i < fillDescPtr.children.size(); i++) {
        if (fillDescPtr.children[i].name == "EntryFillDesc") {

        }
    }
}

EntryLineDesc::EntryLineDesc(TreeNode &entryLineDescPtr) {
    id = entryLineDescPtr.attributes[0].second;
     
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("id", ValueType::STRING, &id, false, stc);
    for(size_t i = 0; i < entryLineDescPtr.children.size(); i++) {
        if (entryLineDescPtr.children[i].name == "LineDesc") {
            TreeNode lineDescNode = entryLineDescPtr.children[i];
            LineDesc *lineDesc = new LineDesc(lineDescNode); 
            lineDescs.push_back(lineDesc);
        }
    }

}
IPCLineDesc :: IPCLineDesc() {
    unit = Units::MILLIMETER; // safe default
}

IPCLineDesc :: IPCLineDesc(TreeNode &lineDescPtr) {
    // Assign values to class variables first
    // cout<< "LineDesc attributes size anish hello: " << lineDescPtr.children.size() << endl;
    string unitStr = lineDescPtr.attributes[0].second;
    if(unitStr == "MILLIMETER") {
        unit = Units::MILLIMETER;
    } else if(unitStr == "MICRON") {
        unit = Units::MICRON;
    } else if(unitStr == "INCH") {
        unit = Units::INCH;
    } else {
        // Handle unknown unit case, maybe set a default or throw an error
        unit = Units::MILLIMETER; // Defaulting to MILLIMETER
    }

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("unit", ValueType::STRING, &unitStr, false, stc);
    
    for(size_t i = 0; i < lineDescPtr.children.size(); i++) {
        if (lineDescPtr.children[i].name == "EntryLineDesc") {
            TreeNode entryNode = lineDescPtr.children[i];
            EntryLineDesc *entry = new EntryLineDesc(entryNode); 
            entryLineDescs.push_back(entry);
        }
    }
}


EntryUser:: EntryUser(TreeNode &entryUserPtr) {
    
    id = entryUserPtr.attributes[0].second;
     
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("id", ValueType::STRING, &id, false, stc);
    
    // Parse UserSpecial children
    for(size_t i = 0; i < entryUserPtr.children.size(); i++) {
        if (entryUserPtr.children[i].name == "UserSpecial") {
            TreeNode userSpecialNode = entryUserPtr.children[i];
            IPCUserSpecial *userSpecial = new IPCUserSpecial(userSpecialNode);
            userSpecials.push_back(userSpecial);
        }
    }

}

EntryStandard::EntryStandard(TreeNode &entryStandardPtr) {
    entryId = entryStandardPtr.attributes[0].second;
    
    // Parse child shape elements
    for(size_t i = 0; i < entryStandardPtr.children.size(); i++) {
        if (entryStandardPtr.children[i].name == "RectRound") {
            TreeNode shapeNode = entryStandardPtr.children[i];
            RectRound *rectRound = new RectRound(shapeNode);
            rectRounds.push_back(rectRound);
        } else if (entryStandardPtr.children[i].name == "Circle") {
            TreeNode shapeNode = entryStandardPtr.children[i];
            Circle *circle = new Circle(shapeNode);
            circles.push_back(circle);
        }
    }
}

DictionaryStandard::DictionaryStandard(TreeNode &dictionaryStandardPtr) {
    // Parse units attribute
    string unitStr = dictionaryStandardPtr.attributes[0].second;
    if(unitStr == "MILLIMETER") {
        units = Unit::MILLIMETER;
    } else if(unitStr == "INCH") {
        units = Unit::INCH;
    } else if(unitStr == "CENTIMETER") {
        units = Unit::CENTIMETER;
    } else {
        units = Unit::MILLIMETER; // Default
    }
    
    // Parse EntryStandard children
    for(size_t i = 0; i < dictionaryStandardPtr.children.size(); i++) {
        if (dictionaryStandardPtr.children[i].name == "EntryStandard") {
            TreeNode entryNode = dictionaryStandardPtr.children[i];
            EntryStandard *entry = new EntryStandard(entryNode); 
            entryStandards.push_back(entry);
        }
    }
}

Color::Color(TreeNode &colorPtr) {
    // Parse RGB attributes
    for(size_t i = 0; i < colorPtr.attributes.size(); i++) {
        if(colorPtr.attributes[i].first == "r") {
            red = stoi(colorPtr.attributes[i].second);
        } else if(colorPtr.attributes[i].first == "g") {
            green = stoi(colorPtr.attributes[i].second);
        } else if(colorPtr.attributes[i].first == "b") {
            blue = stoi(colorPtr.attributes[i].second);
        }
    }
}

EntryColor::EntryColor(TreeNode &entryColorPtr) {
    id = entryColorPtr.attributes[0].second;
    
    // Parse Color children
    for(size_t i = 0; i < entryColorPtr.children.size(); i++) {
        if (entryColorPtr.children[i].name == "Color") {
            TreeNode colorNode = entryColorPtr.children[i];
            Color *color = new Color(colorNode); 
            colors.push_back(color);
        }
    }
}

DictionaryColor::DictionaryColor(TreeNode &dictionaryColorPtr) {
    // Parse EntryColor children
    for(size_t i = 0; i < dictionaryColorPtr.children.size(); i++) {
        if (dictionaryColorPtr.children[i].name == "EntryColor") {
            TreeNode entryNode = dictionaryColorPtr.children[i];
            EntryColor *entry = new EntryColor(entryNode); 
            entryColors.push_back(entry);
        }
    }
}
IPCDictionaryUser ::IPCDictionaryUser() {
    units = Units::MILLIMETER; // safe default
}
IPCDictionaryUser :: IPCDictionaryUser(TreeNode &userDictPtr) {
    // Assign values to class variables first
    // cout<< "UserDict attributes size anish: " << userDictPtr.attributes.size() << endl;
    string unitStr = userDictPtr.attributes[0].second;
    if(unitStr == "MILLIMETER") {
        units = Units::MILLIMETER;
    } else if(unitStr == "MICRON") {
        units = Units::MICRON;
    } else if(unitStr == "INCH") {
        units = Units::INCH;
    } else {
        // Handle unknown unit case, maybe set a default or throw an error
        units = Units::MILLIMETER; // Defaulting to MILLIMETER
    }

    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("units", ValueType::STRING, &unitStr, false, stc);
    
    for(size_t i = 0; i < userDictPtr.children.size(); i++) {
        if (userDictPtr.children[i].name == "EntryUser") {
            TreeNode entryNode = userDictPtr.children[i];
            EntryUser *entry = new EntryUser(entryNode); 
            entryUsers.push_back(entry);
        }
    }
}




BomRef::BomRef(TreeNode &bomRefPtr) {
    
    bomName = bomRefPtr.attributes[0].second;
     
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("bomName", ValueType::STRING, &bomName, false, stc);

}
AvlRef::AvlRef() {
    // Default constructor initializes member variables
    avlName = "";
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    
    // Pass addresses of member variables
    // addAttr("avlName", ValueType::STRING, &avlName, false, stc);
}

AvlRef::AvlRef(TreeNode &avlRefPtr) {

    avlName = avlRefPtr.attributes[0].second;
    
    // StringAttrConstraints *stc = new StringAttrConstraints(StringConstraintType::NonEmpty);
    // addAttr("avlName", ValueType::STRING, &avlName, false, stc);

}


void IPCContent::addFunctionMode(TreeNode &functionModePtr) {
    // Assuming functionModePtr is a child of contentPtr
    for(size_t i = 0; i < functionModePtr.children.size(); i++) {
        if (functionModePtr.children[i].name == "FunctionMode") {
            TreeNode modeNode = functionModePtr.children[i];
            functionModePt = new FunctionMode(modeNode); // Create a FunctionMode object
            break;
        }
    }
}

void IPCContent::addStepRef(TreeNode &stepRefPtr) {
    // Assuming stepRefPtr is a child of contentPtr
    for(size_t i = 0; i < stepRefPtr.children.size(); i++) {
        if (stepRefPtr.children[i].name == "StepRef") {
            TreeNode stepNode = stepRefPtr.children[i];
            StepRef *step = new StepRef(stepNode); // Create a StepRef object
            stepPt.push_back(step);
        }
    }
}

void IPCContent::addLayerRef(TreeNode &layerRefPtr) {
    // Assuming layerRefPtr is a child of contentPtr
    for(size_t i = 0; i < layerRefPtr.children.size(); i++) {
        if (layerRefPtr.children[i].name == "LayerRef") {
            TreeNode layerNode = layerRefPtr.children[i];
            LayerRef *layer = new LayerRef(layerNode); // Create a LayerRef object
            layerRefs.push_back(layer);
        }
    }
}

// void IPCContent::addDictionaryStandard(TreeNode &dictionaryStandardPtr) {
//     // Implementation for adding DictionaryStandard

//     for(size_t i = 0; i < dictionaryStandardPtr.children.size(); i++) {
//         if (dictionaryStandardPtr.children[i].name == "DictionaryStandard") {
//             // TreeNode dictNode = dictionaryStandardPtr.children[i];
//             // DictionaryStandard *dict = new DictionaryStandard(dictNode); 
            
//         }
//     }

// }

void IPCContent::addDictionaryLineDesc(TreeNode &dictionaryLineDescPtr) {
    // Implementation for adding DictionaryLineDesc

    for(size_t i = 0; i < dictionaryLineDescPtr.children.size(); i++) {
        if (dictionaryLineDescPtr.children[i].name == "DictionaryLineDesc") {
            TreeNode dictNode = dictionaryLineDescPtr.children[i];
            LineDesc = new IPCLineDesc(dictNode); 
            
        }
    }

}
void IPCContent::addDictionaryFillDesc(TreeNode &dictionaryFillDescPtr){
    // Implementation for adding DictionaryFillDesc
    for(size_t i = 0; i < dictionaryFillDescPtr.children.size(); i++) {
        if (dictionaryFillDescPtr.children[i].name == "DictionaryFillDesc") {
            TreeNode dictNode = dictionaryFillDescPtr.children[i];
               FillDesc = new IPCDictionryFillDesc(dictNode); 
            //    cout<< "DictionaryFillDesc  calling" <<endl;
 
        }
    }

}

void IPCContent::addDictionaryColor(TreeNode &dictionaryColorPtr) {
    // Implementation for adding DictionaryColor
    for(size_t i = 0; i < dictionaryColorPtr.children.size(); i++) {
        if (dictionaryColorPtr.children[i].name == "DictionaryColor") {
            TreeNode dictNode = dictionaryColorPtr.children[i];
            ColorDict = new DictionaryColor(dictNode); 
        }
    }
}

void IPCContent::addDictionaryStandard(TreeNode &dictionaryStandardPtr) {
    // Implementation for adding DictionaryStandard
    for(size_t i = 0; i < dictionaryStandardPtr.children.size(); i++) {
        if (dictionaryStandardPtr.children[i].name == "DictionaryStandard") {
            TreeNode dictNode = dictionaryStandardPtr.children[i];
            StandardDict = new DictionaryStandard(dictNode); 
        }
    }
}

void IPCContent::addDictionaryUser(TreeNode &dictionaryUserPtr) {
    // Implementation for adding DictionaryUser
    for(size_t i = 0; i < dictionaryUserPtr.children.size(); i++) {
        if (dictionaryUserPtr.children[i].name == "DictionaryUser") {
            TreeNode dictNode = dictionaryUserPtr.children[i];
            UserDict = new IPCDictionaryUser(dictNode); 
        }
    }
}

void IPCContent::addBomRef(TreeNode &bomRefPtr) {

    for(size_t i = 0; i < bomRefPtr.children.size(); i++) {
        if (bomRefPtr.children[i].name == "BomRef") {
            TreeNode bomNode = bomRefPtr.children[i];
            BomRef *bom = new BomRef(bomNode); 
           
            bomRefs.push_back(bom);
        }

    }
}

void IPCContent::addAvlRef(TreeNode &avlRefPtr) {

    for(size_t i = 0; i < avlRefPtr.children.size(); i++) {
        if (avlRefPtr.children[i].name == "AvlRef") {   
            TreeNode avlNode = avlRefPtr.children[i]; 
            avlRefPt = new AvlRef(avlNode); // Create a AvlRef object     
        }
    }

}


string FunctionMode::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<FunctionMode "
        << "mode=\"" << mode << "\" ";
        // << "level=\"" << level << "\" ";
    if (level != 0) {
        oss << "level=\"" << level << "\" ";
    }
    
    if (comment != "") {
        oss << "comment=\"" << comment << "\" ";
    }
    
    oss << "/>\n";

    return oss.str();
}

string StepRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<StepRef "
        << "name=\"" << stepName << "\" "
        << "/>\n";

    return oss.str();
}

string LayerRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<LayerRef "
        << "name=\"" << layerName << "\" "
        << "/>\n";

    return oss.str();
}
// string LineDesc:: toXML(int indent) {
//     std::string tab(indent, ' ');
//     ostringstream oss;
//     oss << tab << "<LineDesc "
//         << "lineEnd=\"";
//     if(lineEnd == LineEnd::ROUND) {
//         oss << "ROUND";
//     } else if(lineEnd == LineEnd::SQUARE) {
//         oss << "SQUARE";
//     } else if(lineEnd == LineEnd::NONE) {
//         oss << "NONE";
//     }
//     oss << "\" "
//         << "lineProperty=\"";
//     if(lineProperty == LineProperty::SOLID) {
//         oss << "SOLID";
//     } else if(lineProperty == LineProperty::DOTTED) {
//         oss << "DOTTED";
//     } else if(lineProperty == LineProperty::DASHED) {
//         oss << "DASHED";
//     } else if(lineProperty == LineProperty::CENTER) {
//         oss << "CENTER";
//     } else if(lineProperty == LineProperty::PHANTOM) {
//         oss << "PHANTOM";
//     } else if(lineProperty == LineProperty::ERASE) {
//         oss << "ERASE";
//     }
//     oss << "\" "
//         << "lineWidth=\"" << lineWidth << "\" "
//         << "/>\n";

//     return oss.str();
// }

string EntryLineDesc:: toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<EntryLineDesc "
        << "id=\"" << id << "\" "
        << ">\n";
    for (const auto& lineDesc : lineDescs) {
        oss << lineDesc->toXML(indent + 4);
    }
    oss << tab << "</EntryLineDesc>\n";
    return oss.str();
}
string IPCLineDesc :: toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<DictionaryLineDesc "
        << "units=\"";
    if(unit == Units::MILLIMETER) {
        oss << "MILLIMETER";
    } else if(unit == Units::MICRON) {
        oss << "MICRON";
    } else if(unit == Units::INCH) {
        oss << "INCH";
    }
    oss << "\""
        << ">\n";

    for (const auto& entry :entryLineDescs) {
        oss << entry->toXML(indent + 4);
    }

    oss << tab << "</DictionaryLineDesc>\n";

    return oss.str();
}

string IPCDictionryFillDesc:: toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<DictionaryFillDesc "
        << "units=\"";
    if(unit == Units::MILLIMETER) {
        oss << "MILLIMETER";
    } else if(unit == Units::MICRON) {
        oss << "MICRON";
    } else if(unit == Units::INCH) {
        oss << "INCH";
    }
    oss << "\""
        << "/>\n";

    return oss.str();
}

string EntryUser::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<EntryUser "
        << "id=\"" << id << "\"";
    
    if(userSpecials.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& userSpecial : userSpecials) {
            oss << userSpecial->toXML(indent + 4);
        }
        oss << tab << "</EntryUser>\n";
    }
    
    return oss.str();
}

string IPCDictionaryUser::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<DictionaryUser "
        << "units=\"";
    if(units == Units::MILLIMETER) {
        oss << "MILLIMETER";
    } else if(units == Units::MICRON) {
        oss << "MICRON";
    } else if(units == Units::INCH) {
        oss << "INCH";
    }
    oss << "\"";
    
    if(entryUsers.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& entry : entryUsers) {
            oss << entry->toXML(indent + 4);
        }
        oss << tab << "</DictionaryUser>\n";
    }
    
    return oss.str();
}

string EntryStandard::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<EntryStandard "
        << "id=\"" << entryId << "\"";
    
    if(rectRounds.empty() && circles.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& rectRound : rectRounds) {
            oss << rectRound->toXML(indent + 4);
        }
        for (const auto& circle : circles) {
            oss << circle->toXML(indent + 4);
        }
        oss << tab << "</EntryStandard>\n";
    }
    
    return oss.str();
}

string DictionaryStandard::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<DictionaryStandard "
        << "units=\"";
    if(units == Unit::MILLIMETER) {
        oss << "MILLIMETER";
    } else if(units == Unit::INCH) {
        oss << "INCH";
    } else if(units == Unit::CENTIMETER) {
        oss << "CENTIMETER";
    }
    oss << "\"";
    
    if(entryStandards.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& entry : entryStandards) {
            oss << entry->toXML(indent + 4);
        }
        oss << tab << "</DictionaryStandard>\n";
    }
    
    return oss.str();
}

string Color::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<Color "
        << "r=\"" << red << "\" "
        << "g=\"" << green << "\" "
        << "b=\"" << blue << "\" "
        << "/>\n";
    return oss.str();
}

string EntryColor::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<EntryColor "
        << "id=\"" << id << "\"";
    
    if(colors.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& color : colors) {
            oss << color->toXML(indent + 4);
        }
        oss << tab << "</EntryColor>\n";
    }
    
    return oss.str();
}

string DictionaryColor::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<DictionaryColor";
    
    if(entryColors.empty()) {
        oss << "/>\n";
    } else {
        oss << ">\n";
        for (const auto& entry : entryColors) {
            oss << entry->toXML(indent + 4);
        }
        oss << tab << "</DictionaryColor>\n";
    }
    
    return oss.str();
}

string BomRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<BomRef "
        << "bomName=\"" << bomName << "\" "
        << "/>\n";

        return oss.str();
    
}

string AvlRef::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;
    oss << tab << "<AvlRef "
        << "avlName=\"" << avlName << "\" "
        << "/>\n";

    return oss.str();
}

string IPCContent::toXML(int indent) {
    std::string tab(indent, ' ');
    ostringstream oss;

    oss << tab << "<Content "
        << "roleRef=\"" << roleRef << "\" "
        << ">\n";

    // Add FunctionMode XML
    if(functionModePt) oss << functionModePt->toXML(indent + 4);

    // Add StepRef XML
    for (const auto& step : stepPt) {
        oss << step->toXML(indent + 4);
    }

    // Add LayerRef XML
    for (const auto& layer : layerRefs) {
        oss << layer->toXML(indent + 4);
    }
    
    // Add BomRef XML
    for (const auto& bom : bomRefs) {
        oss << bom->toXML(indent + 4);
    }
    
    // Add AvlRef XML
    if(avlRefPt) oss << avlRefPt->toXML(indent + 4);
    
    // Add Dictionary XMLs
    if(ColorDict) oss << ColorDict->toXML(indent + 4);
    if(LineDesc) oss << LineDesc->toXML(indent + 4);
    if(FillDesc) oss << FillDesc->toXML(indent + 4);
    if(StandardDict) oss << StandardDict->toXML(indent + 4);
    if(UserDict) oss << UserDict->toXML(indent + 4);

    oss << tab << "</Content>\n";

    return oss.str();
}


