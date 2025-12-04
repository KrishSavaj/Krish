#pragma once
#include <string>
#include <vector>
#include <unordered_map>
#include <PCBComponent.h>
#include <types.h>

// Base interface for all net ordering strategies
class NetOrderingStrategy {
public:
    virtual ~NetOrderingStrategy() = default;

    // Given all nets and components, it returns the order in which nets should be routed
    virtual std::vector<std::string> orderNets(
        const std::unordered_map<std::string, std::vector<GridPoint>>& net_pin_map,
        const std::vector<PCBDesign::PCBComponent>& components
    ) const = 0;
};
