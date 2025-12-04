#include <iostream>
#include <fstream>
#include <regex>
#include <limits>
#include "../include/BaselineBoard.h"

#define LOG_WARN(msg) \
    std::cerr << "[WARN] " << msg << std::endl

namespace PCBDesign {
    // BaselineBoard Class Implementation

    // Constructor with dimensions
    BaselineBoard::BaselineBoard(double h, double w, double t)
        : height(h), width(w), thickness(t), components({})
    {
    }

    // Default constructor
    BaselineBoard::BaselineBoard()
        : height(0), width(0), thickness(0), components({})
    {
    }

    // Getters
    double BaselineBoard::getHeight() const {
        return height;
    }

    double BaselineBoard::getWidth() const {
        return width;
    }

    double BaselineBoard::getThickness() const {
        return thickness;
    }

    // Setters
    void BaselineBoard::setHeight(double h) {
        height = h;
    }

    void BaselineBoard::setWidth(double w) {
        width = w;
    }

    void BaselineBoard::setThickness(double t) {
        thickness = t;
    }

    // Add a component to the board
    void BaselineBoard::addComponent(const std::shared_ptr<PCBComponent>& comp) {
        components.push_back(comp);
    }

    // Display board details
    void BaselineBoard::display() const {
        std::cout << "Baseline Board Details:" << std::endl;
        std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness << std::endl;

        std::cout << "Components on the board:" << std::endl;
        for (const auto& comp : components) {
            comp->display();
        }
    }

    // Dump function to output board details to stream
    void BaselineBoard::dump(std::ostream &out) const {
    out << "=== Baseline Board Details ===\n";
    out << "Height:      " << height   << " mm\n";
    out << "Width:       " << width    << " mm\n";
    out << "Thickness:   " << thickness<< " mm\n\n";

    out << "=== Board Metadata ===\n";
    out << "Version:      " << version_    << "\n";
    out << "Generator:    " << generator_  << "\n";
    out << "Paper size:   " << paperSize_  << "\n";
    out << "Root UUID:    " << uuid_       << "\n";
  
    out << "=== Title Block ===\n";
    out << "Title:        " << title_      << "\n";
    out << "Date:         " << date_       << "\n";
    out << "Revision:     " << revision_   << "\n";
    out << "Company:      " << company     << "\n\n";

    out << "=== Components ===\n";
    for (const auto& comp : components) {
        comp->dump(out);
    }
      for (const auto &piece : rawPieces_) {
        out << piece << "\n";
    }
}

void BaselineBoard::addLibSymbol(const std::string& symbol) {
    libSymbols.push_back(symbol);
}

const std::vector<std::string>& BaselineBoard::getLibSymbols() const {
    return libSymbols;
}
void BaselineBoard::setLibSymbolsRaw(const std::string &s) {
    libSymbolsRaw_ = s;
    std::cerr << "[BaselineBoard] setLibSymbolsRaw len=" << libSymbolsRaw_.size() << "\n";
}

const std::string &BaselineBoard::getLibSymbolsRaw() const {
    return libSymbolsRaw_;
}

void BaselineBoard::appendRawPiece(const std::string &p) {
    rawPieces_.push_back(p);
    std::cerr << "[BaselineBoard] appendRawPiece idx=" << rawPieces_.size()-1
              << " len=" << p.size()
              << " head=\""
              << (p.size() ? p.substr(0, std::min<size_t>(80, p.size())) : "")
              << "\"\n";
}

const std::vector<std::string>& BaselineBoard::getRawPieces() const {
    return rawPieces_;
}
void BaselineBoard::dumpKiCad(std::ostream &out) const {
    // KiCad schematic files always start with (kicad_sch ...)
    out << "(kicad_sch (version " << version_ << ") (generator " << generator_ << ")\n";

    // --- Page / Paper size ---
    if (!paperSize_.empty()) {
        out << "  (paper " << paperSize_ << ")\n";
    }

    // --- Title block ---
    out << "  (title_block\n";
    if (!title_.empty())    out << "    (title " << title_ << ")\n";
    if (!date_.empty())     out << "    (date " << date_ << ")\n";
    if (!revision_.empty()) out << "    (rev " << revision_ << ")\n";
    if (!company.empty())   out << "    (company " << company << ")\n";
    out << "  )\n";

 if (!libSymbolsRaw_.empty()) {
    out << libSymbolsRaw_ << "\n";
}

    // --- Components ---
    for (const auto& comp : components) {
        comp->dump(out);   // your Component::dump should output in S-expression
    }

     for (const auto &piece : rawPieces_) {
        out << piece << "\n";
    }

    // Close root node
    out << ")\n";
}
void BaselineBoard::handleLibSymbolsCleanNode(const ast_cleaner::CleanNode &clean) {
    std::string piece = ast_cleaner::toString(clean);

    if (!libSymbolsRaw.empty()) {
        if (piece != libSymbolsRaw) {
            LOG_WARN("Duplicate lib_symbols differs; keeping first.");
        }
        return; // skip duplicates
    }
    libSymbolsRaw = piece;
}
void BaselineBoard::handleSymbolFromClean(const ast_cleaner::CleanNode &) {}
void BaselineBoard::handleWireFromClean(const ast_cleaner::CleanNode &) {}
void BaselineBoard::handleJunctionFromClean(const ast_cleaner::CleanNode &) {}
void BaselineBoard::handleTextFromClean(const ast_cleaner::CleanNode &) {}
void BaselineBoard::appendRawPieceFromClean(const ast_cleaner::CleanNode &clean) {
    rawPieces.push_back(ast_cleaner::toString(clean));
}
void BaselineBoard::addProperty(const std::string& key, const std::string& value) {
    properties_[key] = value;
}

const std::unordered_map<std::string, std::string>& BaselineBoard::getProperties() const {
    return properties_;
}

    // Extract dimensions from Gerber file
    void BaselineBoard::extractDimensionsFromGerber(const std::string& filename) {
        std::ifstream file(filename);
        if (!file.is_open()) {
            std::cerr << "Failed to open file: " << filename << std::endl;
            return;
        }

        std::string line;
        std::regex coordRegex(R"(X(-?\d+)Y(-?\d+))");

        double minX = std::numeric_limits<double>::max();
        double maxX = std::numeric_limits<double>::lowest();
        double minY = std::numeric_limits<double>::max();
        double maxY = std::numeric_limits<double>::lowest();

        while (std::getline(file, line)) {
            std::smatch match;
            if (std::regex_search(line, match, coordRegex)) {
                double x = std::stod(match[1]) / 1000000.0; // Convert from microns to mm
                double y = std::stod(match[2]) / 1000000.0;

                minX = std::min(minX, x);
                maxX = std::max(maxX, x);
                minY = std::min(minY, y);
                maxY = std::max(maxY, y);
            }
        }

        file.close();

        // Use extracted values directly to set dimensions
        setWidth(maxX - minX);
        setHeight(maxY - minY);
        setThickness(1.6); // Default thickness in mm
    }
} // namespace PCBDesign

// #include <iostream>
// #include <fstream>
// #include <regex>
// #include <limits>
// #include "../include/BaselineBoard.h"

// namespace PCBDesign {
//     // BaselineBoard Class Implementation

//     // Constructor
//     BaselineBoard::BaselineBoard(double h, double w, double t)
//         : height(h), width(w), thickness(t)
//     {
//         this->components = std::vector<PCBComponent>();
//     }

//     BaselineBoard::BaselineBoard()
//     {
//         this->height = 0;
//         this->width = 0;
//         this->thickness = 0;
//         this->components = std::vector<PCBComponent>();
//     }

//     // Getters
//     double BaselineBoard::getHeight() const {
//         return height;
//     }

//     double BaselineBoard::getWidth() const {
//         return width;
//     }

//     double BaselineBoard::getThickness() const {
//         return thickness;
//     }

//     // Setters
//     void BaselineBoard::setHeight(double h) {
//         height = h;
//     }

//     void BaselineBoard::setWidth(double w) {
//         width = w;
//     }

//     void BaselineBoard::setThickness(double t) {
//         thickness = t;
//     }

//     // Add a fundamental shape to the board
//     void BaselineBoard::addComponent(const PCBComponent& comp) {
//         components.emplace_back(comp);
//     }

//     // Display board details
//     void BaselineBoard::display() const {
//         std::cout << "Baseline Board Details:" << std::endl;
//         std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness << std::endl;

//         std::cout << "Components on the board:" << std::endl;
//         for(const auto& comp : components) {
//             comp.display();
//         }
//     }
//       void BaselineBoard::dump(std::ostream &out) const {
//     out << "Baseline Board Details:\n"
//         << "  Height: " << height << " mm  Width: " << width
//         << " mm  Thickness: " << thickness << " mm\n"
//         << "Components:\n";
//     for (auto &c : components) c.dump(out);
//   }
//     // Extract dimensions from Gerber file
//     void BaselineBoard::extractDimensionsFromGerber(const std::string& filename) {
//         std::ifstream file(filename);
//         if (!file.is_open()) {
//             std::cerr << "Failed to open file: " << filename << std::endl;
//             return;
//         }

//         std::string line;
//         std::regex coordRegex(R"(X(-?\d+)Y(-?\d+))");

//         double minX = std::numeric_limits<double>::max();
//         double maxX = std::numeric_limits<double>::lowest();
//         double minY = std::numeric_limits<double>::max();
//         double maxY = std::numeric_limits<double>::lowest();

//         while (std::getline(file, line)) {
//             std::smatch match;
//             if (std::regex_search(line, match, coordRegex)) {
//                 double x = std::stod(match[1]) / 1000000.0; // Convert from microns to mm
//                 double y = std::stod(match[2]) / 1000000.0;

//                 minX = std::min(minX, x);
//                 maxX = std::max(maxX, x);
//                 minY = std::min(minY, y);
//                 maxY = std::max(maxY, y);
//             }
//         }

//         file.close();

//         // Use extracted values directly to set dimensions
//         setWidth(maxX - minX);
//         setHeight(maxY - minY);
//         setThickness(1.6); // Default thickness in mm
//     }
// } // namespace PCBDesign


// #include "../include/BaselineBoard.h"

// namespace PCBDesign {
//         // BaselineBoard Class Implementation

//     // Constructor
//     BaselineBoard::BaselineBoard(double h, double w, double t)
//         : height(h), width(w), thickness(t)
//     {
//         this->components = std::vector<PCBComponent>();
//     }
    
//     BaselineBoard::BaselineBoard()
//     {
//         this->height = 0;
//         this->width = 0;
//         this->thickness = 0;
//         this->components = std::vector<PCBComponent>();
//     }

//     // Getters
//     double BaselineBoard::getHeight() const {
//         return height;
//     }

//     double BaselineBoard::getWidth() const {
//         return width;
//     }

//     double BaselineBoard::getThickness() const {
//         return thickness;
//     }
//     // Setters
//     void BaselineBoard::setHeight(double h) {
//         height = h;
//     }

//     void BaselineBoard::setWidth(double w) {
//         width = w;
//     }

//     void BaselineBoard::setThickness(double t) {
//         thickness = t;
//     }

//     // Add a fundamental shape to the board
//     void BaselineBoard::addComponent(const PCBComponent& comp) {
//         components.emplace_back(comp);
//     }

//     // Display board details
//     void BaselineBoard::display() const {
//         std::cout << "Baseline Board Details:" << std::endl;
//         std::cout << "Height: " << height << " mm, Width: " << width << " mm, Thickness: " << thickness
//             << std::endl;

//         std::cout << "Components on the board:" << std::endl;
//         for(const auto& comp : components) {
//             comp.display();
//         }
//     }
// }
