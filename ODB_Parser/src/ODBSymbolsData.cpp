#include "ODBSymbolsData.h"
#include <iostream>

using namespace Odb::Lib::FileModel::Design;

//=====================================================
// Constructor Implementation
//=====================================================
ODBSymbolsData::ODBSymbolsData(const std::shared_ptr<Odb::Lib::FileModel::Design::SymbolsDirectory> *symbolsDirectory)
    : ODBBoardGeometryInfo(&((*symbolsDirectory)->GetFeaturesFile()))
{
    // Extract symbol directory details
    this->symbolsDirectory = (*symbolsDirectory)->GetName();
    this->path = (*symbolsDirectory)->GetPath();

    // Add GUI attributes
    addAttr("Symbols Directory Path", ValueType::STRING, &this->path, false);
    addAttr("Symbols Directory Name", ValueType::STRING, &this->symbolsDirectory, false);

    // Note: ODBBoardGeometryInfo base is already initialized, no need to allocate again
}
