#include "ICodeHandler.h"
#include <iostream>

void ICodeHandler::handle(const std::string& line) {
    std::cout << "Processing I-code: " << line << std::endl;
}