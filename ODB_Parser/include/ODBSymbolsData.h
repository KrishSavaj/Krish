#pragma once

#include <string>
#include <memory>

#include "GUIComponent.h"
#include "ODBBoardGeometryInfo.h"
#include "SymbolsDirectory.h"
#include "FeaturesFile.h"
#include "SymbolName.h"
#include "enums.h"

using namespace std;

class ODBSymbolsData : virtual public GUIComponent, public ODBBoardGeometryInfo
{
private:
    std::string symbolsDirectory;
    std::string path;
    ODBBoardGeometryInfo *ODBBoardGeometryInfos;

public:
    // Constructor
    ODBSymbolsData(const std::shared_ptr<Odb::Lib::FileModel::Design::SymbolsDirectory> *symbolsDirectory);

    // Getters
    const std::string &getSymbolsDirectory() const { return symbolsDirectory; }
    const std::string &getPath() const { return path; }
};
