#pragma once

#include <string>
#include <vector>
#include "GerberLayer.h"  // Contains GerberAperture struct and ApertureType enum

// The ApertureHandler is responsible for parsing and storing aperture definitions
// (%AD...% for aperture descriptions, %AM...% for aperture macros), and re-serializing them.
class LayerHandler {
public:
    // Clean a raw aperture line by removing leading/trailing '%', '*', and whitespace
    static std::string cleanLine(const std::string& line);

    // Split the parameter string on a delimiter (comma by default)
    static std::vector<std::string> splitParameters(const std::string& params, char delimiter = ',');

    // Process a raw aperture line (wrapped or unwrapped), deep-parse it, and store it
    void processLayer(std::string line);

    // Print all stored aperture definitions in their serialized form
    void printLayers() const;

    // Accessor for the parsed apertures vector
    const std::vector<GerberLayer>& getParsedLayers() const;

private:
    // Handlers for specific aperture types
    void handleKO(const std::string& line);
    void handleLN(const std::string& line);
    void handleLP(const std::string& line);
    void handleSR(const std::string& line);

    // Storage for all deep-parsed apertures
    std::vector<GerberLayer> parsedLayers;
};