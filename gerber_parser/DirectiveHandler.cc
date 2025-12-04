#include "DirectiveHandler.h"
#include "GerberDirective.h"
#include <sstream>
#include <iostream>
#include <algorithm>
#include <cctype>

// Generalized cleanLine() that removes leading/trailing '%', '*', whitespace and newline characters.
std::string DirectiveHandler::cleanLine(const std::string& line) {
    std::string lineCopy = line;

    // Remove leading '%' and whitespace/newlines
    while (!lineCopy.empty() && (lineCopy.front() == '%' ||
                                 lineCopy.front() == '\r' ||
                                 lineCopy.front() == '\n' ||
                                 std::isspace(lineCopy.front()))) {
        lineCopy.erase(0, 1);
    }

    // Remove trailing '*' and '%' and whitespace/newlines
    while (!lineCopy.empty() && (lineCopy.back() == '*' ||
                                 lineCopy.back() == '%' ||
                                 lineCopy.back() == '\r' ||
                                 lineCopy.back() == '\n' ||
                                 std::isspace(lineCopy.back()))) {
        lineCopy.pop_back();
    }

    return lineCopy;
}

// Helper: Splits a parameter string using the given delimiter.
std::vector<std::string> DirectiveHandler::splitParameters(const std::string& params, char delimiter) {
    std::vector<std::string> tokens;
    std::istringstream iss(params);
    std::string token;
    while (std::getline(iss, token, delimiter)) {
        // Remove leading/trailing whitespace from token
        token.erase(token.begin(), std::find_if(token.begin(), token.end(), [](unsigned char ch) {
            return !std::isspace(ch);
        }));
        token.erase(std::find_if(token.rbegin(), token.rend(), [](unsigned char ch) {
            return !std::isspace(ch);
        }).base(), token.end());
        if (!token.empty())
            tokens.push_back(token);
    }
    return tokens;
}

void DirectiveHandler::processDirective(std::string line) {
    // Step 0: Save the original line before cleaning for accurate serialization
    std::string rawLine = line;  // Store the original line to re-serialize later

    // Step 1: Clean the line (remove leading/trailing symbols and whitespace)
    line = cleanLine(line);
    // std::cout << "Cleaned line: [" << line << "]" << std::endl;

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

    // Step 4: Extract key and parameters
    std::string key = line.substr(0, 2);  // Extract the directive type (first 2 characters)
    std::string params = line.substr(2);  // Extract the parameters (remaining string)
    DirectiveType type = stringToDirectiveType(key);  // Convert key to DirectiveType

    // Step 5: Build and store the parsed directive
    GerberDirective directive(type, params, rawLine);  // Use rawLine for accurate serialization
    parsedDirectives.push_back(directive);  // Store it in the parsedDirectives vector

    // Step 6: Print only if the directive type is known
    if (directive.type != DirectiveType::Unknown) {
        std::cout << "Parsed directive: type=[" << directiveTypeToString(directive.type)
                  << "] params=[" << directive.params << "]\n";
    }

    // Step 7: Call specialized handlers if needed
    if (directive.type == DirectiveType::FS)
        handleFS(line);
    else if (directive.type == DirectiveType::MO)
        handleMO(line);
    else if (directive.type == DirectiveType::MI)
        handleMI(line);
    else if (directive.type == DirectiveType::OF)
        handleOF(line);
    else if (directive.type == DirectiveType::SF)
        handleSF(line);
    else if (directive.type == DirectiveType::AS)
        handleAS(line);
}

void DirectiveHandler::printDirectives() const {
    std::cout << "=== Directive Values (Re-serialized) ===\n";
    for (const auto& d : parsedDirectives) {
        switch (d.type) {
            case DirectiveType::AS:
            case DirectiveType::FS:
            case DirectiveType::MI:
            case DirectiveType::MO:
            case DirectiveType::OF:
            case DirectiveType::SF:
                std::cout << d.serialize() << "\n";
                break;
            default:
                // skip everything else
                break;
        }
    }
}


const std::vector<GerberDirective>& DirectiveHandler::getParsedDirectives() const {
    return parsedDirectives;
}

// --- Existing Handlers ---

void DirectiveHandler::handleFS(const std::string& line) {
    format = line;
    if (line.length() >= 8 && line[0] == 'F' && line[1] == 'S') {
        char zeroOmission = line[2];
        char coordNotation = line[3];
        char xInt = line[5];
        char xDec = line[6];
        char yInt = line[8];
        char yDec = line[9];
        std::cout << "  [FS Info] Zero Omission: " << zeroOmission << "\n";
        std::cout << "  [FS Info] Coordinate Notation: " << coordNotation << "\n";
        std::cout << "  [FS Info] X Format: " << xInt << "." << xDec << "\n";
        std::cout << "  [FS Info] Y Format: " << yInt << "." << yDec << "\n";
    } else {
        std::cout << "  [FS Info] Invalid FS directive format.\n";
    }
}

void DirectiveHandler::handleMO(const std::string& line) {
    units = line;
    std::string unit = line.substr(2);
    std::cout << "  [MO Info] Unit: " << (unit == "MM" ? "Metric" : "Inch") << "\n";
}

void DirectiveHandler::handleMI(const std::string& line) {
    mirror = line;
    char mirrorX = line[2];
    char mirrorY = line[4];
    std::cout << "  [MI Info] Mirror X: " << (mirrorX == '1' ? "Yes" : "No") << "\n";
    std::cout << "  [MI Info] Mirror Y: " << (mirrorY == '1' ? "Yes" : "No") << "\n";
}

void DirectiveHandler::handleOF(const std::string& line) {
    offset = line;
    std::string params = line.substr(2);
    std::cout << "  [OF Info] Offset Params: " << params << "\n";
}

void DirectiveHandler::handleSF(const std::string& line) {
    scaleFactor = line;
    std::string params = line.substr(2);
    std::cout << "  [SF Info] Scale Factor Params: " << params << "\n";
}

void DirectiveHandler::handleAS(const std::string& line) {
    axisSelect = line;
    char axisX = line[2];
    char axisY = line[4];
    std::cout << "  [AS Info] Axis Swap X: " << (axisX == '1' ? "Yes" : "No") << "\n";
    std::cout << "  [AS Info] Axis Swap Y: " << (axisY == '1' ? "Yes" : "No") << "\n";
}


















