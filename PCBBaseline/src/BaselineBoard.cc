#include <iostream>
#include <fstream>
#include <regex>
#include <limits>
#include "../include/BaselineBoard.h"
#include <sstream>
#include <iomanip>
#include <cstdio>
#include <string>
#include"ast.hpp"
#include <variant>
#include <type_traits>   // for std::decay_t / is_same_v
#include <unordered_set>

#include <cmath>


#define LOG_WARN(msg) \
    std::cerr << "[WARN] " << msg << std::endl
// If not already defined

// quick helper: tags we want to preserve verbatim when seen in clean nodes
// quick helper: tags we want to preserve verbatim when seen in CleanNode children
static bool preserveCleanTag(const std::string &t) {
    static const std::unordered_set<std::string> s = {
        "stroke","width","type","uuid","diameter","color",
        "at","xy","pts","page","path","reference","unit",
        "in_bom","on_board","sheet_instances","symbol_instances",
        "project","generator","paper","title","date","rev"
    };
    return s.find(t) != s.end();
}

namespace PCBDesign {
    // BaselineBoard Class Implementation

    // Constructor with dimensions
    BaselineBoard::BaselineBoard(double h, double w, double t)
        : height(h), width(w), thickness(t), components({})
    {
    }

    // Default constructor
    BaselineBoard::BaselineBoard()
        : height(0), width(0), thickness(0), components({})
    {
    }

    // Getters
    double BaselineBoard::getHeight() const {
        return height;
    }

    double BaselineBoard::getWidth() const {
        return width;
    }

    double BaselineBoard::getThickness() const {
        return thickness;
    }

    // Setters
    void BaselineBoard::setHeight(double h) {
        height = h;
    }

    void BaselineBoard::setWidth(double w) {
        width = w;
    }

    void BaselineBoard::setThickness(double t) {
        thickness = t;
    }

    // Add a component to the board
    void BaselineBoard::addComponent(const std::shared_ptr<PCBComponent>& comp) {
        components.push_back(comp);
    }

    // Display board details
    void BaselineBoard::display() const {
        std::cout << "Baseline Board Details:" << std::endl;
        std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness << std::endl;

        std::cout << "Components on the board:" << std::endl;
        for (const auto& comp : components) {
            comp->display();
        }
    }

    // Dump function to output board details to stream
    void BaselineBoard::dump(std::ostream &out) const {
    out << "=== Baseline Board Details ===\n";
    out << "Height:      " << height   << " mm\n";
    out << "Width:       " << width    << " mm\n";
    out << "Thickness:   " << thickness<< " mm\n\n";

    out << "=== Board Metadata ===\n";
    out << "Version:      " << version_    << "\n";
    out << "Generator:    " << generator_  << "\n";
    out << "Paper size:   " << paperSize_  << "\n";
    out << "Root UUID:    " << uuid_       << "\n";
  
    out << "=== Title Block ===\n";
    out << "Title:        " << title_      << "\n";
    out << "Date:         " << date_       << "\n";
    out << "Revision:     " << revision_   << "\n";
    out << "Company:      " << company     << "\n\n";

    out << "=== Components ===\n";
    for (const auto& comp : components) {
        comp->dump(out);
    }
     
// Dump rawPieces_ (variant-aware)
for (const auto &piece : rawPieces_) {
    std::visit([&out](auto&& arg) -> void {
        using T = std::decay_t<decltype(arg)>;
        if constexpr (std::is_same_v<T, ShapePtr>) {
            if (arg) {
                // use serialize() to get an S-expression/string representation
                out << "  " << arg->serialize() << "\n";
            } else {
                out << "  <nullptr shape>\n";
            }
        } else if constexpr (std::is_same_v<T, RawNode>) {
            out << "  " << arg.sexpr << "\n";
        }
    }, piece);
}

}
// BaselineBoard.cc

void BaselineBoard::debugDumpWires() const {
    fprintf(stderr, "=== DUMP wires: count=%zu ===\n", wireShapes_.size());
    for (size_t i = 0; i < wireShapes_.size(); ++i) {
        const auto &shp = wireShapes_[i];
        if (!shp) { fprintf(stderr, " wire[%zu] == nullptr\n", i); continue; }

        // Try to cast Shape -> Wire
        auto w = std::dynamic_pointer_cast<PCBDesign::Wire>(shp);
        if (!w) {
            // Not a Wire — print type info for debugging
            fprintf(stderr, " wire[%zu] is not a Wire (typeid=%s)\n", i,
                    (shp ? typeid(*shp).name() : "null"));
            continue;
        }

        Coordinate s = w->getStart();
        Coordinate e = w->getEnd();
        fprintf(stderr, " wire[%zu] start=(%.2f,%.2f) end=(%.2f,%.2f)\n",
                i, s.x, s.y, e.x, e.y);
    }
}
// BaselineBoard::finalize() after all traversal/handlers are done
void BaselineBoard::finalize() {
    fprintf(stderr, "=== SUMMARY === junctionShapes=%zu wireShapes=%zu symbols=%zu rawPieces=%zu\n",
            junctionShapes_.size(), wireShapes_.size(), symbols_.size(), rawPieces_.size());

    // debug:
    debugDumpWires();
}

// ShapePtr BaselineBoard::convertCleanNodeToShape(const ast_cleaner::CleanNode &clean) {
//     fprintf(stderr, "[convertCleanNodeToShape] tag='%s'\n", clean.tag.c_str());

//     // --- Junction ---
//     if (clean.tag == "junction") {
//         try {
//             float x = std::stof(clean.attrs.at("x"));
//             float y = std::stof(clean.attrs.at("y"));
//             auto j = std::make_shared<Junction>(x, y);  // updated
//             return j;
//         } catch (...) {
//             fprintf(stderr, "[convertCleanNodeToShape] failed junction parse\n");
//             return nullptr;
//         }
//     }

//     // --- Wire ---
//    if (clean.tag == "wire") {
//     try {
//         float x1 = std::stof(clean.attrs.at("x1"));
//         float y1 = std::stof(clean.attrs.at("y1"));
//         float x2 = std::stof(clean.attrs.at("x2"));
//         float y2 = std::stof(clean.attrs.at("y2"));

//         // Optional attributes
//         AngleWire angle = AngleWire::DEG_0;
//         if (clean.attrs.count("angle")) {
//             std::string ang = clean.attrs.at("angle");
//             if (ang == "45") angle = AngleWire::DEG_45;
//             else if (ang == "90") angle = AngleWire::DEG_90;
//             else if (ang == "135") angle = AngleWire::DEG_135;
//             else if (ang == "180") angle = AngleWire::DEG_180;
//             else if (ang == "225") angle = AngleWire::DEG_225;
//             else if (ang == "270") angle = AngleWire::DEG_270;
//             else if (ang == "315") angle = AngleWire::DEG_315;
//         }

//         float thickness = 0.25f;
//         if (clean.attrs.count("thickness")) {
//             thickness = std::stof(clean.attrs.at("thickness"));
//         }

//         std::string layer = "";
//         if (clean.attrs.count("layer")) {
//             layer = clean.attrs.at("layer");
//         }

//         ViaType svia = ViaType::NONE;
//         ViaType evia = ViaType::NONE;
//         if (clean.attrs.count("via_start")) svia = stringToViaType(clean.attrs.at("via_start"));
//         if (clean.attrs.count("via_end"))   evia = stringToViaType(clean.attrs.at("via_end"));

//         return std::make_shared<Wire>(
//             Coordinate{x1, y1}, 
//             Coordinate{x2, y2}, 
//             angle, 
//             thickness, 
//             layer, 
//             svia, 
//             evia
//         );
//     } catch (...) {
//         fprintf(stderr, "[convertCleanNodeToShape] failed wire parse\n");
//         return nullptr;
//     }
// }

//     // --- Text ---
//     if (clean.tag == "text") {
//         try {
//             float x = std::stof(clean.attrs.at("x"));
//             float y = std::stof(clean.attrs.at("y"));
//             std::string value = clean.attrs.count("value") ? clean.attrs.at("value") : "";
//             return std::make_shared<Text>(value, x, y); // matches Text constructor
//         } catch (...) {
//             fprintf(stderr, "[convertCleanNodeToShape] failed text parse\n");
//             return nullptr;
//         }
//     }

//     // --- Unhandled ---
//     return nullptr;
// }
// Convert CleanNode to ShapePtr and store in rawPieces_
std::shared_ptr<Shape> BaselineBoard::convertCleanNodeToShape(const ast_cleaner::CleanNode &clean) {
    try {
       if (clean.tag == "junction") {
    float x = 0.f, y = 0.f;
    bool haveXY = false;

    // 1) Check if clean has separate x/y attrs (older format)
    if (clean.attrs.count("x") && clean.attrs.count("y")) {
        try {
            x = std::stof(clean.attrs.at("x"));
            y = std::stof(clean.attrs.at("y"));
            haveXY = true;
        } catch (...) { haveXY = false; }
    }

    // 2) Check if clean.attrs has "at" (format: "x,y,rot") — parse it
    if (!haveXY && clean.attrs.count("at")) {
        const std::string &atv = clean.attrs.at("at");
        // split by comma
        size_t p1 = atv.find(',');
        size_t p2 = (p1==std::string::npos) ? std::string::npos : atv.find(',', p1+1);
        try {
            if (p1 != std::string::npos) {
                x = std::stof(atv.substr(0, p1));
                if (p2 != std::string::npos) {
                    y = std::stof(atv.substr(p1+1, p2 - (p1+1)));
                } else {
                    y = std::stof(atv.substr(p1+1));
                }
                haveXY = true;
            }
        } catch (...) {
            haveXY = false;
        }
    }

    // 3) If cleaner produced typed at (optional), use that
    if (!haveXY && clean.at.has_value()) {
        x = static_cast<float>(clean.at->x);
        y = static_cast<float>(clean.at->y);
        haveXY = true;
    }

    if (!haveXY) {
        throw std::runtime_error("junction missing coordinates");
    }

    // create junction
    auto j = std::make_shared<Junction>(x, y);

    // If raw at string was present, store it in shape so we preserve original formatting
    if (clean.attrs.count("at")) {
        // clean.attrs["at"] is "x,y,rot", split to strings for raw
        std::string atstr = clean.attrs.at("at");
        // attempt to extract raw X and Y tokens (we'll split by comma and keep them as-is)
        size_t cpos = atstr.find(',');
        if (cpos != std::string::npos) {
            std::string rawx = atstr.substr(0, cpos);
            std::string rest = atstr.substr(cpos + 1);
            size_t cpos2 = rest.find(',');
            std::string rawy = (cpos2 == std::string::npos) ? rest : rest.substr(0, cpos2);
            j->setRawAt(rawx, rawy);
        }
    }

    // uuid
    if (clean.attrs.count("uuid")) {
        j->setUUID(clean.attrs.at("uuid"));
    }

    // color - stored as "r g b a" or "r g b"
    if (clean.attrs.count("color")) {
        j->setColor(clean.attrs.at("color"));
    }

    // diameter
    if (clean.attrs.count("diameter")) {
        try {
            double d = std::stod(clean.attrs.at("diameter"));
            j->setDiameter(d);
        } catch (...) { /* ignore parse errors */ }
    }

    rawPieces_.emplace_back(j);
    return j;
}


        if (clean.tag == "wire") {
            float x1=0,y1=0,x2=0,y2=0;
            if (clean.pts.size() >= 2) {
                x1 = static_cast<float>(clean.pts[0].x);
                y1 = static_cast<float>(clean.pts[0].y);
                x2 = static_cast<float>(clean.pts[1].x);
                y2 = static_cast<float>(clean.pts[1].y);
            } else {
                throw std::runtime_error("wire missing coordinates");
            }
            auto w = std::make_shared<Wire>(Coordinate{x1,y1}, Coordinate{x2,y2});
            rawPieces_.emplace_back(w);
            return w;
        }

        if (clean.tag == "text") {
            float x = std::stof(clean.attrs.at("x"));
            float y = std::stof(clean.attrs.at("y"));
            std::string value = clean.attrs.count("value") ? clean.attrs.at("value") : "";
            auto t = std::make_shared<Text>(value, x, y);
            rawPieces_.emplace_back(t);
            return t;
        }

        throw std::runtime_error("unhandled tag");

    } catch (...) {
        rawPieces_.emplace_back(RawNode{ast_cleaner::toString(clean)});
        return nullptr;
    }
}

void BaselineBoard::printRawPieces() const {
    for (const auto& piece : rawPieces_) {
        std::visit([](auto&& arg) -> void {
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, ShapePtr>) {
                if (arg) std::cout << arg->serialize();
                else     std::cout << "nullptr ShapePtr";
            } else if constexpr (std::is_same_v<T, RawNode>) {
                std::cout << "RawNode: " << arg.sexpr;
            }
        }, piece);
        std::cout << "\n";
    }
}



std::vector<std::string> BaselineBoard::getRawPieces() const {
    std::vector<std::string> out;
    for (const auto& piece : rawPieces_) {
        std::visit([&out](auto&& arg){
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, RawNode>) {
                out.push_back(arg.sexpr);
            }
        }, piece);
    }
    return out;
}


void BaselineBoard::addLibSymbol(const std::string& symbol) {
    libSymbols_.push_back(symbol);
}

const std::vector<std::string>& BaselineBoard::getLibSymbols() const {
    return libSymbols_;
}

void BaselineBoard::setLibSymbolsRaw(const std::string &s) {
    libSymbolsRaw_ = s;
    std::cerr << "[BaselineBoard] setLibSymbolsRaw len=" << libSymbolsRaw_.size() << "\n";
}

const std::string &BaselineBoard::getLibSymbolsRaw() const {
    return libSymbolsRaw_;
}

// BaselineBoard.cc



// const std::vector<std::string>& BaselineBoard::getRawPieces() const {
//     return rawPieces_;
// }


void BaselineBoard::dumpKiCad(std::ostream &out) const {
    fprintf(stderr, "[dumpKiCad] dumping board...\n");

    // Root node
    out << "(kicad_sch (version " << version_ << ") (generator " << generator_ << ")\n";

    // --- Page / Paper size ---
    if (!paperSize_.empty()) {
        out << "  (paper " << paperSize_ << ")\n";
    }

    // --- Title block ---
    out << "  (title_block\n";
    if (!title_.empty())    out << "    (title " << title_ << ")\n";
    if (!date_.empty())     out << "    (date " << date_ << ")\n";
    if (!revision_.empty()) out << "    (rev " << revision_ << ")\n";
    if (!company.empty())   out << "    (company " << company << ")\n";
    out << "  )\n";

    // --- Lib symbols ---
    if (!libSymbolsRaw_.empty()) {
        out << libSymbolsRaw_ << "\n";
    }

    // --- Symbols ---
    for (const auto &s : symbols_) {
        out << "  " << s << "\n";
    }

    // --- Wires (Shape-based) ---
    for (const auto &w : wireShapes_) {
        if (w) out << "  " << w->serialize() << "\n";
    }

    // --- Junctions (Shape-based) ---
    for (const auto &j : junctionShapes_) {
        if (j) out << "  " << j->serialize() << "\n";
    }

    // --- Texts (Shape-based) ---
    for (const auto &t : textShapes_) {
        if (t) out << "  " << t->serialize() << "\n";
    }

    // --- Components ---
    for (const auto& comp : components) {
        comp->dump(out);
    }

    out << ")\n"; // close root

    fprintf(stderr, "[dumpKiCad] done.\n");
}

// ------------------------------------------------------------------
// Append serialized CleanNode for debugging / future processing
// ------------------------------------------------------------------
// keep exactly one implementation of appendRawPieceFromClean

void BaselineBoard::appendRawPieceFromClean(const ast_cleaner::CleanNode &clean) {
    std::string s;
    try {
        s = ast_cleaner::toString(clean);
    } catch (...) {
        s = "<toString() failed>";
    }
  rawPieces_.push_back(RawNode{s}); 

    // Now safe to print s
    fprintf(stderr, "[appendRawPieceFromClean] piece_head='%.*s'...\n", 160, s.c_str());

    // print using fprintf to avoid operator<< collisions
    std::string head = clean.tag.empty() ? "(no-tag)" : clean.tag;
    char buf[200];
    std::snprintf(buf, sizeof(buf),
                  "[BaselineBoard] appendRawPiece len=%zu head=\"%s\"",
                  s.size(), head.c_str());
    fprintf(stderr, "%s\n", buf);
}


void BaselineBoard::appendRawPiece(const std::string &p) {
    rawPieces_.push_back(RawNode{p});   // ✅ wrap string in RawNode
    fprintf(stderr, "[BaselineBoard] appendRawPiece len=%zu\n", p.size());
}
// Helper: convert string to PinType enum
// Helper: convert string to PinType enum
PCBDesign::PinType BaselineBoard::stringToPinType(const std::string& typeStr) {
    if (typeStr == "input" || typeStr == "INPUT") return PCBDesign::PinType::INPUT;
    if (typeStr == "output" || typeStr == "OUTPUT") return PCBDesign::PinType::OUTPUT;
    if (typeStr == "bidirectional" || typeStr == "IN_OUT") return PCBDesign::PinType::IN_OUT;
    if (typeStr == "power" || typeStr == "POWER") return PCBDesign::PinType::POWER;
    if (typeStr == "ground" || typeStr == "GROUND") return PCBDesign::PinType::GROUND;
    if (typeStr == "clock" || typeStr == "CLOCK") return PCBDesign::PinType::CLOCK;
    return PCBDesign::PinType::PASSIVE; // fallback for unknown types
}

void BaselineBoard::parseSymbolRecursive(const ast_cleaner::CleanNode &symbol_node,
                                         std::shared_ptr<PCBComponent> parentComp)
{
    if (symbol_node.tag != "symbol") return;

    auto comp = std::make_shared<PCBComponent>();

    // Add as subcomponent if parent exists
    if (parentComp) {
        parentComp->addSubcomponent(comp);
    }

    // Parse properties
    for (const auto& prop : symbol_node.children) {
        if (prop.tag == "property") {
            PCBComponent::Property p;
            p.key = prop.attrs.at("name");
            p.value = prop.attrs.at("value");
            comp->addProperty(p);
        }
    }

    // Parse shapes and pins
    for (const auto& child : symbol_node.children) {

        if (child.tag == "polyline") {
            std::vector<PCBDesign::Point> points;
            for (const auto& pts_node : child.children) {
                if (pts_node.tag == "pts") {
                    for (const auto& xy_node : pts_node.children) {
                        if (xy_node.tag == "xy") {
                            double x = std::stod(xy_node.attrs.at("x"));
                            double y = std::stod(xy_node.attrs.at("y"));
                            points.emplace_back(x, y);
                        }
                    }
                }
            }
            auto outline = std::make_shared<PCBDesign::Outline>(points);
            comp->addShape(outline);

        } else if (child.tag == "rectangle") {
    double x1 = std::stod(child.attrs.at("start_x"));
    double y1 = std::stod(child.attrs.at("start_y"));
    double x2 = std::stod(child.attrs.at("end_x"));
    double y2 = std::stod(child.attrs.at("end_y"));

    PCBDesign::Point p1(x1, y1);
    PCBDesign::Point p2(x2, y1);
    PCBDesign::Point p3(x2, y2);
    PCBDesign::Point p4(x1, y2);

    PCBDesign::LineSegment l1(p1, p2);
    PCBDesign::LineSegment l2(p2, p3);
    PCBDesign::LineSegment l3(p3, p4);
    PCBDesign::LineSegment l4(p4, p1);

    auto rect = std::make_shared<PCBDesign::Rectangle>(l1, l2, l3, l4);
    comp->addShape(rect);

} else if (child.tag == "circle") {
    double cx = std::stod(child.attrs.at("cx"));
    double cy = std::stod(child.attrs.at("cy"));
    double radius = std::stod(child.attrs.at("radius"));

    PCBDesign::Point center(cx, cy);
    auto circle = std::make_shared<PCBDesign::Circle>(center, radius);
    comp->addShape(circle);
}
 else if (child.tag == "pin") {
    int pinNumber = std::stoi(child.attrs.at("number"));
    float x = std::stof(child.attrs.at("x"));
    float y = std::stof(child.attrs.at("y"));

    std::string typeStr = child.attrs.at("type");
    PCBDesign::PinType pinType = stringToPinType(typeStr);

    auto pin = std::make_shared<PCBDesign::Pin>(pinNumber, pinType, x, y);
    comp->addPin(*pin);
}
else if (child.tag == "symbol") {
            parseSymbolRecursive(child, comp); // recursion for nested symbols
        } else {
            std::cerr << "[WARNING] Unknown child tag: " << child.tag << std::endl;
        }
    }

    // Add to top-level components if no parent
    if (!parentComp)
        components.push_back(comp);
}


// ------------------------------------------------------------------
// lib_symbols block: keep only the first block (existing behavior)
// ------------------------------------------------------------------


void BaselineBoard::handleLibSymbolsCleanNode(const ast_cleaner::CleanNode &clean) {
    fprintf(stderr, "[handleLibSymbolsCleanNode] called, children=%zu\n", clean.children.size());
    std::string piece;
    try { 
        piece = ast_cleaner::toString(clean); 
    } catch (...) { 
        piece = "<toString failed>"; 
    }

    if (!libSymbolsRaw_.empty()) {
        if (piece != libSymbolsRaw_) {
            fprintf(stderr, "[WARNING] Duplicate lib_symbols differs; keeping first.\n");
        }
        return; // skip duplicates
    }
    
    libSymbolsRaw_ = piece;
    fprintf(stderr, "[BaselineBoard] handleLibSymbolsCleanNode: saved lib_symbols (len=%zu)\n", piece.size());

    // --- New: recursively parse all symbols in lib_symbols ---
    for (const auto& symbol_node : clean.children) {
        if (symbol_node.tag == "symbol") {
            parseSymbolRecursive(symbol_node);
        }
    }
}


// ------------------------------------------------------------------
// Symbol: extract lib_id, reference/value properties and position
// ------------------------------------------------------------------
// --- Junctions ---
void BaselineBoard::handleJunctionFromClean(const ast_cleaner::CleanNode &clean) {
    fprintf(stderr, "[handleJunctionFromClean] called for tag='%s'\n", clean.tag.c_str());

    // Keep raw string for debugging
    std::string s;
    try {
        s = ast_cleaner::toString(clean);
    } catch (...) {
        s = "<junction toString failed>";
    }
    junctions_.push_back(s);

    // Convert to Shape
    auto shape = convertCleanNodeToShape(clean);
    if (shape) {
        junctionShapes_.push_back(shape);
        if (auto* junc = dynamic_cast<PCBDesign::Junction*>(shape.get())) {
            fprintf(stderr, "[handleJunction] saved junction shape (x=%.2f, y=%.2f)\n",
                    junc->getX(), junc->getY());
        }
    } else {
        fprintf(stderr, "[handleJunction] failed to convert junction to shape\n");
    }
}
// add at top of file if not present:
// #include <regex>
int added = 0;

void BaselineBoard::handleWireFromClean(const ast_cleaner::CleanNode &clean) {
    fprintf(stderr, "[handleWireFromClean] called for tag='%s'\n", clean.tag.c_str());
    int added = 0;

    // Helper: skip nearly-equal points
    auto samePoint = [](float ax, float ay, float bx, float by) -> bool {
        const float EPS = 1e-4f;
        return (std::fabs(ax - bx) <= EPS && std::fabs(ay - by) <= EPS);
    };

    // Per-node dedupe: avoid adding the same segment twice while processing this node
    std::set<std::string> localSeen;

    auto pushWireIfValid = [&](float x1, float y1, float x2, float y2) {
        // explicit casts to avoid narrowing warnings on some compilers
        float sx = static_cast<float>(x1);
        float sy = static_cast<float>(y1);
        float ex = static_cast<float>(x2);
        float ey = static_cast<float>(y2);

        if (samePoint(sx, sy, ex, ey)) return false; // skip zero-length

        // simple key for dedupe
        std::ostringstream koss;
        koss.setf(std::ios::fixed); koss.precision(4);
        koss << sx << ',' << sy << "->" << ex << ',' << ey;
        std::string key = koss.str();
        if (localSeen.count(key)) return false;
        localSeen.insert(key);

        wireShapes_.push_back(std::make_shared<Wire>(
            Coordinate{sx, sy}, Coordinate{ex, ey},
            AngleWire::DEG_0, 0.25f, "", ViaType::NONE, ViaType::NONE));
        ++added;
        return true;
    };

    // 1) Old-style attrs: x1,y1,x2,y2
    try {
        if (clean.attrs.count("x1") && clean.attrs.count("y1") &&
            clean.attrs.count("x2") && clean.attrs.count("y2")) {

            float x1 = std::stof(clean.attrs.at("x1"));
            float y1 = std::stof(clean.attrs.at("y1"));
            float x2 = std::stof(clean.attrs.at("x2"));
            float y2 = std::stof(clean.attrs.at("y2"));

            // Angle (kept as before)
            AngleWire angle = AngleWire::DEG_0;
            if (clean.attrs.count("angle")) {
                const std::string &ang = clean.attrs.at("angle");
                if      (ang == "0")   angle = AngleWire::DEG_0;
                else if (ang == "45")  angle = AngleWire::DEG_45;
                else if (ang == "90")  angle = AngleWire::DEG_90;
                else if (ang == "135") angle = AngleWire::DEG_135;
                else if (ang == "180") angle = AngleWire::DEG_180;
                else if (ang == "225") angle = AngleWire::DEG_225;
                else if (ang == "270") angle = AngleWire::DEG_270;
                else if (ang == "315") angle = AngleWire::DEG_315;
            }

            float thickness = 0.25f;
            if (clean.attrs.count("thickness")) {
                try { thickness = std::stof(clean.attrs.at("thickness")); } catch (...) {}
            }

            std::string layer = clean.attrs.count("layer") ? clean.attrs.at("layer") : "";
            ViaType svia = clean.attrs.count("via_start") ? stringToViaType(clean.attrs.at("via_start")) : ViaType::NONE;
            ViaType evia = clean.attrs.count("via_end")   ? stringToViaType(clean.attrs.at("via_end"))   : ViaType::NONE;

            // push but use pushWireIfValid to filter/dedupe
            if (pushWireIfValid(x1, y1, x2, y2)) {
                fprintf(stderr, "[handleWire] saved old-style wire\n");
                    // --- Preserve metadata children we don't parse into geometry ---
    // This serializes these children verbatim (in-place) so round-trip ordering + formatting match.
    for (const auto &ch : clean.children) {
        if (preserveCleanTag(ch.tag)) {
            appendRawPieceFromClean(ch);
        }
    }
    // Note: we do NOT 'continue' here; geometry extraction below still runs (we only emitted
    // the metadata children verbatim so they won't later cause UNHANDLED logs).

            }
        }
    } catch (...) {
        fprintf(stderr, "[handleWire] exception parsing old-style coords\n");
    }

    // 2) If ast_cleaner filled clean.pts (vector<Point>), use adjacent pairs
    if (added == 0 && clean.pts.size() >= 2) {
        for (size_t i = 1; i < clean.pts.size(); ++i) {
            float x1 = static_cast<float>(clean.pts[i-1].x);
            float y1 = static_cast<float>(clean.pts[i-1].y);
            float x2 = static_cast<float>(clean.pts[i].x);
            float y2 = static_cast<float>(clean.pts[i].y);
            pushWireIfValid(x1,y1,x2,y2);
        }
        if (added) fprintf(stderr, "[handleWire] saved %d wire(s) from clean.pts\n", added);
    }

    // 3) Search for pts children (they may contain pts vector or xy children)
 // 3) Search for pts children (they may contain pts vector or xy children)
if (added == 0 && !clean.children.empty()) {
      // ensure this header is added at top of file
    std::unordered_set<std::string> seen;

    auto seg_key = [&](float x1, float y1, float x2, float y2) {
        std::ostringstream os;
        os << std::fixed << std::setprecision(6)
           << x1 << ',' << y1 << "->" << x2 << ',' << y2;
        return os.str();
    };

    auto push_wire = [&](float x1, float y1, float x2, float y2, const char *src)->bool {
        if (std::fabs(x1 - x2) < 1e-6f && std::fabs(y1 - y2) < 1e-6f) {
            fprintf(stderr, "[handleWire] SKIP zero-length (%s) %.6f,%.6f == %.6f,%.6f\n",
                    src, x1, y1, x2, y2);
            return false;
        }
        std::string k1 = seg_key(x1,y1,x2,y2);
        std::string k2 = seg_key(x2,y2,x1,y1);
        std::string key = (k1 < k2) ? k1 : k2;
        if (seen.find(key) != seen.end()) {
            fprintf(stderr, "[handleWire] SKIP duplicate (%s) %s\n", src, key.c_str());
            return false;
        }
        wireShapes_.push_back(std::make_shared<Wire>(
            Coordinate{x1,y1}, Coordinate{x2,y2},
            AngleWire::DEG_0, 0.25f, "", ViaType::NONE, ViaType::NONE));
        seen.insert(key);
        ++added;
        fprintf(stderr, "[handleWire] PUSH (%s) %s ; added=%d\n", src, key.c_str(), added);
        return true;
    };

    std::function<void(const ast_cleaner::CleanNode&)> findPts;
    findPts = [&](const ast_cleaner::CleanNode &node) {
        if (node.tag == "pts") {
            if (node.pts.size() >= 2) {
                for (size_t i = 1; i < node.pts.size(); ++i) {
                    float x1 = static_cast<float>(node.pts[i-1].x);
                    float y1 = static_cast<float>(node.pts[i-1].y);
                    float x2 = static_cast<float>(node.pts[i].x);
                    float y2 = static_cast<float>(node.pts[i].y);
                    push_wire(x1,y1,x2,y2, "pts.node.pts");
                }
            } else {
                std::vector<std::pair<float,float>> coords;
                for (const auto &c : node.children) {
                    if (c.tag == "xy") {
                        if (c.attrs.count("x") && c.attrs.count("y")) {
                            try {
                                float x = std::stof(c.attrs.at("x"));
                                float y = std::stof(c.attrs.at("y"));
                                coords.emplace_back(x,y);
                            } catch (...) { fprintf(stderr, "[handleWire] parse fail xy.attrs\n"); }
                        } else if (c.attrs.count("value")) {
                            std::string v = c.attrs.at("value");
                            std::replace(v.begin(), v.end(), ',', ' ');
                            std::istringstream iss(v);
                            double xd, yd;
                            if (iss >> xd >> yd) coords.emplace_back(static_cast<float>(xd), static_cast<float>(yd));
                            else fprintf(stderr, "[handleWire] parse fail xy.value='%s'\n", v.c_str());
                        }
                    }
                }
                if (coords.size() >= 2) {
                    for (size_t i = 1; i < coords.size(); ++i) {
                        push_wire(coords[i-1].first, coords[i-1].second,
                                  coords[i].first,   coords[i].second,
                                  "pts.xy-children");
                    }
                }
            }
        }
        for (const auto &ch : node.children) findPts(ch);
    };

    findPts(clean);
    if (added) fprintf(stderr, "[handleWire] saved %d wire(s) from pts-children (deduped)\n", added);
}

    // 4) Final fallback: regex-scan the raw S-expression for "(xy X Y)" tokens
    if (added == 0) {
        try {
            std::string sexpr = ast_cleaner::toString(clean);
            std::regex r(R"(\(xy\s+([+-]?[0-9]*\.?[0-9]+)\s+([+-]?[0-9]*\.?[0-9]+)\))", std::regex::icase);
            std::sregex_iterator it(sexpr.begin(), sexpr.end(), r);
            std::sregex_iterator end;
            std::vector<std::pair<float,float>> coords;
            for (; it != end; ++it) {
                try {
                    float x = std::stof((*it)[1].str());
                    float y = std::stof((*it)[2].str());
                    coords.emplace_back(x,y);
                } catch (...) { /* ignore parse errors */ }
            }

            if (coords.size() >= 2) {
                for (size_t i = 1; i < coords.size(); ++i) {
                    pushWireIfValid(coords[i-1].first, coords[i-1].second,
                                    coords[i].first,   coords[i].second);
                }
                if (added) fprintf(stderr, "[handleWire] saved %d wire(s) from regex fallback\n", added);
            }
        } catch (...) {
            fprintf(stderr, "[handleWire] regex fallback exception\n");
        }
    }

    if (added == 0) {
        fprintf(stderr, "[handleWire] no coordinates found for this wire node — raw clean toString:\n");
        try {
            std::string s = ast_cleaner::toString(clean);
            if (s.size() > 2000) s = s.substr(0, 2000) + "...(truncated)";
            fprintf(stderr, "%s\n", s.c_str());
        } catch (...) {
            fprintf(stderr, "[handleWire] toString(clean) failed\n");
        }
    }
}


// // --- Wires ---
// void BaselineBoard::handleWireFromClean(const ast_cleaner::CleanNode &clean) {
//     fprintf(stderr, "[handleWireFromClean] called for tag='%s'\n", clean.tag.c_str());

//     // Extract coordinates safely
//     float x1 = 0.f, y1 = 0.f, x2 = 0.f, y2 = 0.f;
//     try {
//         if (clean.attrs.count("x1") && clean.attrs.count("y1") &&
//             clean.attrs.count("x2") && clean.attrs.count("y2")) {
//             x1 = std::stof(clean.attrs.at("x1"));
//             y1 = std::stof(clean.attrs.at("y1"));
//             x2 = std::stof(clean.attrs.at("x2"));
//             y2 = std::stof(clean.attrs.at("y2"));
//         } else {
//             fprintf(stderr, "[handleWire] missing coordinates\n");
//             return;
//         }
//     } catch (...) {
//         fprintf(stderr, "[handleWire] failed to parse coordinates\n");
//         return;
//     }

//     // Parse angle
//     AngleWire angle = AngleWire::DEG_0;
//     if (clean.attrs.count("angle")) {
//         const std::string &ang = clean.attrs.at("angle");
//         if (ang == "0") angle = AngleWire::DEG_0;
//         else if (ang == "45") angle = AngleWire::DEG_45;
//         else if (ang == "90") angle = AngleWire::DEG_90;
//         else if (ang == "135") angle = AngleWire::DEG_135;
//         else if (ang == "180") angle = AngleWire::DEG_180;
//         else if (ang == "225") angle = AngleWire::DEG_225;
//         else if (ang == "270") angle = AngleWire::DEG_270;
//         else if (ang == "315") angle = AngleWire::DEG_315;
//     }

//     // Thickness
//     float thickness = 0.25f;
//     if (clean.attrs.count("thickness")) {
//         try { thickness = std::stof(clean.attrs.at("thickness")); } catch (...) {}
//     }

//     // Layer
//     std::string layer;
//     if (clean.attrs.count("layer")) layer = clean.attrs.at("layer");

//     // Start / end vias
//     ViaType svia = ViaType::NONE;
//     ViaType evia = ViaType::NONE;
//     if (clean.attrs.count("via_start")) svia = stringToViaType(clean.attrs.at("via_start"));
//     if (clean.attrs.count("via_end"))   evia = stringToViaType(clean.attrs.at("via_end"));

//     // Create Wire object
//     auto wire = std::make_shared<Wire>(Coordinate{x1, y1}, Coordinate{x2, y2}, angle, thickness, layer, svia, evia);
//     wireShapes_.push_back(wire);

//     fprintf(stderr, "[handleWire] saved wire shape\n");
// }

// --- Symbols ---
void BaselineBoard::handleSymbolFromClean(const ast_cleaner::CleanNode &clean) {
    fprintf(stderr, "[handleSymbolFromClean] lib_id='%s' tag='%s' children=%zu\n",
        (clean.attrs.count("lib_id") ? clean.attrs.at("lib_id").c_str() : "(none)"),
        clean.tag.c_str(), clean.children.size());

    std::string s;
    try {
        s = ast_cleaner::toString(clean);
    } catch (...) {
        s = "<symbol toString failed>";
    }
    symbols_.push_back(s);
}


// void BaselineBoard::handleSymbolFromClean(const ast_cleaner::CleanNode &clean) {
//     fprintf(stderr, "[handleSymbolFromClean] lib_id='%s' tag='%s' children=%zu\n",
//         (clean.attrs.count("lib_id") ? clean.attrs.at("lib_id").c_str() : "(none)"),
//         clean.tag.c_str(), clean.children.size());

//     // Convert full node back to S-expression string
//     std::string s;
//     try {
//         s = ast_cleaner::toString(clean);
//     } catch (...) {
//         s = "<symbol toString failed>";
//     }

//     // Save it
//     symbols_.push_back(s);

//     // (optional metadata, you already do summary etc.)
// }

// // ------------------------------------------------------------------
// // Wire: consume pts -> record raw & log points
// // ------------------------------------------------------------------
// // --- Junctions ---
// void BaselineBoard::handleJunctionFromClean(const ast_cleaner::CleanNode &clean) {
//     fprintf(stderr, "[handleJunctionFromClean] called for tag='%s'\n", clean.tag.c_str());

//     // Keep raw string for debugging
//     std::string s;
//     try {
//         s = ast_cleaner::toString(clean);
//     } catch (...) {
//         s = "<junction toString failed>";
//     }
//     junctions_.push_back(s);

//     // Convert to Shape
//     auto shape = convertCleanNodeToShape(clean);
//     if (shape) {
//         junctionShapes_.push_back(shape);
//         auto* junc = dynamic_cast<PCBDesign::Junction*>(shape.get());
//         fprintf(stderr, "[handleJunction] saved junction shape (x=%.2f, y=%.2f)\n",
//                 junc ? junc->getX() : 0.0f,
//                 junc ? junc->getY() : 0.0f);
//     } else {
//         fprintf(stderr, "[handleJunction] failed to convert junction to shape\n");
//     }
// }

// // --- Wires ---
// void BaselineBoard::handleWireFromClean(const ast_cleaner::CleanNode &clean) {
//     fprintf(stderr, "[handleWireFromClean] called for tag='%s'\n", clean.tag.c_str());

//     // Extract coordinates
//     float x1 = 0.f, y1 = 0.f, x2 = 0.f, y2 = 0.f;
//     if (clean.attrs.count("x1") && clean.attrs.count("y1") &&
//         clean.attrs.count("x2") && clean.attrs.count("y2")) {
//         try {
//             x1 = std::stof(clean.attrs.at("x1"));
//             y1 = std::stof(clean.attrs.at("y1"));
//             x2 = std::stof(clean.attrs.at("x2"));
//             y2 = std::stof(clean.attrs.at("y2"));
//         } catch (...) {
//             fprintf(stderr, "[handleWire] failed to parse coordinates\n");
//             return;
//         }
//     } else {
//         fprintf(stderr, "[handleWire] missing coordinates\n");
//         return;
//     }

//     // Angle
//     AngleWire angle = AngleWire::DEG_0;
//     if (clean.attrs.count("angle")) {
//         std::string ang = clean.attrs.at("angle");
//         if (ang == "0") angle = AngleWire::DEG_0;
//         else if (ang == "45") angle = AngleWire::DEG_45;
//         else if (ang == "90") angle = AngleWire::DEG_90;
//         else if (ang == "135") angle = AngleWire::DEG_135;
//         else if (ang == "180") angle = AngleWire::DEG_180;
//         else if (ang == "225") angle = AngleWire::DEG_225;
//         else if (ang == "270") angle = AngleWire::DEG_270;
//         else if (ang == "315") angle = AngleWire::DEG_315;
//     }

//     // Thickness
//     float thickness = 0.25f; // default
//     if (clean.attrs.count("thickness")) {
//         try { thickness = std::stof(clean.attrs.at("thickness")); } catch (...) {}
//     }

//     // Layer
//     std::string layer;
//     if (clean.attrs.count("layer")) layer = clean.attrs.at("layer");

//     // Start / end vias
//     ViaType svia = ViaType::NONE;
//     ViaType evia = ViaType::NONE;
//     if (clean.attrs.count("via_start")) svia = stringToViaType(clean.attrs.at("via_start"));
//     if (clean.attrs.count("via_end"))   evia = stringToViaType(clean.attrs.at("via_end"));

//     // Create Wire object
//     auto wire = std::make_shared<Wire>(Coordinate{x1,y1}, Coordinate{x2,y2}, angle, thickness, layer, svia, evia);

//     // Store in new vector
//     wireShapes_.push_back(wire);

//     fprintf(stderr, "[handleWire] saved wire shape\n");
// }

// --- Texts ---
void BaselineBoard::handleTextFromClean(const ast_cleaner::CleanNode &clean) {
    fprintf(stderr, "[handleTextFromClean] called for tag='%s'\n", clean.tag.c_str());

    // Keep raw string for debugging
    std::string s;
    try {
        s = ast_cleaner::toString(clean);
    } catch (...) {
        s = "<text toString failed>";
    }
    texts_.push_back(s);

    // Convert to Shape (assuming convertCleanNodeToShape handles text)
    auto shape = convertCleanNodeToShape(clean);
    if (shape) {
        textShapes_.push_back(shape);
        fprintf(stderr, "[handleText] saved text shape\n");
    } else {
        fprintf(stderr, "[handleText] failed to convert text to shape\n");
    }
}

void BaselineBoard::addProperty(const std::string& key, const std::string& value) {
    properties_[key] = value;
}
void BaselineBoard::handleKicadSchFromClean(const ast_cleaner::CleanNode &node) {
    
    // TODO: later parse title block, properties, etc.
    std::cout << "Handled kicad_sch root, children=" 
              << node.children.size() << std::endl;
}

const std::unordered_map<std::string, std::string>& BaselineBoard::getProperties() const {
    return properties_;
}

    // Extract dimensions from Gerber file
    void BaselineBoard::extractDimensionsFromGerber(const std::string& filename) {
        std::ifstream file(filename);
        if (!file.is_open()) {
            std::cerr << "Failed to open file: " << filename << std::endl;
            return;
        }

        std::string line;
        std::regex coordRegex(R"(X(-?\d+)Y(-?\d+))");

        double minX = std::numeric_limits<double>::max();
        double maxX = std::numeric_limits<double>::lowest();
        double minY = std::numeric_limits<double>::max();
        double maxY = std::numeric_limits<double>::lowest();

        while (std::getline(file, line)) {
            std::smatch match;
            if (std::regex_search(line, match, coordRegex)) {
                double x = std::stod(match[1]) / 1000000.0; // Convert from microns to mm
                double y = std::stod(match[2]) / 1000000.0;

                minX = std::min(minX, x);
                maxX = std::max(maxX, x);
                minY = std::min(minY, y);
                maxY = std::max(maxY, y);
            }
        }

        file.close();

        // Use extracted values directly to set dimensions
        setWidth(maxX - minX);
        setHeight(maxY - minY);
        setThickness(1.6); // Default thickness in mm
    }
} // namespace PCBDesign

// #include <iostream>
// #include <fstream>
// #include <regex>
// #include <limits>
// #include "../include/BaselineBoard.h"

// namespace PCBDesign {
//     // BaselineBoard Class Implementation

//     // Constructor
//     BaselineBoard::BaselineBoard(double h, double w, double t)
//         : height(h), width(w), thickness(t)
//     {
//         this->components = std::vector<PCBComponent>();
//     }

//     BaselineBoard::BaselineBoard()
//     {
//         this->height = 0;
//         this->width = 0;
//         this->thickness = 0;
//         this->components = std::vector<PCBComponent>();
//     }

//     // Getters
//     double BaselineBoard::getHeight() const {
//         return height;
//     }

//     double BaselineBoard::getWidth() const {
//         return width;
//     }

//     double BaselineBoard::getThickness() const {
//         return thickness;
//     }

//     // Setters
//     void BaselineBoard::setHeight(double h) {
//         height = h;
//     }

//     void BaselineBoard::setWidth(double w) {
//         width = w;
//     }

//     void BaselineBoard::setThickness(double t) {
//         thickness = t;
//     }

//     // Add a fundamental shape to the board
//     void BaselineBoard::addComponent(const PCBComponent& comp) {
//         components.emplace_back(comp);
//     }

//     // Display board details
//     void BaselineBoard::display() const {
//         std::cout << "Baseline Board Details:" << std::endl;
//         std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness << std::endl;

//         std::cout << "Components on the board:" << std::endl;
//         for(const auto& comp : components) {
//             comp.display();
//         }
//     }
//       void BaselineBoard::dump(std::ostream &out) const {
//     out << "Baseline Board Details:\n"
//         << "  Height: " << height << " mm  Width: " << width
//         << " mm  Thickness: " << thickness << " mm\n"
//         << "Components:\n";
//     for (auto &c : components) c.dump(out);
//   }
//     // Extract dimensions from Gerber file
//     void BaselineBoard::extractDimensionsFromGerber(const std::string& filename) {
//         std::ifstream file(filename);
//         if (!file.is_open()) {
//             std::cerr << "Failed to open file: " << filename << std::endl;
//             return;
//         }

//         std::string line;
//         std::regex coordRegex(R"(X(-?\d+)Y(-?\d+))");

//         double minX = std::numeric_limits<double>::max();
//         double maxX = std::numeric_limits<double>::lowest();
//         double minY = std::numeric_limits<double>::max();
//         double maxY = std::numeric_limits<double>::lowest();

//         while (std::getline(file, line)) {
//             std::smatch match;
//             if (std::regex_search(line, match, coordRegex)) {
//                 double x = std::stod(match[1]) / 1000000.0; // Convert from microns to mm
//                 double y = std::stod(match[2]) / 1000000.0;

//                 minX = std::min(minX, x);
//                 maxX = std::max(maxX, x);
//                 minY = std::min(minY, y);
//                 maxY = std::max(maxY, y);
//             }
//         }

//         file.close();

//         // Use extracted values directly to set dimensions
//         setWidth(maxX - minX);
//         setHeight(maxY - minY);
//         setThickness(1.6); // Default thickness in mm
//     }
// } // namespace PCBDesign


// #include "../include/BaselineBoard.h"

// namespace PCBDesign {
//         // BaselineBoard Class Implementation

//     // Constructor
//     BaselineBoard::BaselineBoard(double h, double w, double t)
//         : height(h), width(w), thickness(t)
//     {
//         this->components = std::vector<PCBComponent>();
//     }
    
//     BaselineBoard::BaselineBoard()
//     {
//         this->height = 0;
//         this->width = 0;
//         this->thickness = 0;
//         this->components = std::vector<PCBComponent>();
//     }

//     // Getters
//     double BaselineBoard::getHeight() const {
//         return height;
//     }

//     double BaselineBoard::getWidth() const {
//         return width;
//     }

//     double BaselineBoard::getThickness() const {
//         return thickness;
//     }
//     // Setters
//     void BaselineBoard::setHeight(double h) {
//         height = h;
//     }

//     void BaselineBoard::setWidth(double w) {
//         width = w;
//     }

//     void BaselineBoard::setThickness(double t) {
//         thickness = t;
//     }

//     // Add a fundamental shape to the board
//     void BaselineBoard::addComponent(const PCBComponent& comp) {
//         components.emplace_back(comp);
//     }

//     // Display board details
//     void BaselineBoard::display() const {
//         std::cout << "Baseline Board Details:" << std::endl;
//         std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness
//             << std::endl;

//         std::cout << "Components on the board:" << std::endl;
//         for(const auto& comp : components) {
//             comp.display();
//         }
//     }
// }
