#include "ODBBoardHeaderInfo.h"

using namespace Odb::Lib::FileModel::Design;

//=====================================================
// BoardRepeatRecord Implementation
//=====================================================
BoardRepeatRecord::BoardRepeatRecord() {}

BoardRepeatRecord::BoardRepeatRecord(std::string name, double x, double y, double dx, double dy,
                                     int nx, int ny, int angle, bool flip, bool mirror)
    : name(name), x(x), y(y), dx(dx), dy(dy), nx(nx), ny(ny), angle(angle), flip(flip), mirror(mirror)
{
    addAttr("Name", ValueType::STRING, &this->name, false);
    addAttr("X", ValueType::DOUBLE, &this->x, false);
    addAttr("Y", ValueType::DOUBLE, &this->y, false);
    addAttr("DX", ValueType::DOUBLE, &this->dx, false);
    addAttr("DY", ValueType::DOUBLE, &this->dy, false);
    addAttr("NX", ValueType::INT, &this->nx, false);
    addAttr("NY", ValueType::INT, &this->ny, false);
    addAttr("Angle", ValueType::INT, &this->angle, false);
    addAttr("Flip", ValueType::BOOL, &this->flip, false);
    addAttr("Mirror", ValueType::BOOL, &this->mirror, false);
}

BoardRepeatRecord::~BoardRepeatRecord() {}

// Getters
std::string BoardRepeatRecord::getName() const { return name; }
double BoardRepeatRecord::getX() const { return x; }
double BoardRepeatRecord::getY() const { return y; }
double BoardRepeatRecord::getDX() const { return dx; }
double BoardRepeatRecord::getDY() const { return dy; }
int BoardRepeatRecord::getNX() const { return nx; }
int BoardRepeatRecord::getNY() const { return ny; }
int BoardRepeatRecord::getAngle() const { return angle; }
bool BoardRepeatRecord::isFlipped() const { return flip; }
bool BoardRepeatRecord::isMirrored() const { return mirror; }

//=====================================================
// ODBBoardHeaderInfo Implementation
//=====================================================
ODBBoardHeaderInfo::ODBBoardHeaderInfo() {}

ODBBoardHeaderInfo::ODBBoardHeaderInfo(const StepHdrFile &hdr)
{
    units = hdr.GetUnits();
    XDatum = hdr.GetXDatum();
    YDatum = hdr.GetYDatum();
    Id = std::to_string(hdr.GetId());
    XOrigin = hdr.GetXOrigin();
    YOrigin = hdr.GetYOrigin();
    TopActive = hdr.GetTopActive();
    BottomActive = hdr.GetBottomActive();
    LeftActive = hdr.GetLeftActive();
    RightActive = hdr.GetRightActive();  
    AffectingBOM = hdr.GetAffectingBom();
    AffectingBOMChanged = hdr.GetAffectingBomChanged();

    addAttr("UNITS", ValueType::STRING, &this->units, false);
    addAttr("X_DATUM", ValueType::DOUBLE, &this->XDatum, false);
    addAttr("Y_DATUM", ValueType::DOUBLE, &this->YDatum, false);
    addAttr("ID", ValueType::STRING, &this->Id, false);
    addAttr("X_ORIGIN", ValueType::DOUBLE, &this->XOrigin, false);
    addAttr("Y_ORIGIN", ValueType::DOUBLE, &this->YOrigin, false);
    addAttr("TOP_ACTIVE", ValueType::DOUBLE, &this->TopActive, false);
    addAttr("BOTTOM_ACTIVE", ValueType::DOUBLE, &this->BottomActive, false);
    addAttr("LEFT_ACTIVE", ValueType::DOUBLE, &this->LeftActive, false);
    addAttr("RIGHT_ACTIVE", ValueType::DOUBLE, &this->RightActive, false);
    addAttr("AFFECTING_BOM", ValueType::STRING, &this->AffectingBOM, false);
    addAttr("AFFECTING_BOM_CHANGED", ValueType::BOOL, &this->AffectingBOMChanged, false);

    // Initialize repeat records
    const auto &boardRepeatRecords = hdr.GetStepRepeatRecords();
    for (const auto &record : boardRepeatRecords)
    {
        BoardRepeatRecord *repeatRecord = new BoardRepeatRecord(
            record->name,
            record->x,
            record->y,
            record->dx,
            record->dy,
            record->nx,
            record->ny,
            record->angle,
            record->flip,
            record->mirror);
        StepRepeatRecords.push_back(repeatRecord);
    }
}

ODBBoardHeaderInfo::~ODBBoardHeaderInfo()
{
    for (BoardRepeatRecord *record : StepRepeatRecords)
    {
        delete record;
    }
}

std::vector<BoardRepeatRecord *> ODBBoardHeaderInfo::getBoardRepeatRecords()
{
    return StepRepeatRecords;
}

//=====================================================
// Write to File
//=====================================================
void ODBBoardHeaderInfo::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    outFile << "UNITS=" << units << "\n";
    outFile << "X_DATUM=" << XDatum << "\n";
    outFile << "Y_DATUM=" << YDatum << "\n";
    outFile << "X_ORIGIN=" << XOrigin << "\n";
    outFile << "Y_ORIGIN=" << YOrigin << "\n";
    outFile << "TOP_ACTIVE=" << TopActive << "\n";
    outFile << "BOTTOM_ACTIVE=" << BottomActive << "\n";
    outFile << "RIGHT_ACTIVE=" << RightActive << "\n";
    outFile << "LEFT_ACTIVE=" << LeftActive << "\n";
    outFile << "AFFECTING_BOM=" << AffectingBOM << "\n";
    outFile << "AFFECTING_BOM_CHANGED=" << (AffectingBOMChanged ? "1" : "0") << "\n";
    outFile << "ID=" << Id << "\n";

    // Write repeat records
    for (const BoardRepeatRecord *record : StepRepeatRecords)
    {
        outFile << record->getName() << ","
                << record->getX() << ","
                << record->getY() << ","
                << record->getDX() << ","
                << record->getDY() << ","
                << record->getNX() << ","
                << record->getNY() << ","
                << record->getAngle() << ","
                << (record->isFlipped() ? "true" : "false") << ","
                << (record->isMirrored() ? "true" : "false") << "\n";
    }

    outFile.close();
}