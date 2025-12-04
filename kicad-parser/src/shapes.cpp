#include "shapes.hpp"
#include "ast.hpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <set>
#include "Coordinate.h" 
using namespace PCBDesign;

namespace PCBDesign {

// Helpers
static Rectangle makeZeroRect() {
    Point z(0, 0);
    LineSegment l(z, z);
    return Rectangle(l, l, l, l, 0.0, 0.0);  // Just return an object
}

static std::shared_ptr<Arc> makeZeroArc() {
    return std::make_shared<Arc>(0,0,0,0,0,0, 0.0f, "", "");
}

std::shared_ptr<Shape> getShape(sexpr::Node* node, int depth) {
    std::cerr << "[getShape] Entered\n";
    if (!node) {
        std::cerr << "[getShape] node is null!\n";
        return std::make_shared<LineSegment>(Point(0,0), Point(0,0));
    }

    int childCount = node->GetNumberOfChildren();
    std::cerr << "[getShape] Number of children: " << childCount << "\n";

    if (childCount < 1) {
        std::cerr << "[getShape] Not enough children\n";
        return std::make_shared<LineSegment>(Point(0,0), Point(0,0));
    }

    std::string tag = node->GetChild(0)->AsString();
    std::cerr << "[getShape] Tag is: " << tag << "\n";

    if (tag == "line" || tag == "fp_line" || tag == "gr_line") {
        std::cerr << "[getShape] Recognized line\n";
        return getLine(node, depth);
    }
    if (tag == "rectangle" || tag == "fp_rectangle" || tag == "gr_rectangle") {
        std::cerr << "[getShape] Recognized rectangle\n";
        return getRectangle(node, depth);
    }
    if (tag == "arc" || tag == "fp_arc" || tag == "gr_arc") {
        std::cerr << "[getShape] Recognized arc\n";
        return getArc(node, depth); 
    }
    if (tag == "circle" || tag == "fp_circle" || tag == "gr_circle") {
        std::cerr << "[getShape] Recognized circle\n";
        return getCircle(node, depth);
    }
    if (tag == "bezier" || tag == "fp_bezier" || tag == "gr_bezier") {
        std::cerr << "[getShape] Recognized bezier\n";
        return getBezier(node, depth);
    }
    if (tag == "polyline" || tag == "fp_polyline" || tag == "gr_polyline") {
        std::cerr << "[getShape] Recognized polyline\n";
        return getPolyline(node, depth);
    }

    std::cerr << "[getShape] Unrecognized tag. Returning fallback line.\n";
    return std::make_shared<LineSegment>(Point(0,0), Point(0,0));
}


// new helper — scan *each* child list for tag==name
static sexpr::Node* findChildByName(sexpr::Node* parent, const std::string& name) {
  for (size_t i = 0; i < parent->GetNumberOfChildren(); ++i) {
    auto* child = parent->GetChild(i);
    if (!child->IsList()) 
      continue;
    auto* tagNode = child->GetChild(0);
    if (tagNode && tagNode->IsSymbol() && tagNode->AsString() == name)
      return child;
  }
  return nullptr;
}
std::shared_ptr<PCBDesign::Shape> getLine(sexpr::Node* node, int depth) {
auto* children = node->GetChildren(); // get pointer to children
    if (children) {
        std::cout << "[DEBUG] getLine called with " << children->size() << " children\n";
    } else {
        std::cout << "[DEBUG] getLine called with 0 children\n";
    }



  std::vector<float> coords;
  // pull the two-point lists
  auto* startList = findChildByName(node, "start");
  auto* endList   = findChildByName(node, "end");
  if (!startList || !endList) {
    std::cerr << "[getLine] missing start/end at depth " << depth << "\n";
    return nullptr;
  }

  extractFloatsFromNode(startList, coords); // should push x1,y1
  extractFloatsFromNode(endList,   coords); // should push x2,y2
  if (coords.size() != 4) {
    std::cerr << "[getLine] bad coord count " << coords.size() << "\n";
    return nullptr;
  }

  // NEW: extract width from `(width …)` child if present
  float width = 0.0f;
  auto* widthNode = findChildByName(node, "width");
  if (widthNode && widthNode->GetNumberOfChildren() > 1) {
    try {
      width = std::stof(widthNode->GetChild(1)->AsString());
    } catch (...) {
      std::cerr << "[getLine] failed to parse width\n";
    }
  }

  // construct your line segment shape
  auto seg = std::make_shared<LineSegment>(
    Point{coords[0], coords[1]},
    Point{coords[2], coords[3]},
    width  // <-- PASS WIDTH TO CONSTRUCTOR
  );

  std::cerr << "[getLine] Created line (" 
            << coords[0] << "," << coords[1] << ")→("
            << coords[2] << "," << coords[3] << ")"
            << " width=" << width << "\n";

  return seg;
}

std::shared_ptr<Shape> getArc(sexpr::Node* node, int depth) { 
    sexpr::Node* startList = nullptr;
    sexpr::Node* midList   = nullptr;
    sexpr::Node* endList   = nullptr;
    float width = 0.2f;
    std::string strokeType = "default";
    std::string fillType = "none";

    for (size_t i = 1; i < node->GetNumberOfChildren(); ++i) {
        auto* child = node->GetChild(i);
        if (!child || !child->IsList()) continue;

        std::string tag = child->GetChild(0)->AsString();

        if (tag == "start")      startList = child;
        else if (tag == "mid")   midList   = child;
        else if (tag == "end")   endList   = child;
        else if (tag == "stroke") {
            for (size_t j = 1; j < child->GetNumberOfChildren(); ++j) {
                auto* sub = child->GetChild(j);
                if (!sub || !sub->IsList()) continue;
                auto subtag = sub->GetChild(0)->AsString();
                if (subtag == "width") width = std::stof(sub->GetChild(1)->AsString());
                else if (subtag == "type") strokeType = sub->GetChild(1)->AsString();
            }
        }
        else if (tag == "fill") {
            for (size_t j = 1; j < child->GetNumberOfChildren(); ++j) {
                auto* sub = child->GetChild(j);
                if (!sub || !sub->IsList()) continue;
                if (sub->GetChild(0)->AsString() == "type") {
                    fillType = sub->GetChild(1)->AsString();
                }
            }
        }
    }

    if (!startList || !midList || !endList) {
        std::cout << "[getArc] missing one of start/mid/end at depth " << depth << "\n";
        return nullptr;
    }

    std::vector<float> coords;
    extractFloatsFromNode(startList, coords);
    extractFloatsFromNode(midList,   coords);
    extractFloatsFromNode(endList,   coords);

    if (coords.size() != 6) {
        std::cerr << "[getArc] bad coord count " << coords.size() << " at depth " << depth << "\n";
        return nullptr;
    }

    float x0 = coords[0], y0 = coords[1];
    float x1 = coords[2], y1 = coords[3];
    float x2 = coords[4], y2 = coords[5];

    auto arcShape = std::make_shared<Arc>(x0, y0, x1, y1, x2, y2, width, strokeType, fillType);

    std::cout << "[getArc] Created arc: start("
              << x0 << "," << y0 << ") mid("
              << x1 << "," << y1 << ") end("
              << x2 << "," << y2 << ") width="
              << width << " stroke=" << strokeType
              << " fill=" << fillType << "\n";

    return arcShape;
}


// Extract a circle
std::shared_ptr<Shape> getCircle(sexpr::Node* n, int depth) {
    std::vector<float> ctr, r;
    
    if (n->GetNumberOfChildren() < 3)
        return std::make_shared<Circle>(Point(), 0.0f);

    extractFloatsFromNode(n->GetChild(1), ctr);
    extractFloatsFromNode(n->GetChild(2), r);

    if (ctr.size() != 2 || r.size() != 1)
        return std::make_shared<Circle>(Point(), 0.0f);

    float cx = ctr[0];
    float cy = ctr[1];
    float radius = r[0];

    return std::make_shared<Circle>(Point(ctr[0], ctr[1]), r[0]);
}


// your existing code like

// Extract a Bezier
std::shared_ptr<Shape> getBezier(sexpr::Node* n, int depth) {
    std::vector<std::pair<float,float>> pts;
    if (n->GetNumberOfChildren()>1)
        extractCoordinatePointList(n->GetChild(1), pts);
     return std::make_shared<Bezier>(pts);
}

// shapes.cpp
std::shared_ptr<Shape> getPolyline(sexpr::Node* node, int depth) {
auto* children = node->GetChildren(); // get pointer to children
    if (children) {
        std::cout << "[DEBUG] getPolyline called with " << children->size() << " children\n";
    } else {
        std::cout << "[DEBUG] getPolyline called with 0 children\n";
    }




    using namespace PCBDesign;
    std::vector<std::pair<float,float>> points;

    float width = 0.0f;
    std::string strokeType;
    std::string fillType;
    std::string uuid;

    if (!node || !node->IsList()) return nullptr;

    for (size_t i = 1; i < node->GetNumberOfChildren(); ++i) {
        auto* child = node->GetChild(i);
        if (!child || !child->IsList()) continue;
        auto* tagNode = child->GetChild(0);
        if (!tagNode || !tagNode->IsSymbol()) continue;
        std::string tag = tagNode->AsString();

        if (tag == "pts") {
            for (size_t j = 1; j < child->GetNumberOfChildren(); ++j) {
                auto* pt = child->GetChild(j);
                if (!pt || !pt->IsList()) continue;
                auto* p0 = pt->GetChild(0);
                if (!p0 || !p0->IsSymbol()) continue;
                if (p0->AsString() != "xy") continue;
                float x = std::stof(pt->GetChild(1)->AsString());
                float y = std::stof(pt->GetChild(2)->AsString());
                points.emplace_back(x, y);
            }
        }
        else if (tag == "stroke") {
            for (size_t j = 1; j < child->GetNumberOfChildren(); ++j) {
                auto* sub = child->GetChild(j);
                if (!sub || !sub->IsList()) continue;
                auto* sub0 = sub->GetChild(0);
                if (!sub0 || !sub0->IsSymbol()) continue;
                std::string subtag = sub0->AsString();
                if (subtag == "width" && sub->GetNumberOfChildren() >= 2) {
                    width = std::stof(sub->GetChild(1)->AsString());
                } else if (subtag == "type" && sub->GetNumberOfChildren() >= 2) {
                    strokeType = sub->GetChild(1)->AsString();
                }
            }
        }
        else if (tag == "fill") {
            for (size_t j = 1; j < child->GetNumberOfChildren(); ++j) {
                auto* sub = child->GetChild(j);
                if (!sub || !sub->IsList()) continue;
                auto* sub0 = sub->GetChild(0);
                if (!sub0 || !sub0->IsSymbol()) continue;
                if (sub0->AsString() == "type" && sub->GetNumberOfChildren() >= 2) {
                    fillType = sub->GetChild(1)->AsString();
                } else if (sub0->AsString() == "color" && sub->GetNumberOfChildren() >= 5) {
                    std::ostringstream oss;
                    oss << "rgba(" 
                        << sub->GetChild(1)->AsString() << ","
                        << sub->GetChild(2)->AsString() << ","
                        << sub->GetChild(3)->AsString() << ","
                        << sub->GetChild(4)->AsString() << ")";
                    fillType = oss.str();
                }
            }
        }
        else if (tag == "uuid" && child->GetNumberOfChildren() >= 2) {
            uuid = child->GetChild(1)->AsString();
        }
    }

    if (points.size() < 2) {
        std::cerr << "[getPolyline] not enough points: " << points.size() << "\n";
        return nullptr;
    }

    auto poly = std::make_shared<Polyline>(points, width, strokeType, fillType);
    if (!uuid.empty()) poly->setUUID(uuid);

    std::cout << "[getPolyline] Created polyline with " << points.size()
              << " points, width=" << width
              << ", stroke=" << strokeType
              << ", fill=" << fillType << "\n";
    return poly;
}



// 2) Polyline’s non‑inline constructor

// 4) BusEntry’s dump (ctor was inline, so only dump needs a body)
void BusEntry::dump(std::ostream &out) const {
    out << "BusEntry at(" << posX << "," << posY << ")"
        << " size(" << sizeX << "," << sizeY << ")";

    if (!uuid.empty())
        out << " uuid=" << uuid;
    if (!strokeType.empty())
        out << " strokeType=" << strokeType;
    
    out << " width=" << width;
    out << " with " << points.size() << " pts";
    out << "\n";
}


std::shared_ptr<Shape> getRectangle(sexpr::Node* n, int depth) {
    std::cout << "[getRectangle] Entered\n";
    std::cout << "[getRectangle] Number of children: " << n->GetNumberOfChildren() << "\n";

    if (n->GetNumberOfChildren() < 3) {
        std::cout << "[getRectangle] Too few children, returning zero-rect.\n";
        return std::make_shared<Rectangle>(makeZeroRect());
    }

    std::vector<float> s, e;
    std::cout << "[getRectangle] Extracting 'start' coordinates...\n";
    extractFloatsFromNode(n->GetChild(1), s);
    std::cout << "[getRectangle] Extracting 'end' coordinates...\n";
    extractFloatsFromNode(n->GetChild(2), e);

    std::cout << "[getRectangle] Start vector size: " << s.size() << ", End vector size: " << e.size() << "\n";
    if (s.size() != 2 || e.size() != 2) {
        std::cout << "[getRectangle] Invalid coordinate sizes, returning zero-rect.\n";
        return std::make_shared<Rectangle>(makeZeroRect());
    }

    // Create corner points
    Point p1(s[0], s[1]), p2(e[0], e[1]);
    Point p3(s[0], e[1]), p4(e[0], s[1]);

    std::cout << "[getRectangle] Coordinates:\n";
    std::cout << "  p1: (" << p1.x << ", " << p1.y << ")\n";
    std::cout << "  p2: (" << p2.x << ", " << p2.y << ")\n";
    std::cout << "  p3: (" << p3.x << ", " << p3.y << ")\n";
    std::cout << "  p4: (" << p4.x << ", " << p4.y << ")\n";

    LineSegment l1(p1, p3), l2(p3, p2), l3(p2, p4), l4(p4, p1);

    std::cout << "[getRectangle] Created all line segments\n";

    // Dump lines manually
    l1.dump(std::cout);
    l2.dump(std::cout);
    l3.dump(std::cout);
    l4.dump(std::cout);

    std::cout << "[getRectangle] Returning rectangle...\n";
    return std::make_shared<Rectangle>(l1, l2, l3, l4, 0.0, 0.0);
}



void extractCoordinatePointList(sexpr::Node* node,
    std::vector<std::pair<float,float>>& points) {
    if (!node) return;
    for (int i = 0; i < node->GetNumberOfChildren(); ++i) {
        std::vector<float> coords;
        extractFloatsFromNode(node->GetChild(i), coords);
        if (coords.size() == 2)
            points.emplace_back(coords[0], coords[1]);
    }
}

void getCoordinates(sexpr::Node* node, bool& found,
    std::vector<float>& coordinates) {
    found = false;
    if (!node) return;
    extractFloatsFromNode(node, coordinates);
    if (!coordinates.empty()) found = true;
}
std::vector<std::unique_ptr<Footprint>> allFootprints;

void Footprint::dump(int indent) const {
    std::string prefix(indent, ' ');
    std::cout << prefix << "Footprint: " << name << "\n";
    std::cout << prefix << "  Layer: " << layer << "\n";
    std::cout << prefix << "  Description: " << description << "\n";
    std::cout << prefix << "  Position: (" << position.x << ", " << position.y << ")\n";
    std::cout << prefix << "  Pads: " << pads.size() << "\n";
    std::cout << prefix << "  Outline lines: " << outline.size() << "\n";
    // Optionally dump each pad/outline detail
}
// Text constructors delegating to existing Text(const std::string&, float, float)
PCBDesign::Text::Text(const PCBDesign::Coordinate &c, const std::string &s)
    : Text(s, c.x, c.y) {}

PCBDesign::Text::Text(const PCBDesign::Coordinate &c, std::string &&s)
    : Text(std::move(s), c.x, c.y) {}

// Junction constructors delegating to existing Junction(float, float)


PCBDesign::Junction::Junction(const PCBDesign::Coordinate &c)
    : Junction(c.x, c.y) {}
std::string PCBDesign::BusEntry::serialize() const {
    // TODO: adjust this to your desired format
    return "BusEntry";
}
std::string Label::serialize() const {
    // TODO: adjust output as needed
    return "Label";
}

std::string Sheet::serialize() const {
    // TODO: adjust output as needed
    return "Sheet";
}

} // namespace PCBDesign
