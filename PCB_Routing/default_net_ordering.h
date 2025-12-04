#pragma once
#include "net_ordering_strategy.h"
#include <algorithm>
#include <cmath>

class DefaultNetOrdering : public NetOrderingStrategy {
public:
    // The default strategy simply orders nets by size
    std::vector<std::string> orderNets(
        const std::unordered_map<std::string, std::vector<GridPoint>>& net_pin_map,
        const std::vector<PCBDesign::PCBComponent>& components
    ) const override {
        std::vector<std::pair<std::string, size_t>> nets;

        for (const auto& [net_name, pins] : net_pin_map) {
            if (net_name == "GND" || pins.size() < 2) continue;
            nets.emplace_back(net_name, pins.size());
        }

        // Default: sort nets by number of pins (descending)
        std::sort(nets.begin(), nets.end(), [](const auto& a, const auto& b) {
            if (a.second != b.second)
                return a.second > b.second; // more pins first
            return a.first < b.first;
        });

        std::vector<std::string> ordered;
        for (auto& n : nets) ordered.push_back(n.first);
        return ordered;
    }
};
