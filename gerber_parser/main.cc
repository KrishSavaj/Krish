#include "Parser.h"
#include "DirectiveHandler.h"
#include <iostream>
#include <string>
#include <fstream>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <input_file.gbr>" << std::endl;
        return 1;
    }

    std::string inputFile = argv[1];
    Parser parser;

    // Parse the provided input Gerber file using Parser
    parser.parseFile(inputFile);
    parser.printDirectives();
    parser.printApertures();
    parser.printImages();
    parser.printLayers();

    // Generate output filename by appending _parsed
    std::string outputFile = inputFile.substr(0, inputFile.find_last_of('.')) + "_parsed.gbr";
    parser.writeOutputFile(outputFile);

    
    std::cout << "Parsed output written to: " << outputFile << std::endl;
    std::cout << "Use `diff " << inputFile << " " << outputFile 
              << "` to compare the files.\n";

    return 0;
}













