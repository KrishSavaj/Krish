#pragma once

#include <string>
#include <map>
#include <fstream>
#include <iostream>

#include "GUIComponent.h"
#include "AttrListFile.h"
#include "enums.h"

using namespace std;

class ODBAttrListperBoard : virtual public GUIComponent
{
public:
    // Member variables
    std::string Attr_Units;
    std::map<std::string, std::string> Attr_Attributes; // ordered alphabetically by key name

    // Constructors and destructor
    ODBAttrListperBoard();
    explicit ODBAttrListperBoard(const Odb::Lib::FileModel::Design::AttrListFile *attrListFile);
    ~ODBAttrListperBoard();

    // Methods
    void writeToFile(const std::string &filename = "attrlist") const;
    std::map<std::string, std::string> getAttrList() const;
};
