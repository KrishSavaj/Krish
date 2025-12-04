#ifndef WIRE_H
#define WIRE_H

#include <iostream>
#include <string>
#include "Coordinate.h" // Include the Coordinate class
#include "Via.h"

namespace PCBDesign {
    // Enum to represent angles in a PCB wire
    enum class AngleWire {
        DEG_0,
        DEG_45,
        DEG_90,
        DEG_135,
        DEG_180,
        DEG_225,
        DEG_270,
        DEG_315
    };

    // Class to represent a wire in the PCB
    class Wire {
    private:
        Coordinate start;  // Start coordinate of the wire
        Coordinate end;    // End coordinate of the wire
        AngleWire angle;   // Angle of the wire
        float thickness;   // Thickness of the wire in mm
        std::string layer; // Layer on which the wire is placed
        ViaType svia;      // Start via type
        ViaType evia;      // End via type

    public:
        // Constructor
        Wire(const Coordinate& start, const Coordinate& end, AngleWire angle,
            float thickness, const std::string& layer, ViaType svia, ViaType evia);

        // Getters
        Coordinate getStart() const;
        Coordinate getEnd() const;
        AngleWire getAngleWire() const;
        float getThickness() const;
        std::string getLayer() const;
        ViaType getStartVia() const;
        ViaType getEndVia() const;

        // Setters
        void setStart(const Coordinate& s);
        void setEnd(const Coordinate& e);
        void setAngleWire(AngleWire a);
        void setThickness(float t);
        void setLayer(const std::string& l);
        void setStartVia(ViaType v);
        void setEndVia(ViaType v);

        // Display wire details
        void display() const;

    private:
        // Convert Angle enum to string
        std::string angleToString() const;

        // Convert ViaType enum to string
        std::string viaToString(ViaType via) const;
    };
}
#endif // WIRE_HPP
