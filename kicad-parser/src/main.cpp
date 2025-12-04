
#include "parser.hpp"
#include "sexpr.hpp"
#include "ast.hpp"
#include "BaselineBoard.h"
#include "PCBComponent.h"
#include "shapes.hpp"
#include <filesystem>
#include <cstdio>
#include <iostream>
#include <stack>
#include <vector>
#include <memory>
#include <typeinfo>
#include <fstream>


extern FILE* yyin;
extern int yyparse();
sexpr::Node* GetRoot();

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0]
                  << " <KiCad file or folder>\n";
        return 1;
    }

    namespace fs = std::filesystem;
    fs::path input = argv[1];

    // Helper lambda to process a single file
    auto process_file = [&](const fs::path& file){
        if (!IsFileValid(file.string().c_str())) {
            std::cerr << "Skipping unsupported file: "
                      << file.filename() << "\n";
            return;
        }

        yyin = fopen(file.string().c_str(), "r");
        if (!yyin) {
            std::cerr << "Error: Cannot open " 
                      << file.filename() << "\n";
            return;
        }
        if (yyparse() != 0) {
            std::cerr << "Error: Parse failure on "
                      << file.filename() << "\n";
            fclose(yyin);
            return;
        }
        auto ast = GetRoot();
        if (!ast) {
            std::cerr << "Error: No AST for "
                      << file.filename() << "\n";
            fclose(yyin);
            return;
        }
        // This tells us whether the parser created nodes like (host ...), (junction ...), (label ...), (lib_symbols ...), etc.
std::cerr << "[DEBUG] Root children: " << ast->GetNumberOfChildren() << "\n";
for (int i = 0; i < ast->GetNumberOfChildren(); ++i) {
    auto *c = ast->GetChild(i);
    if (!c) {
        std::cerr << "  child " << i << " = null\n";
        continue;
    }
    if (c->IsList() && c->GetNumberOfChildren() > 0 && c->GetChild(0)->IsSymbol()) {
        std::cerr << "  child " << i << " tag=\"" << c->GetChild(0)->AsString() << "\"\n";
    } else {
        std::cerr << "  child " << i << " (non-list or no head)\n";
    }
}
        std::string output_path = file.stem().string() + "_output_sexpr" + file.extension().string();
        std::ofstream out(output_path);
        out << serializeSExpr(ast, 0);
        out << '\n'; // add this line to ensure trailing newline
        out.close();

        std::cout << "\n=== Parsing " 
                  << file.filename() 
                  << " ===\n";
        std::cout << "Parsed successfully.\n";

        // Step 1: Build the board
        auto board = generateComponents(ast);
        if (!board) {
            std::cerr << "Error: Board generation failed.\n";
            fclose(yyin);
            return;
        }
        auto b = std::dynamic_pointer_cast<PCBDesign::BaselineBoard>(board);
        if (!b) {
            std::cerr << "Error: Could not cast to BaselineBoard. "
                      << "Actual type: " << typeid(*board).name() 
                      << "\n";
            fclose(yyin);
            return;
        }

        // Metadata
        std::cout << "\n=== Schematic Metadata ===\n";
        std::cout << "Version:      " << b->getVersion()   << "\n";
        std::cout << "Generator:    " << b->getGenerator() << "\n";
        std::cout << "Paper size:   " << b->getPaperSize() << "\n";
        std::cout << "Root UUID:    " << b->getUUID()      << "\n";
        std::cout << "Library symbols: ";
        for (auto &s : b->getLibSymbols()) std::cout << s << " ";
        std::cout << "\n\n";
        std::cout << "Title:        " << b->getTitle()    << "\n";
        std::cout << "Date:         " << b->getDate()     << "\n";
        std::cout << "Revision:     " << b->getRevision() << "\n";
        std::cout << "Company:      " << b->getCompany()  << "\n\n";

        // Components summary
        std::function<void(const std::shared_ptr<PCBDesign::PCBComponent>&,int)> dumpComp;
        dumpComp = [&](auto& comp, int indent) {
            if (!comp) return;
            std::string pad(indent*2, ' ');
            std::cout << pad
                      << "Component: \"" << comp->getName() << "\""
                      << "  |  pins: "   << comp->getPins().size()
                      << "  |  shapes: " << comp->getShapes().size()
                      << "\n";
            for (auto& sub : comp->getSubcomponents())
                dumpComp(sub, indent+1);
        };

        auto comps = board->getComponents();
        std::cout << "\n=== Parsed Components Summary ===\n";
        std::cout << "Top-level components: " << comps.size() << "\n";
        for (auto& top : comps) dumpComp(top, 0);
        std::cout << "=================================\n\n";

        // Bus aliases
        std::cout << "\n=== Bus Aliases ===\n";
        for (auto& [alias,members] : b->getBusAliases()) {
            std::cout << "Alias \"" << alias << "\": ";
            for (auto &m : members) std::cout << m << " ";
            std::cout << "\n";
        }

        // Shapes
        // std::stack<std::shared_ptr<PCBDesign::PCBObj>> dummy;
        // dummy.push(board);
        // std::vector<std::shared_ptr<PCBDesign::Shape>> shapes;
        // traverseAst(ast, dummy, 0, shapes);
// --- Collect shapes by giving traverseAst the board on the parse stack ---
// --- Collect shapes by giving traverseAst the board on the parse stack ---
std::stack<std::shared_ptr<PCBDesign::PCBObj>> parse_stack;
parse_stack.push(board);   // 'board' comes from generateComponents(ast)

std::vector<std::shared_ptr<PCBDesign::Shape>> shapes;
// Call the once-only wrapper that prevents duplicates:
// walkSchematicOnce(ast, parse_stack, shapes,b);
walkSchematicOnce(ast, parse_stack, shapes, b.get());

// After traversal you can inspect the parsed board on the stack (should be same object)
if (!parse_stack.empty()) {
    auto parsed = std::dynamic_pointer_cast<PCBDesign::BaselineBoard>(parse_stack.top());
    if (parsed) {
        // optional: use 'parsed'
    }
    parse_stack.pop();
}

    // ---- INSERT FINALIZE & DEBUG CALLS HERE ----
    // run board finalization / postprocessing (fills shape vectors, counts, etc.)
    b->finalize();          // call your finalize() implementation

    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);


    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);


    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);


    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);


    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);


    // Dump the reconstructed KiCad schematic to stdout (S-expression).
    std::cerr << "[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\n";
    b->dumpKiCad(std::cout);

 
    // --------------------------------------------
        std::cout << "\n=== Parsed Shapes ===\n";
        std::cout << "Total shapes collected: " 
                  << shapes.size() << "\n";
        int count = 0;
        for (auto& shape : shapes) {
            if (!shape) { ++count; continue; }
            try { shape->dump(std::cout); }
            catch(...) { std::cerr << "  (error dumping shape)\n"; }
            ++count;
        }
        std::cout << "=================================\n";

        fclose(yyin);
    };

    // If directory, iterate over .kicad_sch files
    if (fs::is_directory(input)) {
        for (auto& entry : fs::directory_iterator(input)) {
            if (entry.is_regular_file() 
             && entry.path().extension()==".kicad_sch")
            {
                process_file(entry.path());
            }
        }
    } 
    else {
        process_file(input);
    }

    return 0;
}
