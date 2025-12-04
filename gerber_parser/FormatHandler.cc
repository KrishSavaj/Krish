#include "FormatHandler.h"
#include <iostream>

void FormatHandler::handle(const std::string& line) {
    std::cout << "Processing Format/Attribute Command: " << line << std::endl;
}
