
#ifndef SHAPES_KICAD_HPP
#define SHAPES_KICAD_HPP

#include <set>
#include <sstream>
#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include <map>

#include "sexpr.hpp"
#include "Geomclass.h"    // brings in PCBDesign::Shape, LineSegment, Rectangle, Arc, etc.


// forward-declare Coordinate to avoid include-order cycles
namespace PCBDesign {
struct Coordinate;
}

namespace PCBDesign {
class Bezier : public Shape {
public:
    Bezier(const std::vector<std::pair<float,float>>& pts) 
        : controlPoints(pts) {}

    void dump(std::ostream &out) const override {
        out << serialize() << "\n";
    }

    std::string serialize() const override {
        std::string s = "(bezier (points";
        for (const auto &p : controlPoints) {
            s += " (" + std::to_string(p.first) + " " + std::to_string(p.second) + ")";
        }
        s += "))";
        return s;
    }

    virtual ~Bezier() {}

private:
    std::vector<std::pair<float,float>> controlPoints;
};

class Polyline : public Shape {
public:
    Polyline() : width(0), strokeType(""), fillType("") {}

    Polyline(const std::vector<std::pair<float,float>> &pts,
             float w,
             const std::string &stroke = "",
             const std::string &fill = "")
        : points(pts), width(w), strokeType(stroke), fillType(fill) {}

    void dump(std::ostream &out) const override {
        out << serialize() << "\n";
    }
// --- add inside class Polyline (public section) ---

// add a single point (called by ast.cpp as pline->addPoint(x,y))
void addPoint(float x, float y) {
    points.emplace_back(x, y);
}

// set width (called by ast.cpp as pline->setWidth(w))
void setWidth(float w) {
    width = w;
}

// set stroke type (called by ast.cpp as pline->setStrokeType(...))
void setStrokeType(const std::string &s) {
    strokeType = s;
}
void setStrokeType(std::string &&s) {
    strokeType = std::move(s);
}

// set fill type (called by ast.cpp as pline->setFillType(...))
void setFillType(const std::string &f) {
    fillType = f;
}
void setFillType(std::string &&f) {
    fillType = std::move(f);
}

    void display() const override {
        std::cout << serialize() << "\n";
    }
void setUUID(const std::string &id) { uuid = id; }

    std::string serialize() const override {
        std::string s = "(polyline (points";
        for (const auto &p : points) {
            s += " (" + std::to_string(p.first) + " " + std::to_string(p.second) + ")";
        }
        s += ")";
        s += " (width " + std::to_string(width) + ")";
        if (!strokeType.empty()) s += " (stroke \"" + strokeType + "\")";
        if (!fillType.empty())   s += " (fill \"" + fillType + "\")";
        if (!uuid.empty())       s += " (uuid \"" + uuid + "\")";
        s += ")";
        return s;
    }

private:
    std::vector<std::pair<float,float>> points;
    float width;
    std::string strokeType;
    std::string fillType;
    std::string uuid;
};

class Text : public Shape {
public:
    Text(const std::string &content, float x, float y) : content_(content), x_(x), y_(y) {}

    std::string serialize() const override {
        std::string s = "(text (at " + std::to_string(x_) + " " + std::to_string(y_) + ")";
        s += " (content \"" + content_ + "\"))";
        return s;
    }
// in class Text (public:)
Text(const PCBDesign::Coordinate &c, const std::string &s);
Text(const PCBDesign::Coordinate &c, std::string &&s);



private:
    std::string content_;
    float x_{0.f}, y_{0.f};
};

class BusEntry : public Shape {
public:
    BusEntry() : posX(0), posY(0), sizeX(0), sizeY(0), width(0.0f) {}

    void setPosition(float x, float y) { posX = x; posY = y; }
    void setSize(float x, float y)     { sizeX = x; sizeY = y; }
    void setUUID(const std::string &id) { uuid = id; }

    void addPoint(float x, float y) { points.emplace_back(x, y); }
    void setWidth(float w) { width = w; }
    void setStrokeType(const std::string& t) { strokeType = t; }

    void dump(std::ostream &out) const override;
    void setFillType(const std::string &f) { fillType = f; }
std::string serialize() const override;

private:
    float posX, posY;
    float sizeX, sizeY;
    float width;
    std::string uuid;
    std::string strokeType;
    std::vector<std::pair<float, float>> points;
    std::string fillType; 
};

class Label : public Shape {
public:
    Label() : x(0), y(0), angle(0), hasAngle(false) {}

    void setText(const std::string &t) { text = t; }
    void setPosition(float px, float py) { x = px; y = py; }
    void setAngle(float a) { angle = a; hasAngle = true; }
    void setUUID(const std::string &id) { uuid = id; }

    // preserve original tokens
    void setAtRaw(const std::string& xs, const std::string& ys,
                  const std::string& as = {}) { x_raw=xs; y_raw=ys; ang_raw=as; }
    void addExtraRaw(const std::string& s) { extras.push_back(s); }

    void dump(std::ostream &out) const override {
        const std::string xs = x_raw.empty() ? std::to_string(x) : x_raw;
        const std::string ys = y_raw.empty() ? std::to_string(y) : y_raw;

        out << "(label \"" << text << "\" (at " << xs << ' ' << ys;
        if (hasAngle || !ang_raw.empty())
            out << ' ' << (ang_raw.empty() ? std::to_string(angle) : ang_raw);
        out << ')';

        // emit any extra children exactly as parsed (effects, justify, uuid if stored raw, etc.)
        for (const auto& e : extras) out << ' ' << e;

        // if you parsed uuid as a plain string (not in extras), still emit it
        if (!uuid.empty()) out << " (uuid " << uuid << ')';

        out << ")\n";
    }
 std::string serialize() const override;
private:
    std::string text;
    float x, y, angle;
    bool hasAngle;
    std::string uuid;

    // raw tokens to keep original formatting
    std::string x_raw, y_raw, ang_raw;
    std::vector<std::string> extras; // unparsed subtrees (effects, justify, etc.)
};

class Sheet : public Shape {
public:
    Sheet() {}
    void addProperty(const std::string &k, const std::string &v) {
        properties.emplace_back(k,v);
    }
    void addPin(const std::string &p) {
        pins.push_back(p);
    }
    void addInstance(const std::string &inst) {
        instances.push_back(inst);
    }
    void setFillColor(const std::string &rgba) { fillColor = rgba; }
    void dump(std::ostream &out) const override {
        out << "Sheet properties:\n";
        for (auto &kv : properties)
            out << "  "<<kv.first<<"="<<kv.second<<"\n";
        out << "Sheet pins:\n";
        for (auto &p : pins)
            out << "  "<<p<<"\n";
        out << "Sheet instances:\n";
        for (auto &i : instances)
            out << "  "<<i<<"\n";
        if (!fillColor.empty())
        out << "  fill=" << fillColor << "\n";
    }
     std::string serialize() const override;
private:
    std::vector<std::pair<std::string,std::string>> properties;
    std::vector<std::string> pins;
    std::vector<std::string> instances;
    std::string fillColor;
};
class Junction : public Shape {
public:
    Junction(float x, float y) : x_(x), y_(y) {}
    float getX() const { return x_; }
    float getY() const { return y_; }
    void setUUID(const std::string& uuid) { uuid_ = uuid; }
    void setColor(const std::string& c) { color_ = c; }
    void setDiameter(double d) { diameter_ = d; }

    void setRawAt(const std::string& x_raw, const std::string& y_raw) {
        at_x_raw_ = x_raw;
        at_y_raw_ = y_raw;
    }

// in class Junction (public:)
Junction(const PCBDesign::Coordinate &c);


    std::string serialize() const override {
        std::string s = "(junction (at " + std::to_string(x_) + " " + std::to_string(y_) + ")";
        if (!uuid_.empty()) s += " (uuid " + uuid_ + ")";
        if (!color_.empty()) s += " (color " + color_ + ")";
        if (diameter_ > 0.0) s += " (diameter " + std::to_string(diameter_) + ")";
        s += ")";
        return s;
    }
// --- inside class Junction (public) in src/include/shapes.hpp ---
// existing one: Junction(float x, float y) : x_(x), y_(y) {}
// add:


    // Inline definition — KEEP THIS and remove any other declaration/definition elsewhere
    void dump(std::ostream &out) const override {
        out << "(junction (at "
            << (at_x_raw_.empty() ? std::to_string(x_) : at_x_raw_)
            << " "
            << (at_y_raw_.empty() ? std::to_string(y_) : at_y_raw_)
            << ")";
        if (!uuid_.empty()) out << " (uuid " << uuid_ << ")";
        if (!color_.empty()) out << " (color " << color_ << ")";
        if (diameter_ > 0.0) out << " (diameter " << diameter_ << ")";
        out << ")\n";
    }

private:
    std::string at_x_raw_;
    std::string at_y_raw_;
    float x_{0.f}, y_{0.f};
    std::string uuid_;
    std::string color_;
    double diameter_{0.0};
};

// class SymbolInstance {
// public:
//     std::string path;
//     std::string reference;
//     std::string unit;
//     std::string value;
//     std::string footprint;

//     void dump(std::ostream &out) const {
//         out << "SymbolInstance: ref=" << reference
//             << ", value=" << value
//             << ", footprint=" << footprint
//             << ", path=" << path
//             << ", unit=" << unit << "\n";
//     }
// };
class SymbolInstance {
public:
    std::string path;
    std::string reference;
    std::string unit;
    std::string value;
    std::string footprint;

    // metadata fields required by ast / other code
    std::string tstamp;
    std::string uuid;
    std::string datasheet;

    void dump(std::ostream &out) const {
        out << "SymbolInstance: ref=" << reference
            << ", value=" << value
            << ", footprint=" << footprint
            << ", path=" << path
            << ", unit=" << unit;
        if (!tstamp.empty())     out << ", tstamp=" << tstamp;
        if (!uuid.empty())       out << ", uuid=" << uuid;
        if (!datasheet.empty())  out << ", datasheet=" << datasheet;
        out << "\n";
    }
};

class SheetInstance {
public:
    std::string path;
    std::string page;

    void dump(std::ostream& o) const {
        o << "SheetInstance: path=\"" << path
          << "\" page=\"" << page << "\"\n";
    }
};
class ParsedShape {
public:
    std::string type;
    std::map<std::string, std::vector<std::string>> properties;

    ParsedShape(const std::string& t) : type(t) {}

    void addProperty(const std::string& key, const std::vector<std::string>& values) {
        properties[key] = values;
    }

    void print(int depth = 0) const {
        std::string indent(depth * 2, ' ');
        std::cout << indent << "[" << type << "]\n";
        for (const auto& [key, values] : properties) {
            std::cout << indent << "  " << key << " = ";
            for (const auto& v : values) std::cout << v << " ";
            std::cout << "\n";
        }
    }
};

struct Pad {
  std::string number;
  std::string shape;
  Point      position;
  std::vector<std::string> layers;
  double     solderMaskMargin = 0;
  double     thermalBridgeAngle = 0;
};

struct OutlineLine {
  Point start, end;
  double width = 0;
  // stroke, type, etc., if you care
};

class Footprint {
public:
  void setName(const std::string& n)            { name = n; }
  void setLayer(const std::string& l)           { layer = l; }
  void setDescription(const std::string& d)     { description = d; }
  void setPosition(const Point& p)              { position = p; }

  void addPad(const Pad& p)                     { pads.push_back(p); }
  void addOutline(const OutlineLine& line)      { outline.push_back(line); }

  // (Optionally) a dump() for debugging
  void dump(int indent=0) const;

private:
  std::string             name;
  std::string             layer;
  std::string             description;
  Point                   position;
  std::vector<Pad>        pads;
  std::vector<OutlineLine> outline;
};
// Global vector to collect shapes
extern std::vector<ParsedShape> allShapes;
extern std::vector<std::unique_ptr<Footprint>> allFootprints;


// Extract a generic PCBDesign shape from a KiCad AST node
std::shared_ptr<Shape> getShape(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getRectangle(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getArc(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getCircle(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getBezier(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getPolyline(sexpr::Node* node, int depth);
std::shared_ptr<Shape> getLine(sexpr::Node* node, int depth);

// Utilities for parsing coordinate lists
void extractCoordinatePointList(sexpr::Node* node,
    std::vector<std::pair<float,float>>& points);
void getCoordinates(sexpr::Node* node, bool& found,
    std::vector<float>& coordinates);

// Recognize graphic tags in KiCad AST
inline bool isGraphic(const std::string& node_str) {
    static const std::set<std::string> tags = {
        "line","rectangle","arc","circle","bezier","polyline","text",
        "fp_line","fp_rectangle","fp_arc","fp_circle","fp_bezier","fp_polyline","fp_text",
        "gr_line","gr_rectangle","gr_arc","gr_circle","gr_bezier","gr_polyline","gr_text"
    };
    return tags.count(node_str) > 0;
}

} // namespace PCBDesign

#endif // SHAPES_KICAD_HPP
