#pragma once

#include <types.h>
#include <utils.h> // For Utils::manhattan
#include "nlohmann/json.hpp" 
#include <vector>
#include <string>
#include <unordered_map>
#include <queue> // For std::priority_queue
#include <unordered_set>   //  for std::unordered_set
#include <memory> // For std::unique_ptr
#include <functional> // For std::function
#include "occupancy_grid.h"
#include <PCBComponent.h>
#include "routing_algorithm.h"

#include "net_ordering_strategy.h"
#include "default_net_ordering.h"


// Main PCB Router class
class PcbRouter {
public:
    //  takes a reference to routing rules
    PcbRouter(const RoutingRules& rules);

    // Setting the routing algorithm (A* or a different algorithm)
    void setAlgorithm(std::unique_ptr<RoutingAlgorithm> algo);

    // Main function to route all nets on the board
    std::vector<nlohmann::json> routeAllNets(const std::vector<PCBDesign::PCBComponent>& components);

    void setNetOrderingStrategy(std::unique_ptr<NetOrderingStrategy> strategy) {
        net_ordering_strategy = std::move(strategy);
    }
private:
    const RoutingRules& rules_; // Reference to routing rules

    // Grid occupancy and ownership data
    OccupancyGrid occupancy_;
    std::unordered_map<std::string, std::string> ownership_; // Grid point key -> net name

    // Paths routed so far, indexed by net name
    std::unordered_map<std::string, std::vector<GridPoint>> routed_paths_;
    // History of ripped-up paths for rerouting
    std::unordered_map<std::string, std::vector<GridPoint>> history_;

    // Dimensions of the routing grid
    int grid_width_;
    int grid_height_;
    int grid_margin_; // Margin applied to grid dimensions

    // Algorithm (polymorphic)
    std::unique_ptr<RoutingAlgorithm> algorithm_;

    //net ordering strategy
    std::unique_ptr<NetOrderingStrategy> net_ordering_strategy;

    // Helper function to convert real-world coordinates to grid coordinates
    GridPoint toGridCoordinates(double x, double y, double min_x, double min_y) const;

    //count how many times rip-up/reroute is called for a netorderingstrategy
    size_t ripup_reroute_count = 0;

    // Helper functions for routeSegment
    bool ripUpConflictingNets(
        const std::vector<GridPoint>& path,
        const std::string& current_net,
        std::unordered_set<std::string>& ripped_nets_in_segment_scope
    );
    void applyPathToGrid(
        const std::vector<GridPoint>& path,
        const std::string& net
    );  
    void generateJsonSegments(
        const std::vector<GridPoint>& path,
        const std::string& net,
        double min_x, double min_y,
        std::vector<nlohmann::json>& segments_output // Output vector for JSON segments
    );

    // Routes a single segment (pin to pin)
    bool routeSegment(
        GridPoint p1, GridPoint p2,
        const std::string& net,
        double min_x, double min_y,
        std::vector<nlohmann::json>& segments_output // Output vector for JSON segments
    );

    // Filters MST edges to only include connections between different components
    std::vector<std::pair<GridPoint, GridPoint>> filterMstEdgesByComponent(
        const std::string& net,
        const std::vector<PCBDesign::PCBComponent>& components,
        std::function<GridPoint(double, double)> to_grid_func
    );
};

