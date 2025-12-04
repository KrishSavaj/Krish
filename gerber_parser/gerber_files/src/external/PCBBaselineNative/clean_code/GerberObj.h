#ifndef GERBER_OBJ_H
#define GERBER_OBJ_H

#include <sstream>  // for std::ostringstream
#include <string>
#include <iostream>
#include <iomanip>  // for std::setw and std::setfill

// Object type: base for directives and shapes
enum class ObjType { Move, Draw, Flash, Arc, Directive,Aperture, Image,Layer };

// Abstract base class
struct GerberObj {
    virtual ~GerberObj() = default;
    virtual ObjType getObjType() const = 0;
    virtual std::string serialize() const = 0;
    std::string rawLine;
    virtual void printDebug() const {
        std::cout << "[GerberObj] " << serialize() << std::endl;
    }
};

// 2D coordinate representation
struct Coordinate {
    double x = -1;
    double y = -1;
};

// Move operation (D02)
struct Move : public GerberObj {
    Coordinate coord;

    ObjType getObjType() const override { return ObjType::Move; }
    std::string serialize() const override;

    bool hasX() const { return coord.x != -1; }
    bool hasY() const { return coord.y != -1; }

    int getX() const { return static_cast<int>(coord.x); }
    int getY() const { return static_cast<int>(coord.y); }

    void setX(int newX) { coord.x = newX; }
    void setY(int newY) { coord.y = newY; }
};

// Draw operation (D01)
struct Draw : public GerberObj {
    Coordinate coord;

    ObjType getObjType() const override { return ObjType::Draw; }
    std::string serialize() const override;

    bool hasX() const { return coord.x != -1; }
    bool hasY() const { return coord.y != -1; }

    int getX() const { return static_cast<int>(coord.x); }
    int getY() const { return static_cast<int>(coord.y); }

    void setX(int newX) { coord.x = newX; }
    void setY(int newY) { coord.y = newY; }
};

// Flash operation (D03)
struct Flash : public GerberObj {
    Coordinate coord;

    ObjType getObjType() const override { return ObjType::Flash; }
    std::string serialize() const override;

    bool hasX() const { return coord.x != -1; }
    bool hasY() const { return coord.y != -1; }

    int getX() const { return static_cast<int>(coord.x); }
    int getY() const { return static_cast<int>(coord.y); }

    void setX(int newX) { coord.x = newX; }
    void setY(int newY) { coord.y = newY; }
};

//  Arc operation (G02/G03 with I/J offset)
struct Arc : public GerberObj {
    int x, y;      // End point
    int i, j;      // Center offset
    int dcode;     // 01 or 02
    std::string gcode; // G02 or G03

    Arc(int x, int y, int i, int j, int dcode, const std::string& gcode)
        : x(x), y(y), i(i), j(j), dcode(dcode), gcode(gcode) {}

    ObjType getObjType() const override { return ObjType::Arc; }

    std::string serialize() const override {
        std::ostringstream oss;
        oss << gcode
            << "X" << x << "Y" << y
            << "I" << i << "J" << j
            << "D" << std::setfill('0') << std::setw(2) << dcode << "*";
        return oss.str();
    }
};

#endif // GERBER_OBJ_H







