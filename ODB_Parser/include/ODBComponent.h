#pragma once

#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include <filesystem>
#include <cstdlib>
#include <map>
#include <functional>
#include <iomanip>
#include <sstream>

// Project headers
#include "GUIComponent.h"
#include "ComponentsFile.h"
#include "enums.h"
#include "magic_enum.hpp"

using namespace std;
using namespace Odb::Lib::FileModel::Design;

//------------------------------------------------------------------------------
// Class Declarations
//------------------------------------------------------------------------------

class ODBtoerpintRecords : virtual public GUIComponent
{
private:
    int PinNumber;
    int NetNumber;
    int subNetNumber;
    string name;
    double LocationX;
    double LocationY;
    bool Mirror;
    double Rotation;

public:
    ODBtoerpintRecords();
    ODBtoerpintRecords(int pinNumber, int netNumber, int subNetNumber, string &name,
                       float locationX, float locationY, bool mirror, float rotation);
    virtual ~ODBtoerpintRecords();

    int getPinNumber() const;
    int getNetNumber() const;
    const std::string &getName() const;
    double getLocationX() const;
    double getLocationY() const;
    bool isMirror() const;
    double getRotation() const;
    int getSubNetNumber() const;
};

//------------------------------------------------------------------------------
class ODBPropertyRecords : virtual public GUIComponent
{
private:
    std::string propName;
    std::string propValue;

public:
    ODBPropertyRecords();
    ODBPropertyRecords(const std::string &name, const std::string &value);
    virtual ~ODBPropertyRecords();

    const std::string &getPropName() const;
    const std::string &getPropValue() const;
};

//------------------------------------------------------------------------------
class ODBBOMRecords : virtual public GUIComponent
{
private:
    string cpn_;
    string pkg_;
    string ipn_;
    vector<string> descriptions_;
    string vpl_vnd_;
    string vpl_mpn_;
    string vnd_;
    string mpn_;

public:
    explicit ODBBOMRecords(const Odb::Lib::FileModel::Design::ComponentsFile::BomDescriptionRecord *record);
    virtual ~ODBBOMRecords();

    const std::string &getCpn() const;
    const std::string &getPkg() const;
    const std::string &getIpn() const;
    const std::vector<std::string> &getDescriptions() const;
    const std::string &getVplVnd() const;
    const std::string &getVplMpn() const;
    const std::string &getVnd() const;
    const std::string &getMpn() const;
};

//------------------------------------------------------------------------------
class ODBComponentRecord : virtual public GUIComponent
{
private:
    int pkgReferenceId;
    int attributeId;
    string compName;
    string partName;
    double locationX;
    double locationY;
    bool mirror;
    double rotation;
    int index;
    string attributestring;

    std::vector<ODBPropertyRecords *> propertyRecords;
    std::vector<ODBtoerpintRecords *> toeprintRecords;

public:
    ODBComponentRecord();
    ODBComponentRecord(const std::shared_ptr<Odb::Lib::FileModel::Design::ComponentsFile::ComponentRecord> &record,
                       string attributestring, string curCompId);
    virtual ~ODBComponentRecord();

    void addPropertyRecord(ODBPropertyRecords *record);
    void addToeprintRecord(ODBtoerpintRecords *record);

    int getPkgReferenceId() const;
    const std::string &getCompName() const;
    const std::string &getPartName() const;
    double getLocationX() const;
    double getLocationY() const;
    bool isMirror() const;
    double getRotation() const;
    int getIndex() const;
    const std::vector<ODBPropertyRecords *> &getPropertyRecords() const;
    const std::vector<ODBtoerpintRecords *> &getToeprintRecords() const;
    const std::string &getAttributestring() const;
    int getAttributeId() const;
};

//------------------------------------------------------------------------------
class ODBComponent : virtual public GUIComponent
{
private:
    std::string componentsLayerName;
    std::string units;
    int compID;
    std::string boardSide;

    std::vector<string> componentAttributesNames;
    std::vector<string> componentAttributesTextValues;
    std::vector<ODBComponentRecord *> componentRecords;
    std::map<std::string, std::shared_ptr<ODBBOMRecords>> bomRecords;

public:
    ODBComponent();
    explicit ODBComponent(const ComponentsFile &compFile);
    virtual ~ODBComponent();

    void addComponentRecord(ODBComponentRecord *record);

    const std::string &getComponentsLayerName() const;
    const std::string &getUnits() const;
    const int &getCompID() const;
    const std::string &getBoardSide() const;
    const std::vector<ODBComponentRecord *> &getComponentRecords() const;
    const std::map<std::string, std::shared_ptr<ODBBOMRecords>> &getBomRecords() const;

    std::string formatAttributes(const std::map<std::string, std::string> &attrMap);
    std::function<std::string(double)> formatFloatTrim;

    void writeToFile(const std::string &fileName) const;
};

/*
The provided excerpt is from a **layer's components file** within an ODB++ job, which describes the actual components placed on a specific layer, typically either `comp_+_top` or `comp_+_bot`. This file references the `eda/data` file for package information and can include a header listing attribute names and values.

Here's a breakdown of what the provided text signifies:

*   **`# CMP 0`**:
    *   This line is a comment, indicated by the `#` symbol.
    *   It typically marks the beginning of a **Component Record (CMP)** entry, with `0` likely serving as an internal serial number or identifier for this particular component instance within the file.

*   **`CMP 160 0.3517323 0.0540551 0.0 N TP21 TESTPOINT ;0=0.001378,1=1;ID=3936`**:
    *   This is the main **Component Record (CMP)**, which defines an instance of a component on the board.
    *   `160`: This is the **package reference number (`<pkg_ref>`)**, indicating the package definition for this component as found in the `eda/data` file.
    *   `0.3517323 0.0540551`: These are the **X and Y coordinates (`<x> <y>`)** of the component's location on the board, expressed in inches.
    *   `0.0`: This is the **rotation (`<rot>`)** of the component in degrees, measured clockwise.
    *   `N`: This indicates the **mirror status (`<mirror>`)**, with `N` meaning the component is *not mirrored*.
    *   `TP21`: This is the **component name (`<comp_name>`)**, also known as the **reference designator** (e.g., U1, R1, C1). In this case, it's `TP21`.
    *   `TESTPOINT`: This is the **part name (`<part_name>`)** or part identification for the component.
    *   `;0=0.001378,1=1;ID=3936`: This section contains **attributes (`<attributes>`)** assigned to the component. Attributes are comma-separated lists of values.
        *   `0=0.001378`: Indicates that attribute number `0` has a floating-point value of `0.001378`.
        *   `1=1`: Indicates that attribute number `1` has an integer value of `1`.
        *   `ID=3936`: This appears to be an additional user-defined or specific system attribute providing an ID, though its general format `name=value` is consistent with how attributes are expressed.

*   **`PRP` lines (`PRP PART_NO 'TESTPOINT'`, etc.)**:
    *   These are **Property Records (PRP)**, which define properties of the component. A property consists of a name, a string value (enclosed in single quotes), and optionally one or more floating numbers.
    *   **`PART_NO 'TESTPOINT'`**: Defines a property named `PART_NO` with the string value `TESTPOINT`.
    *   **`FOOTPRINT_DRAWING 'Undefined'`**: Property `FOOTPRINT_DRAWING` with value `Undefined`.
    *   **`SSHEET 'i02_display(1)'`**: Property `SSHEET` with value `i02_display(1)`.
    *   **`REQ_NUMBER '9274'`**: Property `REQ_NUMBER` with value `9274`.
    *   **`TYPE 'Misc'`**: Property `TYPE` with value `Misc`. This likely relates to system attributes like `.comp_type` or `.comp_type2`, which describe the component's type for assembly analysis.
    *   **`OWNER 'LUND'`**: Property `OWNER` with value `LUND`.
    *   **`PART_LABEL 'TESTPOINT TP;MULTIPLE-SIZES'`**: Property `PART_LABEL` with value `TESTPOINT TP;MULTIPLE-SIZES`.
    *   **`COMMENT '1/9/06 - Imported from SEMCMASTER_2006'`**: Property `COMMENT` with a descriptive string. The `.comment` attribute in ODB++ is used for general textual comments on various entities, including components.
    *   **`COMP 'TESTPAD_GENERAL'`**: Property `COMP` with value `TESTPAD_GENERAL`.
    *   **`DESCRIPTION 'TESTPOINT, MULTIPLE SIZES'`**: Property `DESCRIPTION` with value `TESTPOINT, MULTIPLE SIZES`. This can correspond to attributes like `.desc1...10` or `.part_desc1...10`, which store descriptive fields from the Bill of Materials (BOM).
    *   **`CAD_COMPLETED_DATE '06JAN09 - key_cindy'`**: Property `CAD_COMPLETED_DATE` with value `06JAN09 - key_cindy`.
    *   **`CELL_NAME 'TESTPAD1_0mm'`**: Property `CELL_NAME` with value `TESTPAD1_0mm`.
    *   **`SPATH 'root_schematic!I01_ImagingTop4!I02_Display3'`**: Property `SPATH` with a hierarchical path string.
    *   **`ALLOWED_MOUNT_SIDE 'BOTH'`**: Property `ALLOWED_MOUNT_SIDE` with value `BOTH`. This suggests the component can be mounted on either the top or bottom side of the board.
    *   **`MGC_UNIGROUP 'Cellular Flip-Phone'`**: Property `MGC_UNIGROUP` with value `Cellular Flip-Phone`. This seems to be a user-defined attribute linking the component to a specific product group.
    *   **`REFLOC 'IN,0.000000,0.000000,0,TR,0.012008,0.012008,0.000000,VeriBest Gerber 0'`**: Property `REFLOC` with a complex string, likely defining a reference location or transformation parameters related to its placement.

*   **`TOP 0 0.3517323 0.0540551 0.0 N 458 20 1`**:
    *   This is a **Toeprint Record (TOP)**, which defines a specific connection point (toeprint) of the component.
    *   `0`: The **pin number (`<pin_num>`)** within the component's package.
    *   `0.3517323 0.0540551`: The **X and Y coordinates (`<x> <y>`)** of the pin's location on the board in inches.
    *   `0.0`: The **rotation (`<rot>`)** of the pin in degrees clockwise.
    *   `N`: The **mirror status (`<mirror>`)**, `N` for not mirrored.
    *   `458`: The **net number (`<net_num>`)** from the `eda/data` file to which this toeprint belongs. The net number corresponds to the sequence of `Net` records in that file (first `Net` record is `0`, second is `1`, and so on).
    *   `20`: The **subnet number (`<subnet_num>`)** within the referenced net.
    *   `1`: The **toeprint name (`<toeprint_name>`)**.

*   **`# BOM DATA`**:
    *   This is another comment, typically indicating the start of the **Bill of Materials (BOM) DATA** section embedded within the components file for this component. This section provides BOM information after processing with Assembly Merge (BOM Merge, Library Merge, and Board Merge).

*   **`CPN TESTPOINT`**:
    *   **`CPN`**: This is the **Customer Part Number** for the component.

*   **`PKG`**:
    *   **`PKG`**: This field represents the **Package name** for the component. In this case, it appears to be empty.

*   **`IPN`**:
    *   **`IPN`**: This field stands for **Internal Part Number**. In this case, it's also empty.

In essence, this block of data meticulously describes a "TESTPOINT" component on a printed circuit board, detailing its exact location, orientation, associated properties (like part number, type, comments), and its connections to the electrical net. It's like a detailed instruction manual for placing and understanding a specific building block (the component) on a complex structure (the PCB), complete with its specifications and how it fits into the overall electrical design.
*/

/*
# CMP 0
CMP 160 0.3517323 0.0540551 0.0 N TP21 TESTPOINT ;0=0.001378,1=1;ID=3936
PRP PART_NO 'TESTPOINT'
PRP FOOTPRINT_DRAWING 'Undefined'
PRP SSHEET 'i02_display(1)'
PRP REQ_NUMBER '9274'
PRP TYPE 'Misc'
PRP OWNER 'LUND'
PRP PART_LABEL 'TESTPOINT TP;MULTIPLE-SIZES'
PRP COMMENT '1/9/06 - Imported from SEMCMASTER_2006'
PRP COMP 'TESTPAD_GENERAL'
PRP DESCRIPTION 'TESTPOINT, MULTIPLE SIZES'
PRP CAD_COMPLETED_DATE '06JAN09 - key_cindy'
PRP CELL_NAME 'TESTPAD1_0mm'
PRP SPATH 'root_schematic!I01_ImagingTop4!I02_Display3'
PRP ALLOWED_MOUNT_SIDE 'BOTH'
PRP MGC_UNIGROUP 'Cellular Flip-Phone'
PRP REFLOC 'IN,0.000000,0.000000,0,TR,0.012008,0.012008,0.000000,VeriBest Gerber 0'
TOP 0 0.3517323 0.0540551 0.0 N 458 20 1
#
# BOM DATA
CPN TESTPOINT
PKG
IPN
*/

/*
Yes, the `BOM DATA` provided in the excerpt is indeed **per `CMP` (Component) record** within the ODB++ standard, specifically when referring to the **`components3` file**.

Here's a detailed explanation:

*   **Component Representation:** In ODB++, component information is primarily found in files named `components` or `components3` located under the `steps/<step_name>/layers/<layer_name>/` directory.
*   **Original Data vs. Processed Data:**
    *   The **`components` file** describes the original Electronic Design Automation (EDA) data for a component. An example of a `CMP` record in this file structure, as shown in the sources, details the component's package reference, coordinates, rotation, mirror status, name (reference designator), and part name, followed by properties and toeprint records. The example provided in your query, with its explicit `BOM DATA` section, does **not** align with the structure shown for the *original* `components` file.
    *   The **`components3` file**, however, represents component data **after processing with Assembly Merge**. This "Assembly Merge" process includes "BOM Merge, Library Merge and Board Merge".
*   **`BOM DATA` Location and Purpose:**
    *   The example you provided perfectly matches the structure of a `CMP` record within the `components3` file.
    *   As stated in the sources, the **`BOM DATA` section within the `components3` file contains Bill of Materials (BOM) information specific to that individual component**. This means that for every `CMP` entry listed in the `components3` file, you will find its corresponding `BOM DATA` immediately following it.
    *   This integrated `BOM DATA` typically includes the **Customer Part Number (`CPN`)**, **Package (`PKG`)**, and **Internal Part Number (`IPN`)**, among other manufacturer and vendor details. This information is derived from the overall BOM for the job, which is typically found in a separate `bom` entity file (`job/steps/<step_name>/boms/<bom_name>/bom`).

Therefore, to directly answer your query:

*   **Is the `BOM DATA` per `CMP` in the standard?** Yes, within the context of the `components3` file, the `BOM DATA` is specifically associated with and appears directly after each `CMP` record.
*   **For every `CMP` there is a `BOM DATA`?** **Yes**, if you are examining the `components3` file. This file is generated *after* the assembly merge process, which integrates the BOM information for each component instance. If you were looking at the raw `components` file (before assembly merge), the direct, embedded `BOM DATA` section as shown in your example would not be present.

Think of it like this: The initial "components" file is like a blueprint that simply says "put a 'TESTPOINT' here". After the manufacturing team has looked up all the necessary parts and their suppliers in a separate "Bill of Materials" master list, they create a new, detailed instruction sheet (the "components3" file). On this new sheet, for every "TESTPOINT" to be placed, they explicitly write down all its specific procurement details right next to it, ensuring that each individual placement has all its material information readily available for assembly.
*/