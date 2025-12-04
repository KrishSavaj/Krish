#ifndef PCBBOARD_HPP
#define PCBBOARD_HPP

#include <iostream>
#include <string>
#include <vector>

namespace PCBDesign {
    // Class to represent a single hole on the PCB
    class Hole {
    private:
        double x;           // X-coordinate of the hole
        double y;           // Y-coordinate of the hole
        double diameter;    // Diameter of the hole in millimeters

    public:
        // Constructor
        Hole(double x = 0.0, double y = 0.0, double diameter = 0.0);

        // Getters
        double getX() const;
        double getY() const;
        double getDiameter() const;

        // Setters
        void setX(double newX);
        void setY(double newY);
        void setDiameter(double newDiameter);

        // Display hole details
        void display() const;
    };

    // Class to represent an entry in the Bill of Materials (BOM)
    class BOMEntry {
    private:
        std::string componentName;  // Name of the component
        int quantity;               // Quantity of the component
        std::string manufacturer;   // Manufacturer of the component

    public:
        // Constructor
        BOMEntry(const std::string& name = "", int quantity = 0, const std::string& manufacturer = "");

        // Getters
        std::string getComponentName() const;
        int getQuantity() const;
        std::string getManufacturer() const;

        // Setters
        void setComponentName(const std::string& name);
        void setQuantity(int qty);
        void setManufacturer(const std::string& manuf);

        // Display BOM entry
        void display() const;
    };

    // Class to represent the PCB Board
    class PCBBoard {
    private:
        std::string design;                     // Design name or version
        std::vector<Hole> holes;                // Vector of holes on the PCB
        std::vector<BOMEntry> billOfMaterials;  // Vector for BOM entries

    public:
        // Constructor
        PCBBoard(const std::string& design = "");

        // Getters
        std::string getDesign() const;
        const std::vector<Hole>& getHoles() const;
        const std::vector<BOMEntry>& getBillOfMaterials() const;

        // Setters
        void setDesign(const std::string& newDesign);

        // Add a hole to the PCB
        void addHole(const Hole& hole);

        // Add a BOM entry
        void addBOMEntry(const BOMEntry& entry);

        // Display PCB board details
        void display() const;
    };
}
#endif // PCBBOARD_HPP
