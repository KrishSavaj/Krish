#include "LayerHandler.h"
#include "GerberLayer.h"
#include <sstream>
#include <iostream>
#include <algorithm>
#include <cctype>

// Generalized cleanLine() that removes leading/trailing '%', '*', whitespace and newline characters.
std::string LayerHandler::cleanLine(const std::string& line) {
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
std::vector<std::string> LayerHandler::splitParameters(const std::string& params, char delimiter) {
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

void LayerHandler::processLayer(std::string line) {
    line = cleanLine(line);
    //std::cout << "Cleaned line: [" << line << "]" << std::endl;

    // Step 2: Remove a leading '%' if it still exists
    if (!line.empty() && line.front() == '%') {
        line.erase(0, 1);
        std::cout << "Removed extra '%', line now: [" << line << "]" << std::endl;
    }

    // Step 3: Defensive check – must have at least 2 characters for the directive key.
    if (line.length() < 2) {
        std::cout << "[Warning] Skipping short line." << std::endl;
        return;
    }

    // Step 4: Parse the directive type and parameters.
    std::string typeStr = line.substr(0, 2);
    GerberLayer layer;
    layer.type = stringToLayerType(typeStr);
    layer.params = line.substr(2);

    // Print only if the directive is known
    if (layer.type != LayerType::Unknown) {
    std::cout << "Parsed layer: type=[" << layerTypeToString(layer.type)
              << "] params=[" << layer.params << "]\n";
    }

    // Step 6: Store the parsed directive.
    parsedLayers.push_back(layer);

    // Step 7: Call specialized handlers if needed.
    if (layer.type == LayerType::KO)
        handleKO(line);
    else if (layer.type == LayerType::LN)
        handleLN(line);
    else if (layer.type == LayerType::LP)
        handleLP(line);
    else if (layer.type == LayerType::SR)
        handleSR(line);
    
}

const std::vector<GerberLayer>& LayerHandler::getParsedLayers() const {
    return parsedLayers;
}

void LayerHandler::printLayers() const {
    std::cout << "=== Layer Values (Re-serialized) ===\n";
    for (const auto& ap : parsedLayers) {
        // re-serialize everything in the order they were parsed
        std::cout << ap.serialize() << std::endl;
    }
}

void LayerHandler::handleKO(const std::string& line) {
    std::string params = line.substr(2);
    std::cout << "  [KO Info] Knockout Params: " << params << "\n";
    // Optional: parse and store params (e.g., C/D, X/Y/I/J/K values)
}

void LayerHandler::handleLN(const std::string& line) {
    std::string layerName = line.substr(2);
    std::cout << "  [LN Info] Layer Name: " << layerName << "\n";
    // Optional: this->layerName = layerName;
}

void LayerHandler::handleLP(const std::string& line) {
    char polarity = line[2];
    std::cout << "  [LP Info] Layer Polarity: " << (polarity == 'C' ? "Clear" : "Dark") << "\n";
    // Optional: this->layerPolarity = polarity;
}

void LayerHandler::handleSR(const std::string& line) {
    std::string params = line.substr(2);
    std::cout << "  [SR Info] Step and Repeat Params: " << params << "\n";

    // Optional: parse and store X, Y, I, J values
}
