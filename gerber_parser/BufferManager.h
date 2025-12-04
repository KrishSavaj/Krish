
#ifndef BUFFER_MANAGER_H
#define BUFFER_MANAGER_H

#include <string>
#include <vector>

class BufferManager {
public:
    void storeLine(const std::string& line);
    std::string retrieveLastLine();

    //  New method to access all stored lines
    const std::vector<std::string>& getAllLines() const;

private:
    std::vector<std::string> buffer;
};

#endif // BUFFER_MANAGER_H
