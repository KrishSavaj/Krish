#include "SRHandler.h"
#include <regex>
#include <iostream>
#include <cstdlib>

namespace PCBDesign {

StepAndRepeat parseStepAndRepeat(const std::string &srCommand) {
    StepAndRepeat sr = {0, 0, 0.0, 0.0};
    
    // This regex matches the SR command format:
    // %SRX<repX>Y<repY>I<offsetX>J<offsetY>*%
    std::regex srRegex("(?:%?)SRX(\\d+)Y(\\d+)I(-?\\d+)J(-?\\d+)\\*%?");
    std::smatch match;
    
    if (std::regex_search(srCommand, match, srRegex)) {
        sr.repX = std::stoi(match[1].str());
        sr.repY = std::stoi(match[2].str());
        // Convert offset values from file units (e.g., microns) to millimeters.
        sr.offsetX = std::stod(match[3].str()) / 1e6;
        sr.offsetY = std::stod(match[4].str()) / 1e6;
    } else {
        std::cerr << "Failed to parse SR command: " << srCommand << std::endl;
    }
    
    return sr;
}

} // namespace PCBDesign
