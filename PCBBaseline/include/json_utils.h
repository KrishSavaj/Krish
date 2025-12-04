#pragma once

#include "nlohmann/json.hpp" // Required for nlohmann::json
#include <string>
#include <vector>
#include "PCBComponent.h"


// Namespace for JSON utility functions
namespace JsonManager {

// Loads component data from a JSON file into a vector of Component structs.
void loadComponentsFromJson(const std::string& filename, std::vector<PCBDesign::PCBComponent>& components);

// Saves routed segments and component data to a JSON file.
class JsonExporter {
public:
    static void saveSegmentsToJson(
        const std::string& filename,
        const std::vector<nlohmann::json>& segments,
        const std::vector<PCBDesign::PCBComponent>& components
    );
};

} // namespace JsonManager

