// #include "GerberImporter.h"

// void importGerber(const std::string& filename, BaselineBoard& board) {
//     Parser parser;
//     parser.parseFile(filename);

//     for (auto& obj : parser.allObjects) {
//         switch (obj->getObjType()) {
//             case ObjType::Draw:
//             case ObjType::Move:
//                 // TODO: Convert to FundamentalShape
//                 break;
//             case ObjType::Flash:
//                 // TODO: Convert to AComponent
//                 break;
//             default:
//                 break;
//         }
//     }
// }
// #include "GerberImporter.h"

// namespace PCBDesign {

// void importGerber(const std::string& filename, BaselineBoard &board) {
//     Parser parser;
//     parser.parseFile(filename);

//     for (auto &obj : parser.getAllObjects()) {
//         switch (obj->getObjType()) {
//             case ObjType::Draw:
//             case ObjType::Move:
//                 // TODO: convert obj → FundamentalShape and board.addComponent(...)
//                 break;
//             case ObjType::Flash:
//                 // TODO: convert obj → AComponent and board.addComponent(...)
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// } // namespace PCBDesign#include "GerberImporter.h"
#include "GerberImporter.h"
#include "AComponent.h"
#include "FundamentalShape.h"
#include <regex>
#include <memory>

namespace PCBDesign {

void importGerber(const std::string& filename, BaselineBoard& board) {
    // 1) Extract board outline dimensions
    board.extractDimensionsFromGerber(filename);

    // 2) Parse the Gerber file
    Parser parser;
    parser.parseFile(filename);

    // 3) Collect draw/move commands and flashes into board components
    std::vector<Point> outlinePoints;
    int nextComponentId = 1;

    for (const auto& objPtr : parser.getAllObjects()) {
        switch (objPtr->getObjType()) {
            case ObjType::Flash: {
                // Convert a flash into an AComponent with a unique ID and name
                auto flash = std::static_pointer_cast<Flash>(objPtr);
                int compId = nextComponentId++;
                AComponent comp(
                    compId,                                      // unique ID
                    "Flash" + std::to_string(compId),          // name
                    0,                                           // activeID (default)
                    flash->getX() / 1e6,                        // micron → mm
                    flash->getY() / 1e6,
                    0.0                                          // angle
                );
                board.addComponent(comp);
                break;
            }

            case ObjType::Draw:
            case ObjType::Move: {
                // Pull raw X/Y from the command and add to outline
                std::smatch m;
                static const std::regex coordRe(R"(X(-?\d+)Y(-?\d+))");
                if (std::regex_search(objPtr->rawLine, m, coordRe)) {
                    double x = std::stod(m[1]) / 1e6;
                    double y = std::stod(m[2]) / 1e6;
                    outlinePoints.emplace_back(x, y);
                }
                break;
            }

            default:
                // skip other object types
                break;
        }
    }

    // 4) If we collected any outline points, wrap them in an Outline shape
    if (!outlinePoints.empty()) {
        Outline outlineShape(outlinePoints);
        int outlineId = nextComponentId++;
        PCBComponent outlineComp(
            outlineId,
            "BoardOutline" + std::to_string(outlineId)
        );
        outlineComp.addShape(outlineShape);
        board.addComponent(outlineComp);
    }
}

} // namespace PCBDesign

