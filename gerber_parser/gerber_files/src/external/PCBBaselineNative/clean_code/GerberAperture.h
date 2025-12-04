#ifndef GERBER_APERTURE_H
#define GERBER_APERTURE_H

#include <string>
#include <sstream>
#include "magic_enum/magic_enum.hpp"
#include "GerberObj.h"  // This file contains ObjType and GerberObj definitions

// Supported aperture types
enum class ApertureType {
    AD, // Aperture Description
    AM, // Aperture Macro
    Unknown
};

// Convert ApertureType to string using magic_enum
    inline std::string apertureTypeToString(ApertureType type) {
        auto name = magic_enum::enum_name<ApertureType>(type);
        return name.empty() ? "Unknown" : std::string{name};

}

// Convert string to ApertureType by checking the key prefix
inline ApertureType stringToApertureType(const std::string& s) {
    if (s.rfind("AD", 0) == 0) return ApertureType::AD;
    if (s.rfind("AM", 0) == 0) return ApertureType::AM;
    return ApertureType::Unknown;
}
struct GerberAperture : public GerberObj {
    ApertureType type = ApertureType::Unknown;
    std::string params;
    std::string rawLine;

    GerberAperture() = default;

    // Constructor with 3 arguments
    GerberAperture(ApertureType t, std::string p, std::string raw)
        : type(t), params(std::move(p)), rawLine(std::move(raw)) {}

    // Constructor with 2 arguments (default rawLine to empty string)
    GerberAperture(ApertureType t, std::string p)
        : type(t), params(std::move(p)), rawLine("") {}

    ObjType getObjType() const override {
        return ObjType::Aperture;
    }

    std::string serialize() const override {
        return rawLine;
    }
};


#endif // GERBER_APERTURE_H