#include "../include/Wire.h"

namespace PCBDesign {
    // Constructor
    Wire::Wire(const Coordinate& start, const Coordinate& end, AngleWire angle,
        float thickness, const std::string& layer, ViaType svia, ViaType evia)
        : start(start), end(end), angle(angle), thickness(thickness), layer(layer), svia(svia), evia(evia) {}

    // Getters
    Coordinate Wire::getStart() const {
        return start;
    }

    Coordinate Wire::getEnd() const {
        return end;
    }

    AngleWire Wire::getAngleWire() const {
        return angle;
    }

    float Wire::getThickness() const {
        return thickness;
    }

    std::string Wire::getLayer() const {
        return layer;
    }

    ViaType Wire::getStartVia() const {
        return svia;
    }

    ViaType Wire::getEndVia() const {
        return evia;
    }

    // Setters
    void Wire::setStart(const Coordinate& s) {
        start = s;
    }

    void Wire::setEnd(const Coordinate& e) {
        end = e;
    }

    void Wire::setAngleWire(AngleWire a) {
        angle = a;
    }

    void Wire::setThickness(float t) {
        thickness = t;
    }

    void Wire::setLayer(const std::string& l) {
        layer = l;
    }

    void Wire::setStartVia(ViaType v) {
        svia = v;
    }

    void Wire::setEndVia(ViaType v) {
        evia = v;
    }

    // Display wire details
    void Wire::display() const {
        std::cout << "Wire [Start: " << start.toString()
            << ", End: " << end.toString()
            << ", Angle: " << angleToString()
            << ", Thickness: " << thickness
            << "mm, Layer: " << layer
            << ", Start Via: " << viaToString(svia)
            << ", End Via: " << viaToString(evia) << "]" << std::endl;
    }

    // Convert Angle enum to string
    std::string Wire::angleToString() const {
        switch (angle) {
        case AngleWire::DEG_0: return "0°";
        case AngleWire::DEG_45: return "45°";
        case AngleWire::DEG_90: return "90°";
        case AngleWire::DEG_135: return "135°";
        case AngleWire::DEG_180: return "180°";
        case AngleWire::DEG_225: return "225°";
        case AngleWire::DEG_270: return "270°";
        case AngleWire::DEG_315: return "315°";
        default: return "Unknown";
        }
    }

    // Convert ViaType enum to string
    std::string Wire::viaToString(ViaType via) const {
        switch (via) {
        case ViaType::NONE: return "None";
        case ViaType::THROUGH: return "Through";
        case ViaType::BLIND: return "Blind";
        case ViaType::BURIED: return "Buried";
        default: return "Unknown";
        }
    }
}
