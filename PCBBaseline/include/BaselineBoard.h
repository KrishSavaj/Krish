#ifndef BASELINE_BOARD_H
#define BASELINE_BOARD_H

#pragma message("Included PCBComponent.h")

#include <ostream>
#include <string>
#include <vector>
#include "PCBComponent.h"
#include "PCBObj.h"
#include <memory>
#include <map> 
#include "ast_cleaner.hpp"
#include <unordered_map>
#include <array>
#include "shapes.hpp"
#include <variant>
#include <iostream>


// Forward declare CleanNode so compiler knows the name
namespace ast_cleaner {
    struct CleanNode;
}
struct RawNode {
    std::string sexpr;  // original S-expression
};

namespace PCBDesign {

    // Class to represent the baseline board
    class BaselineBoard : public PCBObj {
    
    public:
        // Constructors
        BaselineBoard();
        BaselineBoard(double h, double w, double t);
        const std::vector<std::shared_ptr<PCBComponent>>& getComponents() const {
        return components;}
     // Convert a CleanNode to a ShapePtr and store in rawPieces_
    std::shared_ptr<Shape> convertCleanNodeToShape(const ast_cleaner::CleanNode &clean);

    // Print all rawPieces_ (for debugging)
    void printRawPieces() const;
    void debugDumpWires() const;
   void finalize();
    // Access only the RawNode strings
    //std::vector<std::string> getRawPieces() const;
        // Getters
        double getHeight() const;
        double getWidth() const;
        double getThickness() const;

        // Setters
        void setHeight(double h);
        void setWidth(double w);
        void setThickness(double t);
         void dumpKiCad(std::ostream &out) const;   // <-- add this declaration
        // Add a component to the board
        void addComponent(const std::shared_ptr<PCBComponent>& comp);
        // debug / introspection helpers
size_t getWireCount() const { return wireShapes_.size(); }
size_t getJunctionCount() const { return junctionShapes_.size(); }


        void setLibSymbolsRaw(const std::string &raw);
        const std::string& getLibSymbolsRaw() const;

        void handleLibSymbolsCleanNode(const ast_cleaner::CleanNode &clean);
        void appendRawPieceFromClean(const ast_cleaner::CleanNode &clean);

            // Stub handlers for now
        void handleSymbolFromClean(const ast_cleaner::CleanNode &);
        void handleWireFromClean(const ast_cleaner::CleanNode &);
        void handleJunctionFromClean(const ast_cleaner::CleanNode &);
        void handleTextFromClean(const ast_cleaner::CleanNode &);
        // Display board details
        void display() const;

        // Extract board dimensions from Gerber file
        void extractDimensionsFromGerber(const std::string& filename);

        // Dump function to output board details to stream
        void dump(std::ostream& out) const;
        void addProperty(const std::string& key, const std::string& value);
        const std::unordered_map<std::string, std::string>& getProperties() const;
        void setVersion(const std::string &v)       { version_ = v; }
        void setGenerator(const std::string &g)     { generator_ = g; }
        void setRootUUID(const std::string &u)      { uuid_ = u; }
        void setPaperSize(const std::string &p)     { paperSize_ = p; }
        // Recursive parsing of a single symbol node (and nested symbols)
void parseSymbolRecursive(const ast_cleaner::CleanNode &node,
                              std::shared_ptr<PCBComponent> parentComp = nullptr);

        // if you want to store library symbols as names:
       
        const std::string& getVersion() const       { return version_; }
        const std::string& getGenerator() const     { return generator_; }
        const std::string& getPaperSize() const     { return paperSize_; }
        const std::string& getUUID() const          { return uuid_; }
        void addLibSymbol(const std::string &sym);
        const std::vector<std::string>& getLibSymbols() const;
        // NEW: store raw full (lib_symbols …) block
        // Declaration only
        void appendRawPiece(const std::string &p);
        //const std::vector<std::string>& getRawPieces() const;
        // BaselineBoard.h
//std::vector<std::string> getRawPieces() const;
std::vector<std::string> getRawPieces() const;

        // Title block metadata setters
        void setHost(const std::string &h)          { host_ = h; }
        void setPage(const std::string &p)          { page_ = p; }
        void setTitle(const std::string &t)         { title_ = t; }
        void setDate(const std::string &d)          { date_ = d; }
        void setRevision(const std::string &r)      { revision_ = r; }
        void setCompany(const std::string& c) { company = c; } // 🆕 Setter
        void addBusAlias(const std::string& alias, const std::vector<std::string>& members) {
        busAliases_[alias] = members;
    }

    const std::map<std::string, std::vector<std::string>>& getBusAliases() const {
        return busAliases_;
    }
        void addComment(const std::string &c) { comments_.push_back(c); }
        const std::vector<std::string>& getComments() const { return comments_; }
        // Title block metadata getters
        const std::string& getHost() const          { return host_; }
        const std::string& getPage() const          { return page_; }
        const std::string& getTitle() const         { return title_; }
        const std::string& getDate() const          { return date_; }
        const std::string& getRevision() const      { return revision_; }
        const std::string& getCompany() const { return company; } // 🆕 Optional getter
        // new setters
        void setGeneratorVersion(const std::string &v)      { generatorVersion_ = v; }
        void setRuleArea(float x1, float y1, float x2, float y3)
            { ruleArea_ = {x1,y1,x2,y3}; }
        void addNetclassFlag(const std::string &f)          { netclassFlags_.push_back(f); }
        void setEmbeddedFonts(bool on)                      { embeddedFontsEnabled_ = on; }
        // Handle the schematic root node (kicad_sch)
        void handleKicadSchFromClean(const ast_cleaner::CleanNode &node);

        // new getters (optional, for later printing)
        const std::string&               getGeneratorVersion() const { return generatorVersion_; }
        const std::array<float,4>&       getRuleArea()         const { return ruleArea_; }
        const std::vector<std::string>&  getNetclassFlags()    const { return netclassFlags_; }
        bool                             embeddedFonts()       const { return embeddedFontsEnabled_; }
        

        private:

        double height;
        double width;
        double thickness;
        
        std::string version_;
        std::string generator_;
        std::string uuid_;
        std::string paperSize_;
       
      // library symbols
    std::vector<std::string> libSymbols_;    // individual lib symbol entries (if you want)
    std::string libSymbolsRaw_;              // raw first lib_symbols block

    // unhandled/raw pieces collected during parse
    // std::vector<std::string> rawPieces_;
// new:
  std::vector<std::variant<ShapePtr, RawNode>> rawPieces_;

        // Title block metadata
        std::string host_;
        std::string page_;
        std::string title_;
        std::string date_;
        std::string revision_;

        std::string company;
        std::map<std::string, std::vector<std::string>> busAliases_;
        std::vector<std::string> comments_;
        std::string               generatorVersion_;
        std::array<float,4>       ruleArea_{0,0,0,0};
        std::vector<std::string>  netclassFlags_;
        bool                      embeddedFontsEnabled_{false};
        std::unordered_map<std::string, std::string> properties_;
         std::vector<std::shared_ptr<PCBComponent>> components;  // declare here
         PinType stringToPinType(const std::string& typeStr);
         std::vector<std::string> symbols_;
            std::vector<std::string> wires_;
            std::vector<std::string> junctions_;
            std::vector<std::string> texts_;
       // New live object storage
std::vector<std::shared_ptr<PCBDesign::Shape>> symbolShapes_;
std::vector<std::shared_ptr<PCBDesign::Shape>> wireShapes_;
std::vector<std::shared_ptr<PCBDesign::Shape>> junctionShapes_;
std::vector<std::shared_ptr<PCBDesign::Shape>> textShapes_;

    };

} // namespace PCBDesign

#endif // BASELINE_BOARD_H
