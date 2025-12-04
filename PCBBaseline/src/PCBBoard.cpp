#include "../include/PCBBoard.h"
#include <astar_router.h>
#include <iostream>
#include <ml_ga_net_ordering.h>
#include "gnn_net_ordering.h"



namespace PCBDesign {
    // Hole Class Implementation

    Hole::Hole(double x, double y, double diameter)
        : x(x), y(y), diameter(diameter) {}

    double Hole::getX() const {
        return x;
    }

    double Hole::getY() const {
        return y;
    }

    double Hole::getDiameter() const {
        return diameter;
    }

    void Hole::setX(double newX) {
        x = newX;
    }

    void Hole::setY(double newY) {
        y = newY;
    }

    void Hole::setDiameter(double newDiameter) {
        diameter = newDiameter;
    }

    void Hole::display() const {
        std::cout << "Hole [X: " << x << ", Y: " << y
            << ", Diameter: " << diameter << " mm]" << std::endl;
    }

    // BOMEntry Class Implementation

    BOMEntry::BOMEntry(const std::string& name, int quantity, const std::string& manufacturer)
        : componentName(name), quantity(quantity), manufacturer(manufacturer) {}

    std::string BOMEntry::getComponentName() const {
        return componentName;
    }

    int BOMEntry::getQuantity() const {
        return quantity;
    }

    std::string BOMEntry::getManufacturer() const {
        return manufacturer;
    }

    void BOMEntry::setComponentName(const std::string& name) {
        componentName = name;
    }

    void BOMEntry::setQuantity(int qty) {
        quantity = qty;
    }

    void BOMEntry::setManufacturer(const std::string& manuf) {
        manufacturer = manuf;
    }

    void BOMEntry::display() const {
        std::cout << "BOM Entry [Component: " << componentName
            << ", Quantity: " << quantity
            << ", Manufacturer: " << manufacturer << "]" << std::endl;
    }

    // PCBBoard Class Implementation

    PCBBoard::PCBBoard(const std::string& design)
        : design(design) {}

    std::string PCBBoard::getDesign() const {
        return design;
    }

    const std::vector<Hole>& PCBBoard::getHoles() const {
        return holes;
    }

    const std::vector<BOMEntry>& PCBBoard::getBillOfMaterials() const {
        return billOfMaterials;
    }

    void PCBBoard::setDesign(const std::string& newDesign) {
        design = newDesign;
    }

    void PCBBoard::addHole(const Hole& hole) {
        holes.push_back(hole);
    }

    void PCBBoard::addBOMEntry(const BOMEntry& entry) {
        billOfMaterials.push_back(entry);
    }

    void PCBBoard::display() const {
        std::cout << "PCB Board [Design: " << design << "]\n";

        std::cout << "Holes:\n";
        for (const auto& hole : holes) {
            hole.display();
        }

        std::cout << "Bill of Materials (BOM):\n";
        for (const auto& entry : billOfMaterials) {
            entry.display();
        }
    }

        // ----------------- Routing Methods -----------------
        bool PCBBoard::readDesign(const std::string & filename) {
            JsonManager::loadComponentsFromJson(filename, components);
            std::cout << "Loaded " << components.size() << " components.\n";

            if (components.empty()) {
                std::cerr << "Error: No components found in design file.\n";
                return false;
            }
            return true;
        }

        void PCBBoard::runRouting(const RoutingRules& rules) {
            if (components.empty()) {
                std::cerr << "Error: No components loaded before routing!\n";
                return;
            }
            router = std::make_unique<PcbRouter>(rules);
            // Set the net ordering strategy (default here, but can plug in ML later)
            //router->setNetOrderingStrategy(std::make_unique<DefaultNetOrdering>());
            //router->setNetOrderingStrategy(std::make_unique<MLGANetOrdering>("src/ga_optimizer.py", "data/Jamma_rgbuntu_xbox360.kicad_pcb"));
            // router->setNetOrderingStrategy(std::make_unique<GNNNetOrdering>(
            //    "src/gnn_optimizer.cpp",                   // path to your optimizer script
            //    "data/ACtoDCconverter.kicad_pcb",      // .kicad_pcb input
            //    "results/orderings_json",                    // output folder
            //    true                                         // use GA optimization
            // ));

            router->setNetOrderingStrategy(std::make_unique<GNNNetOrdering>(
                "results/net_gnn_model.pt",              // JIT model path
                "data/ACtoDCconverter.kicad_pcb", // KiCad input file
                true                               // use GA
            ));
            
            

            router->setAlgorithm(std::make_unique<AStarRouter>());

            std::cout << "Routing all nets using A* algorithm...\n";
            routed_segments = router->routeAllNets(components);
        }
        void PCBBoard::writeSegments(const std::string& filename) const {
            JsonManager::JsonExporter::saveSegmentsToJson(filename, routed_segments, components);
            std::cout << "Routing results saved to: " << filename << std::endl;
        }
}
