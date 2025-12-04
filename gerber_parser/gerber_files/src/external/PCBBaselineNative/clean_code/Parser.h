#ifndef PARSER_H
#define PARSER_H

#include "GerberDirective.h"
#include "CommandProcessor.h"
#include "ErrorHandler.h"
#include "ApertureHandler.h"
#include "ImageHandler.h"
#include "LayerHandler.h"
#include "GerberObj.h"
#include "GerberAperture.h"
#include "GerberImage.h"
#include "GerberLayer.h"

#include <vector>
#include <string>
#include <optional>
#include <memory>
// Move this to the top of the header
struct JSShape {
    std::string label;
    std::string equation;
};
void writeOutputJS(const std::vector<JSShape>& shapes, const std::string& filename);
class Parser {
public:
    Parser();

    // Read, parse, and store all lines
    void parseFile(const std::string& filename);
    // Process a single line (tracking handled state)
    void processLine(const std::string& line);
    const std::vector<std::shared_ptr<GerberObj>>& getAllObjects() const {
     return allObjects;
       }
    // Debug printing of parsed results
    void printDirectives() const;
    void printApertures() const;
    void printImages() const;
    void printLayers() const;
    void handleShape(const std::string &line);
    void inferAndHandleShape(const std::string &line);
    bool handleArc(const std::string &line);
    void handleDirective(const std::string &line);
    // Emit a round‑trip output file
    void writeOutputFile(const std::string& filename) const;

    // Expose parsed directives if needed
    const std::vector<GerberDirective>& getDirectives() const { return directives; }
   
    // Shape parsing helper
    std::shared_ptr<GerberObj> parseShapeCommand(const std::string& line);

private:
    
    // All raw lines, in original order
    std::vector<std::string> lines;
    // Flags indicating whether each line was processed
    std::vector<bool> handled;
    // Index of the current line being processed
    size_t currentLineIndex = 0;
    std::string modalDCode{"D02"}; 
    bool originalHadTrailingNewline = false;
    CommandProcessor cmdProcessor;
    ErrorHandler errorHandler;

    // Storage for parsed objects
    std::vector<GerberDirective> directives;
    std::vector<std::shared_ptr<GerberObj>> shapes;
    std::vector<std::shared_ptr<GerberObj>> allObjects;

    // Handlers for embedded blocks
    ApertureHandler apertureHandler;
    ImageHandler imageHandler;
    LayerHandler layerHandler;

    // Helpers for directive parsing
    std::optional<GerberDirective> parseDirectiveLine(const std::string& line);
    std::string extractFirstToken(const std::string& body);
    bool inMacroBlock = false;
    std::string currentMacroName;
    std::vector<std::string> macroLines;  
};

#endif // PARSER_H







