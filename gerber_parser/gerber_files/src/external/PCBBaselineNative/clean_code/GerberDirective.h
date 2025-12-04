#ifndef GERBER_DIRECTIVE_H
#define GERBER_DIRECTIVE_H

#include <string>
#include <sstream>
#include "magic_enum/magic_enum.hpp"
#include "GerberObj.h"  // This file contains the definition of ObjType and GerberObj

// Supported directive types
enum class DirectiveType {
    FS, MO, MI, OF, SF, AS, 
    G04, G36, G37, M02,G54,G55,G75,G74,
    Unknown
};

// Convert DirectiveType to string using magic_enum
inline std::string directiveTypeToString(DirectiveType type) {
    return std::string{magic_enum::enum_name(type)};
}

// Convert string to DirectiveType by extracting the first two or three characters.
// (Adjust this function to match your expected keys.)
inline DirectiveType stringToDirectiveType(const std::string& s) {
    if (s.size() < 2) return DirectiveType::Unknown;

    std::string key = s.substr(0, 2);
  //  std::cout << "Checking directive type: " << key << std::endl;  //  Add this log
    if (key == "FS") return DirectiveType::FS;
    if (key == "MO") return DirectiveType::MO;
    if (key == "MI") return DirectiveType::MI;
    if (key == "OF") return DirectiveType::OF;
    if (key == "SF") return DirectiveType::SF;
    if (key == "AS") return DirectiveType::AS;
    if (s.substr(0, 3) == "G04") return DirectiveType::G04;
    if (s.substr(0, 3) == "G36") return DirectiveType::G36;
    if (s.substr(0, 3) == "G37") return DirectiveType::G37;
    if (s.substr(0, 3) == "M02") return DirectiveType::M02;
    if (s.substr(0, 3) == "G54") return DirectiveType::G54;
    if (s.substr(0, 3) == "G55") return DirectiveType::G55;
    if (s.substr(0, 3) == "G75") return DirectiveType::G75;
    if (s.substr(0, 3) == "G74") return DirectiveType::G74;
    return DirectiveType::Unknown;
}

struct GerberDirective : public GerberObj {
    DirectiveType type = DirectiveType::Unknown;
    std::string params;
    std::string rawLine;

    GerberDirective() = default;

    // Constructor with 3 arguments
    GerberDirective(DirectiveType t, std::string p, std::string raw)
        : type(t), params(std::move(p)), rawLine(std::move(raw)) {}

    // Constructor with 2 arguments (default rawLine to empty string)
    GerberDirective(DirectiveType t, std::string p)
        : type(t), params(std::move(p)), rawLine("") {}

    ObjType getObjType() const override {
        return ObjType::Directive;
    }
    std::string serialize() const override {
        // Preserve original raw line if available
        if (!rawLine.empty()) {
            return rawLine;
        }
    
        std::ostringstream oss;
        if (type == DirectiveType::G04 || type == DirectiveType::G36 ||
            type == DirectiveType::G37 || type == DirectiveType::M02) {
            oss << directiveTypeToString(type) << params << "*";
        } else {
            // Don't wrap anything if there's no rawLine; just return plain directive
            oss << directiveTypeToString(type) << params << "*";
        }
    
        return oss.str();
    }
    
};

#endif // GERBER_DIRECTIVE_H