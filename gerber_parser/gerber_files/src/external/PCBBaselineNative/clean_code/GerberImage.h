#ifndef GERBER_IMAGE_H
#define GERBER_IMAGE_H

#include <string>
#include <sstream>
#include "magic_enum/magic_enum.hpp"
#include "GerberObj.h"  // This file contains the definition of ObjType and GerberObj

// Supported directive types
enum class ImageType {
    IF, IJ, IO, IP, IR, IN ,
    Unknown
};

// Convert DirectiveType to string using magic_enum
inline std::string imageTypeToString(ImageType type) {
    return std::string{magic_enum::enum_name(type)};
}

// Convert string to DirectiveType by extracting the first two or three characters.
// (Adjust this function to match your expected keys.)
inline ImageType stringToImageType(const std::string& s) {
    if (s.size() < 2) return ImageType::Unknown;

    std::string key = s.substr(0, 2);
  //  std::cout << "Checking directive type: " << key << std::endl;  //  Add this log
     if (key == "IN") return ImageType::IN;
     if (key == "IF") return ImageType::IF;
     if (key == "IJ") return ImageType::IJ;
     if (key == "IO") return ImageType::IO;
     if (key == "IP") return ImageType::IP;
     if (key == "IR") return ImageType::IR;
    return ImageType::Unknown;
}

// GerberDirective inherits from GerberObj (for directives and shapes)
struct GerberImage : public GerberObj {
    ImageType type = ImageType::Unknown;
    std::string params;

    // Default and convenience constructor
    GerberImage() = default;
    GerberImage(ImageType t, std::string p)
        : type(t), params(std::move(p)) {}

    ObjType getObjType() const override {
        return ObjType::Image;
    }

    std::string serialize() const override {
        std::ostringstream oss;
        oss << "%" << imageTypeToString(type) << params << "*%";
        return oss.str();
    }
};

#endif // GERBER_DIRECTIVE_H
















