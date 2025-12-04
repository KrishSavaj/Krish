
#pragma once
#include "routing_algorithm.h"
#include "types.h"
#include "occupancy_grid.h"
#include "utils.h"         
#include <vector>
#include <string>
#include <unordered_map>
#include <memory>

// AStarRouter class inherits from RoutingAlgorithm
class AStarRouter : public RoutingAlgorithm {
    public:
        // Added const RoutingRules& rules parameter
        std::vector<GridPoint> route(
             GridPoint start,
             GridPoint goal,
            OccupancyGrid& occupancy,
            const std::string& net,
            std::unordered_map<std::string, std::string>& ownership,
            const RoutingRules& rules
        ) override;
    
    private:
        std::vector<GridPoint> reconstruct_path_from_node(Node* node);
    };