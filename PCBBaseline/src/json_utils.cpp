#include "json_utils.h"
#include <fstream>
#include <iostream>

namespace JsonManager {

// Use nlohmann::json within this namespace
using json = nlohmann::json;

void loadComponentsFromJson(const std::string& filename, std::vector<PCBDesign::PCBComponent>& components) {
    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error opening " << filename << std::endl;
        return;
    }
    json j; // Use 'json' alias here
    try {
        file >> j;
        for (const auto& comp_json : j) {

            //Create a PCBComponent instance
            PCBDesign::PCBComponent comp(0, comp_json.at("ref").get<std::string>());

            //Setting basic fields

            comp.setReference(comp_json.at("ref").get<std::string>());
            comp.setValue(comp_json.at("value").get<std::string>());
            comp.setLibID(comp_json.at("footprint").get<std::string>());
            comp.setPosition(
                comp_json.at("x").get<double>(),
                comp_json.at("y").get<double>()
            );

            // Add pins
            for (const auto& pin_json : comp_json.at("pins")) {
                // --- FIX: READ PAD NAME AS STRING TO AVOID stoi/get<int> CRASH ON "S1" ---
                std::string pad_name_str = pin_json.at("pad").get<std::string>();
                int pad_num = 0;
                try {
                    // Only try to convert to int if it's numeric (e.g., "1", "2")
                    // This is done ONLY if the Pin constructor absolutely requires an int,
                    // but the string 'pad_name_str' must be retained.
                    pad_num = std::stoi(pad_name_str);
                } catch (const std::invalid_argument& e) {
                    // Ignore non-numeric pad names (like "S1") for the Pin's integer ID.
                    // Keep pad_num_int as 0 or simply ignore the conversion.
                    // std::cerr << "Warning: Pin pad '" << pad_name_str << "' is non-numeric, using ID 0.\n";
                } catch (const std::out_of_range& e) {
                     // Handle large numbers if needed
                }

                PCBDesign::Pin pin(
                    pad_num,
                    PCBDesign::PinType::IN_OUT,  // adjust if you want pin type logic
                    pin_json.at("x").get<double>(),
                    pin_json.at("y").get<double>()
                );
                // set net association if needed
                pin.setNetName(pin_json.at("net").get<std::string>());

                comp.addPin(pin);
            }

            components.push_back(comp);
        }
    } catch (const json::exception& e) {
        std::cerr << "JSON parsing error in " << filename << ": " << e.what() << std::endl;
    }
}

void JsonExporter::saveSegmentsToJson(
    const std::string& filename,
    const std::vector<json>& segments, // Use 'json' alias here
    const std::vector<PCBDesign::PCBComponent>& components
) {
    json out_json; // Use 'json' alias here
    out_json["segments"] = segments;

    for (const auto& comp : components) {
        json c; // Use 'json' alias here
        c["ref"] = comp.reference();
        c["value"] = comp.value();
        c["footprint"] = comp.getLibID();
        c["x"] = comp.getX();
        c["y"] = comp.getY();

        for (const auto& pin : comp.getPins()) {
            c["pins"].push_back({
                {"pad", std::to_string(pin.getPinNumber())},
                {"net", pin.getNetName()},
                {"x", pin.getPosition().x},
                {"y", pin.getPosition().y}
            });
        }
        out_json["components"].push_back(c);
    }

    std::ofstream out_file(filename);
    if (!out_file.is_open()) {
        std::cerr << "Error: Could not open file for writing: " << filename << std::endl;
        return;
    }
    out_file << out_json.dump(2);
}

} // namespace JsonManager

