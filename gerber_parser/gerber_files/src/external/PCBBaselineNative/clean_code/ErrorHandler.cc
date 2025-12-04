#include "ErrorHandler.h"
#include <iostream>

void ErrorHandler::logError(const std::string& message) {
    std::cerr << "Error: " << message << std::endl;
}
