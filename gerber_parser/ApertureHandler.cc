
#include "GerberAperture.h"
#include <sstream>
#include <iostream>
#include <algorithm>
#include <cctype>
#include"ApertureHandler.h"

// Generalized cleanLine() that removes leading/trailing '%', '*', whitespace and newline characters.
std::string ApertureHandler::cleanLine(const std::string& line) {
    std::string copy = line;
    // strip leading '%', whitespace, newlines
    while (!copy.empty() && (copy.front() == '%' || std::isspace(static_cast<unsigned char>(copy.front())))) {
        copy.erase(0,1);
    }
    // strip trailing '*', '%', whitespace, newlines
    while (!copy.empty() && (copy.back() == '*' || copy.back() == '%' || std::isspace(static_cast<unsigned char>(copy.back())))) {
        copy.pop_back();
    }
    return copy;
}

// Helper to split comma-delimited parameters
std::vector<std::string> ApertureHandler::splitParameters(const std::string& params, char delimiter) {
    std::vector<std::string> tokens;
    std::istringstream iss(params);
    std::string token;
    while (std::getline(iss, token, delimiter)) {
        // trim whitespace
        token.erase(token.begin(), std::find_if(token.begin(), token.end(), [](unsigned char ch){ return !std::isspace(ch); }));
        token.erase(std::find_if(token.rbegin(), token.rend(), [](unsigned char ch){ return !std::isspace(ch); }).base(), token.end());
        if (!token.empty()) tokens.push_back(token);
    }
    return tokens;
}

void ApertureHandler::processAperture(std::string rawLine) {
    std::cout << "[Raw Aperture] " << rawLine << std::endl;

    // Step 1: clean and strip wrappers
    std::string content = cleanLine(rawLine);
    if (!content.empty() && content.front() == '%')
        content.erase(0,1);

    if (content.size() < 2) {
        std::cerr << "[Warning] Skipping short aperture line." << std::endl;
        return;
    }

    // Step 2: extract key and params
    std::string key = content.substr(0,2);
    std::string params = content.substr(2);
    ApertureType type = stringToApertureType(key);

    // Build and store
    GerberAperture ap(type, params, rawLine);
    parsedApertures.push_back(ap);

    // Debug print
    if (type != ApertureType::Unknown) {
        std::cout << "Parsed aperture: type=[" << apertureTypeToString(type)
                  << "] params=[" << params << "]" << std::endl;
    }

    // Step 3: optional detailed info
    auto toks = splitParameters(params, ',');
    if (type == ApertureType::AD) {
        std::cout << "  [AD Info] " << toks.size() << " token(s): ";
        for (auto& t: toks) std::cout << t << " ";
        std::cout << std::endl;
    } else if (type == ApertureType::AM) {
        std::cout << "  [AM Macro] name=" << (toks.empty()?"":toks[0]) << std::endl;
    }
}

void ApertureHandler::printApertures() const {
    std::cout << "=== Aperture Values (Re-serialized) ===" << std::endl;
    for (const auto& ap : parsedApertures) {
        // re-serialize everything in the order they were parsed
        std::cout << ap.serialize() << std::endl;
    }
}
void ApertureHandler::processMacro(const std::string& name, const std::vector<std::string>& lines, const std::string& rawBlock) {
    // Combine all macro lines into one cleaned string if needed
    std::ostringstream oss;
    for (const auto& line : lines) {
        oss << line << "\n";
    }

    std::string combinedParams = name;  // Start with macro name
    for (size_t i = 1; i < lines.size(); ++i) { // Skip first line (already used as name)
        combinedParams += "\n" + cleanLine(lines[i]);
    }

    GerberAperture ap(ApertureType::AM, combinedParams, rawBlock);
    parsedApertures.push_back(ap);

    std::cout << "Parsed AM Macro: name=[" << name << "] with " << lines.size() << " lines." << std::endl;
}

const std::vector<GerberAperture>& ApertureHandler::getParsedApertures() const {
    return parsedApertures;
}  