#pragma once
#include <string>
#include <vector>
#include <map>
#include <optional>
#include"sexpr.hpp"

namespace ast_cleaner {

// --- Unified SExpr representation (input to the cleaner) ---
struct SExpr {
    bool is_atom = false;
    std::string atom;
    std::vector<SExpr> list;
};

// --- Basic geometric types ---
struct Point { double x; double y; };
struct At { double x; double y; double rot; };

// --- Property node (keeps extra serialized bits) ---
struct Property {
    std::string key;
    std::string value;
    std::map<std::string, std::string> extras; // e.g., effects, (at ...) snippets, etc.
};

// --- Cleaned AST node produced by cleanNode() ---
struct CleanNode {
    std::string tag;                           // the head token, e.g. "wire", "pad", "fp_line", "property", "sheet", ...
    std::map<std::string, std::string> attrs;  // generic attributes (name, value, stroke, fill, extra_..., net_num, ...)
    std::optional<At> at;                      // optional (at x y rot)
    std::vector<Point> pts;                    // optional points extracted from (pts (xy ...) ...)
    std::optional<Property> property;          // first property encountered (kept for backward compatibility)
    std::vector<CleanNode> children;           // nested nodes (instances, properties, fp primitives, sheet children, ...)
};

// --- Public API ---
// Convert a parsed SExpr tree into a normalized CleanNode tree.
CleanNode cleanNode(const SExpr& raw);

// Simple token tests (used by cleaner and callers)
bool isIntToken(const std::string& s);
bool isFloatToken(const std::string& s);

// Human-readable debug serializer for CleanNode
std::string toString(const CleanNode& n);
// Convert from sexpr::Node* to ast_cleaner::SExpr
SExpr sexprNodeToSExpr(sexpr::Node* n);

} // namespace ast_cleaner
