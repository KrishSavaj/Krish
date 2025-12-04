#include "CommandProcessor.h"
#include "FormatHandler.h"
#include "GCodeHandler.h"
#include "MCodeHandler.h"
#include "FCodeHandler.h"
#include "DCodeHandler.h"
#include "CoordinateProcessor.h"
#include "ACodeHandler.h"
#include <iostream>

void CommandProcessor::processLine(const std::string& line) {
    if (line.empty()) return;
// Handle lines that start with '%' (Gerber directives and attributes)
if (line.front() == '%') {
    std::string innerLine = line;

    // Remove leading '%'
    innerLine.erase(0, 1);

    // Remove trailing '*' and/or '%'
    if (!innerLine.empty() && innerLine.back() == '%') {
        innerLine.pop_back();
    }
    if (!innerLine.empty() && innerLine.back() == '*') {
        innerLine.pop_back();
    }
        // Check if it's a known directive
        if (innerLine.rfind("FS", 0) == 0 || innerLine.rfind("MO", 0) == 0 || 
            innerLine.rfind("MI", 0) == 0 || innerLine.rfind("OF", 0) == 0 || 
            innerLine.rfind("SF", 0) == 0 || innerLine.rfind("AS", 0) == 0) {
            directiveHandler.processDirective(innerLine);  //  Properly routed
            return;
        } else {
            FormatHandler::handle(line); // e.g., TF.*, TA.*, etc.
            return;
        }
    }

    // Process standard commands by leading character
    char code = line[0];
    switch (code) {
        case 'G': 
            GCodeHandler::handle(line); 
            break;
        case 'M': 
            MCodeHandler::handle(line); 
            break;
        case 'F': 
            FCodeHandler::handle(line); 
            break;
        case 'D': 
            DCodeHandler::handle(line); 
            break;
        case 'X': case 'Y': case 'I': case 'J': 
            CoordinateHandler::handleX(line);  // Customize as per coordinate parser
            break;
        case 'A': 
            ACodeHandler::handle(line); 
            break;
        default:
            std::cout << "Unknown or unhandled command: " << line << std::endl;
            break;
    }
}

void CommandProcessor::printDirectives() const {
    directiveHandler.printDirectives();
}
DirectiveHandler& CommandProcessor::getDirectiveHandler() {
    return directiveHandler;
}






