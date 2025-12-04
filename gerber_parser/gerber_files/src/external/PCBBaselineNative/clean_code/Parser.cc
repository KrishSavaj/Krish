#include "Parser.h"
#include "FormatClassification.h"  // Include classification functions
#include <fstream>
#include <iostream>
#include <cctype>   // For std::isspace
#include <regex>    // For shape parsing
#include "SRHandler.h"
#include "GerberDirective.h"
#include "GerberObj.h"  // Required for shape classes
#include "GerberAperture.h"
#include "ApertureHandler.h"
#include "GerberImage.h"
#include "ImageHandler.h" 
#include "GerberLayer.h"
#include "LayerHandler.h"
#include <optional>
#include<vector>

void writeOutputJS(const std::vector<JSShape>& shapes, const std::string& filename)
{
    std::ofstream file(filename);
    file << "const shapes = [\n";
    for (size_t i = 0; i < shapes.size(); ++i) {
        std::string cleanedEquation = shapes[i].equation;

        // Remove newlines and carriage returns
        cleanedEquation.erase(std::remove(cleanedEquation.begin(), cleanedEquation.end(), '\n'), cleanedEquation.end());
        cleanedEquation.erase(std::remove(cleanedEquation.begin(), cleanedEquation.end(), '\r'), cleanedEquation.end());

        // Remove trailing '*' if present (optional, based on your requirement)
        if (!cleanedEquation.empty() && cleanedEquation.back() == '*') {
            cleanedEquation.pop_back();
        }

        file << "  {\n"
             << "    label: \"" << shapes[i].label << "\",\n"
             << "    equation: \"" << cleanedEquation << "\"\n"
             << "  }";
        if (i != shapes.size() - 1) file << ",";
        file << "\n";
    }
    file << "];\n";
    file.close();
}


Parser::Parser() {}

void Parser::parseFile(const std::string& filename) {
    // 1) Read all lines into vector
    std::ifstream file(filename);
    if (!file) {
        errorHandler.logError("Failed to open file: " + filename);
        return;
    }

    std::string line;
    while (std::getline(file, line)) {
        lines.push_back(line);
        handled.push_back(false);
    }
    file.close();

    // 2) Detect trailing newline in original file
    {
        std::ifstream bin(filename, std::ios::binary);
        if (bin) {
            bin.seekg(-1, std::ios::end);
            char lastChar;
            bin.get(lastChar);
            originalHadTrailingNewline = (lastChar == '\n');
        }
    }

    // 3) Process each line
    for (size_t i = 0; i < lines.size(); ++i) {
        currentLineIndex = i;
        processLine(lines[i]);
    }

    // 4) Report unhandled lines
    for (size_t i = 0; i < lines.size(); ++i) {
        if (!handled[i]) {
            std::cerr << "Unhandled line " << (i+1) << ": \""
                      << lines[i] << "\"\n";
        }
    }
    
        std::vector<JSShape> jsShapes;
        jsShapes.reserve(shapes.size());
        int lineCount = 0, circleCount = 0, flashCount = 0, dirCount = 0;

        for (const auto& objPtr : shapes) {
            // Filter only shapes (Move, Draw, Flash, Arc)
        switch (objPtr->getObjType()) {
            case ObjType::Move:
            case ObjType::Draw:
            case ObjType::Flash:
            case ObjType::Arc: {
            // generate a label based on object type
            std::string label;
            switch (objPtr->getObjType()) {
                case ObjType::Move:  label = "Line"   + std::to_string(++lineCount);  break;
                case ObjType::Draw:  label = "LineDraw"+ std::to_string(++lineCount);  break;
                case ObjType::Flash: label = "Flash"  + std::to_string(++flashCount); break;
                case ObjType::Arc:   label = "Circle" + std::to_string(++circleCount);break;
                default:             label = "Dir"    + std::to_string(++dirCount);   break;
            }

            // use serialize() (or your own formatter) for the JS equation
            std::string equation = objPtr->serialize();

            jsShapes.push_back({ label, equation });
            break;
        }
        default:
        // Skip non-shape objects (directives or other object types)
        break;
}
        }
        writeOutputJS(jsShapes, "output.js");
        std::cout << "[Info] Wrote " << jsShapes.size()
                  << " shapes to output.js\n";
        
    }


void Parser::processLine(const std::string& line) {
    // Make a working copy of the line
    std::string cleanedLine = line;

// Strip all whitespace (including \r, \n, tabs, etc.)
    cleanedLine.erase(std::remove_if(cleanedLine.begin(), cleanedLine.end(),
                  [](unsigned char c) { return std::isspace(c); }),
                  cleanedLine.end());

// Handle continuation of an aperture macro block
if (inMacroBlock) {
    macroLines.push_back(line);
    handled[currentLineIndex] = true;

    // End of macro block if line contains "*%"
    if (line.find("*%") != std::string::npos) {
        inMacroBlock = false;

        std::ostringstream joined;
        for (const auto& l : macroLines) joined << l << "\n";

        apertureHandler.processMacro(currentMacroName, macroLines, joined.str());
        macroLines.clear();
    }
    return;
}
std::regex standaloneDcode(R"(^D(\d+)\*$)", std::regex::icase);
std::smatch match;
if (std::regex_match(cleanedLine, match, standaloneDcode)) {
    std::string dcode = match.str(1);
    std::string fullCode = "D" + dcode;

    DirectiveType dtype = stringToDirectiveType(fullCode);
    auto dir = std::make_shared<GerberDirective>(dtype, "", fullCode);

    allObjects.push_back(dir);
    shapes.push_back(dir);
    directives.push_back(*dir);

    cmdProcessor.getDirectiveHandler().processDirective(fullCode);
    handled[currentLineIndex] = true;

    std::cout << "[Parsed] " << fullCode << " -> " << dir->serialize() << "\n";
    return;
}


    auto handleDirectiveorApertureLine = [&](const std::string& rawLine) {
        std::cout << "[Raw Line] " << rawLine << "\n";
        std::string content = rawLine;

        if (!content.empty() && content.front() == '%') content.erase(0, 1);
        if (!content.empty() && content.back() == '%') content.pop_back();
        if (!content.empty() && content.back() == '*') content.pop_back();

        std::string key = content.size() >= 2 ? content.substr(0, 2) : "";
        std::string params = content.size() > 2 ? content.substr(2) : "";

    // ─── Handle TF metadata directives ───
    if (key == "TF") {
        DirectiveType dtype = stringToDirectiveType(key);
        auto dir = std::make_shared<GerberDirective>(dtype, params);
        allObjects.push_back(dir);
        directives.push_back(*dir);
        cmdProcessor.getDirectiveHandler().processDirective(rawLine);
        std::cout << "[Parsed] " << key << " -> " << params << "\n";
        handled[currentLineIndex] = true;
        return;
    }

    // ─── Handle TD directives (Delete Attributes) ───
    if (key == "TD") {
        DirectiveType dtype = stringToDirectiveType(key);
        auto dir = std::make_shared<GerberDirective>(dtype, params);
        allObjects.push_back(dir);
        directives.push_back(*dir);
        cmdProcessor.getDirectiveHandler().processDirective(rawLine);
        std::cout << "[Parsed] " << key << " -> " << params << "\n";
        handled[currentLineIndex] = true;
        return;
    }

    // ─── Handle TO directives (Tool Output / Component Orientation) ───
    if (key == "TO") {
        DirectiveType dtype = stringToDirectiveType(key);
        auto dir = std::make_shared<GerberDirective>(dtype, params);
        allObjects.push_back(dir);
        directives.push_back(*dir);
        cmdProcessor.getDirectiveHandler().processDirective(rawLine);
        std::cout << "[Parsed] " << key << " -> " << params << "\n";
        handled[currentLineIndex] = true;
        return;
    }

         // Handle AM (Aperture Macro) declaration start
         if (key == "AM") {
            currentMacroName = params.substr(0, params.find(',')); // capture name
            macroLines.clear();
            macroLines.push_back(rawLine);
            inMacroBlock = true;
            handled[currentLineIndex] = true;
            return;
        }

        // Handle standard aperture (AD or AM one-liner)
        if (key == "AD" || key == "AM") {
            ApertureType atype = stringToApertureType(key);
            auto ap = std::make_shared<GerberAperture>(atype, params);
            allObjects.push_back(ap);
            apertureHandler.processAperture(rawLine);
            handled[currentLineIndex] = true;
            return;
        }

        if (key == "IF" || key == "IJ" || key == "IN" || key == "IO" || key == "IP" || key == "IR") {
            auto img = std::make_shared<GerberImage>(stringToImageType(key), params);
            allObjects.push_back(img);
            imageHandler.processImage(rawLine);
            handled[currentLineIndex] = true;
            return;
        }

        if (key == "KO" || key == "LN" || key == "LP" || key == "SR") {
            auto ly = std::make_shared<GerberLayer>(stringToLayerType(key), params);
            allObjects.push_back(ly);
            layerHandler.processLayer(rawLine);
            handled[currentLineIndex] = true;
            return;
        }std::string key3 = content.size() >= 3 ? content.substr(0, 3) : "";

        if (content.size() >= 2) {
            std::string key = content.substr(0, 2);
            std::string params = content.substr(2);
            DirectiveType type = stringToDirectiveType(key);

            auto dirObj = std::make_shared<GerberDirective>(type, params);
            allObjects.push_back(dirObj);
            shapes.push_back(dirObj);
            directives.push_back(*dirObj);

            cmdProcessor.getDirectiveHandler().processDirective(rawLine);
            // now mark & exit
            handled[currentLineIndex] = true;
            return;
        }
    };

    if (!line.empty() && line.front() == '%') {
        handleDirectiveorApertureLine(line);
        handled[currentLineIndex] = true;
        return;
    }

    std::string cleanLine = line;
    while (!cleanLine.empty() && (cleanLine.back() == '*' || cleanLine.back() == '%' || cleanLine.back() == '\r' || cleanLine.back() == '\n')) {
        cleanLine.pop_back();
    }

    std::string prefix = (cleanLine.size() >= 2) ? cleanLine.substr(0, 2) : "";
    if (prefix == "FS" || prefix == "MO" || prefix == "MI" || prefix == "OF" || prefix == "SF" || prefix == "AS" ||
        prefix == "AD" || prefix == "AM" ||
        prefix == "IF" || prefix == "IJ" || prefix == "IN" || prefix == "IO" || prefix == "IP" || prefix == "IR" ||
        prefix == "KO" || prefix == "LN" || prefix == "LP" || prefix == "SR") {
        handleDirectiveorApertureLine(line);
        handled[currentLineIndex] = true;
        return;
    }

    if (line.substr(0, 9) == "%%Unknown") {
        std::cout << "[Skipping Unknown Directive] " << line << std::endl;
        return;
    }

    if (!line.empty() && line.front() == '%') {
        std::cout << "[Raw Directive] " << line << "\n";
    }

    if (cleanLine.rfind("SR", 0) == 0 || cleanLine.rfind("%SR", 0) == 0) {
        std::cout << "  [SR Raw] " << line << std::endl;
        PCBDesign::StepAndRepeat sr = PCBDesign::parseStepAndRepeat(line);
        std::cout << "  [SR Info] Repetitions: X=" << sr.repX << ", Y=" << sr.repY << "\n";
        std::cout << "  [SR Info] Offsets: X=" << sr.offsetX << "mm, Y=" << sr.offsetY << "mm\n";
        return;
    }

    std::string condensed;
    for (char c : line) {
        if (!std::isspace(static_cast<unsigned char>(c))) {
            condensed.push_back(c);
        }
    }
    //
    // 1) Explicit D-code shapes (D01, D02, D03)
    //
    if (line.find("D01") != std::string::npos ||
        line.find("D02") != std::string::npos ||
        line.find("D03") != std::string::npos)
    {
        if (line.find("D01") != std::string::npos) modalDCode = "D01";
        else if (line.find("D02") != std::string::npos) modalDCode = "D02";
        else if (line.find("D03") != std::string::npos) modalDCode = "D03";
        
        handleShape(line);
        return;
    }
   // 2) Inferred (no D-code): X/Y or G01 without D-code
    bool isG01orXY = line.rfind("G01", 0) == 0 ||
    line.find('X') != std::string::npos ||
    line.find('Y') != std::string::npos;

    bool hasNoD = line.find("D01") == std::string::npos &&
    line.find("D02") == std::string::npos &&
    line.find("D03") == std::string::npos;

    if (isG01orXY && hasNoD) {
    size_t star = line.find('*');
    std::string eff = (star != std::string::npos)
    ? line.substr(0, star) + modalDCode + "*"
    : line + modalDCode + "*";
    handleShape(eff);
    return;
}


    //
    // 3) Arc commands (G02 / G03)
    //
    if ((line.rfind("G02",0)==0 || line.rfind("G03",0)==0) && handleArc(line)) {
        return;
    }

    //
    // 4) Polygon-fill directives (G36 / G37)
    //
    if (line.rfind("G36",0)==0 || line.rfind("G37",0)==0) {
        handleDirective(line);
        return;
    }

    //
    // 5) Single-line directives: G74, G75, G04, M02
    //
    if (   line.rfind("G74",0)==0
        || line.rfind("G75",0)==0
        || line.rfind("G04",0)==0
        || line.rfind("G54",0)==0
        || line.rfind("M02",0)==0
        || line.rfind("G55",0)==0)
    {
        handleDirective(line);
        return;
    }

    //
    // 6) Last fallback — only now run the format‐classification printer
    //
    if (line.find("%:") == 0
    || condensed.size() == 5
    || condensed.size() == 6)
   {
       try {
           auto body = (line.find("%:") == 0 ? line.substr(2) : line);
           auto fc = parseFormatClassification(body);
           printClassification(fc, line);
           handled[currentLineIndex] = true;
       }
       catch (const std::exception &e) {
           std::cerr << "Error parsing classification: " << e.what() << "\n";
       }
       return;
   }

   //
   // really unhandled
   //
   if (!handled[currentLineIndex]) {
       std::cerr << "Unhandled line "
                 << (currentLineIndex+1)
                 << ": \"" << line << "\"\n";
   }

}

std::optional<GerberDirective> Parser::parseDirectiveLine(const std::string& line) {
    if (line.size() < 4 || line.front() != '%') return std::nullopt;

    std::string cleanLine = line.substr(1);
    if (!cleanLine.empty() && cleanLine.back() == '%') cleanLine.pop_back();
    if (!cleanLine.empty() && cleanLine.back() == '*') cleanLine.pop_back();

    if (cleanLine.size() < 2) return std::nullopt;

    std::string key = cleanLine.substr(0, 2);
    std::string params = cleanLine.substr(2);

    std::cout << "[Directive Found] Key: " << key << ", Params: " << params << std::endl;

    DirectiveType dtype = stringToDirectiveType(key);

    if (dtype == DirectiveType::Unknown) {
        std::cout << "[Unknown Directive] " << line << std::endl;
    }

    return GerberDirective(dtype, params);
}

// std::shared_ptr<GerberObj> Parser::parseShapeCommand(const std::string& line) {
//     std::regex coordRegex(R"(X?(-?\d+)?Y?(-?\d+)?D0([123]))");
//     std::smatch match;

//     if (std::regex_search(line, match, coordRegex)) {
//         double x = match[1].matched ? std::stod(match[1].str()) : -1;
//         double y = match[2].matched ? std::stod(match[2].str()) : -1;
//         int dCode = std::stoi(match[3]);

//         Coordinate coord = {x, y};

//         switch (dCode) {
//             case 1: {
//                 auto shape = std::make_shared<Draw>();
//                 shape->coord = coord;
//                 shape->rawLine = line;  //  Save original line here
//                 return shape;
//             }
//             case 2: {
//                 auto shape = std::make_shared<Move>();
//                 shape->coord = coord;
//                 shape->rawLine = line;  // Save original line here
//                 return shape;
//             }
//             case 3: {
//                 auto shape = std::make_shared<Flash>();
//                 shape->coord = coord;
//                 shape->rawLine = line;  //  Save original line here
//                 return shape;
//             }
//         }
//     }

//     return nullptr;
// }
std::shared_ptr<GerberObj> Parser::parseShapeCommand(const std::string& line) {
    // Matches ONLY G01 (linear draw) with optional Y and D01/D02/D03
    static const std::regex coordRegex(
        R"(G01X(-?\d+(\.\d+)?)Y?(-?\d+(\.\d+)?)?D0([123]))",
        std::regex::icase
    );
    std::smatch match;
    if (std::regex_search(line, match, coordRegex)) {
        double x  = std::stod(match[1].str());
        double y  = match[3].matched ? std::stod(match[3].str()) : -1;
        int dCode = std::stoi(match[5].str());

        Coordinate coord { x, y };
        auto shape = std::make_shared<Draw>();
        shape->coord   = coord;
        shape->rawLine = line;
        return shape;
    }

    // fallback to legacy X/Y D-code parsing (no leading G01)
    static const std::regex xyDcode(R"(X?(-?\d+)?Y?(-?\d+)?D0([123]))");
    if (std::regex_search(line, match, xyDcode)) {
        double x = match[1].matched ? std::stod(match[1].str()) : -1;
        double y = match[2].matched ? std::stod(match[2].str()) : -1;
        int dCode = std::stoi(match[3].str());

        Coordinate coord { x, y };
        switch (dCode) {
            case 1: {
                auto shape = std::make_shared<Draw>();
                shape->coord   = coord;
                shape->rawLine = line;
                return shape;
            }
            case 2: {
                auto shape = std::make_shared<Move>();
                shape->coord   = coord;
                shape->rawLine = line;
                return shape;
            }
            case 3: {
                auto shape = std::make_shared<Flash>();
                shape->coord   = coord;
                shape->rawLine = line;
                return shape;
            }
        }
    }

    return nullptr;
}

void Parser::handleShape(const std::string &line) {
    // 1) Try arc first
    if (handleArc(line)) return;

    // 2) Otherwise, try other shape commands (G01, D01, D02, D03)
    auto shape = parseShapeCommand(line);
    if (!shape) {
        std::cerr << "[handleShape] Failed to parse shape command: " << line << "\n";
        return;
    }

    allObjects.push_back(shape);
    shapes.push_back(shape);
    handled[currentLineIndex] = true;

    // 3) Tag by type
    std::string tag;
    switch (shape->getObjType()) {
        case ObjType::Move:  tag = "Move";  break;
        case ObjType::Draw:  tag = "Draw";  break;
        case ObjType::Flash: tag = "Flash"; break;
        case ObjType::Arc:   tag = "Arc";   break;
        default:             tag = "Shape"; break;
    }
    std::cout << "[" << tag << " Parsed] " << shape->serialize() << "\n";
}
bool Parser::handleArc(const std::string &line) {
    static const std::regex arc_re(
        R"(G([23])X(-?\d+(\.\d+)?)Y(-?\d+(\.\d+)?)I(-?\d+(\.\d+)?)J(-?\d+(\.\d+)?)D0([12]))",
        std::regex::icase
    );
    std::smatch m;
    if (std::regex_search(line, m, arc_re)) {
        double x = std::stod(m[2].str());
        double y = std::stod(m[4].str());
        double i = std::stod(m[6].str());
        double j = std::stod(m[8].str());
        int    d = std::stoi(m[9].str());

        auto arc = std::make_shared<Arc>(x, y, i, j, d, line.substr(0,3));
        allObjects.push_back(arc);
        shapes.push_back(arc);
        handled[currentLineIndex] = true;
        std::cout << "[Arc Parsed] " << arc->serialize() << "\n";
        return true;
    }
    return false;
}



void Parser::printDirectives() const {
    cmdProcessor.printDirectives();
}

void Parser::printApertures() const {
    apertureHandler.printApertures();
}

void Parser::printImages() const {
    imageHandler.printImages();
}

void Parser::printLayers() const {
    layerHandler.printLayers();
}

std::string Parser::extractFirstToken(const std::string& body) {
    size_t pos = 0;
    while (pos < body.size() && std::isalpha(static_cast<unsigned char>(body[pos]))) {
        ++pos;
    }
    return body.substr(0, pos);
}

void Parser::writeOutputFile(const std::string& filename) const {
    std::ofstream out(filename, std::ios::binary);
    if (!out) {
        std::cerr << "Failed to open output file: " << filename << "\n";
        return;
    }

    for (size_t i = 0; i < lines.size(); ++i) {
        out << lines[i];
        if (!handled[i]) {
            out << "  %UNHANDLED%";
        }
        // print newline if not last or if original had trailing newline
        if (i + 1 < lines.size() || originalHadTrailingNewline) {
            out << '\n';
        }
    }
}

// void Parser::handleShape(const std::string &line) {
//     auto shape = parseShapeCommand(line);
//     if (!shape) {
//         std::cerr << "Failed to parse shape command: " << line << "\n";
//         return;
//     }
//     allObjects.push_back(shape);
//     shapes.push_back(shape);
//     handled[currentLineIndex] = true;

//     // Tag by type
//     const char* tags[] = { "Move", "Draw", "Flash" };
//     auto t = shape->getObjType();
//     std::string tag = (t <= ObjType::Flash ? tags[int(t)] : "Shape");
//     std::cout << "[" << tag << " Parsed] " << shape->serialize() << "\n";
// }

// bool Parser::handleArc(const std::string &line) {
//     static std::regex arc_re(R"(G0[23]X(-?\d+)Y(-?\d+)I(-?\d+)J(-?\d+)D0([12])\*?)", std::regex::icase);
//     std::smatch m;
//     if (std::regex_search(line, m, arc_re)) {
//         int x = std::stoi(m[1]),
//             y = std::stoi(m[2]),
//             i = std::stoi(m[3]),
//             j = std::stoi(m[4]),
//             d = std::stoi(m[5]);
//         auto arc = std::make_shared<Arc>(x,y,i,j,d, line.substr(0,3));
//         allObjects.push_back(arc);
//         shapes.push_back(arc);
//         handled[currentLineIndex] = true;
//         std::cout << "[Arc Parsed] " << arc->serialize() << "\n";
//         return true;
//     }
//     return false;
// }

void Parser::handleDirective(const std::string &line) {
    // extract the 3-char code (G36, G37, G74, G75, G04 or M02)
    std::string code = line.substr(0,3);

    // map it to your enum
    DirectiveType dtype = stringToDirectiveType(code);

    // the rest of the line (everything after the 3-letter code) is the params
    std::string params = line.substr(3);

    // build and stash the object
    auto dir = std::make_shared<GerberDirective>(dtype, params, line);
    allObjects.push_back(dir);
    shapes.push_back(dir);
    directives.push_back(*dir);

    // let your directive‐handler do its thing
    cmdProcessor.getDirectiveHandler().processDirective(line);

    handled[currentLineIndex] = true;

    // echo it
    std::cout
      << "[Directive Parsed] "
      << code
      << " -> "
      << dir->serialize()
      << "\n";
        }
 















