// Place this file at:
//   src/external/PCBBaselineNative/PCBBaseline/src/PCBBaselineCLI.cc

#include <iostream>
#include <string>
#include <nlohmann/json.hpp>
#include "GerberImporter.h"
#include "BaselineBoard.h"

using json = nlohmann::json;
using namespace PCBDesign;

int main() {
    std::string line;
    while (std::getline(std::cin, line)) {
        if (line.empty()) continue;
        try {
            auto req = json::parse(line);
            std::string cmd = req.value("cmd", "");
            if (cmd == "importGerber") {
                std::string path = req.at("path");
                BaselineBoard board;
                importGerber(path, board);

                // Serialize board components to JSON
                json out = json::array();
                for (auto &comp : board.getComponents()) {
                    // Each component must implement toJSON(), outputting a json matching TypeScript CanonicalShape
                    out.push_back(comp.toJSON());
                }
                // Send the JSON array as a single line
                std::cout << out.dump() << "\n";
            } else {
                json err = {{"status","error"}, {"message","unknown cmd"}};
                std::cout << err.dump() << "\n";
            }
        } catch (const std::exception &e) {
            json err = {{"status","error"}, {"message", e.what()}};
            std::cout << err.dump() << "\n";
        }
    }
    return 0;
}
