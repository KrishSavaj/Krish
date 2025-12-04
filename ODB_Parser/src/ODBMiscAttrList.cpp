#include "ODBMiscAttrList.h"

ODBMiscAttrList::ODBMiscAttrList(const Odb::Lib::FileModel::Design::FileArchive *archive)
{
    const Odb::Lib::FileModel::Design::AttrListFile attrListFile = archive->GetMiscAttrListFile();

    attrList.clear();

    // Add units attribute
    attrList["UNITS"] = attrListFile.GetUnits();
    addAttr("UNITS", ValueType::STRING, &attrList["UNITS"], false);

    // Add remaining attributes
    for (const auto &attr : attrListFile.GetAttributes())
    {
        attrList[attr.first] = attr.second;
        addAttr(attr.first, ValueType::STRING, &attrList[attr.first], false);
    }
}

map<string, string> ODBMiscAttrList::getAttrList() const
{
    return attrList;
}

void ODBMiscAttrList::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    for (const auto &kv : attrList)
        outFile << kv.first << "=" << kv.second << "\n";

    outFile.close();
    std::cout << "Successfully wrote attribute list to: " << filename << std::endl;
}
