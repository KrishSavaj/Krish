#include "astar_router.h"
#include <algorithm> // std::reverse
#include <queue>
#include <cmath>     // std::ceil
#include <iostream>  // optional debug

// --- AStarRouter Implementation ---
std::vector<GridPoint> AStarRouter::reconstruct_path_from_node(Node* node) {
    std::vector<GridPoint> path;
    Node* current = node;
    while (current) {
        path.push_back({current->x, current->y, current->l});
        current = current->parent;
    }
    std::reverse(path.begin(), path.end());
    return path;
}

std::vector<GridPoint> AStarRouter::route(
    GridPoint start, GridPoint goal,
    OccupancyGrid& occupancy,
    const std::string& net,
    std::unordered_map<std::string, std::string>& ownership,
    const RoutingRules& rules) { // Added rules parameter here in the definition

    int H = occupancy.H();// Grid Height
    int W = occupancy.W();// Grid Width
    int L = occupancy.L();// Number of Layers

    auto heuristic = [&](int x, int y) { return Utils::manhattan(x, y, goal.x, goal.y); };

    std::priority_queue<Node, std::vector<Node>, std::greater<>> open_set;
    // Use std::unordered_map with NodePtr for automatic memory management
    // The key is a string representation of GridPoint
    std::unordered_map<std::string, NodePtr> visited_nodes;

    // Create the start node using a unique_ptr
    NodePtr start_node = std::make_unique<Node>(start.x, start.y, start.l, 0, heuristic(start.x, start.y), nullptr);
    std::string start_key = std::to_string(start.l) + "," + std::to_string(start.y) + "," + std::to_string(start.x);
    visited_nodes[start_key] = std::move(start_node); // Store ownership
    open_set.push(*visited_nodes[start_key]); // Push a copy (or reference if Node supported it without slicing)

    // 8-directional movement (including diagonals)
    std::vector<std::pair<int, int>> dirs = {
        {1,0},{-1,0},{0,1},{0,-1}, // Cardinal directions
        {1,1},{-1,1},{1,-1},{-1,-1} // Diagonal directions
    };

    while (!open_set.empty()) {
        Node current_node_val = open_set.top(); // Get current node (copy)
        open_set.pop();

        std::string current_key = std::to_string(current_node_val.l) + "," + std::to_string(current_node_val.y) + "," + std::to_string(current_node_val.x);

        // Find the actual NodePtr in visited_nodes to get its address
        // This is safe because `visited_nodes` holds unique_ptrs,
        // and current_node_val is a copy used for priority queue ordering.
        Node* current_node_ptr = visited_nodes.at(current_key).get(); 

        // Check if goal reached
        if (current_node_val.x == goal.x && current_node_val.y == goal.y && current_node_val.l == goal.l) {
            return reconstruct_path_from_node(current_node_ptr);
        }

        // Explore neighbors on the same layer
        for (auto [dx, dy] : dirs) {
            int nx = current_node_val.x + dx;
            int ny = current_node_val.y + dy;
            int nl = current_node_val.l; // Same layer

            // Check boundaries
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;

            std::string nkey = std::to_string(nl) + "," + std::to_string(ny) + "," + std::to_string(nx);

            // Check occupancy and ownership:
            // If occupied by another net, skip. If occupied by current net, it's part of the net already.
            // If not occupied, or occupied by current net, proceed.
            if (occupancy.get(nl,ny,nx) && ownership.count(nkey) && ownership[nkey] != net) {
                continue; // Blocked by another net's trace/pad
            }

            // Calculate cost for moving to neighbor
            double move_cost = ((dx != 0 && dy != 0) ? 1.4 : 1.0); // Diagonal cost 1.4, cardinal 1.0
            double new_cost = current_node_val.cost + move_cost;

            // Check if this new path to (nx, ny, nl) is better
            // Use nkey to check if it's already visited, and if so, compare costs.
            if (visited_nodes.count(nkey) && new_cost >= visited_nodes.at(nkey)->cost) {
                continue; // Already found a cheaper or equal path
            }

            // Create new node and add to open set
            NodePtr next_node = std::make_unique<Node>(nx, ny, nl, new_cost, heuristic(nx, ny), current_node_ptr);
            visited_nodes[nkey] = std::move(next_node); // Store ownership
            open_set.push(*visited_nodes[nkey]); // Push a copy (or reference)
        }

        // Explore layer changes (vias)
        for (int nl_via = 0; nl_via < L; ++nl_via) {
            if (nl_via == current_node_val.l) continue; // Skip if same layer

            // Check if the via location on the new layer is occupied by another net
            std::string via_nkey = std::to_string(nl_via) + "," + std::to_string(current_node_val.y) + "," + std::to_string(current_node_val.x);
            if (occupancy.get(nl_via, current_node_val.y,current_node_val.x) && ownership.count(via_nkey) && ownership[via_nkey] != net) {
                continue; // Via location blocked by another net
            }

            double new_cost = current_node_val.cost + rules.via_cost; // Use via_cost from the passed 'rules' parameter
            
            // Check if this path through a via is better
            if (visited_nodes.count(via_nkey) && new_cost >= visited_nodes.at(via_nkey)->cost) {
                continue; // Already found a cheaper or equal path through this via
            }

            // Create new via node and add to open set
            NodePtr via_node = std::make_unique<Node>(current_node_val.x, current_node_val.y, nl_via, new_cost, heuristic(current_node_val.x, current_node_val.y), current_node_ptr);
            visited_nodes[via_nkey] = std::move(via_node); // Store ownership
            open_set.push(*visited_nodes[via_nkey]); // Push a copy (or reference)
        }
    }

    // No path found
    return {};
}