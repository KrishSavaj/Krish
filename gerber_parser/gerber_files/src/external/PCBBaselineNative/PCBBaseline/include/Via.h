#ifndef VIA_H
#define VIA_H

#include <iostream>
#include <string>

namespace PCBDesign {

    // Enum to represent different via types
    enum class ViaType {
        NONE,      // No via
        THROUGH,   // Through-hole via
        BLIND,     // Blind via (top-to-inner layer)
        BURIED     // Buried via (inner-to-inner layer)
    };

    // Class to represent a Via in the PCB
    class Via {
    private:
        std::string slayer;  // Starting layer (e.g., "Top", "Inner1")
        std::string elayer;    // Ending layer (e.g., "Inner2", "Bottom")
        double thickness;        // Thickness of the via (in mm)

    public:
        // Constructor
        Via(const std::string& slayer = "", const std::string& elayer = "", double thickness = 0.0);

        // Getters
        std::string getslayer() const;
        std::string getelayer() const;
        double getThickness() const;

        // Setters
        void setslayer(const std::string& newslayer);
        void setelayer(const std::string& newelayer);
        void setThickness(double newThickness);

        // Display function
        void display() const;
    };

    // Helper function to convert ViaType enum to string
    std::string viaTypeToString(ViaType type);

} // namespace PCBDesign

#endif // VIA_HPP
