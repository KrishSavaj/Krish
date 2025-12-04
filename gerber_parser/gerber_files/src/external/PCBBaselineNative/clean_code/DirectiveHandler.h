#pragma once
#include <string>
#include <vector>
#include "GerberDirective.h"  // Contains GerberDirective struct and enum definitions

class DirectiveHandler {
public:
    // Static utility function to clean a line
    static std::string cleanLine(const std::string& line);

    // Main entry point to process a directive line.
    // Deep parses the directive and stores it in a structured format.
    void processDirective(std::string line);
    
    // (Optional) A function to split the parameters by a delimiter (e.g., comma)
    static std::vector<std::string> splitParameters(const std::string& params, char delimiter = ',');

    // New: Print all stored (deep parsed) directives (serialized output)
    void printDirectives() const;

    // Getter: Return the parsed directives (for further validation, if needed)
    const std::vector<GerberDirective>& getParsedDirectives() const;

private:
    // Helper methods to handle specific directive types
    void handleFS(const std::string& line);
    void handleMO(const std::string& line);
    void handleMI(const std::string& line);
    void handleOF(const std::string& line);
    void handleSF(const std::string& line);
    void handleAS(const std::string& line);

    // This vector stores the deep-parsed directives.
    std::vector<GerberDirective> parsedDirectives;

    // Legacy member variables (if you wish to keep a “flattened” version for logging)
    std::string units;
    std::string format;
    std::string mirror;
    std::string offset;
    std::string scaleFactor;
    std::string axisSelect;
};
















