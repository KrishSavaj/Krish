#ifndef ODBOBJ_H
#define ODBOBJ_H
#include "FileArchive.h"
#include "GUIComponent.h"
#include "ODBComponent.h"
#include "ODBMatrixData.h"
#include "ODBMiscAttrList.h"
#include "ODBSymbolsData.h"
#include <bits/stdc++.h>
using namespace std;
using namespace Odb::Lib::FileModel::Design;
class ODBObj
{
public:
    // Constructor
    ODBObj() {
    };

    // Destructor
    ~ODBObj();

    // Public member functions
    void extractStepData(const FileArchive &archive);
    void extractMatrixFileData(const FileArchive &archive);
    void extractMiscAttrListFileData(const FileArchive &archive);
    void extractStandardFontsFileData(const FileArchive &archive);
    void extractSymbolsData(const FileArchive &archive);
    void printSymbolsData();
    void extractODBMiscInfoFileData(const FileArchive &archive);
private:
    // Private member variables
    int someVariable; // temperorary variable
    vector<ODBSymbolsData *> symbolsDataList;
};

#endif // ODBOBJ_H