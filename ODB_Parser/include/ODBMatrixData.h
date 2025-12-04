#pragma once

#include <bits/stdc++.h>
#include "FeaturesFile.h"
#include "SymbolName.h"
#include "enums.h"
#include "magic_enum.hpp"
#include "MatrixFile.h"
#include "GUIComponent.h"
#include <sstream>
#include <iomanip>

using namespace std;

// Utility function
std::string formatColor(const Odb::Lib::FileModel::Design::RgbColor &c);

// Enumerations
enum Type
{
    SIGNAL,
    POWER_GROUND,
    DIELECTRIC,
    MIXED,
    SOLDER_MASK,
    SOLDER_PASTE,
    SILK_SCREEN,
    DRILL,
    ROUT,
    DOCUMENT,
    COMPONENT,
    MASK,
    CONDUCTIVE_PASTE,
};

enum Context
{
    BOARD,
    MISC
};

enum DielectricType
{
    NotSet,
    NONE,
    PREPREG,
    CORE
};

enum Form
{
    Not_Set,
    RIGIT,
    FLEX
};

// -----------------------------
//      ODBStepRecord Class
// -----------------------------
class ODBStepRecord : virtual public GUIComponent
{
private:
    unsigned int column;
    unsigned int id = (unsigned int)-1;
    std::string name;

public:
    ODBStepRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::StepRecord> *stepRecord);
    unsigned int getColumn() const;
    unsigned int getId() const;
    const std::string &getName() const;
};

// -----------------------------
//      ODBLayerRecord Class
// -----------------------------
class ODBLayerRecord : virtual public GUIComponent
{
private:
    int row;
    string layerName;
    string context;
    string type;
    string polarity;
    string dielectricType;
    string dielectricName;
    string form;
    unsigned int cuTop = (unsigned int)-1;
    unsigned int cuBottom = (unsigned int)-1;
    unsigned int ref = (unsigned int)-1;
    string startName;
    string endName;
    string oldName;
    string addType;
    string color;
    unsigned int id = (unsigned int)-1;

public:
    ODBLayerRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::MatrixFile::LayerRecord> *layerRecord);
    int getRow() const;
    const std::string &getLayerName() const;
    const std::string &getContext() const;
    const std::string &getType() const;
    const std::string &getPolarity() const;
    const std::string &getDielectricType() const;
    const std::string &getDielectricName() const;
    const std::string &getForm() const;
    unsigned int getCuTop() const;
    unsigned int getCuBottom() const;
    unsigned int getRef() const;
    const std::string &getStartName() const;
    const std::string &getEndName() const;
    const std::string &getOldName() const;
    const std::string &getAddType() const;
    const std::string &getColor() const;
    unsigned int getId() const;
};

// -----------------------------
//      ODBMatrixData Class
// -----------------------------
class ODBMatrixData : virtual public GUIComponent
{
private:
    std::vector<ODBStepRecord *> stepRecords;
    std::vector<ODBLayerRecord *> layerRecords;

public:
    ODBMatrixData(const Odb::Lib::FileModel::Design::MatrixFile *matrixFile);
    ~ODBMatrixData();

    std::vector<ODBStepRecord *> getStepRecords();
    std::vector<ODBLayerRecord *> getLayerRecords();

    void writeToFile(const std::string &filename = "matrix") const;
};

/*
Based on the sources, the `matrix` directory is a crucial part of an ODB++ job's file system structure. It contains the mandatory `matrix` file.

The `matrix` file, also known as the Job Matrix, holds **all the information representing the Job Matrix**. The Job Matrix is defined as a **two-dimensional array** where **columns are steps** (multi-layer entities like single images, sub panel arrays, production panels, and coupons) and **rows are layers** (two-dimensional sheets containing graphics, attributes, and annotation).

The `matrix` file contains step record data and layer record data because its fundamental purpose is to define the structure of the job by linking steps and layers:

1.  **Step Record Data:** The matrix file includes a `STEP` array. Each record in this array defines a column in the matrix. These records contain fields such as the column number (`COL`) and the name of the step (`NAME`). The specified step name must correspond to a valid step entity defined under the `steps` directory of the job, otherwise the job may be unreadable. This data is necessary to define **which steps are part of the job** and their positional relationship within the matrix structure (represented by columns).

2.  **Layer Record Data:** The matrix file includes a `LAYER` array. Each record in this array defines a row in the matrix. These records contain fields such as the row number (`ROW`), layer context (`BOARD` or `MISC`), layer name (`NAME`), and layer polarity (`POSITIVE` or `NEGATIVE`). It also includes fields like `START_NAME`, `END_NAME` (for drill/rout span), and `ADD_TYPE` for layer subtypes. The layer name must correspond to a layer entity defined under the `layers` directory of each step in the job, or the job may be unreadable. The layer record data is crucial because the matrix defines the **physical order of the layers** and the **relation of drill layers**. It also provides additional information for each layer, such as its type, polarity, and context.

In essence, the `matrix` file acts as the central index and organizational blueprint for an ODB++ job, explicitly mapping the steps and layers that contain the design data.
The `matrix` file in an ODB++ job defines the core structure of the design. It acts as a 2D map where **columns are steps** (like panels or images) and **rows are layers** (like copper or drill layers). This file contains:

* **Step records** (defining each column/step and its name)
* **Layer records** (defining each row/layer, its type, polarity, and order)

Together, they describe how the job is organized and how design data is layered and positioned. It’s essential for correctly interpreting the job.

*/