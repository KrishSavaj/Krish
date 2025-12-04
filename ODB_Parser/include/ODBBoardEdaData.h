#pragma once

#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include <fstream>
#include <iomanip>
#include "GUIComponent.h"
#include "FileArchive.h"
#include "ContourPolygon.h"
#include "EdaDataFile.h"
#include "ODBBoardGeometryInfo.h"
#include "magic_enum.hpp"
#include "enums.h"

namespace Odb::Lib::FileModel::Design
{
    // Forward declarations
    class FeatureIdRecord;
    class SubnetRecord;
    class floatValues;
    class ODBPropertyRecord;
    class EDAnetRecord;
    class ODBOutlineRecord;
    class PerPinOutlineRecord;
    class ODBPinRecord;
    class EdaPackageRecord;
    class EdaFeatureGroupRecord;
    class ODBBoardEdaData;

    enum SubnetType
    {
        Via,
        Trace,
        Plane,
        Toeprint
    };
    enum class FeatureIdType
    {
        Copper,
        Laminate,
        Hole
    };
    enum OutlineTypes
    {
        Rectangle,
        Circle,
        Square,
        Contour
    };
    enum PinType
    {
        ThroughHole,
        Blind,
        Surface
    };
    enum Electrical_Type
    {
        Electrical,
        NonElectrical,
        Undefined
    };
    enum Mount_Type
    {
        Smt,
        RecommendedSmtPad,
        MT_ThroughHole,
        RecommendedThroughHole,
        Pressfit,
        NonBoard,
        Hole,
        MT_Undefined
    };

    class FeatureIdRecord : virtual public GUIComponent
    {
    private:
        std::string featureIdType;
        int layerNumber;
        int featureNumber;

    public:
        FeatureIdRecord() = default;
        FeatureIdRecord(const std::shared_ptr<EdaDataFile::FeatureIdRecord> &featureIdRecord);
        std::string getType() const;
        int getLayerNumber() const;
        int getFeatureNumber() const;
    };

    class SubnetRecord : virtual public GUIComponent
    {
    private:
        std::string subnettype, boardsidetype, filltype, cutouttype;
        int componentNumber, toeprintNumber, index;
        double fillSize;
        std::vector<FeatureIdRecord *> featureIdRecords;

    public:
        SubnetRecord(const std::shared_ptr<EdaDataFile::NetRecord::SubnetRecord> &subnetRecord);
        std::string getSubnetType() const;
        std::string getBoardSideType() const;
        std::string getFillType() const;
        std::string getCutoutType() const;
        int getComponentNumber() const;
        int getToeprintNumber() const;
        double getFillSize() const;
        int getIndex() const;
        const std::vector<FeatureIdRecord *> getFeatureIdRecords() const;
    };

    class floatValues : virtual public GUIComponent
    {
    private:
        float FloatValue;

    public:
        floatValues() = default;
        explicit floatValues(float *floatValue);
        float getFloatValue() const;
    };

    class ODBPropertyRecord : virtual public GUIComponent
    {
    private:
        std::string name;
        std::string value;
        std::vector<floatValues *> perfloatValues;

    public:
        ODBPropertyRecord() = default;
        ODBPropertyRecord(const std::shared_ptr<PropertyRecord> &propertyRecord);
        std::string getName() const;
        std::string getValue() const;
        const std::vector<floatValues *> getFloatValues() const;
    };

    class EDAnetRecord : virtual public GUIComponent
    {
    private:
        std::string NetName, id;
        int NetIndex;
        std::vector<SubnetRecord *> SubnetRecords;
        std::vector<ODBPropertyRecord *> PropertyRecords;

    public:
        EDAnetRecord(const std::shared_ptr<EdaDataFile::NetRecord> &netRecord, std::string currfeatureID);
        std::string getNetName() const;
        int getNetIndex() const;
        std::string getId() const;
        const std::vector<SubnetRecord *> getSubnetRecords() const;
        const std::vector<ODBPropertyRecord *> getPropertyRecords() const;
    };

    class ODBOutlineRecord : virtual public GUIComponent
    {
    private:
        std::string OutlineType;
        double LowerLeftX, LowerLeftY, Width, Height;
        double XCenter, YCenter, HalfSide, Radius;
        std::vector<ODBBoardPolygon *> contourPolygons;

    public:
        ODBOutlineRecord() = default;
        ODBOutlineRecord(const std::shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &outlineRecord);
        std::string getOutlineType() const;
        double getLowerLeftX() const;
        double getLowerLeftY() const;
        double getWidth() const;
        double getHeight() const;
        double getXCenter() const;
        double getYCenter() const;
        double getHalfSide() const;
        double getRadius() const;
        const std::vector<ODBBoardPolygon *> getContourPolygons() const;
    };

    class PerPinOutlineRecord : virtual public GUIComponent
    {
    private:
        std::string PinOutlineType;
        ODBOutlineRecord *outlineRecord = nullptr;

    public:
        PerPinOutlineRecord() = default;
        explicit PerPinOutlineRecord(const std::shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &rec);
        ~PerPinOutlineRecord();
        std::string getPinOutlineType() const;
        const ODBOutlineRecord *getOutlineRecords() const;
    };

    class ODBPinRecord : virtual public GUIComponent
    {
    private:
        std::string PinName, Pintype, ElectricaltypeStr, MountTypeStr;
        double XCenter, YCenter, FinishedHoleSize;
        int Id, Index;
        std::vector<PerPinOutlineRecord *> PinOutlineRecords;

    public:
        ODBPinRecord() = default;
        ODBPinRecord(const std::shared_ptr<EdaDataFile::PackageRecord::PinRecord> &pinRecord);
        std::string getPinName() const;
        std::string getPinType() const;
        std::string getElectricalType() const;
        std::string getMountType() const;
        double getXCenter() const;
        double getYCenter() const;
        double getFinishedHoleSize() const;
        int getId() const;
        int getIndex() const;
        const std::vector<PerPinOutlineRecord *> getPinOutlineRecords() const;
    };

    class EdaPackageRecord : virtual public GUIComponent
    {
    private:
        std::string PackageName, id;
        double Pitch, XMin, YMin, XMax, YMax;
        int index;
        std::vector<ODBOutlineRecord *> OutlineRecords;
        std::vector<ODBPinRecord *> PinRecords;
        std::vector<ODBPropertyRecord *> PropertyRecords;

    public:
        EdaPackageRecord() = default;
        EdaPackageRecord(const std::shared_ptr<EdaDataFile::PackageRecord> &packageRecord, std::string curpackageID);
        std::string getPackageName() const;
        double getPitch() const;
        double getXMin() const;
        double getYMin() const;
        double getXMax() const;
        double getYMax() const;
        int getIndex() const;
        std::string getId() const;
        const std::vector<ODBOutlineRecord *> getOutlineRecords() const;
        const std::vector<ODBPinRecord *> getPinRecords() const;
        const std::vector<ODBPropertyRecord *> getPropertyRecords() const;
    };

    class EdaFeatureGroupRecord : virtual public GUIComponent
    {
    private:
        std::string FeatureGroupType;
        std::vector<ODBPropertyRecord *> PropertyRecords;
        std::vector<FeatureIdRecord *> FeatureIdRecords;

    public:
        EdaFeatureGroupRecord() = default;
        explicit EdaFeatureGroupRecord(const std::shared_ptr<EdaDataFile::FeatureGroupRecord> &featureGroupRecord);
        std::string getFeatureGroupType() const;
        const std::vector<ODBPropertyRecord *> getPropertyRecords() const;
        const std::vector<FeatureIdRecord *> getFeatureIdRecords() const;
    };

    class ODBBoardEdaData : virtual public GUIComponent
    {
    private:
        std::string Units, Source;
        std::vector<std::string> LayerNames, AttributeNames, AttributeTextValues;
        std::vector<EDAnetRecord *> NetRecords;
        std::vector<EdaPackageRecord *> PackageRecords;
        std::vector<EdaFeatureGroupRecord *> FeatureGroupRecords;
        std::vector<ODBPropertyRecord *> PropertyRecords;

    public:
        ODBBoardEdaData() = default;
        explicit ODBBoardEdaData(const EdaDataFile *edaDataFile);
        std::string getUnits() const;
        std::string getSource() const;
        const std::vector<std::string> getLayerNames() const;
        const std::vector<std::string> getAttributeNames() const;
        const std::vector<std::string> getAttributeTextValues() const;
        const std::vector<EDAnetRecord *> getNetRecords() const;
        const std::vector<EdaPackageRecord *> getPackageRecords() const;
        const std::vector<EdaFeatureGroupRecord *> getFeatureGroupRecords() const;
        const std::vector<ODBPropertyRecord *> getPropertyRecords() const;

        void writeToFile(const std::string &filename) const;
    };
}
