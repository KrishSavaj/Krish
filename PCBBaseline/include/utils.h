#pragma once

#include "types.h" // For GridPoint, Component
#include <cmath>
#include <vector>
#include <algorithm> // For std::iota, std::sort
#include <numeric>   // For std::iota
#include <functional> // For std::function

// Namespace for general utility functions and classes
namespace Utils {

// Calculates the Manhattan distance between two grid points (ignoring layer)
inline double manhattan(int x1, int y1, int x2, int y2) {
    return std::abs(x1 - x2) + std::abs(y1 - y2);
}

// Utility class to calculate Minimum Spanning Tree edges
class MstCalculator {
public:
    // Calculates MST edges for a given set of GridPoints.
    // Uses Kruskal's algorithm with Manhattan distance.
    static std::vector<std::pair<GridPoint, GridPoint>> calculate(
        const std::vector<GridPoint>& points) {

        // Store edges as (distance, index1, index2)
        std::vector<std::tuple<double, int, int>> edges;
        for (int i = 0; i < points.size(); ++i) {
            for (int j = i + 1; j < points.size(); ++j) {
                // Use Manhattan distance for edge weight
                edges.emplace_back(manhattan(points[i].x, points[i].y, points[j].x, points[j].y), i, j);
            }
        }

        // Sort edges by distance (ascending)
        std::sort(edges.begin(), edges.end());

        // Union-Find data structure for Kruskal's algorithm
        std::vector<int> parent(points.size());
        std::iota(parent.begin(), parent.end(), 0); // Initialize parent[i] = i

        // Find operation with path compression
        std::function<int(int)> find = [&](int x) {
            if (parent[x] == x) {
                return x;
            }
            return parent[x] = find(parent[x]);
        };

        std::vector<std::pair<GridPoint, GridPoint>> mst_edges_result;
        for (const auto& edge : edges) {
            int i, j;
            double dist;
            std::tie(dist, i, j) = edge; // Unpack tuple

            int root_i = find(i);
            int root_j = find(j);

            if (root_i != root_j) {
                // If they are in different sets, add to MST and union them
                parent[root_i] = root_j; // Union operation
                mst_edges_result.emplace_back(points[i], points[j]);
            }
        }
        return mst_edges_result;
    }
};

// class OccupancyGrid {
// public:
//     OccupancyGrid() = default;
//     OccupancyGrid(int L, int H, int W) { resize(L,H,W); }

//     void resize(int L, int H, int W) {
//         L_ = L; H_ = H; W_ = W;
//         data_.assign(static_cast<size_t>(L)*H*W, 0);
//     }
//     void addLayer() {
//         data_.insert(data_.end(), static_cast<size_t>(H_)*W_, 0);
//         ++L_;
//     }
//     inline bool get(int l,int y,int x) const {
//         return data_[idx(l,y,x)] != 0;
//     }
//     inline void set(int l,int y,int x,bool v) {
//         data_[idx(l,y,x)] = static_cast<uint8_t>(v);
//     }
//     void clear() { std::fill(data_.begin(), data_.end(), 0); }

//     inline int L() const { return L_; }
//     inline int H() const { return H_; }
//     inline int W() const { return W_; }

// private:
//     inline size_t idx(int l,int y,int x) const {
//         return (static_cast<size_t>(l)*H_ + y)*W_ + x;
//     }
//     int L_=0, H_=0, W_=0;
//     std::vector<uint8_t> data_;
// };


} // namespace Utils

