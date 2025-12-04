#ifndef COORDINATE_HANDLER_H
#define COORDINATE_HANDLER_H

#include <string>

class CoordinateHandler {
public:
    static void handleX(const std::string& line);
    static void handleY(const std::string& line);
    static void handleI(const std::string& line);
    static void handleJ(const std::string& line);
};

#endif // COORDINATE_HANDLER_H
