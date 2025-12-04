#include <PCBBoard.h>
#include <pcb_router.h>     // For PcbRouter and RoutingRules
#include <PCBComponent.h>
#include "nlohmann/json.hpp" // Required for nlohmann::json type in main
#include <astar_router.h>
#include <memory>
#include <iostream>
using namespace PCBDesign;

int main() {
    PCBBoard board;

    //std::vector<PCBDesign::PCBComponent> components;

    // // Load components from the JSON input file
    // JsonManager::loadComponentsFromJson("data_files/merged_components2.json", components);
    
    // if (components.empty()) {
    //     std::cerr << "No components loaded. Exiting." << std::endl;
    //     return 1;
    // }
     board.readDesign("data_files/merged_componentsACDC.json");
    // // Define routing rules
    const RoutingRules rules; // Using default rules, or pass custom values here

//    // Create a PCB router instance
//     PcbRouter pcbRouter(rules);

//     //set routing algorithm 
//     pcbRouter.setAlgorithm(std::make_unique<AStarRouter>()); 
    
//     //Route all nets
//    std::vector<nlohmann::json> routed_segments = pcbRouter.routeAllNets(components);
    
    // // --- Step 2: Run autorouter with given rules ---
    std::cout << "\nStarting autorouting process...\n";
    board.runRouting(rules);

    board.writeSegments("data_files/output_routed.json");

    return 0;
}
