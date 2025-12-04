#include "pcb_router.h"
#include <algorithm> // For std::reverse
#include <limits>    // For std::numeric_limits
#include <cmath>     // For std::ceil
#include <iostream>  // For debugging output
#include <unordered_set> // Required for std::unordered_set
#include <PCBComponent.h>
#include <Coordinate.h>
#include <Pin.h>

// --- PcbRouter Implementation ---

PcbRouter::PcbRouter(const RoutingRules& rules)
    : rules_(rules), occupancy_(), algorithm_(nullptr) { }

void PcbRouter::setAlgorithm(std::unique_ptr<RoutingAlgorithm> algo) {
    algorithm_ = std::move(algo);
}
GridPoint PcbRouter::toGridCoordinates(double x, double y, double min_x, double min_y) const {
    return GridPoint{
        static_cast<int>((x - min_x) / rules_.grid_resolution) + grid_margin_,
        static_cast<int>((y - min_y) / rules_.grid_resolution) + grid_margin_,
        0 // Initial layer
    };
}

bool PcbRouter::ripUpConflictingNets(
    const std::vector<GridPoint>& path,
    const std::string& current_net,
    std::unordered_set<std::string>& ripped_nets_in_segment_scope
) {
    bool conflict_found = false;
    for (const auto& pt : path) {
        std::string key = std::to_string(pt.l) + "," + std::to_string(pt.y) + "," + std::to_string(pt.x);
        if (ownership_.count(key) && ownership_[key] != current_net) {
            std::string other_net = ownership_[key];
            if (ripped_nets_in_segment_scope.count(other_net)) continue; // Already marked for rip-up

            std::cout << "  Conflict with " << other_net << ", ripping up...\n";
            conflict_found = true;

            //increment the global rip-up conter
            ripup_reroute_count++;

            // Remove previous traces of conflicting net from occupancy and ownership
            if (routed_paths_.count(other_net)) {
                for (const auto& pt2 : routed_paths_[other_net]) {
                    std::string k = std::to_string(pt2.l) + "," + std::to_string(pt2.y) + "," + std::to_string(pt2.x);
                    occupancy_.set(pt2.l,pt2.y,pt2.x,false);
                    ownership_.erase(k);
                }
                history_[other_net] = routed_paths_[other_net]; // Store for rerouting later
                routed_paths_.erase(other_net);
            }
            ripped_nets_in_segment_scope.insert(other_net);
        }
    }
    return conflict_found;
}

void PcbRouter::applyPathToGrid(
    const std::vector<GridPoint>& path,
    const std::string& net
) {
    // Use min_trace_width and min_trace_spacing from rules_
    double trace_r = (rules_.min_trace_width / 2.0 + rules_.min_trace_spacing) / rules_.grid_resolution;
    int rr = static_cast<int>(std::ceil(trace_r));

    for (const auto& pt : path) {
        for (int dx = -rr; dx <= rr; ++dx) {
            for (int dy = -rr; dy <= rr; ++dy) {
                int x_grid = pt.x + dx;
                int y_grid = pt.y + dy;

                // Ensure coordinates are within bounds
                if (x_grid >= 0 && y_grid >= 0 && x_grid < grid_width_ && y_grid < grid_height_) {
                    occupancy_.set(pt.l,y_grid,x_grid,true);
                    ownership_[std::to_string(pt.l) + "," + std::to_string(y_grid) + "," + std::to_string(x_grid)] = net;
                }
            }
        }
        routed_paths_[net].push_back(pt); // Add points to the routed path for this net
    }
}

void PcbRouter::generateJsonSegments(
    const std::vector<GridPoint>& path,
    const std::string& net,
    double min_x_board, double min_y_board,
    std::vector<nlohmann::json>& segments_output
) {
    if (path.empty()) return;

    size_t i = 0;
    while (i + 1 < path.size()) {
        size_t j = i + 1;
        const auto& start_pt = path[i];
        
        // Initial direction vector components
        //Track direction + layer
        int dx = path[j].x - start_pt.x;
        int dy = path[j].y - start_pt.y;
        int dl = path[j].l - start_pt.l;

        // Checking if this is a VIA
        if (start_pt.l != path[j].l) {
            // Convert grid to board coordinates
            double vx = min_x_board + (start_pt.x - grid_margin_) * rules_.grid_resolution;
            double vy = min_y_board + (start_pt.y - grid_margin_) * rules_.grid_resolution;

            nlohmann::json via_json = {
                {"type", "via"},
                {"net", net},
                {"x", vx},
                {"y", vy},
                {"from_layer", start_pt.l},
                {"to_layer", path[j].l}
            };

            segments_output.push_back(via_json);

            i = j;
            continue;
        }

        // Extend as far as direction and layer remain constant
        while (j + 1 < path.size()) {
            int ndx = path[j + 1].x - path[j].x;
            int ndy = path[j + 1].y - path[j].y;
            int ndl = path[j + 1].l - path[j].l;

            if (ndx == dx && ndy == dy && ndl == dl) {
                ++j;
            } else {
                break; // Direction or layer changed
            }
        }
        
        const auto& end_pt = path[j];

        segments_output.push_back({
            {"type", "segment"},
            {"net", net},
            {"layer", start_pt.l},
            {"start", {min_x_board + (start_pt.x - grid_margin_) * rules_.grid_resolution,
                       min_y_board + (start_pt.y - grid_margin_) * rules_.grid_resolution}},
            {"end",   {min_x_board + (end_pt.x - grid_margin_) * rules_.grid_resolution,
                       min_y_board + (end_pt.y - grid_margin_) * rules_.grid_resolution}}
        });
        
        i = j; // Move to the end of the current segment to start the next
    }
}


bool PcbRouter::routeSegment(
    GridPoint p1, GridPoint p2,
    const std::string& net,
    double min_x_board, double min_y_board,
    std::vector<nlohmann::json>& segments_output
) {
    // Attempt to route
    // Pass 'rules_' to the AStarRouter::route method
    //std::vector<GridPoint> path = astar_router_.route(p1, p2, occupancy_, net, ownership_, rules_);
    std::vector<GridPoint> path = algorithm_->route(p1, p2, occupancy_, net, ownership_, rules_);

    if (path.empty()) {
        return false; // No path found
    }

    // Handle rip-up and retry logic (part of rip-up and reroute strategy)
    std::unordered_set<std::string> ripped_nets_in_segment_scope; // Nets ripped up by this specific segment route
    ripUpConflictingNets(path, net, ripped_nets_in_segment_scope);
    
    // Apply the new path to the grid
    applyPathToGrid(path, net);

    // Generate JSON segments for the output file
    generateJsonSegments(path, net, min_x_board, min_y_board, segments_output);

    return true; // Segment successfully routed (potentially after rip-up)
}

std::vector<std::pair<GridPoint, GridPoint>> PcbRouter::filterMstEdgesByComponent(
    const std::string& net,
    const std::vector<PCBDesign::PCBComponent>& components,
    std::function<GridPoint(double, double)> to_grid_func
) {
    std::vector<GridPoint> pins_for_net;
    std::unordered_map<int, std::string> pin_index_to_component_ref; // Maps index in pins_for_net to component ref


    // Collect all pins belonging to this net and their component references
    for (const auto& comp : components) {
        for (const auto& pin : comp.getPins()) {
            PCBDesign::Coordinate pinpos = pin.getPosition();
            if (pin.getNetName() == net) {
                pins_for_net.push_back(to_grid_func(pinpos.x, pinpos.y));
                pin_index_to_component_ref[pins_for_net.size() - 1] = comp.getRef();
            }
        }
    }

    // Use MST on these pins
    std::vector<std::pair<GridPoint, GridPoint>> all_mst_edges = Utils::MstCalculator::calculate(pins_for_net);

    std::vector<std::pair<GridPoint, GridPoint>> filtered_edges;
    // Iterate through all_mst_edges to find corresponding pin indices
    for (const auto& edge : all_mst_edges) {
        // Find indices of edge.first and edge.second in pins_for_net
        int idx1 = -1, idx2 = -1;
        for(int i = 0; i < pins_for_net.size(); ++i) {
            if (pins_for_net[i] == edge.first) {
                idx1 = i;
            }
            if (pins_for_net[i] == edge.second) {
                idx2 = i;
            }
            if (idx1 != -1 && idx2 != -1) break; // Found both
        }

        if (idx1 != -1 && idx2 != -1 && pin_index_to_component_ref[idx1] != pin_index_to_component_ref[idx2]) {
            filtered_edges.push_back(edge);
        }
    }
    return filtered_edges;
}


std::vector<nlohmann::json> PcbRouter::routeAllNets(const std::vector<PCBDesign::PCBComponent>& components) {
    std::unordered_map<std::string, std::vector<GridPoint>> net_pin_map; // All pins for each net

    // // Compute bounding box of all components' pins to define grid size
    float min_x_board = std::numeric_limits<float>::max();
    float min_y_board = std::numeric_limits<float>::max();
    float max_x_board = std::numeric_limits<float>::lowest();
    float max_y_board = std::numeric_limits<float>::lowest();
// // Compute bounding box of all components' pins to define grid size
    // double min_x_board = std::numeric_limits<double>::infinity();
    // double min_y_board = std::numeric_limits<double>::infinity();
    // double max_x_board = -std::numeric_limits<double>::infinity();
    // double max_y_board = -std::numeric_limits<double>::infinity();


    for (const auto& comp : components) {
        for (const auto& pin : comp.getPins()) {
            PCBDesign::Coordinate pinpos = pin.getPosition();
            min_x_board = std::min(min_x_board, pinpos.x);
            max_x_board = std::max(max_x_board, pinpos.x);
            min_y_board = std::min(min_y_board, pinpos.y);
            max_y_board = std::max(max_y_board, pinpos.y);
            // min_x_board = std::min(min_x_board, static_cast<double>(pinpos.x));
            // max_x_board = std::max(max_x_board, static_cast<double>(pinpos.x));
            // min_y_board = std::min(min_y_board, static_cast<double>(pinpos.y));
            // max_y_board = std::max(max_y_board, static_cast<double>(pinpos.y));
        }
    }

    // Grid dimensions with margins
    // Adding extra margin for routing around the edge of the board or components
    grid_margin_ = rules_.grid_border_margin; 
    grid_width_ = static_cast<int>((max_x_board - min_x_board) / rules_.grid_resolution) + 2 * grid_margin_;
    grid_height_ = static_cast<int>((max_y_board - min_y_board) / rules_.grid_resolution) + 2 * grid_margin_;
    
    std::cout << "Grid width=" << grid_width_
    << ", height=" << grid_height_
    << ", layers=" << rules_.max_initial_layers
    << ", total cells=" 
    << (size_t)grid_width_ * grid_height_ * rules_.max_initial_layers
    << std::endl;

    std::cout << "min_x=" << min_x_board 
          << " max_x=" << max_x_board 
          << " min_y=" << min_y_board 
          << " max_y=" << max_y_board << std::endl;
    
    std::cout << "Number of components received in routeAllNets: " << components.size() << std::endl;
    int totalPins = 0;
    for (const auto& comp : components) {
        std::cout << "  Component: " << comp.getName() 
                << " has " << comp.getPins().size() << " pins.\n";
        totalPins += comp.getPins().size();
    }
    std::cout << "Total pins found: " << totalPins << std::endl;
    

    // Initializing occupancy grid for all layers
    occupancy_.resize(rules_.max_initial_layers,grid_height_, grid_width_);
    ownership_.clear(); // Clear any previous ownership data
    routed_paths_.clear();
    history_.clear();

    // Collecting all net pins and convert to grid coordinates
    auto current_to_grid = [&](double x, double y) {
        return toGridCoordinates(x, y, min_x_board, min_y_board);
    };

    for (const auto& comp : components) {
        for (const auto& pin : comp.getPins()) {
            PCBDesign::Coordinate pinpos = pin.getPosition();
            net_pin_map[pin.getNetName()].push_back(current_to_grid(pinpos.x, pinpos.y));
        }
    }

    // Marking pads and component bodies as blocked in the occupancy grid
    for (const auto& comp : components) {
        // Block pins/pads area
        for (const auto& pin : comp.getPins()) {
            PCBDesign::Coordinate pinpos = pin.getPosition();
            GridPoint grid_pin_center = current_to_grid(pinpos.x, pinpos.y);
            int R = static_cast<int>((rules_.effective_blocked_radius / rules_.grid_resolution) + 1);
            int pad_layer = 0; // Assuming pads are initially on layer 0 for blocking

            for (int dx = -R; dx <= R; ++dx) {
                for (int dy = -R; dy <= R; ++dy) { // Corrected inner loop condition
                    int x = grid_pin_center.x + dx;
                    int y = grid_pin_center.y + dy;
                    if (x >= 0 && y >= 0 && x < grid_width_ && y < grid_height_) {
                        // Mark as occupied only on the specified pad layer
                        if (pad_layer < occupancy_.L()) {
                            occupancy_.set(pad_layer,y,x,true);
                        }
                    }
                }
            }
        }

        // Blocking component body area (simplified bounding box around pins + clearance)
        float cxmin = std::numeric_limits<float>::max(), cymin = std::numeric_limits<float>::max();
        float cxmax = std::numeric_limits<float>::lowest(), cymax = std::numeric_limits<float>::lowest();
        for (const auto& pin : comp.getPins()) {
            PCBDesign::Coordinate pinpos = pin.getPosition();
            cxmin = std::min(cxmin, pinpos.x);
            cymin = std::min(cymin, pinpos.y);
            cxmax = std::max(cxmax, pinpos.x);
            cymax = std::max(cymax, pinpos.y);
        }
        // Using min_component_clearance from rules_
        cxmin -= rules_.min_component_clearance;
        cymin -= rules_.min_component_clearance;
        cxmax += rules_.min_component_clearance;
        cymax += rules_.min_component_clearance;

        int gxmin = static_cast<int>((cxmin - min_x_board) / rules_.grid_resolution) + grid_margin_;
        int gymin = static_cast<int>((cymin - min_y_board) / rules_.grid_resolution) + grid_margin_;
        int gxmax = static_cast<int>((cxmax - min_x_board) / rules_.grid_resolution) + grid_margin_;
        int gymax = static_cast<int>((cymax - min_y_board) / rules_.grid_resolution) + grid_margin_;

        // Ensuring bounding box coordinates are within grid limits
        gxmin = std::max(0, gxmin);
        gymin = std::max(0, gymin);
        gxmax = std::min(grid_width_ - 1, gxmax);
        gymax = std::min(grid_height_ - 1, gymax);

        // Marking component body on layer 0 as occupied
        if (rules_.max_initial_layers > 0) {
            for (int x = gxmin; x <= gxmax; ++x) {
                for (int y = gymin; y <= gymax; ++y) {
                    occupancy_.set(0,y,x,true);
                }
            }
        }
    }


    std::vector<nlohmann::json> final_segments;

    // --- Determining net routing order ---
    std::vector<std::string> net_order = net_ordering_strategy->orderNets(net_pin_map, components);

    std::cout << "Available net names:\n";
    for (auto& kv : net_pin_map) std::cout << "  " << kv.first << "\n";

    std::cout << "Net order from optimizer:\n";
    for (auto& name : net_order) std::cout << "  " << name << "\n";
    // Route each net
    for (const auto& net_name : net_order) {
        const auto& pins = net_pin_map.at(net_name);

        if (net_name == "GND" || pins.size() < 2) continue; // Skip GND (assumed plane) or single-pin nets

        std::cout << "Routing net: " << net_name << std::endl;

        // Use filtered MST edges to prioritize inter-component connections
        std::vector<std::pair<GridPoint, GridPoint>> net_segments_to_route =
            filterMstEdgesByComponent(net_name, components, current_to_grid);

        for (auto& segment_pair : net_segments_to_route) {
            GridPoint p1 = segment_pair.first;
            GridPoint p2 = segment_pair.second;

            bool segment_routed_successfully = false;
            int current_attempts = 0;

            // Try rerouting multiple times, potentially using more layers
            while (!segment_routed_successfully && current_attempts < rules_.max_reroute_attempts) {
                // Iterating through available layers to find a path
                for (int layer_idx = 0; layer_idx < occupancy_.L(); ++layer_idx) {
                    p1.l = layer_idx;
                    p2.l = layer_idx;
                    segment_routed_successfully = routeSegment(p1, p2, net_name, min_x_board, min_y_board, final_segments);
                    if (segment_routed_successfully) break; // Found a path on this layer
                }

                if (!segment_routed_successfully && occupancy_.L() < rules_.max_total_layers) {
                    // Add a new layer if all existing layers failed and max layers not reached
                    occupancy_.addLayer();
                    std::cout << "  Added new layer: " << occupancy_.L() - 1 << "\n";
                    // Try routing on the newly added layer immediately
                    p1.l = occupancy_.L() - 1;
                    p2.l = occupancy_.L() - 1;
                    segment_routed_successfully = routeSegment(p1, p2, net_name, min_x_board, min_y_board, final_segments);
                }
                current_attempts++;
            }

            if (!segment_routed_successfully) {
                std::cout << "  Failed to route segment in net: " << net_name << "\n";
            }
        }

        // Rerouting previously ripped-up nets related to this current net's routing, if any
        for (auto& history_entry : history_) {
            const std::string& rnet = history_entry.first;
            std::cout << "Rerouting ripped net: " << rnet << std::endl;
            routed_paths_[rnet].clear(); // Clear existing (ripped) path data for this net

            // Re-calculate MST edges for the ripped net's pins
            std::vector<std::pair<GridPoint, GridPoint>> reroute_edges =
                filterMstEdgesByComponent(rnet, components, current_to_grid);

            // Attempting to reroute each segment of the ripped net
            for (auto& reroute_segment_pair : reroute_edges) {
                GridPoint u = reroute_segment_pair.first;
                GridPoint v = reroute_segment_pair.second;

                bool reroute_success = false;
                // Try rerouting on all existing layers
                for (int layer_idx = 0; layer_idx < occupancy_.L(); ++layer_idx) {
                    u.l = layer_idx;
                    v.l = layer_idx;
                    reroute_success = routeSegment(u, v, rnet, min_x_board, min_y_board, final_segments);
                    if (reroute_success) break;
                }
                if (!reroute_success) {
                    std::cout << "  Failed to reroute segment for net: " << rnet << "\n";
                }
            }
        }
        history_.clear(); // Clear history after attempting reroutes for this pass
    }

    // Reporting total layers used
    std::unordered_set<int> used_layers;
    for (const auto& pair : routed_paths_) {
        for (const auto& pt : pair.second) {
            used_layers.insert(pt.l);
        }
    }
    std::cout << "Total layers used: " << used_layers.size() << " (out of " << occupancy_.L() << " allocated)\n";
    std::cout << "Total rip-up/reroute events: " << ripup_reroute_count << std::endl;

    int via_count = 0;
    for (auto& seg : final_segments) {
        if (seg.contains("type") && seg["type"] == "via")
            via_count++;
    }
    std::cout << "Total vias used: " << via_count << "\n";

    return final_segments;
}

