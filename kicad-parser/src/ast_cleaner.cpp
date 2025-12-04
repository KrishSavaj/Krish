// ast_cleaner.cpp
#include "ast_cleaner.hpp"
#include <regex>
#include <sstream>
#include <iomanip>
#include <cmath>
#include <algorithm>
#include <optional>
#include "shapes.hpp"


using namespace std;

namespace ast_cleaner {

static constexpr int FLOAT_PREC = 6;

// --- numeric detectors ---
bool isIntToken(const string& s) {
    static const regex re("^[-+]?[0-9]+$");
    return regex_match(s, re);
}
bool isFloatToken(const string& s) {
    static const regex re("^[-+]?(?:[0-9]*\\.[0-9]+|[0-9]+\\.[0-9]*)(?:[eE][-+]?[0-9]+)?$");
    static const regex re2("^[-+]?[0-9]+(?:[eE][-+]?[0-9]+)$");
    return regex_match(s, re) ? false : (regex_match(s, re) || regex_match(s, re2));
}
static void logUnhandled(const std::string& context, const ast_cleaner::SExpr& expr) {
    std::ostringstream oss;
    oss << "[UNHANDLED] " << context
        << " addr=" << static_cast<const void*>(&expr)
        << " -> ";

    if (expr.is_atom) {
        oss << expr.atom << "\n";
        std::cerr << oss.str();
        return;
    }

    oss << "(";
    for (size_t i = 0; i < expr.list.size(); ++i) {
        if (expr.list[i].is_atom) oss << expr.list[i].atom << " ";
        else {
            // show the head of the sublist when available, else <list>
            if (!expr.list[i].list.empty() && expr.list[i].list[0].is_atom)
                oss << "(" << expr.list[i].list[0].atom << ") ";
            else
                oss << "<list> ";
        }
    }
    oss << ")\n";

    // add per-child debug lines
    oss << "  children details (child_index: addr type extra):\n";
    for (size_t i = 0; i < expr.list.size(); ++i) {
        const auto &c = expr.list[i];
        oss << "    [" << i << "] addr=" << static_cast<const void*>(&c);
        if (c.is_atom) {
            oss << " atom=\"" << c.atom << "\"";
        } else {
            oss << " list_size=" << c.list.size();
            if (!c.list.empty() && c.list[0].is_atom) oss << " head=\"" << c.list[0].atom << "\"";
        }
        oss << "\n";
    }

    std::cerr << oss.str();
}
// add near other helpers
static bool shouldLogUnhandled(const std::string &head) {
    static const std::set<std::string> quiet = {
        "path","reference","unit","in_bom","on_board","generator","uuid","tstamp",
        "in_bom","on_board","host","paper","page","title","date","rev"
    };
    return (quiet.find(head) == quiet.end());
}

// small helper: build a CleanNode with a single-atom value if present
static CleanNode makeSimpleAtomNode(const string &tag, const SExpr &child) {
    CleanNode n;
    n.tag = tag;
    if (child.list.size() >= 2 && child.list[1].is_atom) {
        n.attrs["value"] = child.list[1].atom;
    } else if (!child.list.empty() && child.is_atom) {
        // defensive: if child itself is atom (unlikely here), use it
        n.attrs["value"] = child.atom;
    }
    return n;
}

static double parseNumber(const string& s) {
    try {
        double v = stod(s);
        double scale = pow(10.0, FLOAT_PREC);
        return round(v * scale) / scale;
    } catch (...) {
        return 0.0;
    }
}

static string atomOrEmpty(const SExpr& e) {
    return e.is_atom ? e.atom : "";
}

static bool isVolatileHead(const string& head) {
    return head == "uuid" || head == "id";
}

static optional<At> tryExtractAt(const SExpr& e) {
    if (e.is_atom || e.list.size() < 3 || !e.list[0].is_atom || e.list[0].atom != "at") return nullopt;
    double x = parseNumber(atomOrEmpty(e.list[1]));
    double y = parseNumber(atomOrEmpty(e.list[2]));
    double rot = 0.0;
    if (e.list.size() >= 4) rot = parseNumber(atomOrEmpty(e.list[3]));
    return At{x, y, rot};
}
// try to extract a single (xy X Y) or (xy "X Y") or (xy "X,Y") -> Point
static std::optional<Point> tryExtractXY(const SExpr& xy) {
    if (xy.is_atom) return std::nullopt;
    if (xy.list.empty() || !xy.list[0].is_atom) return std::nullopt;
    if (xy.list[0].atom != "xy") return std::nullopt;

    // Form 1: (xy X Y)
    if (xy.list.size() >= 3 && xy.list[1].is_atom && xy.list[2].is_atom) {
        try {
            double X = parseNumber(xy.list[1].atom); // parseNumber exists in your codebase
            double Y = parseNumber(xy.list[2].atom);
            return Point{X, Y};
        } catch (...) { return std::nullopt; }
    }

    // Form 2: (xy "X Y") or (xy "X,Y") or (xy value)
    if (xy.list.size() >= 2 && xy.list[1].is_atom) {
        std::string v = xy.list[1].atom;
        std::replace(v.begin(), v.end(), ',', ' ');
        std::istringstream iss(v);
        double X, Y;
        if (iss >> X >> Y) return Point{X, Y};
    }

    return std::nullopt;
}

static vector<Point> tryExtractPts(const SExpr& e) {
    vector<Point> out;
    if (e.is_atom || e.list.empty() || !e.list[0].is_atom || e.list[0].atom != "pts") return out;

    for (size_t i = 1; i < e.list.size(); ++i) {
        const SExpr &child = e.list[i];
        // prefer canonical (xy X Y)
        auto maybe = tryExtractXY(child);
        if (maybe) {
            out.push_back(*maybe);
            continue;
        }

        // fallback: sometimes child is a list with first atom != "xy" but contains "xy" as nested atom
        if (!child.is_atom) {
            for (size_t k = 0; k < child.list.size(); ++k) {
                if (!child.list[k].is_atom) {
                    auto nested = tryExtractXY(child.list[k]);
                    if (nested) { out.push_back(*nested); break; }
                }
            }
        }
    }
    return out;
}


static CleanNode cleanInner(const SExpr& raw);

static CleanNode handleShapeNode(const SExpr& child, const string& chead) {
    CleanNode shape;
    shape.tag = chead;
    shape.pts = tryExtractPts(child);

    for (size_t j = 1; j < child.list.size(); ++j) {
        if (!child.list[j].is_atom && !child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string sh = child.list[j].list[0].atom;
            if (sh == "stroke" || sh == "fill" || sh == "width" || sh == "radius") {
                ostringstream oss; oss << "(" << sh;
                for (size_t k = 1; k < child.list[j].list.size(); ++k)
                    oss << (child.list[j].list[k].is_atom ? (" " + child.list[j].list[k].atom) : " <list>");
                oss << ")";
                shape.attrs[sh] = oss.str();
            }
        }
    }
    return shape;
}

static CleanNode cleanInner(const SExpr& raw) {
    CleanNode node;
    if (raw.is_atom) { node.tag = raw.atom; return node; }
    if (raw.list.empty()) { node.tag = ""; return node; }

    string head = raw.list[0].is_atom ? raw.list[0].atom : "";
    node.tag = head;
if (head == "lib_symbols") {
    std::cerr << "AstCleaner: handling lib_symbols at " << &raw << "\n";
    for (size_t i = 1; i < raw.list.size(); ++i) {
        if (raw.list[i].is_atom) {
            node.attrs["misc"] += (node.attrs["misc"].empty() ? "" : " ") + raw.list[i].atom;
            continue;
        }
        node.children.push_back(cleanInner(raw.list[i]));
    }
    return node;
}


    for (size_t i = 1; i < raw.list.size(); ++i) {
        const SExpr &child = raw.list[i];

        // drop volatile id/uuid by default. If you need them, change this to store in attrs.
        if (!child.is_atom && !child.list.empty() && child.list[0].is_atom && isVolatileHead(child.list[0].atom))
            continue;

        if (child.is_atom) {
            if (node.attrs.find("value") == node.attrs.end()) node.attrs["value"] = child.atom;
            else if (node.attrs.find("name") == node.attrs.end()) node.attrs["name"] = child.atom;
            else node.attrs["misc"] += (node.attrs["misc"].empty() ? "" : " ") + child.atom;
            continue;
        }

        // child is a list
        if (!child.list.empty() && child.list[0].is_atom) {
            string chead = child.list[0].atom;

            // --- common sublists ---
            if (chead == "at") {
                auto atv = tryExtractAt(child);
                if (atv) node.at = atv.value();
                continue;
            } 
// -------------- begin extra handlers to paste into chead handling chain --------------

// symbol: name + nested elements (polyline / pin / property / pin_names etc.)
else if (chead == "symbol") {
    CleanNode sym;
    sym.tag = "symbol";
    // if second token is an atom, treat as symbol name/value
    if (child.list.size() >= 2 && child.list[1].is_atom) {
        sym.attrs["name"] = child.list[1].atom;
    }
    // clean nested sublists (polylines, pins, properties, etc.)
    for (size_t j = 2; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            // keep stray atoms as misc
            if (sym.attrs.find("misc") == sym.attrs.end()) sym.attrs["misc"] = child.list[j].atom;
            else sym.attrs["misc"] += " " + child.list[j].atom;
            continue;
        }
        sym.children.push_back(cleanInner(child.list[j]));
    }
    node.children.push_back(std::move(sym));
    continue;
}

// polyline and other simple shape primitives -> reuse handleShapeNode
else if (chead == "polyline" || chead == "rectangle" || chead == "circle" || chead == "ellipse") {
    node.children.push_back(handleShapeNode(child, chead));
    continue;
}

// fill / type combos (e.g., (fill (type outline)) -> record fill attrs)
else if (chead == "fill") {
    CleanNode fillN; fillN.tag = "fill";
    // if contains (type ...) or (color ...) store them as attrs
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) continue;
        if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string subh = child.list[j].list[0].atom;
            ostringstream oss; oss << "(" << subh;
            for (size_t k = 1; k < child.list[j].list.size(); ++k)
                oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
            oss << ")";
            fillN.attrs["fill_"+subh] = oss.str();
        }
    }
    node.children.push_back(std::move(fillN));
    continue;
}

// pin: parse common pin subitems (name/number/length/at/inverted/power_in/line/hide)
else if (chead == "pin") {
    CleanNode pin; pin.tag = "pin";
    for (size_t m = 1; m < child.list.size(); ++m) {
        if (child.list[m].is_atom) {
            // type tokens like "power_in", "line", "hide", or stray tokens
            if (pin.attrs.find("type") == pin.attrs.end()) pin.attrs["type"] = child.list[m].atom;
            else pin.attrs["misc"] += (pin.attrs["misc"].empty() ? "" : " ") + child.list[m].atom;
            continue;
        }
        if (!child.list[m].list.empty() && child.list[m].list[0].is_atom) {
            string ph = child.list[m].list[0].atom;
            if (ph == "name" && child.list[m].list.size() >= 2 && child.list[m].list[1].is_atom)
                pin.attrs["name"] = child.list[m].list[1].atom;
            else if (ph == "number" && child.list[m].list.size() >= 2 && child.list[m].list[1].is_atom)
                pin.attrs["number"] = child.list[m].list[1].atom;
            else if (ph == "length" && child.list[m].list.size() >= 2 && child.list[m].list[1].is_atom)
                pin.attrs["length"] = child.list[m].list[1].atom;
            else if (ph == "inverted")
                pin.attrs["inverted"] = "1";
            else if (ph == "at") {
                auto atv = tryExtractAt(child.list[m]);
                if (atv) pin.attrs["at"] = to_string(atv->x) + "," + to_string(atv->y) + "," + to_string(atv->rot);
            } else {
                ostringstream oss; oss << "(" << ph;
                for (size_t mm = 1; mm < child.list[m].list.size(); ++mm)
                    oss << (child.list[m].list[mm].is_atom ? " " + child.list[m].list[mm].atom : " <list>");
                oss << ")";
                pin.attrs[string("extra_")+ph] = oss.str();
            }
        }
    }
    node.children.push_back(std::move(pin));
    continue;
}

// pin_names and pin_numbers -> small nodes capturing offset/hide flags
else if (chead == "pin_names" || chead == "pin_numbers") {
    CleanNode pn; pn.tag = chead;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            pn.attrs["flag_"+to_string(j)] = child.list[j].atom;
            continue;
        }
        if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string sh = child.list[j].list[0].atom;
            if (sh == "offset" && child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom)
                pn.attrs["offset"] = child.list[j].list[1].atom;
            else {
                ostringstream oss; oss << "(" << sh;
                for (size_t k = 1; k < child.list[j].list.size(); ++k)
                    oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
                oss << ")";
                pn.attrs["extra_"+sh] = oss.str();
            }
        }
    }
    node.children.push_back(std::move(pn));
    continue;
}

// simple scalar wrappers: length/name/number/type/offset/effects/font/size
else if (chead == "length" || chead == "name" || chead == "number" || chead == "type" || chead == "offset") {
    CleanNode leaf; leaf.tag = chead;
    if (child.list.size() >= 2 && child.list[1].is_atom) leaf.attrs["value"] = child.list[1].atom;
    node.children.push_back(std::move(leaf));
    continue;
}

// effects/font/size nested combos -> store as structured attrs
else if (chead == "effects" || chead == "font" || chead == "size") {
    CleanNode e; e.tag = chead;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            // things like "bold" etc
            e.attrs["token_"+to_string(j)] = child.list[j].atom;
        } else if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string sh = child.list[j].list[0].atom;
            ostringstream oss; oss << "(" << sh;
            for (size_t k = 1; k < child.list[j].list.size(); ++k)
                oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
            oss << ")";
            e.attrs["extra_"+sh] = oss.str();
        }
    }
    node.children.push_back(std::move(e));
    continue;
}

// power tag (usually just an atom with no children) -> create small node
else if (chead == "power") {
    CleanNode p; p.tag = "power";
    node.children.push_back(std::move(p));
    continue;
}
// ----------------- additional conservative handlers -----------------

// Top-level metadata (version, host, page, paper, title_block/title/date/rev)
else if (chead == "version" || chead == "host" || chead == "paper" || chead == "page"
         || chead == "title" || chead == "date" || chead == "rev") {
    CleanNode meta; meta.tag = chead;
    // gather atoms as value(s)
    if (child.list.size() >= 2 && child.list[1].is_atom) meta.attrs["value"] = child.list[1].atom;
    node.children.push_back(std::move(meta));
    continue;
} else if (chead == "title_block") {
    CleanNode tb; tb.tag = "title_block";
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) continue;
        if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            tb.children.push_back(cleanInner(child.list[j]));
        }
    }
    node.children.push_back(std::move(tb));
    continue;
}

// text wrapper: text content + optional effects/at
else if (chead == "text" || chead == "label") {
    CleanNode txt; txt.tag = chead;
    // first non-struct atom is the text value
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            if (txt.attrs.find("value") == txt.attrs.end()) txt.attrs["value"] = child.list[j].atom;
            else txt.attrs["misc"] += (txt.attrs["misc"].empty() ? "" : " ") + child.list[j].atom;
        } else {
            txt.children.push_back(cleanInner(child.list[j]));
        }
    }
    node.children.push_back(std::move(txt));
    continue;
}
// --- xy: normalize coordinates into attrs and pts vector
else if (chead == "xy") {
    CleanNode xy; xy.tag = "xy";
    // Try canonical (xy X Y)
    if (child.list.size() >= 3 && child.list[1].is_atom && child.list[2].is_atom) {
        xy.attrs["x"] = child.list[1].atom;
        xy.attrs["y"] = child.list[2].atom;
        try {
            double X = parseNumber(xy.attrs["x"]);
            double Y = parseNumber(xy.attrs["y"]);
            xy.pts.push_back(Point{X,Y});
        } catch (...) {}
    } else if (child.list.size() >= 2 && child.list[1].is_atom) {
        // maybe (xy "X Y") or (xy "X,Y")
        xy.attrs["value"] = child.list[1].atom;
        std::string v = child.list[1].atom;
        std::replace(v.begin(), v.end(), ',', ' ');
        std::istringstream iss(v);
        double X, Y;
        if (iss >> X >> Y) {
            xy.attrs["x"] = std::to_string(X);
            xy.attrs["y"] = std::to_string(Y);
            xy.pts.push_back(Point{X,Y});
        }
    }
    node.children.push_back(std::move(xy));
    continue;
}
// --- pts: collect xy children into node.pts and push a pts child
else if (chead == "pts") {
    CleanNode p; p.tag = "pts";
    // prefer helper
    auto pts = tryExtractPts(child);
    if (!pts.empty()) {
        p.pts.insert(p.pts.end(), pts.begin(), pts.end());
    } else {
        // fallback: scan nested children for xy-like lists
        for (size_t j = 1; j < child.list.size(); ++j) {
            const SExpr &sub = child.list[j];
            if (sub.is_atom) continue;
            auto maybe = tryExtractXY(sub);
            if (maybe) p.pts.push_back(*maybe);
            else {
                // also check nested elements inside sub
                for (size_t k = 0; k < sub.list.size(); ++k) {
                    if (!sub.list[k].is_atom) {
                        auto nested = tryExtractXY(sub.list[k]);
                        if (nested) { p.pts.push_back(*nested); break; }
                    }
                }
            }
        }
    }
    node.children.push_back(std::move(p));
    continue;
}



// start/end/center/radius -> scalar coordinates or numeric values
else if (chead == "start" || chead == "end" || chead == "center" || chead == "radius") {
    CleanNode leaf; leaf.tag = chead;
    // join subsequent atoms as numeric string
    ostringstream v;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) v << (j>1 ? " " : "") << child.list[j].atom;
    }
    if (!v.str().empty()) leaf.attrs["value"] = v.str();
    node.children.push_back(std::move(leaf));
    continue;
}

// stroke / width / thickness -> numeric/descriptor wrappers
else if (chead == "stroke" || chead == "width" || chead == "thickness") {
    CleanNode s; s.tag = chead;
    // capture immediate numeric atom(s) or nested items
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            s.attrs["value"] = child.list[j].atom;
        } else if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            // e.g., (width 0.254000)
            string subh = child.list[j].list[0].atom;
            if (child.list[j].list.size()>=2 && child.list[j].list[1].is_atom)
                s.attrs["sub_"+subh] = child.list[j].list[1].atom;
        }
    }
    node.children.push_back(std::move(s));
    continue;
}

// fill already had an earlier handler; handle type/color again defensively
else if (chead == "type" || chead == "color" || chead == "fill") {
    CleanNode f; f.tag = chead;
    if (child.list.size() >= 2 && child.list[1].is_atom) f.attrs["value"] = child.list[1].atom;
    node.children.push_back(std::move(f));
    continue;
}
// --- ast_cleaner.cpp (replace the junction/wire block with this) ---
else if (chead == "junction" || chead == "wire") {
    CleanNode g; g.tag = chead;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            g.attrs["tok_"+std::to_string(j)] = child.list[j].atom;
            continue;
        }
        if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            std::string subh = child.list[j].list[0].atom;
            if (subh == "pts") {
                auto pts = tryExtractPts(child.list[j]);
                if (!pts.empty()) g.pts.insert(g.pts.end(), pts.begin(), pts.end());
                continue;
            } else if (subh == "at") {
                auto atv = tryExtractAt(child.list[j]);
                if (atv) {
                    // Normalize: keep typed 'at' in .at (if type exists) and also keep a raw attrs string
                    g.attrs["at"] = std::to_string(atv->x) + "," + std::to_string(atv->y) + "," + std::to_string(atv->rot);
                    // If CleanNode has an optional 'at' member, set it too (safe to do)
                    g.at = *atv;
                }
                continue;
            } else if (subh == "xy") {
                auto maybe = tryExtractXY(child.list[j]);
                if (maybe) g.pts.push_back(*maybe);
                continue;
            } else if (subh == "color") {
                // extract color tokens into a single space-separated string "r g b a"
                std::string col;
                for (size_t k = 1; k < child.list[j].list.size(); ++k) {
                    if (child.list[j].list[k].is_atom) {
                        if (!col.empty()) col += " ";
                        col += child.list[j].list[k].atom;
                    }
                }
                if (!col.empty()) g.attrs["color"] = col;
                continue;
            } else if (subh == "diameter") {
                // diameter usually has single numeric child
                if (child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom) {
                    g.attrs["diameter"] = child.list[j].list[1].atom;
                }
                continue;
            } else if (subh == "uuid") {
                if (child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom) {
                    g.attrs["uuid"] = child.list[j].list[1].atom;
                }
                continue;
            }
        }
        // fallback: recursively clean
        g.children.push_back(cleanInner(child.list[j]));
    }
    node.children.push_back(std::move(g));
    continue;
}

// generic small wrappers like offset, name, number, length, in case missed
else if (chead == "offset" || chead == "name" || chead == "number" || chead == "length" || chead == "inverted") {
    CleanNode leaf; leaf.tag = chead;
    if (child.list.size() >= 2 && child.list[1].is_atom) leaf.attrs["value"] = child.list[1].atom;
    node.children.push_back(std::move(leaf));
    continue;
}

// effects/font/size/justify -> capture structured attrs
else if (chead == "effects" || chead == "font" || chead == "size" || chead == "justify") {
    CleanNode ef; ef.tag = chead;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) ef.attrs["token_"+to_string(j)] = child.list[j].atom;
        else if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string sh = child.list[j].list[0].atom;
            ostringstream oss; oss << "(" << sh;
            for (size_t k = 1; k < child.list[j].list.size(); ++k)
                oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
            oss << ")";
            ef.attrs["extra_"+sh] = oss.str();
        }
    }
    node.children.push_back(std::move(ef));
    continue;
}

// ----------------- end handlers -----------------

// -------------- end extra handlers --------------

            // --- property: preserve multiplicity as child nodes AND keep a first-property for compatibility ---
            else if (chead == "property") {
                Property prop;
                CleanNode propnode;
                propnode.tag = "property";
                if (child.list.size() >= 2 && child.list[1].is_atom) { prop.key = child.list[1].atom; propnode.attrs["key"] = child.list[1].atom; }
                if (child.list.size() >= 3 && child.list[2].is_atom) { prop.value = child.list[2].atom; propnode.attrs["value"] = child.list[2].atom; }
                for (size_t j = 3; j < child.list.size(); ++j) {
                    const SExpr &sub = child.list[j];
                    if (!sub.is_atom && !sub.list.empty() && sub.list[0].is_atom) {
                        string shead = sub.list[0].atom;
                        ostringstream oss; oss << "(" << shead;
                        for (size_t k = 1; k < sub.list.size(); ++k)
                            oss << (sub.list[k].is_atom ? " " + sub.list[k].atom : " <list>");
                        oss << ")";
                        // put extras under attr key "extra_<shead>"
                        prop.extras[shead] = oss.str();
                        propnode.attrs[string("extra_") + shead] = oss.str();
                    }
                }
                // compatibility: set node.property if empty (keep older code working)
                if (!node.property) node.property = prop;
                node.children.push_back(std::move(propnode));
                continue;
            }

            // --- instances / sheet_instances / instance ---
            else if (chead == "instances" || chead == "sheet_instances") {
                CleanNode insts;
                insts.tag = (chead == "instances") ? "instances" : "sheet_instances";
                for (size_t j = 1; j < child.list.size(); ++j) {
                    const SExpr &inst = child.list[j];
                    if (inst.is_atom) continue;
                    // if it's an instance-like list, either tag == "instance" or arbitrary
                    string ih = (!inst.list.empty() && inst.list[0].is_atom) ? inst.list[0].atom : "";
                    if (ih == "instance" || ih == "sheet_instance" || ih == "path" || ih == "page") {
                        // attempt to extract path/page in a small child node
                        CleanNode ins;
                        ins.tag = (ih.empty() ? "instance" : ih);
                        // if inst looks like (instance (path "...") (page ...)) or (path "...")
                        for (size_t k = 1; k < inst.list.size(); ++k) {
                            if (inst.list[k].is_atom) continue;
                            if (!inst.list[k].list.empty() && inst.list[k].list[0].is_atom) {
                                string subh = inst.list[k].list[0].atom;
                                if (subh == "path" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                                    ins.attrs["path"] = inst.list[k].list[1].atom;
                                } else if (subh == "page" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                                    ins.attrs["page"] = inst.list[k].list[1].atom;
                                } else {
                                    // generic serialization for other sublists
                                    ostringstream oss; oss << "(" << subh;
                                    for (size_t m = 1; m < inst.list[k].list.size(); ++m)
                                        oss << (inst.list[k].list[m].is_atom ? " " + inst.list[k].list[m].atom : " <list>");
                                    oss << ")";
                                    ins.attrs[string("extra_")+subh] = oss.str();
                                }
                            }
                        }
                        insts.children.push_back(std::move(ins));
                    }  else {
                        // fallback: recursively clean whatever the child is
                        insts.children.push_back(cleanInner(inst));
                    }
                }
                node.children.push_back(std::move(insts));
                continue;
            }

            // --- sheet: contains properties, pins, instances, fill, etc. ---
            else if (chead == "sheet") {
                CleanNode sheet;
                sheet.tag = "sheet";
                // iterate inside sheet
                for (size_t j = 1; j < child.list.size(); ++j) {
                    const SExpr &sub = child.list[j];
                    if (sub.is_atom) {
                        // possible sheet name or token
                        if (sheet.attrs.find("value") == sheet.attrs.end()) sheet.attrs["value"] = sub.atom;
                        else sheet.attrs["misc"] += (sheet.attrs["misc"].empty() ? "" : " ") + sub.atom;
                        continue;
                    }
                    if (!sub.list.empty() && sub.list[0].is_atom) {
                        string sh = sub.list[0].atom;
                        if (sh == "property") {
                            CleanNode p; p.tag = "property";
                            if (sub.list.size() >= 2 && sub.list[1].is_atom) p.attrs["key"] = sub.list[1].atom;
                            if (sub.list.size() >= 3 && sub.list[2].is_atom) p.attrs["value"] = sub.list[2].atom;
                            for (size_t m = 3; m < sub.list.size(); ++m) {
                                if (!sub.list[m].is_atom && !sub.list[m].list.empty() && sub.list[m].list[0].is_atom) {
                                    string sx = sub.list[m].list[0].atom;
                                    ostringstream oss; oss << "(" << sx;
                                    for (size_t mm = 1; mm < sub.list[m].list.size(); ++mm)
                                        oss << (sub.list[m].list[mm].is_atom ? " " + sub.list[m].list[mm].atom : " <list>");
                                    oss << ")";
                                    p.attrs["extra_"+sx] = oss.str();
                                }
                            }
                            sheet.children.push_back(std::move(p));
                        } else if (sh == "pin") {
                            // create small pin node
                            CleanNode pin; pin.tag = "pin";
                            // try to parse simple forms (name/number/length/at/inverted)
                            for (size_t m = 1; m < sub.list.size(); ++m) {
                                if (sub.list[m].is_atom) {
                                    if (isIntToken(sub.list[m].atom)) pin.attrs["number"] = sub.list[m].atom;
                                    else if (pin.attrs.find("name") == pin.attrs.end()) pin.attrs["name"] = sub.list[m].atom;
                                } else if (!sub.list[m].list.empty() && sub.list[m].list[0].is_atom) {
                                    string ph = sub.list[m].list[0].atom;
                                    if (ph == "name" && sub.list[m].list.size()>=2 && sub.list[m].list[1].is_atom) pin.attrs["name"] = sub.list[m].list[1].atom;
                                    else if (ph == "number" && sub.list[m].list.size()>=2 && sub.list[m].list[1].is_atom) pin.attrs["number"] = sub.list[m].list[1].atom;
                                    else if (ph == "length" && sub.list[m].list.size()>=2 && sub.list[m].list[1].is_atom) pin.attrs["length"] = sub.list[m].list[1].atom;
                                    else if (ph == "inverted") pin.attrs["inverted"] = "1";
                                    else if (ph == "at") {
                                        auto atv = tryExtractAt(sub.list[m]);
                                        if (atv) pin.attrs["at"] = to_string(atv->x) + "," + to_string(atv->y) + "," + to_string(atv->rot);
                                    } else {
                                        // generic extras
                                        ostringstream oss; oss << "(" << ph;
                                        for (size_t mm = 1; mm < sub.list[m].list.size(); ++mm)
                                            oss << (sub.list[m].list[mm].is_atom ? " " + sub.list[m].list[mm].atom : " <list>");
                                        oss << ")";
                                        pin.attrs["extra_"+ph] = oss.str();
                                    }
                                }
                            }
                            sheet.children.push_back(std::move(pin));
                        } else if (sh == "instances") {
                            // reuse instances logic: cleanInner on this sublist will create instances child if we added logic above,
                            // but to be robust we build instance nodes here similarly:
                            CleanNode insts; insts.tag = "instances";
                            for (size_t m = 1; m < sub.list.size(); ++m) {
                                if (sub.list[m].is_atom) continue;
                                CleanNode ins = cleanInner(sub.list[m]); // re-use recursion
                                insts.children.push_back(std::move(ins));
                            }
                            sheet.children.push_back(std::move(insts));
                        } else if (sh == "fill") {
                            // capture fill color or serialize child
                            if (sub.list.size() >= 2 && !sub.list[1].is_atom && !sub.list[1].list.empty() && sub.list[1].list[0].is_atom && sub.list[1].list[0].atom == "color") {
                                ostringstream oss;
                                for (size_t m = 1; m < sub.list[1].list.size(); ++m) {
                                    if (sub.list[1].list[m].is_atom) {
                                        if (m > 1) oss << ",";
                                        oss << sub.list[1].list[m].atom;
                                    }
                                }
                                sheet.attrs["fill_color"] = oss.str();
                            } else {
                                // generic serialization
                                ostringstream oss; oss << "(" << sh;
                                for (size_t m = 1; m < sub.list.size(); ++m) {
                                    if (sub.list[m].is_atom) oss << " " << sub.list[m].atom;
                                    else oss << " <list>";
                                }
                                oss << ")";
                                sheet.attrs["fill"] = oss.str();
                            }
                        } else {
                            // unknown sheet child -> recursively clean and attach
                            sheet.children.push_back(cleanInner(sub));
                        }
                    }
                }
                node.children.push_back(std::move(sheet));
                continue;
            }

            // --- footprint / fp primitives / model handled as before ---
            else if (chead == "fp_line" || chead == "fp_circle" || chead == "fp_arc" || chead == "fp_text" || chead == "pad") {
                node.children.push_back(handleShapeNode(child, chead));
                continue;
            } else if (chead == "model" || chead == "footprint") {
                CleanNode modelNode;
                modelNode.tag = chead;
                for (size_t j = 1; j < child.list.size(); ++j) {
                    if (!child.list[j].is_atom && !child.list[j].list.empty() && child.list[j].list[0].is_atom) {
                        string key = child.list[j].list[0].atom;
                        ostringstream oss; oss << "(" << key;
                        for (size_t k = 1; k < child.list[j].list.size(); ++k)
                            oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
                        oss << ")";
                        modelNode.attrs[key] = oss.str();
                    }
                }
                node.children.push_back(move(modelNode));
                continue;
            }
            // kicad_sch: top-level schema - keep children and metadata
else if (chead == "kicad_sch") {
    CleanNode sch; sch.tag = "kicad_sch";
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) continue;
        sch.children.push_back(cleanInner(child.list[j]));
    }
    node.children.push_back(std::move(sch));
    continue;
}
// generator: (generator eeschema)
else if (chead == "generator") {
    node.children.push_back(makeSimpleAtomNode("generator", child));
    continue;
}

// in_bom / on_board: usually (in_bom yes) or (on_board yes)
else if (chead == "in_bom" || chead == "on_board") {
    node.children.push_back(makeSimpleAtomNode(chead, child));
    continue;
}

// also handle small bool/meta tokens you frequently see (add more names as needed)
// this single block handles multiple simple metadata heads:
else if (chead == "host" || chead == "uuid" || chead == "paper" || chead == "page" || chead == "title" 
         || chead == "date" || chead == "rev" || chead == "generator") {
    node.children.push_back(makeSimpleAtomNode(chead, child));
    continue;
}

// text (and label): capture textual value + nested formatting (at/effects)
else if (chead == "text" || chead == "label") {
    CleanNode txt; txt.tag = chead;
    for (size_t j = 1; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) {
            if (txt.attrs.find("value") == txt.attrs.end()) txt.attrs["value"] = child.list[j].atom;
            else txt.attrs["misc"] += (txt.attrs["misc"].empty() ? "" : " ") + child.list[j].atom;
        } else {
            txt.children.push_back(cleanInner(child.list[j])); // at/effects etc
        }
    }
    node.children.push_back(std::move(txt));
    continue;
}
// at: position/rotation extraction
else if (chead == "at") {
    CleanNode atn; atn.tag = "at";
    auto atv = tryExtractAt(child); // you already have this helper
    if (atv) atn.attrs["value"] = to_string(atv->x) + "," + to_string(atv->y) + "," + to_string(atv->rot);
    node.children.push_back(std::move(atn));
    continue;
}

// effects/font/size/thickness/justify -> structured attributes
else if (chead == "effects" || chead == "font" || chead == "size" || chead == "thickness" || chead == "justify") {
    CleanNode e; e.tag = chead;
    for (size_t m = 1; m < child.list.size(); ++m) {
        if (child.list[m].is_atom) e.attrs["tok_"+to_string(m)] = child.list[m].atom;
        else if (!child.list[m].list.empty() && child.list[m].list[0].is_atom) {
            string sh = child.list[m].list[0].atom;
            ostringstream oss; oss << "(" << sh;
            for (size_t mm = 1; mm < child.list[m].list.size(); ++mm)
                oss << (child.list[m].list[mm].is_atom ? " " + child.list[m].list[mm].atom : " <list>");
            oss << ")";
            e.attrs["extra_"+sh] = oss.str();
        }
    }
    node.children.push_back(std::move(e));
    continue;
}// ----------------- handle project/path/reference/unit metadata -----------------
else if (chead == "project") {
    CleanNode meta; meta.tag = "project";
    // project usually: (project "name" (path ...))
    if (child.list.size() >= 2 && child.list[1].is_atom) meta.attrs["value"] = child.list[1].atom;
    for (size_t j = 2; j < child.list.size(); ++j) {
        if (child.list[j].is_atom) continue;
        if (!child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string subh = child.list[j].list[0].atom;
            if (subh == "path" && child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom) {
                meta.attrs["path"] = child.list[j].list[1].atom;
                // look for nested reference/unit inside path, if present
                for (size_t k = 2; k < child.list[j].list.size(); ++k) {
                    if (!child.list[j].list[k].is_atom && !child.list[j].list[k].list.empty() && child.list[j].list[k].list[0].is_atom) {
                        string ph = child.list[j].list[k].list[0].atom;
                        if (ph == "reference" && child.list[j].list[k].list.size() >= 2 && child.list[j].list[k].list[1].is_atom)
                            meta.attrs["path_reference"] = child.list[j].list[k].list[1].atom;
                        else if (ph == "unit" && child.list[j].list[k].list.size() >= 2 && child.list[j].list[k].list[1].is_atom)
                            meta.attrs["path_unit"] = child.list[j].list[k].list[1].atom;
                    }
                }
            } else {
                // store other nested things generically
                ostringstream oss; oss << "(" << subh;
                for (size_t k = 1; k < child.list[j].list.size(); ++k)
                    oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
                oss << ")";
                meta.attrs[string("extra_") + subh] = oss.str();
            }
        }
    }
    node.children.push_back(std::move(meta));
    continue;
}
else if (chead == "path") {
    CleanNode pn; pn.tag = "path";
    if (child.list.size() >= 2 && child.list[1].is_atom) pn.attrs["value"] = child.list[1].atom;
    // possible nested reference/unit: (path "..." (reference "#X") (unit 1))
    for (size_t j = 2; j < child.list.size(); ++j) {
        if (!child.list[j].is_atom && !child.list[j].list.empty() && child.list[j].list[0].is_atom) {
            string subh = child.list[j].list[0].atom;
            if (subh == "reference" && child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom)
                pn.attrs["reference"] = child.list[j].list[1].atom;
            else if (subh == "unit" && child.list[j].list.size() >= 2 && child.list[j].list[1].is_atom)
                pn.attrs["unit"] = child.list[j].list[1].atom;
            else {
                ostringstream oss; oss << "(" << subh;
                for (size_t k = 1; k < child.list[j].list.size(); ++k)
                    oss << (child.list[j].list[k].is_atom ? " " + child.list[j].list[k].atom : " <list>");
                oss << ")";
                pn.attrs[string("extra_") + subh] = oss.str();
            }
        }
    }
    node.children.push_back(std::move(pn));
    continue;
}
else if (chead == "reference" || chead == "unit") {
    CleanNode leaf; leaf.tag = chead;
    if (child.list.size() >= 2 && child.list[1].is_atom) leaf.attrs["value"] = child.list[1].atom;
    node.children.push_back(std::move(leaf));
    continue;
}
// ----------------- end project/path/reference/unit -----------------
else if (chead == "symbol_instances") {
    CleanNode syminsts;
    syminsts.tag = "symbol_instances";

    for (size_t j = 1; j < child.list.size(); ++j) {
        const SExpr &inst = child.list[j];
        if (inst.is_atom) continue;

        // A single symbol_instance node
        if (!inst.list.empty() && inst.list[0].is_atom && inst.list[0].atom == "symbol_instance") {
            CleanNode si;
            si.tag = "symbol_instance";

            PCBDesign::SymbolInstance sym;   // <-- fully qualified

            for (size_t k = 1; k < inst.list.size(); ++k) {
                if (!inst.list[k].list.empty() && inst.list[k].list[0].is_atom) {
                    std::string subh = inst.list[k].list[0].atom;
                    if (subh == "path" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                        sym.path = inst.list[k].list[1].atom;
                        si.attrs["path"] = sym.path;
                    } else if (subh == "reference" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                        sym.reference = inst.list[k].list[1].atom;
                        si.attrs["reference"] = sym.reference;
                    } else if (subh == "unit" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                        sym.unit = inst.list[k].list[1].atom;
                        si.attrs["unit"] = sym.unit;
                    } else if (subh == "value" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                        sym.value = inst.list[k].list[1].atom;
                        si.attrs["value"] = sym.value;
                    } else if (subh == "footprint" && inst.list[k].list.size() >= 2 && inst.list[k].list[1].is_atom) {
                        sym.footprint = inst.list[k].list[1].atom;
                        si.attrs["footprint"] = sym.footprint;
                    } else {
                        // store unknown nested sublists generically
                        ostringstream oss; oss << "(" << subh;
                        for (size_t m = 1; m < inst.list[k].list.size(); ++m)
                            oss << (inst.list[k].list[m].is_atom ? " " + inst.list[k].list[m].atom : " <list>");
                        oss << ")";
                        si.attrs[string("extra_") + subh] = oss.str();
                    }
                }
            }

            // optional debug dump (sym.dump expects ostream)
            sym.dump(std::cerr);

            syminsts.children.push_back(std::move(si));
        } else {
            // fallback: if inst itself is a path-like node or other nested structure
            syminsts.children.push_back(cleanInner(inst));
        }
    }

    node.children.push_back(std::move(syminsts));
    continue;
}

// handle lib_symbols appearing as a child of another node (avoid logging it as "unhandled")
else if (chead == "lib_symbols") {
    // delegate to the recursive cleaner (which already has the early handler),
    // but avoid emitting the [UNHANDLED] log at the parent level.
    node.children.push_back(cleanInner(child));
    continue;
}
// final fallback for unknown chead
else if (chead == "stroke") {
    CleanNode strok; strok.tag = "stroke";
    for (size_t m = 1; m < child.list.size(); ++m) {
        if (child.list[m].is_atom) strok.attrs["tok_"+to_string(m)] = child.list[m].atom;
        else if (!child.list[m].list.empty() && child.list[m].list[0].is_atom) {
            string sh = child.list[m].list[0].atom;
            if (sh == "width" && child.list[m].list.size() >= 2 && child.list[m].list[1].is_atom)
                strok.attrs["width"] = child.list[m].list[1].atom;
            else if (sh == "type" && child.list[m].list.size() >= 2 && child.list[m].list[1].is_atom)
                strok.attrs["type"] = child.list[m].list[1].atom;
            else {
                // generic serial
                ostringstream oss; oss << "(" << sh;
                for (size_t k = 1; k < child.list[m].list.size(); ++k)
                    oss << (child.list[m].list[k].is_atom ? " " + child.list[m].list[k].atom : " <list>");
                oss << ")";
                strok.attrs["extra_"+sh] = oss.str();
            }
        }
    }
    node.children.push_back(std::move(strok));
    continue;
}
else {
    if (shouldLogUnhandled(chead)) {
        logUnhandled("cleanInner:" + chead, child);
    }
    // recursively clean unknown child so it is preserved
    node.children.push_back(cleanInner(child));
    continue;
}
  }

// ⬇️ keep this fallback at the end of the child loop
CleanNode cleanedChild = cleanInner(child);
if (cleanedChild.tag.empty() && !cleanedChild.attrs.empty()) {
    for (auto &kv : cleanedChild.attrs) {
        if (node.attrs.find(kv.first) == node.attrs.end()) node.attrs[kv.first] = kv.second;
        else node.attrs[kv.first] += " " + kv.second;
    }
} else {
    if (cleanedChild.tag.empty()) {
        logUnhandled("emptyTag:" + head, child);
    }
    node.children.push_back(move(cleanedChild));
}
      
    }

    return node;
}

CleanNode cleanNode(const SExpr& raw) {
    return cleanInner(raw);
}

// --- debug serializer ---
static string pointToStr(const Point &p) {
    ostringstream oss;
    oss << fixed << setprecision(3) << "(" << p.x << "," << p.y << ")";
    return oss.str();
}

string toString(const CleanNode& n) {
    ostringstream oss;
    oss << "<" << n.tag << ">";

    if (n.at) oss << " at=(" << fixed << setprecision(3)
                   << n.at->x << "," << n.at->y << "," << n.at->rot << ")";

    if (!n.pts.empty()) {
        oss << " pts=[";
        for (size_t i = 0; i < n.pts.size(); ++i) {
            if (i) oss << ",";
            oss << fixed << setprecision(3) << "(" << n.pts[i].x << "," << n.pts[i].y << ")";
        }
        oss << "]";
    }

    // print first-property if present
    if (n.property) {
        oss << " property{" << n.property->key << "=" << n.property->value << "}";
    }

    if (!n.attrs.empty()) {
        vector<string> keys;
        for (auto &kv : n.attrs) keys.push_back(kv.first);
        sort(keys.begin(), keys.end());
        oss << " attrs{";
        for (auto &k : keys) oss << k << ":" << n.attrs.at(k) << " ";
        oss << "}";
    }

    for (auto &c : n.children) oss << "\n  " << toString(c);
    return oss.str();
}

} // namespace ast_cleaner
