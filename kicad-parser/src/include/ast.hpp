#ifndef AST_HPP
#define AST_HPP

#include "shapes.hpp"
#include "ast_cleaner.hpp"
#include "sexpr.hpp"
#include "PCBObj.h"  // This must come *before* you use PCBObj
#include "AComponent.h"
#include "BaselineBoard.h"
#include "Coordinate.h"
#include "FundamentalShape.h"
#include "Net.h"
#include "PCB.h"
#include "PCBBoard.h"
#include "PCBComponent.h"
#include "Pin.h"
#include "PrintFunctions.h"
#include "Via.h"
#include "Wire.h"
#include "Geomclass.h"
#include <iostream>
#include <string>
#include <cstring>
#include <vector>
#include <map>
#include <unordered_map>
#include <cstdio>
#include <cassert>
#include <stack>
namespace ast_cleaner { struct CleanNode; }
namespace sexpr { struct Node; }
namespace PCBDesign {
  class PCBObj;
   class Shape;
  class BaselineBoard;
  class PCBComponent;
}
namespace PCBDesign {
    ShapePtr convertCleanNodeToShape(const ast_cleaner::CleanNode &node);
}
void printAllShapes();

int generateID();

struct SetupSettings {
    std::optional<double>                    last_trace_width;
    std::optional<double>                    trace_width;
    std::optional<double>                    trace_clearance;
    std::optional<bool>                      zone_45_only;
    std::optional<double>                    zone_clearance;
    std::optional<double>                    trace_min;
    std::optional<double>                    segment_width;
    std::optional<double>                    edge_width;
    std::optional<double>                    via_size;
    std::optional<double>                    via_drill;
    std::optional<double>                    via_min_size;
    std::optional<double>                    via_min_drill;
    std::optional<double>                    uvia_size;
    std::optional<double>                    uvia_drill;
    std::optional<bool>                      uvias_allowed;
    std::optional<double>                    uvia_min_size;
    std::optional<double>                    uvia_min_drill;
    std::optional<std::pair<double,double>>  pad_size;
    std::optional<double>                    pad_drill;
    std::optional<double>                    pad_to_mask_clearance;
    std::optional<std::pair<double,double>>  aux_axis_origin;
    std::optional<std::string>               visible_elements;
    // (pcbplotparams skipped or raw‐capture)
    std::optional<double>                    mod_edge_width;
    std::optional<std::string>               pcbplotparams_raw;
    std::optional<double>                    pcb_text_width;
    std::optional<std::pair<double,double>>  pcb_text_size;
    std::optional<std::pair<double,double>>  mod_text_size;
    std::optional<double>                    mod_text_width;
    std::optional<bool>                      allow_soldermask_bridges;
    std::optional<std::string>               tenting;
    std::optional<std::string>               stackup_raw;
    std::optional<std::pair<double,double>>  grid_origin;
    std::optional<double>                    solder_mask_min_width;
    std::optional<double>                   user_trace_width;  
    std::optional<double>                   pad_to_paste_clearance;
    std::optional<double>                   max_error;
    std::optional<std::string>              defaults_raw;
     std::optional<double>                  clearance_min;
    std::optional<double>                   via_min_annulus;
    std::optional<double>                   through_hole_min;
    



    void print(std::ostream& os) const;
};



struct Setup {
    SetupSettings settings;
    // …
};
void handleProperty(sexpr::Node* propNode,
                    std::shared_ptr<PCBDesign::PCBObj> obj,
                    int /*depth*/);
void handleRectangle(sexpr::Node* rectNode,
                     std::shared_ptr<PCBDesign::PCBObj> obj,
                     int depth);
void handleLine(sexpr::Node* lineNode,
                std::shared_ptr<PCBDesign::PCBObj> obj,
                int depth);
void handlePin(sexpr::Node* pinNode,
               std::shared_ptr<PCBDesign::PCBObj> obj,
               int /*depth*/);
void handlePin(const ast_cleaner::CleanNode &pinNode,
               PCBDesign::PCBComponent* comp,
               int depth);
void handleEmbeddedFonts(sexpr::Node* node, int depth);
void handleText(sexpr::Node* textNode,
                std::shared_ptr<PCBDesign::PCBObj>  obj,
                int /*depth*/);
void handlePower(sexpr::Node* powerNode,
                std::shared_ptr<PCBDesign::PCBObj> obj,
                int depth);
void parseStroke(sexpr::Node* node, int depth, PCBDesign::ParsedShape& shape);
std::string stripQuotes(const std::string& s);
// void handleSymbol(sexpr::Node* symbolNode,
//                   std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
//                   int depth);
// ast.hpp — add these near the top, after any standard includes
// forward-declare sexpr Node (so header doesn't need big includes)


// keep using PCBDesign in headers (matches other declarations like PCBDesign::Shape)


// original public prototype (callers expect this)
void handleSymbol(sexpr::Node* symbolNode,
                  std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
                  int depth);
void handleSymbol(const ast_cleaner::CleanNode &node,
                  PCBDesign::PCBComponent* comp,
                  int depth);

void parseWire(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parsePolyline(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseBusEntry(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseBus(
    sexpr::Node* node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);

void parseSheet(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseLabel(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseVersion(
    sexpr::Node*                                   node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                            depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);

void parseGenerator(
    sexpr::Node*                                   node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                            depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);

void parseRootUUID(
    sexpr::Node*                                   node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                            depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);

void parsePaper(
    sexpr::Node*                                   node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                            depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);

void parseLibSymbols(
    sexpr::Node*                                   node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                            depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);
// in ast.hpp, alongside your other parseX declarations
void parseTitleBlock(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseJunction(
    sexpr::Node* node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>> &stk,
    int depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);

void parseRectangle(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseCircle(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
void parseBusAlias(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
    int                                             depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes
);
static void parseEmbeddedFonts(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int /*depth*/,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& /*shapes*/
);
static void parseNetclassFlag(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int /*depth*/,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& /*shapes*/
);
static void parseRuleArea(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int /*depth*/,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& /*shapes*/
);
static void parseGeneratorVersion(
    sexpr::Node*                                    node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stk,
    int /*depth*/,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& /*shapes*/
);
void parseGlobalLabel(sexpr::Node* node, std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stack, int depth, std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);
void parseImage(sexpr::Node* node,
                std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
                int depth,
                std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);
void parseGeneral(sexpr::Node* node, int depth);
void parseLayers(sexpr::Node* node, int depth);
void parseSetup(sexpr::Node* node, int depth);
void parseNet(sexpr::Node* node, int depth);
void parseNetClass(sexpr::Node* node, int depth);
void parseGrText(sexpr::Node* node, int depth);
// Add these
//void parseLinks(sexpr::Node* node, int depth);
void parseNoConnects(sexpr::Node* node, int depth);
void parseArea(sexpr::Node* node, int depth);
void parseThickness(sexpr::Node* node, int depth);
void parseDrawings(sexpr::Node* node, int depth);
void parseTracks(sexpr::Node* node, int depth);
void parseZones(sexpr::Node* node, int depth);
void parseModules(sexpr::Node* node, int depth);
void parseNets(sexpr::Node* node, int depth);
void parsePage(sexpr::Node* node, int depth);
void parseGenerator(sexpr::Node* node, int depth);
void parseGeneratorVersion(sexpr::Node* node, int depth);
void parsePaper(sexpr::Node* node, int depth);
//void parseFootprint(sexpr::Node* node, int depth);
void parseGrArc(sexpr::Node* node, int depth);
void parseGrPoly(sexpr::Node* node, int depth);
void parseGrCircle(sexpr::Node* node, int depth);
void parseGrRect(sexpr::Node* node, int depth);
void parseGrLine(sexpr::Node* node, int depth);
void parseDimension(sexpr::Node* node, int depth);
void parseSegment(sexpr::Node* node, int depth);
void parseZone(sexpr::Node* node, int depth);
void parseEmbeddedFonts(sexpr::Node* node, int depth);
void parseGrTextBox(sexpr::Node* node, int depth);
void parseVia(sexpr::Node* node, int depth);
void parseArc(sexpr::Node* node, int depth);
void parseGroup(sexpr::Node* node, int depth);
void parseGenerated(sexpr::Node* node, int depth);
// at the bottom of your parseXXX list:
void parseProperty(sexpr::Node* node, int depth);
void parseGrCurve(sexpr::Node* node, int depth);
void parseModule(sexpr::Node* node, int depth);
void parseImage(sexpr::Node* node, int depth);


void parseSimpleShape(sexpr::Node* node, int depth, const std::string& label);
void parseOutlineLine(const std::vector<sexpr::Node*>& inner,
                      PCBDesign::Footprint& fp);
void parsePad(const std::vector<sexpr::Node*>& inner, PCBDesign::Footprint& fp);
void parseFootprint(sexpr::Node* node, int depth);
void parseKicadPcb(
    sexpr::Node* node,
    std::stack<std::shared_ptr<PCBDesign::PCBObj>>& stack,
    int depth,
    std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes);

void traverseAst(sexpr::Node* node,
                 std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
                 int depth,
                 std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes,
                 PCBDesign::BaselineBoard* board = nullptr);

void traverseSubtree(sexpr::Node* node, std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack, int depth, PCBDesign::BaselineBoard* board /* = nullptr */);
// ast.hpp
std::string serializeSExpr(const sexpr::Node* node, int indent);
void reportUnhandled(const std::string& context,
                     const std::string& tag,
                     int depth = 0);

void reportUnhandled(const std::string& context,
                     const std::string& key,
                     const std::string& val,
                     int depth = 0);
void walkSchematicOnce(sexpr::Node* root,
                       std::stack<std::shared_ptr<PCBDesign::PCBObj>>& parse_stack,
                       std::vector<std::shared_ptr<PCBDesign::Shape>>& shapes,
                       PCBDesign::BaselineBoard* board /* = nullptr */);
// void handleSymbolFromClean(const ast_cleaner::CleanNode &clean);
// void handleWireFromClean(const ast_cleaner::CleanNode &clean);
// void handleJunctionFromClean(const ast_cleaner::CleanNode &clean);
// void handleTextFromClean(const ast_cleaner::CleanNode &clean);
void processAst(const ast_cleaner::SExpr &root, PCBDesign::BaselineBoard &baselineBoard);

std::shared_ptr<PCBDesign::BaselineBoard> generateComponents(sexpr::Node* node); 
void getCoordinates(sexpr::Node* node, bool &found, std::vector<float> &coordinates);

void extractFloatsFromNode(sexpr::Node* node, std::vector<float> &output);
void dfsDebugAST(sexpr::Node* node, int depth, int child_index=0);
PCBDesign::Pin getPin(sexpr::Node* node, int depth);
void printNodeRecursive(sexpr::Node* node, int depth);
extern int insideComp, numComponents, subComp;

#endif
