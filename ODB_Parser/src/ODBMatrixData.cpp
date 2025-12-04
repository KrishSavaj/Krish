#include "ODBMatrixData.h"

// -----------------------------
//     Utility Function
// -----------------------------
std::string formatColor(const Odb::Lib::FileModel::Design::RgbColor &c)
{
    if (c.noPreference)
    {
        return "0";
    }
    std::ostringstream oss;
    oss << std::setw(2) << std::setfill('0') << (int)c.red
        << std::setw(2) << std::setfill('0') << (int)c.green
        << std::setw(2) << std::setfill('0') << (int)c.blue;
    return oss.str();
}

// -----------------------------
//     ODBStepRecord Implementation
// -----------------------------
ODBStepRecord::ODBStepRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::StepRecord> *stepRecord)
{
    column = (*stepRecord)->column;
    id = (*stepRecord)->id;
    name = (*stepRecord)->name;

    addAttr("Column", ValueType::INT, &this->column, false);
    addAttr("ID", ValueType::INT, &this->id, false);
    addAttr("Name", ValueType::STRING, &this->name, false);
}

unsigned int ODBStepRecord::getColumn() const { return column; }
unsigned int ODBStepRecord::getId() const { return id; }
const std::string &ODBStepRecord::getName() const { return name; }

// -----------------------------
//     ODBLayerRecord Implementation
// -----------------------------
ODBLayerRecord::ODBLayerRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::LayerRecord> *layerRecord)
{
    row = (*layerRecord)->row;
    layerName = (*layerRecord)->name;
    context = std::string(magic_enum::enum_name((*layerRecord)->context));
    type = std::string(magic_enum::enum_name((*layerRecord)->type));
    polarity = std::string(magic_enum::enum_name((*layerRecord)->polarity));
    dielectricType = std::string(magic_enum::enum_name((*layerRecord)->dielectricType));
    dielectricName = (*layerRecord)->dielectricName;
    form = std::string(magic_enum::enum_name((*layerRecord)->form));
    cuTop = (*layerRecord)->cuTop;
    cuBottom = (*layerRecord)->cuBottom;
    ref = (*layerRecord)->ref;
    startName = (*layerRecord)->startName;
    endName = (*layerRecord)->endName;
    oldName = (*layerRecord)->oldName;
    addType = (*layerRecord)->addType;
    color = formatColor((*layerRecord)->color);
    id = (*layerRecord)->id;

    if (!this->layerName.empty())
        addAttr("Layer Name", ValueType::STRING, &this->layerName, false);
    if (!this->context.empty())
        addAttr("Context", ValueType::STRING, &this->context, false);
    if (!this->type.empty())
        addAttr("Type", ValueType::STRING, &this->type, false);
    if (!this->polarity.empty())
        addAttr("Polarity", ValueType::STRING, &this->polarity, false);
    if (!this->dielectricType.empty() && this->dielectricType != "NotSet")
        addAttr("Dielectric Type", ValueType::STRING, &this->dielectricType, false);
    if (!this->dielectricName.empty())
        addAttr("Dielectric Name", ValueType::STRING, &this->dielectricName, false);
    if (!this->form.empty() && this->form != "Not_Set")
        addAttr("Form", ValueType::STRING, &this->form, false);
    if (this->row != 0)
        addAttr("Row", ValueType::INT, &this->row, false);
    if (this->cuTop != (unsigned int)-1)
        addAttr("CU Top", ValueType::INT, &this->cuTop, false);
    if (this->cuBottom != (unsigned int)-1)
        addAttr("CU Bottom", ValueType::INT, &this->cuBottom, false);
    if (this->ref != (unsigned int)-1)
        addAttr("Ref", ValueType::INT, &this->ref, false);
    if (!this->startName.empty())
        addAttr("Start Name", ValueType::STRING, &this->startName, false);
    if (!this->endName.empty())
        addAttr("End Name", ValueType::STRING, &this->endName, false);
    if (!this->oldName.empty())
        addAttr("Old Name", ValueType::STRING, &this->oldName, false);
    if (!this->addType.empty())
        addAttr("Add Type", ValueType::STRING, &this->addType, false);
    if (!this->color.empty())
        addAttr("Color", ValueType::STRING, &this->color, false);
    if (this->id != (unsigned int)-1)
        addAttr("ID", ValueType::INT, &this->id, false);
}

int ODBLayerRecord::getRow() const { return row; }
const std::string &ODBLayerRecord::getLayerName() const { return layerName; }
const std::string &ODBLayerRecord::getContext() const { return context; }
const std::string &ODBLayerRecord::getType() const { return type; }
const std::string &ODBLayerRecord::getPolarity() const { return polarity; }
const std::string &ODBLayerRecord::getDielectricType() const { return dielectricType; }
const std::string &ODBLayerRecord::getDielectricName() const { return dielectricName; }
const std::string &ODBLayerRecord::getForm() const { return form; }
unsigned int ODBLayerRecord::getCuTop() const { return cuTop; }
unsigned int ODBLayerRecord::getCuBottom() const { return cuBottom; }
unsigned int ODBLayerRecord::getRef() const { return ref; }
const std::string &ODBLayerRecord::getStartName() const { return startName; }
const std::string &ODBLayerRecord::getEndName() const { return endName; }
const std::string &ODBLayerRecord::getOldName() const { return oldName; }
const std::string &ODBLayerRecord::getAddType() const { return addType; }
const std::string &ODBLayerRecord::getColor() const { return color; }
unsigned int ODBLayerRecord::getId() const { return id; }

// -----------------------------
//     ODBMatrixData Implementation
// -----------------------------
ODBMatrixData::ODBMatrixData(const Odb::Lib::FileModel::Design::MatrixFile *matrixFile)
{
    for (const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::StepRecord> &stepRecord : matrixFile->GetStepRecords())
    {
        ODBStepRecord *newStepRecord = new ODBStepRecord(&stepRecord);
        stepRecords.push_back(newStepRecord);
    }
    for (const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::LayerRecord> &layerRecord : matrixFile->GetLayerRecords())
    {
        ODBLayerRecord *newLayerRecord = new ODBLayerRecord(&layerRecord);
        layerRecords.push_back(newLayerRecord);
    }
}

ODBMatrixData::~ODBMatrixData()
{
    for (ODBStepRecord *p : stepRecords)
        delete p;
    for (ODBLayerRecord *p : layerRecords)
        delete p;
}

std::vector<ODBStepRecord *> ODBMatrixData::getStepRecords() { return stepRecords; }
std::vector<ODBLayerRecord *> ODBMatrixData::getLayerRecords() { return layerRecords; }

void ODBMatrixData::writeToFile(const std::string &filename) const
{
    std::ofstream outFile(filename);
    if (!outFile.is_open())
    {
        std::cerr << "Failed to open file: " << filename << std::endl;
        return;
    }

    // Write STEP blocks
    for (const ODBStepRecord *Step : stepRecords)
    {
        outFile << "STEP {\r\n";
        if (Step->getColumn() != 0)
            outFile << "    COL=" << Step->getColumn() << "\r\n";
        if (Step->getId() != (unsigned int)-1)
            outFile << "    ID=" << Step->getId() << "\r\n";
        if (!Step->getName().empty())
            outFile << "    NAME=" << Step->getName() << "\r\n";
        outFile << "}\r\n\r\n";
    }

    // Write LAYER blocks
    for (const ODBLayerRecord *Layer : layerRecords)
    {
        outFile << "LAYER {\r\n";
        if (Layer->getRow() != 0)
            outFile << "    ROW=" << Layer->getRow() << "\r\n";
        if (!Layer->getContext().empty())
            outFile << "    CONTEXT=" << Layer->getContext() << "\r\n";
        if (!Layer->getType().empty())
            outFile << "    TYPE=" << Layer->getType() << "\r\n";
        if (!Layer->getLayerName().empty())
            outFile << "    NAME=" << Layer->getLayerName() << "\r\n";
        if (!Layer->getPolarity().empty())
            outFile << "    POLARITY=" << Layer->getPolarity() << "\r\n";
        if (!Layer->getDielectricType().empty() && Layer->getDielectricType() != "NotSet")
            outFile << "    DIELECTRIC_TYPE=" << Layer->getDielectricType() << "\r\n";
        if (!Layer->getDielectricName().empty())
            outFile << "    DIELECTRIC_NAME=" << Layer->getDielectricName() << "\r\n";
        if (!Layer->getForm().empty() && Layer->getForm() != "NotSet")
            outFile << "    FORM=" << Layer->getForm() << "\r\n";
        if (Layer->getCuTop() != (unsigned int)-1)
            outFile << "    CU_TOP=" << Layer->getCuTop() << "\r\n";
        if (Layer->getCuBottom() != (unsigned int)-1)
            outFile << "    CU_BOTTOM=" << Layer->getCuBottom() << "\r\n";
        if (Layer->getRef() != (unsigned int)-1)
            outFile << "    REF=" << Layer->getRef() << "\r\n";
        if (!Layer->getStartName().empty())
            outFile << "    START_NAME=" << Layer->getStartName() << "\r\n";
        if (!Layer->getEndName().empty())
            outFile << "    END_NAME=" << Layer->getEndName() << "\r\n";
        if (!Layer->getOldName().empty())
            outFile << "    OLD_NAME=" << Layer->getOldName() << "\r\n";
        if (!Layer->getAddType().empty())
            outFile << "    ADD_TYPE=" << Layer->getAddType() << "\r\n";
        if (!Layer->getColor().empty() && Layer->getColor() != "(0,0,0)")
            outFile << "    COLOR=" << Layer->getColor() << "\r\n";
        if (Layer->getId() != (unsigned int)-1)
            outFile << "    ID=" << Layer->getId() << "\r\n";
        outFile << "}\r\n\r\n";
    }

    outFile.close();
    std::cout << "Successfully wrote matrix data to: " << filename << std::endl;
}
