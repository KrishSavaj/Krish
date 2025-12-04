#include "GerberObj.h"
#include "GerberImporter.h"
#include "AComponent.h"
#include "FundamentalShape.h"
#include <regex>
#include <memory>
#include "../../clean_code/Parser.h"
#include <iostream>

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
        // Create a shared_ptr<Outline>
        auto outlineShapePtr = std::make_shared<Outline>(outlinePoints);

        // Create a PCBComponent to hold the outline
        int outlineId = nextComponentId++;
        PCBComponent outlineComp(
            outlineId,
            "BoardOutline" + std::to_string(outlineId)
        );

        // Add the shape pointer into the component
        outlineComp.addShape(outlineShapePtr);

        // Add the component (with its shape) to the board
        board.addComponent(outlineComp);
    }

}

} // namespace PCBDesign

