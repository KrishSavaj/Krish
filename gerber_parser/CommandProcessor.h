#ifndef COMMAND_PROCESSOR_H
#define COMMAND_PROCESSOR_H
#pragma once
#include <string>
#include "GCodeHandler.h"
#include "MCodeHandler.h"
#include "FCodeHandler.h"
#include "DirectiveHandler.h"


class CommandProcessor {
public:
    void processLine(const std::string& line);

    // New: Expose directive printing for testing/debugging
    void printDirectives() const;
    // Add this getter to access directiveHandler
    DirectiveHandler& getDirectiveHandler(); // <-- Add this line

private:
    DirectiveHandler directiveHandler;
};

#endif // COMMAND_PROCESSOR_H

















// #ifndef COMMAND_PROCESSOR_H
// #define COMMAND_PROCESSOR_H
// #pragma once
// #include <string>
// #include "GCodeHandler.h"
// #include "MCodeHandler.h"
// #include "FCodeHandler.h"
// #include "DCodeHandler.h"
// #include "ACodeHandler.h"
// #include "ICodeHandler.h"
// #include "DirectiveHandler.h"
// #include "CommandProcessor.h"
// #include "FormatHandler.h"
// #include "CoordinateProcessor.h"
// #include "ImageHandler.h"


// class CommandProcessor {
// public:
//     void processLine(const std::string& line);

//     // New: Expose directive printing for testing/debugging
//     void printDirectives() const;
//     void printImages() const;
//     // Add this getter to access directiveHandler
//     DirectiveHandler& getDirectiveHandler(); // <-- Add this line
//     ImageHandler& getImageHandler();

// private:
//     DirectiveHandler directiveHandler;
//     ImageHandler imageHandler;
// };

// #endif // COMMAND_PROCESSOR_H
