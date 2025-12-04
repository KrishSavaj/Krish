#include "ODBBoardEdaData.h"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <map>
#include <cmath>

using namespace std;
using magic_enum::enum_name;

namespace Odb::Lib::FileModel::Design
{
    // =========================
    // FeatureIdRecord
    // =========================
    FeatureIdRecord::FeatureIdRecord(const shared_ptr<EdaDataFile::FeatureIdRecord> &featureIdRecord)
    {
        featureIdType = string(enum_name(featureIdRecord->type));
        addAttr("Feature ID Type", ValueType::STRING, &featureIdType, false);
        layerNumber = featureIdRecord->layerNumber;
        addAttr("Layer Number", ValueType::INT, &layerNumber, false);
        featureNumber = featureIdRecord->featureNumber;
        addAttr("Feature Number", ValueType::INT, &featureNumber, false);
    }

    string FeatureIdRecord::getType() const { return featureIdType; }
    int FeatureIdRecord::getLayerNumber() const { return layerNumber; }
    int FeatureIdRecord::getFeatureNumber() const { return featureNumber; }

    // =========================
    // SubnetRecord
    // =========================
    SubnetRecord::SubnetRecord(const shared_ptr<EdaDataFile::NetRecord::SubnetRecord> &subnetRecord)
    {
        subnettype = string(enum_name(subnetRecord->type));
        addAttr("Subnet Type", ValueType::STRING, &subnettype, false);

        boardsidetype = string(enum_name(subnetRecord->side));
        addAttr("Board Side Type", ValueType::STRING, &boardsidetype, false);

        filltype = string(enum_name(subnetRecord->fillType));
        addAttr("Fill Type", ValueType::STRING, &filltype, false);

        cutouttype = string(enum_name(subnetRecord->cutoutType));
        addAttr("Cutout Type", ValueType::STRING, &cutouttype, false);

        componentNumber = subnetRecord->componentNumber;
        addAttr("Component Number", ValueType::INT, &componentNumber, false);

        toeprintNumber = subnetRecord->toeprintNumber;
        addAttr("Toeprint Number", ValueType::INT, &toeprintNumber, false);

        fillSize = subnetRecord->fillSize;
        addAttr("Fill Size", ValueType::DOUBLE, &fillSize, false);

        index = subnetRecord->index;
        addAttr("Subnet Index", ValueType::INT, &index, false);

        for (const shared_ptr<EdaDataFile::FeatureIdRecord> &fid : subnetRecord->m_featureIdRecords)
        {
            FeatureIdRecord *newFid = new FeatureIdRecord(fid);
            featureIdRecords.push_back(newFid);
        }
    }

    string SubnetRecord::getSubnetType() const { return subnettype; }
    string SubnetRecord::getBoardSideType() const { return boardsidetype; }
    string SubnetRecord::getFillType() const { return filltype; }
    string SubnetRecord::getCutoutType() const { return cutouttype; }
    int SubnetRecord::getComponentNumber() const { return componentNumber; }
    int SubnetRecord::getToeprintNumber() const { return toeprintNumber; }
    double SubnetRecord::getFillSize() const { return fillSize; }
    int SubnetRecord::getIndex() const { return index; }
    const vector<FeatureIdRecord *> SubnetRecord::getFeatureIdRecords() const { return featureIdRecords; }

    // =========================
    // floatValues
    // =========================
    floatValues::floatValues(float *floatValue)
    {
        FloatValue = *floatValue;
        addAttr("Float Value", ValueType::FLOAT, &FloatValue, false);
    }
    float floatValues::getFloatValue() const { return FloatValue; }

    // =========================
    // ODBPropertyRecord
    // =========================
    ODBPropertyRecord::ODBPropertyRecord(const shared_ptr<PropertyRecord> &propertyRecord)
    {
        name = propertyRecord->name;
        value = propertyRecord->value;

        for (float &floatValue : propertyRecord->floatValues)
        {
            floatValues *newFloatValue = new floatValues(&floatValue);
            perfloatValues.push_back(newFloatValue);
        }

        addAttr("Property Name", ValueType::STRING, &name, false);
        addAttr("Property Value", ValueType::STRING, &value, false);
    }

    string ODBPropertyRecord::getName() const { return name; }
    string ODBPropertyRecord::getValue() const { return value; }
    const vector<floatValues *> ODBPropertyRecord::getFloatValues() const { return perfloatValues; }

    // =========================
    // EDAnetRecord
    // =========================
    EDAnetRecord::EDAnetRecord(const shared_ptr<EdaDataFile::NetRecord> &netRecord, string currfeatureID)
    {
        NetName = netRecord->name;
        NetIndex = netRecord->index;
        id = currfeatureID;

        addAttr("ID", ValueType::STRING, &id, false);
        addAttr("Net Name", ValueType::STRING, &NetName, false);
        addAttr("Net Index", ValueType::INT, &NetIndex, false);

        for (const auto &subnet : netRecord->m_subnetRecords)
        {
            if (subnet)
            {
                SubnetRecord *newSubnet = new SubnetRecord(subnet);
                SubnetRecords.push_back(newSubnet);
            }
            else
            {
                cerr << "Found null subnet pointer in NetRecord: " << NetName << endl;
            }
        }

        for (const auto &prop : netRecord->m_propertyRecords)
        {
            ODBPropertyRecord *newProp = new ODBPropertyRecord(prop);
            PropertyRecords.push_back(newProp);
        }
    }

    string EDAnetRecord::getNetName() const { return NetName; }
    int EDAnetRecord::getNetIndex() const { return NetIndex; }
    string EDAnetRecord::getId() const { return id; }
    const vector<SubnetRecord *> EDAnetRecord::getSubnetRecords() const { return SubnetRecords; }
    const vector<ODBPropertyRecord *> EDAnetRecord::getPropertyRecords() const { return PropertyRecords; }

    // =========================
    // ODBOutlineRecord
    // =========================
    ODBOutlineRecord::ODBOutlineRecord(const shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &outlineRecord)
    {
        OutlineType = string(enum_name(outlineRecord->type));
        LowerLeftX = 0.0;
        LowerLeftY = 0.0;
        Width = 0.0;
        Height = 0.0;
        XCenter = 0.0;
        YCenter = 0.0;
        HalfSide = 0.0;
        Radius = 0.0;

        switch (outlineRecord->type)
        {
        case EdaDataFile::PackageRecord::OutlineRecord::Type::Rectangle:
            LowerLeftX = outlineRecord->lowerLeftX;
            LowerLeftY = outlineRecord->lowerLeftY;
            Width = outlineRecord->width;
            Height = outlineRecord->height;
            addAttr("Lower Left X", ValueType::DOUBLE, &LowerLeftX, false);
            addAttr("Lower Left Y", ValueType::DOUBLE, &LowerLeftY, false);
            addAttr("Width", ValueType::DOUBLE, &Width, false);
            addAttr("Height", ValueType::DOUBLE, &Height, false);
            break;

        case EdaDataFile::PackageRecord::OutlineRecord::Type::Circle:
            XCenter = outlineRecord->xCenter;
            YCenter = outlineRecord->yCenter;
            Radius = outlineRecord->radius;
            addAttr("X Center", ValueType::DOUBLE, &XCenter, false);
            addAttr("Y Center", ValueType::DOUBLE, &YCenter, false);
            addAttr("Radius", ValueType::DOUBLE, &Radius, false);
            break;

        case EdaDataFile::PackageRecord::OutlineRecord::Type::Square:
            XCenter = outlineRecord->xCenter;
            YCenter = outlineRecord->yCenter;
            HalfSide = outlineRecord->halfSide;
            addAttr("X Center", ValueType::DOUBLE, &XCenter, false);
            addAttr("Y Center", ValueType::DOUBLE, &YCenter, false);
            addAttr("Half Side", ValueType::DOUBLE, &HalfSide, false);
            break;

        case EdaDataFile::PackageRecord::OutlineRecord::Type::Contour:
            for (const shared_ptr<ContourPolygon> &contourPolygonPtr : outlineRecord->m_contourPolygons)
            {
                if (contourPolygonPtr)
                {
                    ODBBoardPolygon *newContourPolygon = new ODBBoardPolygon(contourPolygonPtr);
                    contourPolygons.push_back(newContourPolygon);
                }
                else
                {
                    cerr << "Found null contour polygon pointer in OutlineRecord" << endl;
                }
            }
            break;

        default:
            break;
        }

        addAttr("Outline Type", ValueType::STRING, &OutlineType, false);
    }

    string ODBOutlineRecord::getOutlineType() const { return OutlineType; }
    double ODBOutlineRecord::getLowerLeftX() const { return LowerLeftX; }
    double ODBOutlineRecord::getLowerLeftY() const { return LowerLeftY; }
    double ODBOutlineRecord::getWidth() const { return Width; }
    double ODBOutlineRecord::getHeight() const { return Height; }
    double ODBOutlineRecord::getXCenter() const { return XCenter; }
    double ODBOutlineRecord::getYCenter() const { return YCenter; }
    double ODBOutlineRecord::getHalfSide() const { return HalfSide; }
    double ODBOutlineRecord::getRadius() const { return Radius; }
    const vector<ODBBoardPolygon *> ODBOutlineRecord::getContourPolygons() const { return contourPolygons; }

    // =========================
    // PerPinOutlineRecord
    // =========================
    PerPinOutlineRecord::PerPinOutlineRecord(const shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &rec)
    {
        PinOutlineType = string(enum_name(rec->type));
        addAttr("Pin Outline Type", ValueType::STRING, &PinOutlineType, false);
        outlineRecord = new ODBOutlineRecord(rec);
    }

    PerPinOutlineRecord::~PerPinOutlineRecord()
    {
        delete outlineRecord;
        outlineRecord = nullptr;
    }

    string PerPinOutlineRecord::getPinOutlineType() const { return PinOutlineType; }
    const ODBOutlineRecord *PerPinOutlineRecord::getOutlineRecords() const { return outlineRecord; }

    // =========================
    // ODBPinRecord
    // =========================
    ODBPinRecord::ODBPinRecord(const shared_ptr<EdaDataFile::PackageRecord::PinRecord> &pinRecord)
    {
        PinName = pinRecord->name;
        Pintype = string(enum_name(pinRecord->type));
        ElectricaltypeStr = string(enum_name(pinRecord->electricalType));
        MountTypeStr = string(enum_name(pinRecord->mountType));

        addAttr("Pin Name", ValueType::STRING, &PinName, false);
        addAttr("Pin Type", ValueType::STRING, &Pintype, false);

        XCenter = pinRecord->xCenter;
        YCenter = pinRecord->yCenter;
        FinishedHoleSize = pinRecord->finishedHoleSize;
        Id = pinRecord->id;
        Index = pinRecord->index;

        addAttr("X Center", ValueType::DOUBLE, &XCenter, false);
        addAttr("Y Center", ValueType::DOUBLE, &YCenter, false);
        addAttr("Finished Hole Size", ValueType::DOUBLE, &FinishedHoleSize, false);
        addAttr("Electrical Type", ValueType::STRING, &ElectricaltypeStr, false);
        addAttr("Mount Type", ValueType::STRING, &MountTypeStr, false);
        addAttr("Pin ID", ValueType::INT, &Id, false);
        addAttr("Pin Index", ValueType::INT, &Index, false);

        for (const shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &outline : pinRecord->m_outlineRecords)
        {
            PerPinOutlineRecord *newOutlineRecord = new PerPinOutlineRecord(outline);
            PinOutlineRecords.push_back(newOutlineRecord);
        }
    }

    string ODBPinRecord::getPinName() const { return PinName; }
    string ODBPinRecord::getPinType() const { return Pintype; }
    string ODBPinRecord::getElectricalType() const { return ElectricaltypeStr; }
    string ODBPinRecord::getMountType() const { return MountTypeStr; }
    double ODBPinRecord::getXCenter() const { return XCenter; }
    double ODBPinRecord::getYCenter() const { return YCenter; }
    double ODBPinRecord::getFinishedHoleSize() const { return FinishedHoleSize; }
    int ODBPinRecord::getId() const { return Id; }
    int ODBPinRecord::getIndex() const { return Index; }
    const vector<PerPinOutlineRecord *> ODBPinRecord::getPinOutlineRecords() const { return PinOutlineRecords; }

    // =========================
    // EdaPackageRecord
    // =========================
    EdaPackageRecord::EdaPackageRecord(
        const shared_ptr<EdaDataFile::PackageRecord> &packageRecord,
        string curpackageID)
    {
        PackageName = packageRecord->name;
        addAttr("Package Name", ValueType::STRING, &PackageName, false);

        Pitch = packageRecord->pitch;
        addAttr("Pitch", ValueType::DOUBLE, &Pitch, false);

        XMin = packageRecord->xMin;
        addAttr("X Min", ValueType::DOUBLE, &XMin, false);

        YMin = packageRecord->yMin;
        addAttr("Y Min", ValueType::DOUBLE, &YMin, false);

        XMax = packageRecord->xMax;
        addAttr("X Max", ValueType::DOUBLE, &XMax, false);

        YMax = packageRecord->yMax;
        addAttr("Y Max", ValueType::DOUBLE, &YMax, false);

        index = packageRecord->index;
        addAttr("Package Index", ValueType::INT, &index, false);

        id = curpackageID;
        addAttr("ID", ValueType::STRING, &id, false);

        // Copy outline records
        for (const shared_ptr<EdaDataFile::PackageRecord::OutlineRecord> &outline : packageRecord->m_outlineRecords)
        {
            ODBOutlineRecord *newOutline = new ODBOutlineRecord(outline);
            OutlineRecords.push_back(newOutline);
        }

        // Copy pin records
        for (const shared_ptr<EdaDataFile::PackageRecord::PinRecord> &pin : packageRecord->m_pinRecords)
        {
            ODBPinRecord *newPin = new ODBPinRecord(pin);
            PinRecords.push_back(newPin);
        }

        // Copy property records
        for (const shared_ptr<PropertyRecord> &prop : packageRecord->m_propertyRecords)
        {
            ODBPropertyRecord *newProp = new ODBPropertyRecord(prop);
            PropertyRecords.push_back(newProp);
        }
    }

    string EdaPackageRecord::getPackageName() const { return PackageName; }
    double EdaPackageRecord::getPitch() const { return Pitch; }
    double EdaPackageRecord::getXMin() const { return XMin; }
    double EdaPackageRecord::getYMin() const { return YMin; }
    double EdaPackageRecord::getXMax() const { return XMax; }
    double EdaPackageRecord::getYMax() const { return YMax; }
    int EdaPackageRecord::getIndex() const { return index; }
    string EdaPackageRecord::getId() const { return id; }
    const vector<ODBOutlineRecord *> EdaPackageRecord::getOutlineRecords() const { return OutlineRecords; }
    const vector<ODBPinRecord *> EdaPackageRecord::getPinRecords() const { return PinRecords; }
    const vector<ODBPropertyRecord *> EdaPackageRecord::getPropertyRecords() const { return PropertyRecords; }

    // =========================
    // EdaFeatureGroupRecord
    // =========================
    EdaFeatureGroupRecord::EdaFeatureGroupRecord(
        const shared_ptr<EdaDataFile::FeatureGroupRecord> &featureGroupRecord)
    {
        FeatureGroupType = featureGroupRecord->type;
        addAttr("Feature Group Name", ValueType::STRING, &FeatureGroupType, false);
        addAttr("Feature Group Type", ValueType::STRING, &featureGroupRecord->type, false);

        for (const shared_ptr<PropertyRecord> &prop : featureGroupRecord->m_propertyRecords)
        {
            ODBPropertyRecord *newProp = new ODBPropertyRecord(prop);
            PropertyRecords.push_back(newProp);
        }

        for (const shared_ptr<EdaDataFile::FeatureIdRecord> &fid : featureGroupRecord->m_featureIdRecords)
        {
            FeatureIdRecord *newFid = new FeatureIdRecord(fid);
            FeatureIdRecords.push_back(newFid);
        }
    }

    string EdaFeatureGroupRecord::getFeatureGroupType() const { return FeatureGroupType; }
    const vector<ODBPropertyRecord *> EdaFeatureGroupRecord::getPropertyRecords() const { return PropertyRecords; }
    const vector<FeatureIdRecord *> EdaFeatureGroupRecord::getFeatureIdRecords() const { return FeatureIdRecords; }

    // =========================
    // ODBBoardEdaData
    // =========================
    ODBBoardEdaData::ODBBoardEdaData(const EdaDataFile *edaDataFile)
    {
        Units = edaDataFile->GetUnits();
        Source = edaDataFile->GetSource();

        cout << "size of LayerNames: " << edaDataFile->GetLayerNames().size() << endl;
        cout << "size of AttributeNames: " << edaDataFile->GetAttributeNames().size() << endl;

        // --- Copy layer, attribute and text values ---
        for (const string &layerName : edaDataFile->GetLayerNames())
            LayerNames.push_back(layerName);

        for (const string &attrName : edaDataFile->GetAttributeNames())
            AttributeNames.push_back(attrName);

        for (const string &attrTextValue : edaDataFile->GetAttributeTextValues())
            AttributeTextValues.push_back(attrTextValue);

        cout << "call to constructor of ODBBoardEdaData" << endl;

        // --- Add base attributes ---
        addAttr("Units", ValueType::STRING, &Units, false);
        addAttr("Source", ValueType::STRING, &Source, false);

        for (size_t i = 0; i < LayerNames.size(); ++i)
        {
            string label = "Layer Name [" + to_string(i) + "]";
            addAttr(label, ValueType::STRING, &LayerNames[i], false);
        }

        for (size_t i = 0; i < AttributeTextValues.size(); ++i)
        {
            string label = "Attribute Text Value [" + to_string(i) + "]";
            addAttr(label, ValueType::STRING, &AttributeTextValues[i], false);
        }

        for (size_t i = 0; i < AttributeNames.size(); ++i)
        {
            string label = "Attribute Name [" + to_string(i) + "]";
            addAttr(label, ValueType::STRING, &AttributeNames[i], false);
        }

        // --- Copy Net Records ---
        for (const shared_ptr<EdaDataFile::NetRecord> &net : edaDataFile->GetNetRecords())
        {
            map<string, string> parsedAttrMap;
            string curfeatureID;

            for (const auto &[key, val] : net->GetAttributeLookupTable())
            {
                parsedAttrMap[key] = val;
                if (key == "ID")
                    curfeatureID = val;
            }

            EDAnetRecord *newNet = new EDAnetRecord(net, curfeatureID);
            NetRecords.push_back(newNet);
        }

        // --- Copy Package Records ---
        for (const shared_ptr<EdaDataFile::PackageRecord> &pkg : edaDataFile->GetPackageRecords())
        {
            cout << "package working fine" << endl;
            map<string, string> parsedAttrMap;
            string curpackageID;

            for (const auto &[key, val] : pkg->GetAttributeLookupTable())
            {
                parsedAttrMap[key] = val;
                if (key == "ID")
                    curpackageID = val;
            }

            EdaPackageRecord *newPkg = new EdaPackageRecord(pkg, curpackageID);
            PackageRecords.push_back(newPkg);
        }

        // --- Copy Feature Group Records ---
        for (const EdaDataFile::FeatureGroupRecord::shared_ptr &fg : edaDataFile->GetFeatureGroupRecords())
        {
            cout << "feature group working fine" << endl;
            EdaFeatureGroupRecord *newFg = new EdaFeatureGroupRecord(fg);
            FeatureGroupRecords.push_back(newFg);
        }

        // --- Copy Property Records ---
        for (const shared_ptr<PropertyRecord> &prop : edaDataFile->GetPropertyRecords())
        {
            ODBPropertyRecord *newProp = new ODBPropertyRecord(prop);
            PropertyRecords.push_back(newProp);
        }
    }

    // --- Getters ---
    string ODBBoardEdaData::getUnits() const { return Units; }
    string ODBBoardEdaData::getSource() const { return Source; }
    const vector<string> ODBBoardEdaData::getLayerNames() const { return LayerNames; }
    const vector<string> ODBBoardEdaData::getAttributeNames() const { return AttributeNames; }
    const vector<string> ODBBoardEdaData::getAttributeTextValues() const { return AttributeTextValues; }
    const vector<EDAnetRecord *> ODBBoardEdaData::getNetRecords() const { return NetRecords; }
    const vector<EdaPackageRecord *> ODBBoardEdaData::getPackageRecords() const { return PackageRecords; }
    const vector<EdaFeatureGroupRecord *> ODBBoardEdaData::getFeatureGroupRecords() const { return FeatureGroupRecords; }
    const vector<ODBPropertyRecord *> ODBBoardEdaData::getPropertyRecords() const { return PropertyRecords; }

    // =========================
    // ODBBoardEdaData::writeToFile
    // =========================
    void ODBBoardEdaData::writeToFile(const std::string &filename) const
    {
        ofstream outFile(filename);
        if (!outFile.is_open())
        {
            cerr << "Failed to open file: " << filename << endl;
            return;
        }

        auto outputCoord = [&](double value)
        {
            ios_base::fmtflags original_flags = outFile.flags();
            outFile << fixed << setprecision(12) << value;
            outFile.flags(original_flags);
        };

        // --- Write header information ---
        outFile << "#\n";
        outFile << "HDR " << Source << "\n";
        outFile << "UNITS=" << Units << "\n";

        // --- Write layer names ---
        outFile << "LYR";
        for (const string &layerName : LayerNames)
            outFile << " " << layerName;

        // --- Attribute names and text values ---
        outFile << "\n#\n";
        for (size_t i = 0; i < AttributeNames.size(); ++i)
            outFile << "#@" << i << " " << AttributeNames[i] << "\n";

        outFile << "#Net attribute names\n#\n";
        for (size_t i = 0; i < AttributeTextValues.size(); ++i)
            outFile << "#@" << i << " " << AttributeTextValues[i] << "\n";

        outFile << "#\n";

        // --- Write net records ---
        for (const EDAnetRecord *netRecord : NetRecords)
        {
            outFile << "# NET " << netRecord->getNetIndex() << "\n";

            if (netRecord->getNetName().empty())
                outFile << "NET $NONE$;;ID=" << netRecord->getId() << "\n";
            else
                outFile << "NET " << netRecord->getNetName() << ";;ID=" << netRecord->getId() << "\n";

            for (const SubnetRecord *subnetRecord : netRecord->getSubnetRecords())
            {
                const string &type = subnetRecord->getSubnetType();

                if (type == "Toeprint")
                {
                    outFile << "SNT TOP " << subnetRecord->getBoardSideType()[0]
                            << " " << subnetRecord->getComponentNumber()
                            << " " << subnetRecord->getToeprintNumber() << "\n";
                }
                else if (type == "Plane")
                {
                    outFile << "SNT PLN " << subnetRecord->getFillType()[0]
                            << " " << subnetRecord->getCutoutType()[0]
                            << " " << subnetRecord->getFillSize() << "\n";
                }
                else if (type == "Via")
                    outFile << "SNT VIA\n";
                else if (type == "Trace")
                    outFile << "SNT TRC\n";

                for (const FeatureIdRecord *fidRecord : subnetRecord->getFeatureIdRecords())
                {
                    outFile << "FID " << fidRecord->getType()[0] << " "
                            << fidRecord->getLayerNumber() << " "
                            << fidRecord->getFeatureNumber() << "\n";
                }
            }

            for (const ODBPropertyRecord *propRecord : netRecord->getPropertyRecords())
            {
                outFile << "PROPERTY_NAME=" << propRecord->getName() << "\n";
                outFile << "PROPERTY_VALUE=" << propRecord->getValue() << "\n";
            }
        }

        // --- Write package records ---
        for (const EdaPackageRecord *pkgRecord : PackageRecords)
        {
            outFile << "# PKG " << pkgRecord->getIndex() << "\n";
            outFile << "PKG " << pkgRecord->getPackageName() << " "
                    << pkgRecord->getPitch() << " ";
            outputCoord(pkgRecord->getXMin());
            outFile << " ";
            outputCoord(pkgRecord->getYMin());
            outFile << " ";
            outputCoord(pkgRecord->getXMax());
            outFile << " ";
            outputCoord(pkgRecord->getYMax());
            outFile << ";;ID=" << pkgRecord->getId() << "\n";

            // --- Write outlines ---
            for (const ODBOutlineRecord *outlineRecord : pkgRecord->getOutlineRecords())
            {
                string t = outlineRecord->getOutlineType();

                if (t == "Rectangle")
                {
                    outFile << "RC " << outlineRecord->getLowerLeftX() << " "
                            << outlineRecord->getLowerLeftY() << " "
                            << outlineRecord->getWidth() << " "
                            << outlineRecord->getHeight() << "\n";
                }
                else if (t == "Circle")
                {
                    outFile << "CR " << outlineRecord->getXCenter() << " "
                            << outlineRecord->getYCenter() << " "
                            << outlineRecord->getRadius() << "\n";
                }
                else if (t == "Square")
                {
                    outFile << "SQ " << outlineRecord->getXCenter() << " "
                            << outlineRecord->getYCenter() << " "
                            << outlineRecord->getHalfSide() << "\n";
                }
                else if (t == "Contour")
                {
                    outFile << "CT\n";
                    for (ODBBoardPolygon *polygon : outlineRecord->getContourPolygons())
                    {
                        string typeChar = (polygon->getPolyType() == "Island") ? "I" : "H";
                        outFile << "OB ";
                        outputCoord(polygon->getPolystartX());
                        outFile << " ";
                        outputCoord(polygon->getPolystartY());
                        outFile << " " << typeChar << "\n";

                        for (ODBBoardPolygonParts *part : polygon->getPolygonParts())
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
                                char cwChar = (part->isPartClockwise() == "Yes") ? 'Y' : 'N';
                                outFile << "OC ";
                                outputCoord(part->getPartEndX());
                                outFile << " ";
                                outputCoord(part->getPartEndY());
                                outFile << " ";
                                outputCoord(part->getPartXCenter());
                                outFile << " ";
                                outputCoord(part->getPartYCenter());
                                outFile << " " << cwChar << "\n";
                            }
                        }
                        outFile << "OE\n";
                    }
                    outFile << "CE\n";
                }
            }

            // --- Write pin records ---
            for (const ODBPinRecord *pinRecord : pkgRecord->getPinRecords())
            {
                char pintypechar = 'U';
                char electricaltypechar = 'U';
                char mounttypechar = 'U';

                if (pinRecord->getPinType() == "ThroughHole")
                    pintypechar = 'T';
                else if (pinRecord->getPinType() == "Blind")
                    pintypechar = 'B';
                else if (pinRecord->getPinType() == "Surface")
                    pintypechar = 'S';

                if (pinRecord->getElectricalType() == "Electrical")
                    electricaltypechar = 'E';
                else if (pinRecord->getElectricalType() == "NonElectrical")
                    electricaltypechar = 'N';

                string mt = pinRecord->getMountType();
                if (mt == "Smt")
                    mounttypechar = 'S';
                else if (mt == "RecommendedSmtPad")
                    mounttypechar = 'R';
                else if (mt == "MT_ThroughHole")
                    mounttypechar = 'T';
                else if (mt == "RecommendedThroughHole")
                    mounttypechar = 'H';
                else if (mt == "Pressfit")
                    mounttypechar = 'P';
                else if (mt == "NonBoard")
                    mounttypechar = 'N';
                else if (mt == "Hole")
                    mounttypechar = 'D';

                outFile << "PIN " << pinRecord->getPinName() << " " << pintypechar << " ";
                outputCoord(pinRecord->getXCenter());
                outFile << " ";
                outputCoord(pinRecord->getYCenter());
                outFile << " "
                        << pinRecord->getFinishedHoleSize() << " "
                        << electricaltypechar << " "
                        << mounttypechar
                        << " ID=" << pinRecord->getId() << "\n";

                for (const PerPinOutlineRecord *pinOutline : pinRecord->getPinOutlineRecords())
                {
                    string pt = pinOutline->getPinOutlineType();

                    if (pt == "Rectangle")
                    {
                        outFile << "RC " << pinOutline->getOutlineRecords()->getLowerLeftX() << " "
                                << pinOutline->getOutlineRecords()->getLowerLeftY() << " "
                                << pinOutline->getOutlineRecords()->getWidth() << " "
                                << pinOutline->getOutlineRecords()->getHeight() << "\n";
                    }
                    else if (pt == "Circle")
                    {
                        outFile << "CR " << pinOutline->getOutlineRecords()->getXCenter() << " "
                                << pinOutline->getOutlineRecords()->getYCenter() << " "
                                << pinOutline->getOutlineRecords()->getRadius() << "\n";
                    }
                    else if (pt == "Square")
                    {
                        outFile << "SQ " << pinOutline->getOutlineRecords()->getXCenter() << " "
                                << pinOutline->getOutlineRecords()->getYCenter() << " "
                                << pinOutline->getOutlineRecords()->getHalfSide() << "\n";
                    }
                    else if (pt == "Contour")
                    {
                        outFile << "CT\n";
                        for (ODBBoardPolygon *polygon : pinOutline->getOutlineRecords()->getContourPolygons())
                        {
                            string typeChar = (polygon->getPolyType() == "Island") ? "I" : "H";
                            outFile << "OB ";
                            outputCoord(polygon->getPolystartX());
                            outFile << " ";
                            outputCoord(polygon->getPolystartY());
                            outFile << " " << typeChar << "\n";

                            for (ODBBoardPolygonParts *part : polygon->getPolygonParts())
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
                                    char cwChar = (part->isPartClockwise() == "Yes") ? 'Y' : 'N';
                                    outFile << "OC ";
                                    outputCoord(part->getPartEndX());
                                    outFile << " ";
                                    outputCoord(part->getPartEndY());
                                    outFile << " ";
                                    outputCoord(part->getPartXCenter());
                                    outFile << " ";
                                    outputCoord(part->getPartYCenter());
                                    outFile << " " << cwChar << "\n";
                                }
                            }
                            outFile << "OE\n";
                        }
                        outFile << "CE\n";
                    }
                }
            }

            for (const ODBPropertyRecord *propRecord : pkgRecord->getPropertyRecords())
            {
                outFile << "PROPERTY_NAME=" << propRecord->getName() << "\n";
                outFile << "PROPERTY_VALUE=" << propRecord->getValue() << "\n";
            }
        }

        outFile << "#\n";

        // --- Write feature group records ---
        for (const EdaFeatureGroupRecord *fgRecord : FeatureGroupRecords)
        {
            outFile << "FGR " << fgRecord->getFeatureGroupType() << "\n";

            for (const ODBPropertyRecord *propRecord : fgRecord->getPropertyRecords())
            {
                outFile << "PROPERTY_NAME=" << propRecord->getName() << "\n";
                outFile << "PROPERTY_VALUE=" << propRecord->getValue() << "\n";
            }

            for (const FeatureIdRecord *fidRecord : fgRecord->getFeatureIdRecords())
            {
                outFile << "FID " << fidRecord->getType()[0] << " "
                        << fidRecord->getLayerNumber() << " "
                        << fidRecord->getFeatureNumber() << "\n";
            }
        }

        // --- Write property records ---
        for (const ODBPropertyRecord *propRecord : PropertyRecords)
        {
            outFile << "PROPERTY_NAME=" << propRecord->getName() << "\n";
            outFile << "PROPERTY_VALUE=" << propRecord->getValue() << "\n";
        }

        outFile.close();
    }
}
