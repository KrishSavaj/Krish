#include "ml_ga_net_ordering.h"
#include <cstdlib>
#include <fstream>
#include <iostream>
#include "nlohmann/json.hpp"

using json = nlohmann::json;

MLGANetOrdering::MLGANetOrdering(const std::string& pyScriptPath, const std::string& kicadFile)
    : scriptPath_(pyScriptPath), kicadFile_(kicadFile) {}

std::vector<std::string> MLGANetOrdering::orderNets(
    const std::unordered_map<std::string, std::vector<GridPoint>>& net_pin_map,
    const std::vector<PCBDesign::PCBComponent>& components
) const {
    std::string modelFile = "results/net_cost_model.pkl";

    // Temporary file where Python will dump net order
    const std::string outputFile = "data_files/best_net_order.json";

    // Construct command
    std::string cmd = "python3 " + scriptPath_ + " " + kicadFile_ + " " + modelFile + " " + outputFile;

    std::cout << "Running ML + GA optimizer: " << cmd << std::endl;

    // Run Python GA optimizer
    int ret = std::system(cmd.c_str());
    if (ret != 0) {
        std::cerr << "Error: GA optimizer script failed." << std::endl;
        return {}; // fallback empty
    }

    // Read JSON output
    std::ifstream f(outputFile);
    if (!f.is_open()) {
        std::cerr << "Error: cannot open " << outputFile << std::endl;
        return {};
    }

    json j;
    f >> j;
    std::vector<std::string> net_order;
    try {
        net_order = j.at("net_order").get<std::vector<std::string>>();
        std::cout << "Loaded net order from GA optimizer (" << net_order.size() << " nets)." << std::endl;
    } catch (...) {
        std::cerr << "Invalid JSON structure in net order file." << std::endl;
    }

    return net_order;
}
