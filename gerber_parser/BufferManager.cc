#include "BufferManager.h"

void BufferManager::storeLine(const std::string& line) {
    buffer.push_back(line);
}

std::string BufferManager::retrieveLastLine() {
    return buffer.empty() ? "" : buffer.back();
}
const std::vector<std::string>& BufferManager::getAllLines() const {
    return buffer;
}
