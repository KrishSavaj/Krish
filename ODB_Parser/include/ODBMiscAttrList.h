#pragma once

#include <bits/stdc++.h>
#include "FileArchive.h"
#include "FeaturesFile.h"
#include "SymbolName.h"
#include "enums.h"
#include "magic_enum.hpp"
#include "MatrixFile.h"
#include "GUIComponent.h"

using namespace std;

class ODBMiscAttrList : virtual public GUIComponent
{
private:
    map<string, string> attrList; // keys sorted alphabetically

public:
    // Constructor
    explicit ODBMiscAttrList(const Odb::Lib::FileModel::Design::FileArchive *archive);

    // Accessor
    map<string, string> getAttrList() const;

    // Write attributes to file
    void writeToFile(const std::string &filename = "attrlist") const;
};
