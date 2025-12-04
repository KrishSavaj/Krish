#include "ODBComponent.h"

//------------------------------------------------------------------------------
// ODBtoerpintRecords
//------------------------------------------------------------------------------
ODBtoerpintRecords::ODBtoerpintRecords() {}

ODBtoerpintRecords::ODBtoerpintRecords(int pinNumber, int netNumber, int subNetNumber, string &name,
                                       float locationX, float locationY, bool mirror, float rotation)
    : PinNumber(pinNumber), NetNumber(netNumber), subNetNumber(subNetNumber), name(name),
      LocationX(locationX), LocationY(locationY), Mirror(mirror), Rotation(rotation)
{
    addAttr("Pin Number", ValueType::INT, &PinNumber, false);
    addAttr("Net Number", ValueType::INT, &NetNumber, false);
    addAttr("Sub Net Number", ValueType::INT, &subNetNumber, false);
    addAttr("Name", ValueType::STRING, &name, false);
    addAttr("Location X", ValueType::DOUBLE, &LocationX, false);
    addAttr("Location Y", ValueType::DOUBLE, &LocationY, false);
    addAttr("Mirror", ValueType::BOOL, &Mirror, false);
    addAttr("Rotation", ValueType::DOUBLE, &Rotation, false);
}

ODBtoerpintRecords::~ODBtoerpintRecords() {}

int ODBtoerpintRecords::getPinNumber() const { return PinNumber; }
int ODBtoerpintRecords::getNetNumber() const { return NetNumber; }
const std::string &ODBtoerpintRecords::getName() const { return name; }
double ODBtoerpintRecords::getLocationX() const { return LocationX; }
double ODBtoerpintRecords::getLocationY() const { return LocationY; }
bool ODBtoerpintRecords::isMirror() const { return Mirror; }
double ODBtoerpintRecords::getRotation() const { return Rotation; }
int ODBtoerpintRecords::getSubNetNumber() const { return subNetNumber; }

//------------------------------------------------------------------------------
// ODBPropertyRecords
//------------------------------------------------------------------------------
ODBPropertyRecords::ODBPropertyRecords() {}

ODBPropertyRecords::ODBPropertyRecords(const std::string &name, const std::string &value)
    : propName(name), propValue(value)
{
    addAttr("Property Name", ValueType::STRING, &propName, false);
    addAttr("Property Value", ValueType::STRING, &propValue, false);
}

ODBPropertyRecords::~ODBPropertyRecords() {}

const std::string &ODBPropertyRecords::getPropName() const { return propName; }
const std::string &ODBPropertyRecords::getPropValue() const { return propValue; }

//------------------------------------------------------------------------------
// ODBBOMRecords
//------------------------------------------------------------------------------
ODBBOMRecords::ODBBOMRecords(const Odb::Lib::FileModel::Design::ComponentsFile::BomDescriptionRecord *record)
    : cpn_(record->cpn), pkg_(record->pkg), ipn_(record->ipn),
      vpl_vnd_(record->vpl_vnd), vpl_mpn_(record->vpl_mpn),
      vnd_(record->vnd), mpn_(record->mpn)
{
    for (const auto &desc : record->descriptions)
    {
        descriptions_.push_back(desc);
        addAttr("Description", ValueType::STRING, &descriptions_.back(), false);
    }

    addAttr("CPN", ValueType::STRING, &cpn_, false);
    addAttr("Package", ValueType::STRING, &pkg_, false);
    addAttr("IPN", ValueType::STRING, &ipn_, false);
    addAttr("VPL Vendor", ValueType::STRING, &vpl_vnd_, false);
    addAttr("VPL MPN", ValueType::STRING, &vpl_mpn_, false);
    addAttr("Vendor", ValueType::STRING, &vnd_, false);
    addAttr("MPN", ValueType::STRING, &mpn_, false);
}

ODBBOMRecords::~ODBBOMRecords() {}

const std::string &ODBBOMRecords::getCpn() const { return cpn_; }
const std::string &ODBBOMRecords::getPkg() const { return pkg_; }
const std::string &ODBBOMRecords::getIpn() const { return ipn_; }
const std::vector<std::string> &ODBBOMRecords::getDescriptions() const { return descriptions_; }
const std::string &ODBBOMRecords::getVplVnd() const { return vpl_vnd_; }
const std::string &ODBBOMRecords::getVplMpn() const { return vpl_mpn_; }
const std::string &ODBBOMRecords::getVnd() const { return vnd_; }
const std::string &ODBBOMRecords::getMpn() const { return mpn_; }

//------------------------------------------------------------------------------
// ODBComponentRecord
//------------------------------------------------------------------------------
ODBComponentRecord::ODBComponentRecord() {}

ODBComponentRecord::ODBComponentRecord(
    const std::shared_ptr<Odb::Lib::FileModel::Design::ComponentsFile::ComponentRecord> &record,
    string attributestring, string curCompId)
    : attributestring(attributestring)
{
    pkgReferenceId = record->pkgRef;
    attributeId = std::stoi(curCompId);
    compName = record->compName;
    partName = record->partName;
    locationX = record->locationX;
    locationY = record->locationY;
    mirror = record->mirror;
    rotation = record->rotation;
    index = record->index;

    addAttr("Package Reference ID", ValueType::INT, &pkgReferenceId, false);
    addAttr("Component Name", ValueType::STRING, &compName, false);
    addAttr("Part Name", ValueType::STRING, &partName, false);
    addAttr("Location X", ValueType::DOUBLE, &locationX, false);
    addAttr("Location Y", ValueType::DOUBLE, &locationY, false);
    addAttr("Mirror", ValueType::BOOL, &mirror, false);
    addAttr("Rotation", ValueType::DOUBLE, &rotation, false);
    addAttr("Index", ValueType::INT, &index, false);

    for (const auto &prop : record->m_propertyRecords)
        addPropertyRecord(new ODBPropertyRecords(prop->name, prop->value));

    for (const auto &toeprint : record->m_toeprintRecords)
        addToeprintRecord(new ODBtoerpintRecords(
            toeprint->pinNumber, toeprint->netNumber, toeprint->subnetNumber,
            toeprint->name, toeprint->locationX, toeprint->locationY,
            toeprint->mirror, toeprint->rotation));
}

ODBComponentRecord::~ODBComponentRecord()
{
    for (auto *p : propertyRecords)
        delete p;
    for (auto *t : toeprintRecords)
        delete t;
}

void ODBComponentRecord::addPropertyRecord(ODBPropertyRecords *record) { propertyRecords.push_back(record); }
void ODBComponentRecord::addToeprintRecord(ODBtoerpintRecords *record) { toeprintRecords.push_back(record); }

int ODBComponentRecord::getPkgReferenceId() const { return pkgReferenceId; }
const std::string &ODBComponentRecord::getCompName() const { return compName; }
const std::string &ODBComponentRecord::getPartName() const { return partName; }
double ODBComponentRecord::getLocationX() const { return locationX; }
double ODBComponentRecord::getLocationY() const { return locationY; }
bool ODBComponentRecord::isMirror() const { return mirror; }
double ODBComponentRecord::getRotation() const { return rotation; }
int ODBComponentRecord::getIndex() const { return index; }
const std::vector<ODBPropertyRecords *> &ODBComponentRecord::getPropertyRecords() const { return propertyRecords; }
const std::vector<ODBtoerpintRecords *> &ODBComponentRecord::getToeprintRecords() const { return toeprintRecords; }
const std::string &ODBComponentRecord::getAttributestring() const { return attributestring; }
int ODBComponentRecord::getAttributeId() const { return attributeId; }

//------------------------------------------------------------------------------
// ODBComponent
//------------------------------------------------------------------------------
ODBComponent::ODBComponent() {}

ODBComponent::ODBComponent(const ComponentsFile &compFile)
{
    componentsLayerName = compFile.GetLayerName();
    units = compFile.GetUnits();
    compID = compFile.GetId();
    boardSide = magic_enum::enum_name(compFile.GetSide());

    for (string attrName : compFile.GetAttributeNames())
    {
        componentAttributesNames.push_back(attrName);
        addAttr(attrName, ValueType::STRING, &componentAttributesNames.back(), false);
    }

    for (string attrTextValue : compFile.GetAttributeTextValues())
    {
        componentAttributesTextValues.push_back(attrTextValue);
        addAttr(attrTextValue, ValueType::STRING, &componentAttributesTextValues.back(), false);
    }

    addAttr("Components Layer Name", ValueType::STRING, &componentsLayerName, false);
    addAttr("Units", ValueType::STRING, &units, false);
    addAttr("Component ID", ValueType::INT, &compID, false);
    addAttr("Board Side", ValueType::STRING, &boardSide, false);

    const auto &compRecs = compFile.GetComponentRecords();
    for (const auto &rec : compRecs)
    {
        map<string, string> parsedAttrMap = rec->GetAttributeLookupTable();
        string curCompId = parsedAttrMap["ID"];
        string attributesString = formatAttributes(parsedAttrMap);

        ODBComponentRecord *newRecord = new ODBComponentRecord(rec, attributesString, curCompId);
        componentRecords.push_back(newRecord);
    }

    auto bomRecordsMap = compFile.GetBomDescriptionRecordsByCpn();
    for (const auto &bomRecordPair : bomRecordsMap)
    {
        const auto &bomRecord = bomRecordPair.second;
        ODBBOMRecords *newBomRecord = new ODBBOMRecords(bomRecord.get());
        bomRecords[bomRecord->cpn] = std::shared_ptr<ODBBOMRecords>(newBomRecord);
    }

    formatFloatTrim = [](double value) -> std::string
    {
        std::ostringstream oss;
        double rounded = std::round(value * 1e7) / 1e7;
        oss << std::fixed << std::setprecision(7) << rounded;
        std::string s = oss.str();
        s.erase(s.find_last_not_of('0') + 1);
        if (s.back() == '.')
            s += '0';
        return s;
    };
}

ODBComponent::~ODBComponent()
{
    for (auto *rec : componentRecords)
        delete rec;
}

void ODBComponent::addComponentRecord(ODBComponentRecord *record)
{
    componentRecords.push_back(record);
}

const std::string &ODBComponent::getComponentsLayerName() const { return componentsLayerName; }
const std::string &ODBComponent::getUnits() const { return units; }
const int &ODBComponent::getCompID() const { return compID; }
const std::string &ODBComponent::getBoardSide() const { return boardSide; }
const std::vector<ODBComponentRecord *> &ODBComponent::getComponentRecords() const { return componentRecords; }
const std::map<std::string, std::shared_ptr<ODBBOMRecords>> &ODBComponent::getBomRecords() const { return bomRecords; }

std::string ODBComponent::formatAttributes(const std::map<std::string, std::string> &attrMap)
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
            if (key != "0")
                oss << key;
        }
        else
        {
            oss << key << "=" << value;
        }
    }
    return oss.str();
}

void ODBComponent::writeToFile(const std::string &fileName) const
{
    ofstream outFile(fileName);
    if (!outFile.is_open())
    {
        cerr << "Error opening file: " << fileName << endl;
        return;
    }

    outFile << "UNITS=" << units << "\n";
    outFile << "ID=" << compID << "\n";
    outFile << "#\n#Component attribute names\n#\n";

    int counter = 0;
    for (const auto &attrName : componentAttributesNames)
        outFile << "@" << counter++ << " " << attrName << "\n";

    outFile << "\n#\n#Component attribute text strings\n#\n";
    counter = 0;
    for (const auto &attrTextValue : componentAttributesTextValues)
        outFile << "&" << counter++ << " " << attrTextValue << "\n";

    counter = 0;
    outFile << std::defaultfloat << std::setprecision(8);

    for (const auto &record : componentRecords)
    {
        outFile << "# CMP " << counter++ << "\n";
        outFile << "CMP " << record->getPkgReferenceId() << " "
                << formatFloatTrim(record->getLocationX()) << " "
                << formatFloatTrim(record->getLocationY()) << " "
                << formatFloatTrim(record->getRotation()) << " "
                << (record->isMirror() ? "Y" : "N") << " "
                << record->getCompName() << " "
                << record->getPartName() << " ;"
                << record->getAttributestring() << ";ID=" << record->getAttributeId() << "\n";

        for (const auto &prop : record->getPropertyRecords())
            outFile << "PRP " << prop->getPropName() << " '" << prop->getPropValue() << "'\n";

        for (const auto &toeprint : record->getToeprintRecords())
            outFile << "TOP " << toeprint->getPinNumber() << " "
                    << formatFloatTrim(toeprint->getLocationX()) << " "
                    << formatFloatTrim(toeprint->getLocationY()) << " "
                    << formatFloatTrim(toeprint->getRotation()) << " "
                    << (toeprint->isMirror() ? "Y" : "N") << " "
                    << toeprint->getNetNumber() << " "
                    << toeprint->getSubNetNumber() << " "
                    << toeprint->getName() << "\n";

        const auto &partName = record->getPartName();
        auto bomIt = bomRecords.find(partName);

        outFile << "#\n";
        if (bomIt != bomRecords.end() && bomIt->second)
        {
            const auto &bom = bomIt->second;
            outFile << "# BOM DATA\n";
            outFile << "CPN " << bom->getCpn() << "\n";
            outFile << "PKG " << bom->getPkg() << "\n";
            outFile << "IPN " << bom->getIpn() << "\n";
            for (const auto &desc : bom->getDescriptions())
                outFile << "DSC " << desc << "\n";
            outFile << "VPL_VND " << bom->getVplVnd() << "\n";
            outFile << "VPL_MPN " << bom->getVplMpn() << "\n";
            outFile << "VND " << bom->getVnd() << "\n";
            outFile << "MPN " << bom->getMpn() << "\n";
        }
    }

    outFile.close();
}