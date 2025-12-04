#pragma once

#include <string>
#include <unordered_map>
#include <iostream>
#include <vector>
#include "GerberImage.h"  // Contains the GerberDirective struct and enum definitions
using namespace std;

class ImageHandler {
public:
    // Static utility function to clean a line
    static std::string cleanLine(const std::string& line);

    // Main entry point to process a directive line.
    // Deep parses the directive and stores it in a structured format.
    void processImage(std::string line);

    // (Optional) A function to split the parameters by a delimiter (e.g., comma)
    static std::vector<std::string> splitParameters(const std::string& params, char delimiter = ',');


    // New: Print all stored (deep parsed) directives (serialized output)
    void printImages() const;

    // New: Return a constant reference to the vector of parsed directives.
    const std::vector<GerberImage>& getParsedImages() const;

private:
    // Helper methods to handle specific directive types for logging or further parsing.
    
    void handleIF(const std::string& line);
    void handleIJ(const std::string& line);
    void handleIN(const std::string& line);
    void handleIO(const std::string& line);
    void handleIP(const std::string& line);
    void handleIR(const std::string& line);

    // Legacy member variables to store directive values (if still needed for logging)

    std::string imageFileName;     // From %IF<filename.ext>*%
    std::string imageJustify;      // From %IJ...*%
    std::string imageName;         // From %IN<character string>*%
    std::string imageOffset;       // From %IOA<±n>B<±n>*%
    std::string imagePolarity;     // From %IPPOS*% or %IPNEG*%
    std::string imageRotation;     // From %IR90*%, %IR180*%, etc.

    // New: A vector to store all deep-parsed directives
    std::vector<GerberImage> parsedImages;
};

