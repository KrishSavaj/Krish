#include "ODBBoardGeometryInfo.h"
#include <cmath>
#include <iomanip>
#include <sstream>
#include <iostream>
#include <fstream>
#include <stdexcept>

using namespace std;
using namespace Odb::Lib::FileModel::Design;

//=====================================================
//  ODBBoardLineFeature
//=====================================================
ODBBoardLineFeature::ODBBoardLineFeature(double xs_, double ys_, double xe_, double ye_,
                                         int sym_num_, Odb::Lib::Polarity polarity,
                                         int dcode_, string id_,
                                         int orient_def_, double orient_def_rotation_, string attributesString)
    : sym_num(sym_num_), dcode(dcode_), id(id_),
      orient_def(orient_def_), orient_def_rotation(orient_def_rotation_),
      x_s(xs_), y_s(ys_), x_e(xe_), y_e(ye_), attributelookup(attributesString)
{
    polarityStr = string(magic_enum::enum_name(polarity));

    addAttr("Start X", ValueType::DOUBLE, &x_s, false);
    addAttr("Start Y", ValueType::DOUBLE, &y_s, false);
    addAttr("End X", ValueType::DOUBLE, &x_e, false);
    addAttr("End Y", ValueType::DOUBLE, &y_e, false);
    addAttr("Symbol Number", ValueType::INT, &sym_num, false);
    addAttr("Polarity", ValueType::STRING, &polarityStr, false);
    addAttr("DCode", ValueType::INT, &dcode, false);
    addAttr("ID", ValueType::STRING, &id, false);
    addAttr("Orientation Definition", ValueType::INT, &orient_def, false);
    addAttr("Orientation Rotation", ValueType::FLOAT, &orient_def_rotation, false);
    addAttr("Attribute Lookup", ValueType::STRING, &attributelookup, false);
}

double ODBBoardLineFeature::getStartX() const { return x_s; }
double ODBBoardLineFeature::getStartY() const { return y_s; }
double ODBBoardLineFeature::getEndX() const { return x_e; }
double ODBBoardLineFeature::getEndY() const { return y_e; }
int ODBBoardLineFeature::getSymNum() const { return sym_num; }
const string &ODBBoardLineFeature::getPolarityStr() const { return polarityStr; }
int ODBBoardLineFeature::getDCode() const { return dcode; }
string ODBBoardLineFeature::getId() const { return id; }
int ODBBoardLineFeature::getOrientDef() const { return orient_def; }
double ODBBoardLineFeature::getOrientDefRotation() const { return orient_def_rotation; }
const string &ODBBoardLineFeature::getAttributeLookup() const { return attributelookup; }

//=====================================================
//  ODBBoardPadFeature
//=====================================================
ODBBoardPadFeature::ODBBoardPadFeature(double x, double y, int symbol_num, double resize_factor, bool hasResize,
                                       int sym_num, Odb::Lib::Polarity polarity, int dcode, string id,
                                       int orient_def, double orient_def_rotation, string attributesString)
    : sym_num(sym_num), dcode(dcode), id(id),
      orient_def(orient_def), orient_def_rotation(orient_def_rotation),
      x(x), y(y), symbol_num(symbol_num),
      resize_factor(resize_factor), hasResize(hasResize), attributelookup(attributesString)
{
    polarityStr = string(magic_enum::enum_name(polarity));

    addAttr("X", ValueType::DOUBLE, &this->x, false);
    addAttr("Y", ValueType::DOUBLE, &this->y, false);
    addAttr("Symbol Number", ValueType::INT, &this->symbol_num, false);
    addAttr("Polarity", ValueType::STRING, &this->polarityStr, false);
    addAttr("DCode", ValueType::INT, &this->dcode, false);
    addAttr("ID", ValueType::STRING, &this->id, false);
    addAttr("Orientation Definition", ValueType::INT, &this->orient_def, false);
    addAttr("Orientation Rotation", ValueType::FLOAT, &this->orient_def_rotation, false);
    if (this->hasResize)
        addAttr("Resize Factor", ValueType::DOUBLE, &this->resize_factor, false);
    addAttr("Attribute Lookup", ValueType::STRING, &this->attributelookup, false);
}

double ODBBoardPadFeature::getX() const { return x; }
double ODBBoardPadFeature::getY() const { return y; }
int ODBBoardPadFeature::getSymbolNum() const { return symbol_num; }
double ODBBoardPadFeature::getResizeFactor() const { return resize_factor; }
bool ODBBoardPadFeature::hasResizeApplied() const { return hasResize; }
const string &ODBBoardPadFeature::getPolarityStr() const { return polarityStr; }
int ODBBoardPadFeature::getDCode() const { return dcode; }
string ODBBoardPadFeature::getId() const { return id; }
int ODBBoardPadFeature::getOrientDef() const { return orient_def; }
double ODBBoardPadFeature::getOrientDefRotation() const { return orient_def_rotation; }
int ODBBoardPadFeature::getSymNum() const { return sym_num; }
const string &ODBBoardPadFeature::getAttributeLookup() const { return attributelookup; }

//=====================================================
//  ODBBoardTextFeature
//=====================================================
ODBBoardTextFeature::ODBBoardTextFeature(double x, double y, double xsize, double ysize, double width_factor,
                                         const string &font, const string &text, int version, int sym_num,
                                         Odb::Lib::Polarity polarity, int dcode, string id,
                                         int orient_def, double orient_def_rotation, string attributesString)
    : sym_num(sym_num), dcode(dcode), id(id),
      orient_def(orient_def), orient_def_rotation(orient_def_rotation),
      x(x), y(y), xsize(xsize), ysize(ysize),
      width_factor(width_factor), font(font), text(text), version(version),
      attributelookup(attributesString)
{
    polarityStr = string(magic_enum::enum_name(polarity));

    addAttr("X", ValueType::DOUBLE, &this->x, false);
    addAttr("Y", ValueType::DOUBLE, &this->y, false);
    addAttr("X Size", ValueType::DOUBLE, &this->xsize, false);
    addAttr("Y Size", ValueType::DOUBLE, &this->ysize, false);
    addAttr("Width Factor", ValueType::DOUBLE, &this->width_factor, false);
    addAttr("Font", ValueType::STRING, &this->font, false);
    addAttr("Text", ValueType::STRING, &this->text, false);
    addAttr("Version", ValueType::INT, &this->version, false);
    addAttr("Symbol Number", ValueType::INT, &this->sym_num, false);
    addAttr("Polarity", ValueType::STRING, &this->polarityStr, false);
    addAttr("DCode", ValueType::INT, &this->dcode, false);
    addAttr("ID", ValueType::STRING, &this->id, false);
    addAttr("Orientation Definition", ValueType::INT, &this->orient_def, false);
    addAttr("Orientation Rotation", ValueType::FLOAT, &this->orient_def_rotation, false);
    addAttr("Attribute Lookup", ValueType::STRING, &this->attributelookup, false);
}

double ODBBoardTextFeature::getX() const { return x; }
double ODBBoardTextFeature::getY() const { return y; }
double ODBBoardTextFeature::getXSize() const { return xsize; }
double ODBBoardTextFeature::getYSize() const { return ysize; }
double ODBBoardTextFeature::getWidthFactor() const { return width_factor; }
const string &ODBBoardTextFeature::getFont() const { return font; }
const string &ODBBoardTextFeature::getText() const { return text; }
int ODBBoardTextFeature::getVersion() const { return version; }
int ODBBoardTextFeature::getSymNum() const { return sym_num; }
const string &ODBBoardTextFeature::getPolarityStr() const { return polarityStr; }
int ODBBoardTextFeature::getDCode() const { return dcode; }
string ODBBoardTextFeature::getId() const { return id; }
int ODBBoardTextFeature::getOrientDef() const { return orient_def; }
float ODBBoardTextFeature::getOrientDefRotation() const { return orient_def_rotation; }
string ODBBoardTextFeature::getAttributeLookup() const { return attributelookup; }
//=====================================================
//  ODBBoardArcFeature
//=====================================================
ODBBoardArcFeature::ODBBoardArcFeature(double xs, double ys, double xe, double ye,
                                       double xc, double yc, bool cw, int sym_num,
                                       Odb::Lib::Polarity polarity, int dcode, string id,
                                       int orient_def, double orient_def_rotation, string attributesString)
    : sym_num(sym_num), dcode(dcode), id(id),
      orient_def(orient_def), orient_def_rotation(orient_def_rotation),
      xs(xs), ys(ys), xe(xe), ye(ye),
      xc(xc), yc(yc), cw(cw), attributelookup(attributesString)
{
    polarityStr = string(magic_enum::enum_name(polarity));

    addAttr("Start X", ValueType::DOUBLE, &xs, false);
    addAttr("Start Y", ValueType::DOUBLE, &ys, false);
    addAttr("End X", ValueType::DOUBLE, &xe, false);
    addAttr("End Y", ValueType::DOUBLE, &ye, false);
    addAttr("Center X", ValueType::DOUBLE, &xc, false);
    addAttr("Center Y", ValueType::DOUBLE, &yc, false);
    addAttr("Clockwise", ValueType::BOOL, &cw, false);
    addAttr("Symbol Number", ValueType::INT, &sym_num, false);
    addAttr("Polarity", ValueType::STRING, &polarityStr, false);
    addAttr("DCode", ValueType::INT, &dcode, false);
    addAttr("ID", ValueType::STRING, &id, false);
    addAttr("Orientation Definition", ValueType::INT, &orient_def, false);
    addAttr("Orientation Rotation", ValueType::FLOAT, &orient_def_rotation, false);
    addAttr("Attribute Lookup", ValueType::STRING, &attributelookup, false);
}

double ODBBoardArcFeature::getStartX() const { return xs; }
double ODBBoardArcFeature::getStartY() const { return ys; }
double ODBBoardArcFeature::getEndX() const { return xe; }
double ODBBoardArcFeature::getEndY() const { return ye; }
double ODBBoardArcFeature::getCenterX() const { return xc; }
double ODBBoardArcFeature::getCenterY() const { return yc; }
bool ODBBoardArcFeature::isClockwise() const { return cw; }
int ODBBoardArcFeature::getSymNum() const { return sym_num; }
const string &ODBBoardArcFeature::getPolarityStr() const { return polarityStr; }
int ODBBoardArcFeature::getDCode() const { return dcode; }
string ODBBoardArcFeature::getId() const { return id; }
int ODBBoardArcFeature::getOrientDef() const { return orient_def; }
float ODBBoardArcFeature::getOrientDefRotation() const { return orient_def_rotation; }
string ODBBoardArcFeature::getAttributeLookup() const { return attributelookup; }

//=====================================================
//  ODBBoardPolygonParts
//=====================================================
ODBBoardPolygonParts::ODBBoardPolygonParts(
    const std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon::PolygonPart> &part)
{
    if (part->type == Odb::Lib::FileModel::Design::ContourPolygon::PolygonPart::Type::Arc)
    {
        partType = "Arc";
        partendX = part->endX;
        partendY = part->endY;
        partXcenter = part->xCenter;
        partYcenter = part->yCenter;
        partisClockwise = (part->isClockwise ? "Yes" : "No");

        addAttr("Type", ValueType::STRING, &partType, false);
        addAttr("End X", ValueType::DOUBLE, &partendX, false);
        addAttr("End Y", ValueType::DOUBLE, &partendY, false);
        addAttr("Center X", ValueType::DOUBLE, &partXcenter, false);
        addAttr("Center Y", ValueType::DOUBLE, &partYcenter, false);
        addAttr("Clockwise", ValueType::BOOL, &partisClockwise, false);
    }
    else if (part->type == Odb::Lib::FileModel::Design::ContourPolygon::PolygonPart::Type::Segment)
    {
        partType = "Segment";
        partendX = part->endX;
        partendY = part->endY;

        addAttr("Type", ValueType::STRING, &partType, false);
        addAttr("End X", ValueType::DOUBLE, &partendX, false);
        addAttr("End Y", ValueType::DOUBLE, &partendY, false);
    }
}

const string &ODBBoardPolygonParts::getPartType() const { return partType; }
double ODBBoardPolygonParts::getPartEndX() const { return partendX; }
double ODBBoardPolygonParts::getPartEndY() const { return partendY; }
double ODBBoardPolygonParts::getPartXCenter() const { return partXcenter; }
double ODBBoardPolygonParts::getPartYCenter() const { return partYcenter; }
const string &ODBBoardPolygonParts::isPartClockwise() const { return partisClockwise; }
double ODBBoardPolygonParts::getPartIndex() const { return partIndex; }

//=====================================================
//  ODBBoardPolygon
//=====================================================
ODBBoardPolygon::ODBBoardPolygon(std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon> poly)
{
    PolystartX = poly->xStart;
    PolystartY = poly->yStart;
    PolyType = (poly->type == Odb::Lib::FileModel::Design::ContourPolygon::Type::Island ? "Island" : "Hole");

    addAttr("Start X", ValueType::DOUBLE, &PolystartX, false);
    addAttr("Start Y", ValueType::DOUBLE, &PolystartY, false);
    addAttr("Type", ValueType::STRING, &PolyType, false);

    for (const std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon::PolygonPart> &part : poly->m_polygonParts)
    {
        ODBBoardPolygonParts *polygonPart = new ODBBoardPolygonParts(part);
        PolygonParts.push_back(polygonPart);
    }
}

std::vector<ODBBoardPolygonParts *> ODBBoardPolygon::getPolygonParts() const { return PolygonParts; }
double ODBBoardPolygon::getPolyIndex() const { return PolyIndex; }
double ODBBoardPolygon::getPolystartX() const { return PolystartX; }
double ODBBoardPolygon::getPolystartY() const { return PolystartY; }
const string &ODBBoardPolygon::getPolyType() const { return PolyType; }

//=====================================================
//  ODBBoardSurfaceFeature
//=====================================================
ODBBoardSurfaceFeature::ODBBoardSurfaceFeature(
    string curfeatureID,
    std::vector<std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon>> contourPolygons,
    Odb::Lib::Polarity polarity,
    int dcode, string attributesString)
    : surfacefeatureID(curfeatureID), dcode(dcode), attributelookup(attributesString)
{
    polarityStr = string(magic_enum::enum_name(polarity));

    addAttr("Surface Feature ID", ValueType::STRING, &surfacefeatureID, false);
    addAttr("Polarity", ValueType::STRING, &polarityStr, false);
    addAttr("DCode", ValueType::INT, &dcode, false);
    addAttr("Attribute Lookup", ValueType::STRING, &attributelookup, false);

    for (const std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon> &p : contourPolygons)
    {
        ODBBoardPolygon *polygon = new ODBBoardPolygon(p);
        polygons.push_back(polygon);
    }
}

std::vector<ODBBoardPolygon *> ODBBoardSurfaceFeature::getContourPolygons() const { return polygons; }
string ODBBoardSurfaceFeature::getSurfaceFeatureID() const { return surfacefeatureID; }
const string &ODBBoardSurfaceFeature::getPolarityStr() const { return polarityStr; }
int ODBBoardSurfaceFeature::getDCode() const { return dcode; }
string ODBBoardSurfaceFeature::getAttributeLookup() const { return attributelookup; }

ODBBoardSurfaceFeature::~ODBBoardSurfaceFeature()
{
    for (auto polygon : polygons)
        delete polygon;
}
//=====================================================
//  ODBBoardGeometryInfo
//=====================================================
std::string ODBBoardGeometryInfo::formatAttributes(const std::map<std::string, std::string> &attrMap)
{
    std::ostringstream oss;
    bool first = true;

    for (const auto &[key, value] : attrMap)
    {
        if (key == "ID")
            continue;

        if (!first)
            oss << ",";
        first = false;

        if (value.empty())
        {
            if (key == "0")
                continue;
            oss << key;
        }
        else
        {
            oss << key << "=" << value;
        }
    }

    return oss.str();
}

ODBBoardGeometryInfo::ODBBoardGeometryInfo(const Odb::Lib::FileModel::Design::FeaturesFile *featuresFile)
{
    featureId = featuresFile->GetId();
    units = featuresFile->GetUnits();

    addAttr("Feature ID", ValueType::INT, &featureId, false);
    addAttr("Units", ValueType::STRING, &units, false);

    // Load symbol names
    for (const auto &entry : featuresFile->GetSymbolNamesByName())
    {
        const std::string &symbolName = entry.first;
        const auto &symbol = entry.second;
        symbolNames[symbolName] = symbol;
        string_name.push_back(symbolName);
        addAttr(symbolName, ValueType::STRING, &string_name.back(), false);
    }

    // Load attribute names and values
    attributeNames = featuresFile->GetAttributeNames();
    attributeTextValues = featuresFile->GetAttributeTextValues();
    for (const auto &attrName : attributeNames)
        addAttr(attrName, ValueType::STRING, const_cast<std::string *>(&attrName), false);
    for (const auto &attrTextValue : attributeTextValues)
        addAttr(attrTextValue, ValueType::STRING, const_cast<std::string *>(&attrTextValue), false);

    std::cout << "size of featureRecords: " << featuresFile->GetFeatureRecords().size() << std::endl;

    // Parse each feature record
    for (const std::shared_ptr<Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord> &featureRecord : featuresFile->GetFeatureRecords())
    {
        std::map<std::string, std::string> parsedAttrMap;
        std::string curfeatureID;

        for (const auto &[key, val] : featureRecord->GetAttributeLookupTable())
        {
            parsedAttrMap[key] = val;
            if (key == "ID")
                curfeatureID = val;
        }

        std::string attributesString = formatAttributes(parsedAttrMap);
        std::cout << "attributesString value: " << attributesString << std::endl;

        // Switch based on feature type
        switch (featureRecord->type)
        {
        case Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord::Type::Line:
            lineFeatures.push_back(new ODBBoardLineFeature(
                featureRecord->xs, featureRecord->ys,
                featureRecord->xe, featureRecord->ye,
                featureRecord->sym_num, featureRecord->polarity,
                featureRecord->dcode, curfeatureID,
                featureRecord->orient_def, featureRecord->orient_def_rotation,
                attributesString));
            break;

        case Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord::Type::Pad:
            padFeatures.push_back(new ODBBoardPadFeature(
                featureRecord->x, featureRecord->y,
                featureRecord->apt_def_symbol_num,
                featureRecord->apt_def_resize_factor,
                featureRecord->apt_def_symbol_num == -1,
                featureRecord->sym_num, featureRecord->polarity,
                featureRecord->dcode, curfeatureID,
                featureRecord->orient_def, featureRecord->orient_def_rotation,
                attributesString));
            break;

        case Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord::Type::Text:
            textFeatures.push_back(new ODBBoardTextFeature(
                featureRecord->x, featureRecord->y,
                featureRecord->xsize, featureRecord->ysize,
                featureRecord->width_factor, featureRecord->font,
                featureRecord->text, featureRecord->version,
                featureRecord->sym_num, featureRecord->polarity,
                featureRecord->dcode, curfeatureID,
                featureRecord->orient_def, featureRecord->orient_def_rotation,
                attributesString));
            break;

        case Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord::Type::Arc:
            arcFeatures.push_back(new ODBBoardArcFeature(
                featureRecord->xs, featureRecord->ys,
                featureRecord->xe, featureRecord->ye,
                featureRecord->xc, featureRecord->yc,
                featureRecord->cw, featureRecord->sym_num,
                featureRecord->polarity, featureRecord->dcode,
                curfeatureID, featureRecord->orient_def,
                featureRecord->orient_def_rotation,
                attributesString));
            break;

        case Odb::Lib::FileModel::Design::FeaturesFile::FeatureRecord::Type::Surface:
            surfaceFeatures.push_back(new ODBBoardSurfaceFeature(
                curfeatureID, featureRecord->GetContourPolygons(),
                featureRecord->polarity, featureRecord->dcode,
                attributesString));
            break;

        default:
            break;
        }
    }
}

ODBBoardGeometryInfo::~ODBBoardGeometryInfo()
{
    for (auto *p : lineFeatures)
        delete p;
    for (auto *p : padFeatures)
        delete p;
    for (auto *p : textFeatures)
        delete p;
    for (auto *p : arcFeatures)
        delete p;
    for (auto *p : surfaceFeatures)
        delete p;
}

const std::vector<ODBBoardLineFeature *> &ODBBoardGeometryInfo::getLineFeatures() const { return lineFeatures; }
const std::vector<ODBBoardPadFeature *> &ODBBoardGeometryInfo::getPadFeatures() const { return padFeatures; }
const std::vector<ODBBoardTextFeature *> &ODBBoardGeometryInfo::getTextFeatures() const { return textFeatures; }
const std::vector<ODBBoardArcFeature *> &ODBBoardGeometryInfo::getArcFeatures() const { return arcFeatures; }
const std::vector<ODBBoardSurfaceFeature *> &ODBBoardGeometryInfo::getSurfaceFeatures() const { return surfaceFeatures; }

std::string ODBBoardGeometryInfo::toPolarityStr(string p) const
{
    return (p == "POSITIVE") ? "P" : "N";
}
//=====================================================
//  ODBBoardGeometryInfo::writeToFile
//=====================================================
void ODBBoardGeometryInfo::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        throw std::runtime_error("Could not open file for writing: " + filename);
    }

    // Use default float precision
    outFile << std::defaultfloat << std::setprecision(15);

    // Write headers and metadata
    outFile << "#\n#Units\n#\n";
    outFile << "UNITS=" << units << "\n";
    outFile << "ID=" << featureId << "\n";

    // Total features count
    size_t numFeatures = lineFeatures.size() + padFeatures.size() +
                         textFeatures.size() + arcFeatures.size() +
                         surfaceFeatures.size();
    outFile << "#\n#Num Features\n#\n";
    outFile << "F " << numFeatures << "\n";

    // Symbol names
    if (!string_name.empty())
        outFile << "#\n#Feature symbol names\n#\n";

    size_t symbolIndex = 0;
    for (const auto &name : string_name)
    {
        auto it = symbolNames.find(name);
        if (it != symbolNames.end())
        {
            const auto &symbol = it->second;
            outFile << "$" << symbolIndex++ << " " << symbol->GetOutputString() << "\n";
        }
    }

    // Attribute names
    if (!attributeNames.empty())
    {
        outFile << "#\n#Feature attribute names\n#\n";
        for (size_t i = 0; i < attributeNames.size(); ++i)
            outFile << "@" << i << " " << attributeNames[i] << "\n";
    }

    // Attribute text values
    if (!attributeTextValues.empty())
    {
        outFile << "#\n#Feature attribute text strings\n#\n";
        for (size_t i = 0; i < attributeTextValues.size(); ++i)
            outFile << "&" << i << " " << attributeTextValues[i] << "\n";
    }

    // Begin layer features
    outFile << "#\n#Layer features\n#\n";

    auto outputCoord = [&](double value)
    {
        std::ios_base::fmtflags original_flags = outFile.flags();

        // Avoid scientific notation for small numbers
        if (fabs(value) < 0.0001 && value != 0.0)
            outFile << std::fixed << std::setprecision(12);
        else
            outFile << std::defaultfloat << std::setprecision(15);

        outFile << value;
        outFile.flags(original_flags);
    };

    //-----------------------------------------------------
    // Line Features
    //-----------------------------------------------------
    for (const auto *lineFeature : lineFeatures)
    {
        outFile << "L ";
        outputCoord(lineFeature->getStartX());
        outFile << " ";
        outputCoord(lineFeature->getStartY());
        outFile << " ";
        outputCoord(lineFeature->getEndX());
        outFile << " ";
        outputCoord(lineFeature->getEndY());
        outFile << " " << lineFeature->getSymNum() << " "
                << toPolarityStr(lineFeature->getPolarityStr()) << " "
                << lineFeature->getDCode() << " ;"
                << lineFeature->getAttributeLookup()
                << ";ID=" << lineFeature->getId() << "\n";
    }

    //-----------------------------------------------------
    // Pad Features
    //-----------------------------------------------------
    for (const auto *padFeature : padFeatures)
    {
        outFile << "P ";
        outputCoord(padFeature->getX());
        outFile << " ";
        outputCoord(padFeature->getY());
        outFile << " "
                << padFeature->getSymbolNum() << " "
                << toPolarityStr(padFeature->getPolarityStr()) << " "
                << padFeature->getDCode() << " ";

        if (padFeature->getOrientDef() != 0)
        {
            outFile << padFeature->getOrientDef();
            if (padFeature->getOrientDefRotation() != 0)
                outFile << " " << padFeature->getOrientDefRotation();
            outFile << " ";
        }
        else
        {
            outFile << "0 ";
        }

        outFile << ";" << padFeature->getAttributeLookup()
                << ";ID=" << padFeature->getId() << "\n";
    }

    //-----------------------------------------------------
    // Text Features
    //-----------------------------------------------------
    for (const auto *textFeature : textFeatures)
    {
        outFile << "T ";
        outputCoord(textFeature->getX());
        outFile << " ";
        outputCoord(textFeature->getY());
        outFile << " " << textFeature->getFont() << " "
                << toPolarityStr(textFeature->getPolarityStr()) << " "
                << textFeature->getDCode();

        if (textFeature->getOrientDef() != 0)
        {
            outFile << " " << textFeature->getOrientDef();
            if (textFeature->getOrientDefRotation() != -1.0)
                outFile << " " << textFeature->getOrientDefRotation();
        }
        else
        {
            outFile << " 0";
        }

        outFile << " " << textFeature->getXSize()
                << " " << textFeature->getYSize()
                << " " << textFeature->getWidthFactor()
                << " " << std::quoted(textFeature->getText())
                << " " << textFeature->getVersion()
                << " " << textFeature->getSymNum()
                << ";" << textFeature->getAttributeLookup()
                << ";ID=" << textFeature->getId() << "\n";
    }

    //-----------------------------------------------------
    // Arc Features
    //-----------------------------------------------------
    for (const auto *arcFeature : arcFeatures)
    {
        outFile << "A ";
        outputCoord(arcFeature->getStartX());
        outFile << " ";
        outputCoord(arcFeature->getStartY());
        outFile << " ";
        outputCoord(arcFeature->getEndX());
        outFile << " ";
        outputCoord(arcFeature->getEndY());
        outFile << " " << arcFeature->getCenterX()
                << " " << arcFeature->getCenterY()
                << " " << arcFeature->getSymNum()
                << " " << toPolarityStr(arcFeature->getPolarityStr())
                << " " << arcFeature->getDCode()
                << " " << (arcFeature->isClockwise() ? 'Y' : 'N')
                << " ;" << arcFeature->getAttributeLookup()
                << ";ID=" << arcFeature->getId() << "\n";
    }

    //-----------------------------------------------------
    // Surface Features
    //-----------------------------------------------------
    for (const auto *surfaceFeature : surfaceFeatures)
    {
        outFile << "S " << toPolarityStr(surfaceFeature->getPolarityStr()) << " "
                << surfaceFeature->getDCode()
                << " ;" << surfaceFeature->getAttributeLookup()
                << ";ID=" << surfaceFeature->getSurfaceFeatureID() << "\n";

        const auto &polygons = surfaceFeature->getContourPolygons();
        for (const auto *polygon : polygons)
        {
            std::string typeChar = (polygon->getPolyType() == "Island") ? "I" : "H";
            outFile << "OB ";
            outputCoord(polygon->getPolystartX());
            outFile << " ";
            outputCoord(polygon->getPolystartY());
            outFile << " " << typeChar << "\n";

            for (const auto *part : polygon->getPolygonParts())
            {
                if (part->getPartType() == "Segment")
                {
                    outFile << "OS ";
                    outputCoord(part->getPartEndX());
                    outFile << " ";
                    outputCoord(part->getPartEndY());
                    outFile << "\n";
                }
                else if (part->getPartType() == "Arc")
                {
                    char clockwiseChar = (part->isPartClockwise() == "Yes") ? 'Y' : 'N';
                    outFile << "OC ";
                    outputCoord(part->getPartEndX());
                    outFile << " ";
                    outputCoord(part->getPartEndY());
                    outFile << " ";
                    outputCoord(part->getPartXCenter());
                    outFile << " ";
                    outputCoord(part->getPartYCenter());
                    outFile << " " << clockwiseChar << "\n";
                }
            }

            outFile << "OE\n";
        }
        outFile << "SE\n";
    }

    outFile.close();
    std::cout << "Geometry information written to " << filename << std::endl;
}
