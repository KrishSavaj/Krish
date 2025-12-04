#pragma once
#include "net_ordering_strategy.h"
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>

class GNNNetOrdering : public NetOrderingStrategy {
private:
    std::string optimizerScript;  // path to gnn_optimizer.py
    std::string pcbFile;          // .kicad_pcb file
    std::string outputDir;        // path where JSON results are saved
    bool useGA;

public:
    GNNNetOrdering(const std::string& script,
                   const std::string& pcbFilePath,
                   const std::string& output = "results/orderings_json",
                   bool useGA = true)
        : optimizerScript(script),
          pcbFile(pcbFilePath),
          outputDir(output),
          useGA(useGA) {}

    std::vector<std::string> orderNets(
        const std::unordered_map<std::string, std::vector<GridPoint>>&,
        const std::vector<PCBDesign::PCBComponent>&) const override
    {
        std::cout << "Running GNN-based net ordering...\n";

        // Step 1: Run Python optimizer
        std::string command = "python3 " + optimizerScript +
                              " --pcb \"" + pcbFile + "\"" +
                              (useGA ? " --use_ga" : "") +
                              " > /tmp/gnn_ordering.log 2>&1";

        int ret = std::system(command.c_str());
        if (ret != 0) {
            std::cerr << "Error: Python GNN optimizer failed. Check /tmp/gnn_ordering.log\n";
            return {};
        }

        // Step 2: Find JSON output
        std::string jsonPath = outputDir + "/" +
                               pcbFile.substr(pcbFile.find_last_of("/\\") + 1);
        jsonPath.replace(jsonPath.find(".kicad_pcb"), 10, "_ordering.json");

        std::ifstream jf(jsonPath);
        if (!jf.is_open()) {
            std::cerr << "Error: Could not open GNN output JSON: " << jsonPath << "\n";
            return {};
        }

        // Step 3: Parse optimized net order
        nlohmann::json j;
        jf >> j;
        std::vector<std::string> orderedNets;
        try {
            for (auto& entry : j.at("optimized_order"))
                orderedNets.push_back(entry.at("net").get<std::string>());
        } catch (...) {
            std::cerr << "Warning: malformed JSON in " << jsonPath << "\n";
        }

        std::cout << "GNN returned " << orderedNets.size() << " nets in optimized order.\n";
        return orderedNets;
    }
};
