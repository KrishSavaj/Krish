#include "RCodeHandler.h"
#include <iostream>

void RCodeHandler::handle(const std::string& line) {
    std::cout << "Processing R-code: " << line << std::endl;
}
