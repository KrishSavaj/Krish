#include "../include/Via.h"
namespace PCBDesign {
// Constructor
Via::Via(const std::string& slayer, const std::string& elayer, double thickness)
    : slayer(slayer), elayer(elayer), thickness(thickness) {}

// Getters
std::string Via::getslayer() const {
    return slayer;
}

std::string Via::getelayer() const {
    return elayer;
}

double Via::getThickness() const {
    return thickness;
}

// Setters
void Via::setslayer(const std::string& newslayer) {
    slayer = newslayer;
}

void Via::setelayer(const std::string& newelayer) {
    elayer = newelayer;
}

void Via::setThickness(double newThickness) {
    thickness = newThickness;
}

// Display via details
void Via::display() const {
    std::cout << "Via [Start Layer: " << slayer
              << ", End Layer: " << elayer
              << ", Thickness: " << thickness << " mm]" 
              << std::endl;
}

// Convert ViaType enum to string
std::string viaTypeToString(ViaType type) {
    switch (type) {
        case ViaType::NONE: return "None";
        case ViaType::THROUGH: return "Through-hole";
        case ViaType::BLIND: return "Blind";
        case ViaType::BURIED: return "Buried";
        default: return "Unknown";
    }
}

} // namespace PCBDesign


