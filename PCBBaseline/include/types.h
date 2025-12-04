#pragma once

#include <string>
#include <vector>
#include <tuple>   // For std::tie in GridPoint operator<
#include <functional> // For std::hash specialization
#include <memory>  // For smart pointers (unique_ptr, shared_ptr)
#include <unordered_map>
#include "routing_rules.h"
#include "PCBComponent.h"


// Forward declarations for smart pointers and classes
struct Node; // Declare Node before defining unique_ptr alias
class RoutingRules; // Forward declaration for RoutingRules
class OccupancyGrid;
// Alias for unique pointer to Node, used within A* for ownership
using NodePtr = std::unique_ptr<Node>;

// Represents a point on the routing grid
struct GridPoint {
    int x, y, l; // x-coordinate, y-coordinate, layer

    // Equality comparison
    bool operator==(const GridPoint& o) const { return x == o.x && y == o.y && l == o.l; }
    // Less-than comparison for ordered containers (e.g., std::map, std::set)
    bool operator<(const GridPoint& o) const { return std::tie(x, y, l) < std::tie(o.x, o.y, o.l); }
    // Inequality comparison
    bool operator!=(const GridPoint& o) const { return !(*this == o); }
};

// Custom hash for GridPoint to use it as a key in unordered_map/set
namespace std {
    template <>
    struct hash<GridPoint> {
        size_t operator()(const GridPoint& p) const {
            // Simple hash combination
            return hash<int>()(p.x) ^ (hash<int>()(p.y) << 1) ^ (hash<int>()(p.l) << 2);
        }
    };
}

// Node structure for A* search algorithm
struct Node {
    int x, y, l; // Coordinates (x, y) and layer (l) of the grid point
    double cost; // g-score: cost from the start node to this node
    double est;  // h-score: estimated cost from this node to the goal node (heuristic)
    Node* parent; // Pointer to the parent node in the path for reconstruction

    // Constructor to initialize a node
    Node(int x_coord, int y_coord, int layer, double c, double e, Node* p)
        : x(x_coord), y(y_coord), l(layer), cost(c), est(e), parent(p) {}

    // Comparison operator for priority queue (min-heap)
    // Orders nodes by (cost + est), which is the f-score in A*
    bool operator>(const Node& other) const {
        return (cost + est) > (other.cost + other.est);
    }
};


