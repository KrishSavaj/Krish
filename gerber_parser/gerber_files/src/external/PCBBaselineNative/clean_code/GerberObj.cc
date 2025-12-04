#include "GerberObj.h"
#include <string>
#include <sstream>

// Serialize the G01 (move) command with optional X and Y coordinates
std::string Move::serialize() const {
    return !rawLine.empty() ? rawLine : "G01" + 
            (hasX() ? ("X" + std::to_string(getX())) : "") +
            (hasY() ? ("Y" + std::to_string(getY())) : "") + "D02*";
}

// Serialize the G01 (draw) command with optional X and Y coordinates
std::string Draw::serialize() const {
    return !rawLine.empty() ? rawLine : "G01" + 
            (hasX() ? ("X" + std::to_string(getX())) : "") +
            (hasY() ? ("Y" + std::to_string(getY())) : "") + "D01*";
}

// Serialize the G01 (flash) command with optional X and Y coordinates
std::string Flash::serialize() const {
    return !rawLine.empty() ? rawLine : (hasX() ? ("X" + std::to_string(getX())) : "") +
            (hasY() ? ("Y" + std::to_string(getY())) : "") + "D03*";
}




