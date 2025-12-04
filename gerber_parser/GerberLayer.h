#ifndef GERBER_LAYER_H
#define GERBER_LAYER_H

#include <string>
#include <sstream>
#include "magic_enum/magic_enum.hpp"
#include "GerberObj.h"  // This file contains the definition of ObjType and GerberObj

// Supported directive types
enum class LayerType {
    KO, LN, LP, SR,
    Unknown
};

// Convert DirectiveType to string using magic_enum
inline std::string layerTypeToString(LayerType type) {
    return std::string{magic_enum::enum_name(type)};
}

// Convert string to DirectiveType by extracting the first two or three characters.
// (Adjust this function to match your expected keys.)
inline LayerType stringToLayerType(const std::string& s) {
    if (s.size() < 2) return LayerType::Unknown;

    std::string key = s.substr(0, 2);
  //  std::cout << "Checking directive type: " << key << std::endl;  //  Add this log
     if (key == "KO") return LayerType::KO;
     if (key == "LN") return LayerType::LN;
     if (key == "LP") return LayerType::LP;
     if (key == "SR") return LayerType::SR;
    return LayerType::Unknown;
}

// GerberDirective inherits from GerberObj (for directives and shapes)
struct GerberLayer : public GerberObj {
    LayerType type = LayerType::Unknown;
    std::string params;

    // Default and convenience constructor
    GerberLayer() = default;
    GerberLayer(LayerType t, std::string p)
        : type(t), params(std::move(p)) {}

    ObjType getObjType() const override {
        return ObjType::Layer;
    }

    std::string serialize() const override {
        std::ostringstream oss;
        oss << "%" << layerTypeToString(type) << params << "*%";
        return oss.str();
    }
    // std::string serialize() const override {
    //     return rawLine;
    // }
    
};

#endif //
















