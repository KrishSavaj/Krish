#include "TCodeHandler.h"
#include <iostream>

void TCodeHandler::handle(const std::string& line) {
    std::cout << "Processing T-code: " << line << std::endl;
}
