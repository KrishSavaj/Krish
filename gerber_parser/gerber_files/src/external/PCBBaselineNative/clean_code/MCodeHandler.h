#ifndef MCODE_HANDLER_H
#define MCODE_HANDLER_H

#include <string>

class MCodeHandler {
public:
    static void handle(const std::string& line);
private:
    static void processMCommand(int mcode, const std::string& params);
    static void trim(std::string& s);    
    static void processMICommand(const std::string& miParams); // Added for MI commands
    static void processMOCommand(const std::string& moParams);
};

#endif // MCODE_HANDLER_H
