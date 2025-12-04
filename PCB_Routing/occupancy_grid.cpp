#include "occupancy_grid.h"

OccupancyGrid::OccupancyGrid(int layers, int height, int width) {
    resize(layers, height, width);
}

void OccupancyGrid::resize(int layers, int height, int width) {
    layers_ = layers;
    height_ = height;
    width_ = width;
    data_.assign(static_cast<size_t>(layers) * height * width, false);
}

void OccupancyGrid::addLayer() {
    data_.insert(data_.end(), static_cast<size_t>(height_) * width_, false);
    ++layers_;
}

void OccupancyGrid::clear() {
    std::fill(data_.begin(), data_.end(), false);
}
