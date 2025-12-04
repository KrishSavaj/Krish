#ifndef GCODE_HANDLER_H
#define GCODE_HANDLER_H

#include <string>

class GCodeHandler {
public:
    static void handle(const std::string& line);
private:
    static void processGCommand(int gcode, const std::string& params);
    static void trim(std::string& s);    
};

#endif // GCODE_HANDLER_H
