#include <iostream>
#include "LCodeHandler.h"

void LCodeHandler::handle(const std::string& line) {
    std::cout << "Processing L-code: " << line << std::endl;

    if (line.size() > 1 && line[0] == 'L') {
        std::string lCodeValue = line.substr(1);
        std::cout << "  [L-code Parsed] Value: " << lCodeValue << std::endl;
    } else {
        std::cout << "  [L-code] Invalid or unsupported format.\n";
    }
}
