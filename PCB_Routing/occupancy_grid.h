#pragma once
#include <vector>
#include <cstddef>
#include <algorithm>

class OccupancyGrid {
private:
    int layers_ = 0;
    int height_ = 0;
    int width_ = 0;
    std::vector<bool> data_;

    inline size_t idx(int l, int y, int x) const {
        return (static_cast<size_t>(l) * height_ + y) * width_ + x;
    }

public:
    OccupancyGrid() = default;
    OccupancyGrid(int layers, int height, int width);

    void resize(int layers, int height, int width);
    void addLayer();

    inline bool get(int l, int y, int x) const {
        return data_[idx(l, y, x)];
    }
    inline void set(int l, int y, int x, bool value) {
        data_[idx(l, y, x)] = value;
    }
    void clear();

    inline int L() const { return layers_; }
    inline int H() const { return height_; }
    inline int W() const { return width_; }
};
