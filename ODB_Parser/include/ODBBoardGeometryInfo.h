#pragma once

#include <vector>
#include <string>
#include <map>
#include <memory>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <fstream>

#include "GUIComponent.h"
#include "FeaturesFile.h"
#include "SymbolName.h"
#include "ContourPolygon.h"
#include "enums.h"
#include "magic_enum.hpp"

using namespace std;

//=====================================================
//  ODBBoardLineFeature
//=====================================================
class ODBBoardLineFeature : virtual public GUIComponent
{
private:
    int sym_num;
    std::string polarityStr;
    int dcode;
    string id;
    int orient_def;
    float orient_def_rotation;
    double x_s, y_s; //start point
    double x_e, y_e; //end point
    string attributelookup;

public:
    ODBBoardLineFeature(double xs_, double ys_, double xe_, double ye_,
                        int sym_num_ = 0, Odb::Lib::Polarity polarity = Odb::Lib::Polarity::POSITIVE,
                        int dcode_ = 0, string id_ = "",
                        int orient_def_ = -1, double orient_def_rotation_ = -1.0, string attributesString = "");

    double getStartX() const;
    double getStartY() const;
    double getEndX() const;
    double getEndY() const;
    int getSymNum() const;
    const std::string &getPolarityStr() const;
    int getDCode() const;
    string getId() const;
    int getOrientDef() const;
    double getOrientDefRotation() const;
    const std::string &getAttributeLookup() const;
};

//=====================================================
//  ODBBoardPadFeature
//=====================================================
class ODBBoardPadFeature : virtual public GUIComponent
{
private:
    int sym_num;
    std::string polarityStr;
    int dcode;
    string id;
    int orient_def;
    double orient_def_rotation;
    double x, y;
    int symbol_num;
    double resize_factor;
    bool hasResize;
    string attributelookup;

public:
    ODBBoardPadFeature(double x, double y, int symbol_num, double resize_factor, bool hasResize,
                       int sym_num = 0, Odb::Lib::Polarity polarity = Odb::Lib::Polarity::POSITIVE, int dcode = 0, string id = "",
                       int orient_def = -1, double orient_def_rotation = -1.0, string attributesString = "");

    double getX() const;
    double getY() const;
    int getSymbolNum() const;
    double getResizeFactor() const;
    bool hasResizeApplied() const;
    const std::string &getPolarityStr() const;
    int getDCode() const;
    string getId() const;
    int getOrientDef() const;
    double getOrientDefRotation() const;
    int getSymNum() const;
    const std::string &getAttributeLookup() const;
};

//=====================================================
//  ODBBoardTextFeature
//=====================================================
class ODBBoardTextFeature : virtual public GUIComponent
{
private:
    int sym_num;
    std::string polarityStr;
    int dcode;
    string id;
    int orient_def;
    double orient_def_rotation;
    double x, y;
    double xsize, ysize;
    double width_factor;
    std::string font;
    std::string text;
    int version;
    string attributelookup;

public:
    ODBBoardTextFeature(double x, double y, double xsize, double ysize, double width_factor,
                        const std::string &font, const std::string &text, int version, int sym_num = 0,
                        Odb::Lib::Polarity polarity = Odb::Lib::Polarity::POSITIVE, int dcode = 0, string id = "",
                        int orient_def = -1, double orient_def_rotation = -1.0, string attributesString = "");

    double getX() const;
    double getY() const;
    double getXSize() const;
    double getYSize() const;
    double getWidthFactor() const;
    const std::string &getFont() const;
    const std::string &getText() const;
    int getVersion() const;
    int getSymNum() const;
    const std::string &getPolarityStr() const;
    int getDCode() const;
    string getId() const;
    int getOrientDef() const;
    float getOrientDefRotation() const;
    string getAttributeLookup() const;
};

//=====================================================
//  ODBBoardArcFeature
//=====================================================
class ODBBoardArcFeature : virtual public GUIComponent
{
private:
    int sym_num;
    std::string polarityStr;
    int dcode;
    string id;
    int orient_def;
    float orient_def_rotation;
    double xs, ys;
    double xe, ye;
    double xc, yc;
    bool cw;
    string attributelookup;

public:
    ODBBoardArcFeature(double xs, double ys, double xe, double ye,
                       double xc, double yc, bool cw, int sym_num = 0,
                       Odb::Lib::Polarity polarity = Odb::Lib::Polarity::POSITIVE, int dcode = 0, string id = "",
                       int orient_def = -1, double orient_def_rotation = -1.0, string attributesString = "");

    double getStartX() const;
    double getStartY() const;
    double getEndX() const;
    double getEndY() const;
    double getCenterX() const;
    double getCenterY() const;
    bool isClockwise() const;
    int getSymNum() const;
    const std::string &getPolarityStr() const;
    int getDCode() const;
    string getId() const;
    int getOrientDef() const;
    float getOrientDefRotation() const;
    string getAttributeLookup() const;
};

//=====================================================
//  Polygon & Surface Classes
//=====================================================
class ODBBoardPolygonParts : virtual public GUIComponent
{
private:
    string partType;
    double partIndex;
    double partendX;
    double partendY;
    double partXcenter;
    double partYcenter;
    string partisClockwise;

public:
    ODBBoardPolygonParts(const std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon::PolygonPart> &part);

    const std::string &getPartType() const;
    double getPartEndX() const;
    double getPartEndY() const;
    double getPartXCenter() const;
    double getPartYCenter() const;
    const std::string &isPartClockwise() const;
    double getPartIndex() const;
};

class ODBBoardPolygon : virtual public GUIComponent
{
private:
    double PolyIndex;
    double PolystartX;
    double PolystartY;
    string PolyType;
    vector<ODBBoardPolygonParts *> PolygonParts;

public:
    ODBBoardPolygon(std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon> poly);

    std::vector<ODBBoardPolygonParts *> getPolygonParts() const;
    double getPolyIndex() const;
    double getPolystartX() const;
    double getPolystartY() const;
    const std::string &getPolyType() const;
};

class ODBBoardSurfaceFeature : virtual public GUIComponent
{
private:
    string surfacefeatureID;
    std::vector<ODBBoardPolygon *> polygons;
    std::string polarityStr;
    int dcode;
    string attributelookup;

public:
    ODBBoardSurfaceFeature(string curfeatureID,
                           std::vector<std::shared_ptr<Odb::Lib::FileModel::Design::ContourPolygon>> contourPolygons,
                           Odb::Lib::Polarity polarity = Odb::Lib::Polarity::POSITIVE,
                           int dcode = 0, string attributesString = "");

    std::vector<ODBBoardPolygon *> getContourPolygons() const;
    string getSurfaceFeatureID() const;
    const std::string &getPolarityStr() const;
    int getDCode() const;
    string getAttributeLookup() const;
    ~ODBBoardSurfaceFeature();
};

//=====================================================
//  Main Class: ODBBoardGeometryInfo
//=====================================================
class ODBBoardGeometryInfo : virtual public GUIComponent
{
private:
    int featureId;
    std::string units;
    std::map<std::string, std::shared_ptr<Odb::Lib::FileModel::Design::SymbolName>> symbolNames;
    std::vector<string> attributeNames;
    std::vector<std::string> attributeTextValues;
    std::vector<ODBBoardLineFeature *> lineFeatures;
    std::vector<ODBBoardPadFeature *> padFeatures;
    std::vector<ODBBoardTextFeature *> textFeatures;
    std::vector<ODBBoardArcFeature *> arcFeatures;
    std::vector<ODBBoardSurfaceFeature *> surfaceFeatures;
    std::vector<string> string_name;

public:
    std::string formatAttributes(const std::map<std::string, std::string> &attrMap);
    ODBBoardGeometryInfo(const Odb::Lib::FileModel::Design::FeaturesFile *featuresFile);
    ~ODBBoardGeometryInfo();

    const std::vector<ODBBoardLineFeature *> &getLineFeatures() const;
    const std::vector<ODBBoardPadFeature *> &getPadFeatures() const;
    const std::vector<ODBBoardTextFeature *> &getTextFeatures() const;
    const std::vector<ODBBoardArcFeature *> &getArcFeatures() const;
    const std::vector<ODBBoardSurfaceFeature *> &getSurfaceFeatures() const;

    std::string toPolarityStr(string p) const;
    void writeToFile(const std::string &filename) const;
};
