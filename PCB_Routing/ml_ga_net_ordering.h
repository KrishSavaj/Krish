#pragma once
#include "net_ordering_strategy.h"
#include <string>
#include <vector>
#include <unordered_map>
#include <PCBComponent.h>

class MLGANetOrdering : public NetOrderingStrategy {
public:
    explicit MLGANetOrdering(const std::string& pyScriptPath, const std::string& kicadFile);
    
    std::vector<std::string> orderNets(
        const std::unordered_map<std::string, std::vector<GridPoint>>& net_pin_map,
        const std::vector<PCBDesign::PCBComponent>& components
    ) const override;

private:
    std::string scriptPath_;
    std::string kicadFile_;

};
