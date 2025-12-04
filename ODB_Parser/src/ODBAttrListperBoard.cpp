#include "ODBAttrListperBoard.h"

using namespace Odb::Lib::FileModel::Design;

//=====================================================
// Constructors
//=====================================================
ODBAttrListperBoard::ODBAttrListperBoard() {}

ODBAttrListperBoard::ODBAttrListperBoard(const AttrListFile *attrListFile)
{
    // Extract data from the AttrListFile object
    Attr_Units = attrListFile->GetUnits();
    Attr_Attributes = attrListFile->GetAttributes(); // Expected to return a map<string, string>

    // Add attributes to GUI display
    addAttr("UNITS", ValueType::STRING, &Attr_Units, false);

    for (auto &attr : Attr_Attributes)
    {
        addAttr(attr.first, ValueType::STRING, &Attr_Attributes[attr.first], false);
    }
}

//=====================================================
// Destructor
//=====================================================
ODBAttrListperBoard::~ODBAttrListperBoard() {}

//=====================================================
// Write to File
//=====================================================
void ODBAttrListperBoard::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    // Write the units line
    outFile << "UNITS=" << Attr_Units << "\n";

    // Write each attribute key=value pair
    for (const auto &kv : Attr_Attributes)
    {
        outFile << kv.first << "=" << kv.second << "\n";
    }

    outFile.close();
    std::cout << "Successfully wrote attribute list to: " << filename << std::endl;
}

//=====================================================
// Getter for Attribute List
//=====================================================
std::map<std::string, std::string> ODBAttrListperBoard::getAttrList() const
{
    return Attr_Attributes;
}
