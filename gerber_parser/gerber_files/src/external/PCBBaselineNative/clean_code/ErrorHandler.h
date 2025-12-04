#ifndef ERROR_HANDLER_H
#define ERROR_HANDLER_H

#include <string>

class ErrorHandler {
public:
    static void logError(const std::string& message);
};

#endif // ERROR_HANDLER_H
