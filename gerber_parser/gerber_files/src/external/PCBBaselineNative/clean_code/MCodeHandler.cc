#include "MCodeHandler.h"
#include <iostream>
#include <sstream>
#include <algorithm>
#include <cctype>
#include <regex>

// Helper function to trim whitespace (and asterisks) from both ends.
void MCodeHandler::trim(std::string& s) {
    // Remove leading whitespace and asterisks.
    s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !std::isspace(ch) && ch != '*';
    }));
    // Remove trailing whitespace and asterisks.
    s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !std::isspace(ch) && ch != '*';
    }).base(), s.end());
}

void MCodeHandler::processMCommand(int mcode, const std::string& params) {
    // Make a local copy so we can modify it.
    std::string modParams = params;
    
    // Trim whitespace and asterisks.
    trim(modParams);
    
    // Optionally remove a leading 'M' if present.
    if(mcode == 1 && !modParams.empty() && modParams.front() == 'M') {
        modParams.erase(0, 1);
        trim(modParams);
    }
    
    // Process based on M-code value.
    switch(mcode) {
        case 0:  // M00: Program Stop
            std::cout << "M00: Program Stop. Params: " << modParams << std::endl;
            break;
        case 1:  // M01: Optional Stop
            std::cout << "M01: Optional Stop. Params: " << modParams << std::endl;
            break;
        case 2:  // M02: End of Program
            std::cout << "M02: End of Program. Params: " << modParams << std::endl;
            break;
        case 3:  // M03: Spindle CW
            std::cout << "M03: Spindle CW. Params: " << modParams << std::endl;
            break;
        case 4:  // M04: Spindle CCW
            std::cout << "M04: Spindle CCW. Params: " << modParams << std::endl;
            break;
        case 5:  // M05: Spindle OFF
            std::cout << "M05: Spindle OFF. Params: " << modParams << std::endl;
            break;
        case 6:  // M06: Tool Change
            std::cout << "M06: Tool Change. Params: " << modParams << std::endl;
            break;
        case 7:  // M07: See ISO/TR 6983-2
            std::cout << "M07: See ISO/TR 6983-2. Params: " << modParams << std::endl;
            break;
        case 8:  // M08: See ISO/TR 6983-2
            std::cout << "M08: See ISO/TR 6983-2. Params: " << modParams << std::endl;
            break;
        case 9:  // M09: See ISO/TR 6983-2
            std::cout << "M09: See ISO/TR 6983-2. Params: " << modParams << std::endl;
            break;
        case 10: // M10: Clamp Workpiece
            std::cout << "M10: Clamp Workpiece. Params: " << modParams << std::endl;
            break;
        case 11: // M11: Unclamp Workpiece
            std::cout << "M11: Unclamp Workpiece. Params: " << modParams << std::endl;
            break;
        // Add additional cases (M12 - M29) if defined.
        case 30: // M30: End of Data
            std::cout << "M30: End of Data. Params: " << modParams << std::endl;
            break;
        case 48: // M48: Cancel M49
            std::cout << "M48: Cancel M49. Params: " << modParams << std::endl;
            break;
        case 49: // M49: Bypass Override
            std::cout << "M49: Bypass Override. Params: " << modParams << std::endl;
            break;
        case 60: // M60: Workpiece Change
            std::cout << "M60: Workpiece Change. Params: " << modParams << std::endl;
            break;
        default:
            std::cerr << "Unsupported or unhandled M-code: M" << mcode << " Params: " << modParams << std::endl;
            break;
    }
}

// New function to process the MI command separately.
void MCodeHandler::processMICommand(const std::string& miParams) {
    // miParams should contain something like "A0B0" or "A0B1"
    std::string params = miParams;
    // Remove trailing '*' if present.
    if (!params.empty() && params.back() == '*') {
        params.pop_back();
    }
    int a_val = -1, b_val = -1;
    size_t posA = params.find('A');
    if (posA != std::string::npos && posA + 1 < params.size()) {
        try {
            a_val = std::stoi(params.substr(posA + 1, 1));
        } catch (const std::invalid_argument& ex) {
            std::cerr << "Error parsing MI A value: " << ex.what() << std::endl;
        }
    }
    size_t posB = params.find('B');
    if (posB != std::string::npos && posB + 1 < params.size()) {
        try {
            b_val = std::stoi(params.substr(posB + 1, 1));
        } catch (const std::invalid_argument& ex) {
            std::cerr << "Error parsing MI B value: " << ex.what() << std::endl;
        }
    }
    std::cout << "MI Command Parsed: A: " << a_val << " B: " << b_val << std::endl;
}

// New function to process the MO command.
void MCodeHandler::processMOCommand(const std::string& moParams) {
    std::string params = moParams;
    if (!params.empty() && params.back() == '*') {
        params.pop_back();
    }
    // For example, for "IN" or "MM", print out a meaningful message.
    if (params == "IN") {
        std::cout << "[MO Info] Unit: Inches" << std::endl;
    } else if (params == "MM") {
        std::cout << "[MO Info] Unit: Metric" << std::endl;
    } else {
        std::cout << "[MO Info] Unknown unit: " << params << std::endl;
    }
}
void MCodeHandler::handle(const std::string& line) {
    std::cout << "Processing M-code: " << line << std::endl;
    if(line.empty())
        return;
    
    std::istringstream iss(line);
    std::string token;
    if(iss >> token) {
        if(token[0] == 'M' || token[0] == 'm') {
            // Check for special commands: MI and MO.
            if(token.size() >= 2 && (token.substr(0, 2) == "MI" || token.substr(0, 2) == "mi")) {
                std::string miParams = token.substr(2);
                if (!miParams.empty() && miParams.back() == '*') {
                    miParams.pop_back();
                }
                processMICommand(miParams);
            } else if(token.size() >= 2 && (token.substr(0,2) == "MO" || token.substr(0,2) == "mo")) {
                std::string moParams = token.substr(2);
                if (!moParams.empty() && moParams.back() == '*') {
                    moParams.pop_back();
                }
                processMOCommand(moParams);
            } else {
                try {
                    int mcode = std::stoi(token.substr(1));
                    std::string params;
                    std::getline(iss, params);
                    processMCommand(mcode, params);
                } catch (const std::invalid_argument& ex) {
                    std::cerr << "Error parsing M-code number from token: " << token << ". " << ex.what() << std::endl;
                }
            }
        } else {
            std::cerr << "Invalid M-code format: " << line << std::endl;
        }
    }
}
// void MCodeHandler::handle(const std::string& line) {
//     std::cout << "Processing M-code: " << line << std::endl;
//     // For example: "M06 T1" -> mcode: 6, params: "T1"
//     if(line.empty())
//         return;
    
//     std::istringstream iss(line);
//     std::string token;
//     if(iss >> token) {
//         if(token[0] == 'M' || token[0] == 'm') {
//             // Remove the letter 'M' and parse the numeric part.
//             int mcode = std::stoi(token.substr(1));
//             std::string params;
//             std::getline(iss, params);
//             processMCommand(mcode, params);
//         } else {
//             std::cerr << "Invalid M-code format: " << line << std::endl;
//         }
//     }
// }
