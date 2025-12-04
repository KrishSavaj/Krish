#pragma once

#include <bits/stdc++.h>
#include "FeaturesFile.h"
#include "SymbolName.h"
#include "enums.h"
#include "magic_enum.hpp"
#include "MatrixFile.h"
#include "GUIComponent.h"
#include "StandardFontsFile.h"

using namespace std;

enum class Polarity
{
    Positive,
    Negative
};
enum class LineShape
{
    Round,
    Square
};

class ODBLineRecord : virtual public GUIComponent
{
private:
    double xStart;
    double yStart;
    double xEnd;
    double yEnd;
    double width;
    std::string polarity;
    std::string shape;

public:
    ODBLineRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock::LineRecord> *lineRecord);
    double getXStart() const;
    double getYStart() const;
    double getXEnd() const;
    double getYEnd() const;
    double getWidth() const;
    const std::string &getPolarity() const;
    const std::string &getShape() const;
};

class ODBFontsCharacterBlock : virtual public GUIComponent
{
public:
    char character;
    std::vector<ODBLineRecord *> ODBLineRecords;

    ODBFontsCharacterBlock(const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock> *characterBlock);
    char getCharacter() const;
    std::vector<ODBLineRecord *> &getODBLineRecords();
    const std::vector<ODBLineRecord *> &getODBLineRecords() const;
};

class ODBStandardFontsFile : virtual public GUIComponent
{
private:
    double xSize;
    double ySize;
    double offset;
    vector<ODBFontsCharacterBlock *> ODBFontsCharacterBlocks;

public:
    ODBStandardFontsFile(const Odb::Lib::FileModel::Design::StandardFontsFile *standardFontsFile);
    static std::string formatValue(double val);
    std::string formatPolarity(const std::string &pol) const;
    std::string formatShape(const std::string &shape) const;
    void writeToFile(const std::string &filename = "standards") const;

    double getXSize() const;
    double getYSize() const;
    double getOffset() const;
    vector<ODBFontsCharacterBlock *> &getODBFontsCharacterBlocks();
};
