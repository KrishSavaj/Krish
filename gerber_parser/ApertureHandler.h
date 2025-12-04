
#pragma once

#include <string>
#include <vector>
#include "GerberAperture.h"  // Contains GerberAperture struct and ApertureType enum

// The ApertureHandler is responsible for parsing and storing aperture definitions
// (%AD...% for aperture descriptions, %AM...% for aperture macros), and re-serializing them.
class ApertureHandler {
public:
    // Clean a raw aperture line by removing leading/trailing '%', '*', and whitespace
    static std::string cleanLine(const std::string& line);

    // Split the parameter string on a delimiter (comma by default)
    static std::vector<std::string> splitParameters(const std::string& params, char delimiter = ',');

    // Process a raw aperture line (wrapped or unwrapped), deep-parse it, and store it
    //void processAperture(std::vector<std::string>& lines, size_t& index);
    void processAperture(std::string rawLine);
    void processMacro(const std::string& name, const std::vector<std::string>& lines, const std::string& rawBlock);


    // Print all stored aperture definitions in their serialized form
    void printApertures() const;

    // Accessor for the parsed apertures vector
    const std::vector<GerberAperture>& getParsedApertures() const;

private:
    // Handlers for specific aperture types
    void handleAD(const std::string& content);  // Aperture Description
    void handleAM(const std::string& content);  // Aperture Macro

    // Storage for all deep-parsed apertures
    std::vector<GerberAperture> parsedApertures;
};
