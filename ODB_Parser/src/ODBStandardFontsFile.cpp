#include "ODBStandardFontsFile.h"

ODBLineRecord::ODBLineRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock::LineRecord> *lineRecord)
{
    xStart = (*lineRecord)->xStart;
    yStart = (*lineRecord)->yStart;
    xEnd = (*lineRecord)->xEnd;
    yEnd = (*lineRecord)->yEnd;
    width = (*lineRecord)->width;
    polarity = std::string(magic_enum::enum_name((*lineRecord)->polarity));
    shape = std::string(magic_enum::enum_name((*lineRecord)->shape));

    addAttr("X Start", ValueType::DOUBLE, &this->xStart, false);
    addAttr("Y Start", ValueType::DOUBLE, &this->yStart, false);
    addAttr("X End", ValueType::DOUBLE, &this->xEnd, false);
    addAttr("Y End", ValueType::DOUBLE, &this->yEnd, false);
    addAttr("Width", ValueType::DOUBLE, &this->width, false);
    addAttr("Polarity", ValueType::STRING, &this->polarity, false);
    addAttr("Shape", ValueType::STRING, &this->shape, false);
}

double ODBLineRecord::getXStart() const { return xStart; }
double ODBLineRecord::getYStart() const { return yStart; }
double ODBLineRecord::getXEnd() const { return xEnd; }
double ODBLineRecord::getYEnd() const { return yEnd; }
double ODBLineRecord::getWidth() const { return width; }
const std::string &ODBLineRecord::getPolarity() const { return polarity; }
const std::string &ODBLineRecord::getShape() const { return shape; }

ODBFontsCharacterBlock::ODBFontsCharacterBlock(const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock> *characterBlock)
{
    character = characterBlock->get()->character;
    addAttr("Character", ValueType::STRING, &this->character, false);
    for (const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock::LineRecord> &lineRecord : characterBlock->get()->m_lineRecords)
    {
        ODBLineRecord *newLineRecord = new ODBLineRecord(&lineRecord);
        ODBLineRecords.push_back(newLineRecord);
    }
}

char ODBFontsCharacterBlock::getCharacter() const { return character; }
std::vector<ODBLineRecord *> &ODBFontsCharacterBlock::getODBLineRecords() { return ODBLineRecords; }
const std::vector<ODBLineRecord *> &ODBFontsCharacterBlock::getODBLineRecords() const { return ODBLineRecords; }

ODBStandardFontsFile::ODBStandardFontsFile(const Odb::Lib::FileModel::Design::StandardFontsFile *standardFontsFile)
{
    xSize = static_cast<double>(standardFontsFile->GetXSize());
    ySize = static_cast<double>(standardFontsFile->GetYSize());
    offset = static_cast<double>(standardFontsFile->GetOffset());

    addAttr("X Size", ValueType::DOUBLE, &this->xSize, false);
    addAttr("Y Size", ValueType::DOUBLE, &this->ySize, false);
    addAttr("Offset", ValueType::DOUBLE, &this->offset, false);

    for (const std::shared_ptr<Odb::Lib::FileModel::Design::StandardFontsFile::CharacterBlock> &characterBlock : standardFontsFile->GetCharacterBlocks())
    {
        ODBFontsCharacterBlock *newCharacterBlock = new ODBFontsCharacterBlock(&characterBlock);
        ODBFontsCharacterBlocks.push_back(newCharacterBlock);
    }
}

std::string ODBStandardFontsFile::formatValue(double val)
{
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(3) << val;
    return oss.str();
}

std::string ODBStandardFontsFile::formatPolarity(const std::string &pol) const
{
    if (pol == "POSITIVE")
        return "P";
    if (pol == "NEGATIVE")
        return "N";
    return "?";
}

std::string ODBStandardFontsFile::formatShape(const std::string &shape) const
{
    if (shape == "Round")
        return "R";
    if (shape == "Square")
        return "S";
    return "?";
}

void ODBStandardFontsFile::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    outFile << "XSIZE " << xSize << "\n";
    outFile << "YSIZE " << ySize << "\n";
    outFile << "OFFSET " << offset << "\n\n";

    for (size_t i = 0; i < ODBFontsCharacterBlocks.size(); ++i)
    {
        const ODBFontsCharacterBlock *block = ODBFontsCharacterBlocks[i];
        outFile << "CHAR " << block->character << "\n";

        for (const ODBLineRecord *line : block->getODBLineRecords())
        {
            outFile << "LINE "
                    << line->getXStart() << " "
                    << line->getYStart() << " "
                    << line->getXEnd() << " "
                    << line->getYEnd() << " "
                    << formatPolarity(line->getPolarity()) << " "
                    << formatShape(line->getShape()) << " "
                    << line->getWidth() << "\n";
        }

        outFile << "ECHAR";
        if (i + 1 < ODBFontsCharacterBlocks.size())
            outFile << "\n\n";
        else
            outFile << "\n";
    }

    outFile.close();
    std::cout << "Successfully wrote data to: " << filename << std::endl;
}

double ODBStandardFontsFile::getXSize() const { return xSize; }
double ODBStandardFontsFile::getYSize() const { return ySize; }
double ODBStandardFontsFile::getOffset() const { return offset; }
vector<ODBFontsCharacterBlock *> &ODBStandardFontsFile::getODBFontsCharacterBlocks() { return ODBFontsCharacterBlocks; }
