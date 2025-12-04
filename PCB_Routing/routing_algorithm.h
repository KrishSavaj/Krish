#pragma once
#include <vector>
#include "types.h"
#include "occupancy_grid.h"
#include "routing_rules.h"

class RoutingAlgorithm {
public:
    virtual ~RoutingAlgorithm() = default;
    virtual std::vector<GridPoint> route(
         GridPoint start,
         GridPoint goal,
        OccupancyGrid& grid,
        const std::string& net,
        std::unordered_map<std::string, std::string>& ownership,
        const RoutingRules& rules
    ) = 0;
};