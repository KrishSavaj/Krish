#include "CoordinateProcessor.h"
#include <iostream>

void CoordinateHandler::handleX(const std::string& line) {
    std::cout << "Processing X-coordinate: " << line << std::endl;
}

void CoordinateHandler::handleY(const std::string& line) {
    std::cout << "Processing Y-coordinate: " << line << std::endl;
}

void CoordinateHandler::handleI(const std::string& line) {
    std::cout << "Processing I-coordinate: " << line << std::endl;
}

void CoordinateHandler::handleJ(const std::string& line) {
    std::cout << "Processing J-coordinate: " << line << std::endl;
}
