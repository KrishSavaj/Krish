#ifndef TREENODE_H
#define TREENODE_H

#include <string>
#include <vector>
#include <utility>
#include <fstream>

// using namespace std;

// Class representing a single node in the tree
class TreeNode {
public:
    std::string name;
    std::vector<std::pair<std::string, std::string>> attributes; // Attributes as key-value pairs
    std::string text;
    std::vector<TreeNode> children;

    // Constructor
    // explicit TreeNode(const string& nodeName);
    explicit TreeNode(const std::string& nodeName);

    // Add an attribute
    void addAttribute(const std::string& key, const std::string& value);

    // Add a child node
    void addChild(const TreeNode& child);

    // Set text content
    void setText(const std::string& content);

    // Write the tree to a file recursively
    void writeTreeToFile(std::ofstream& outFile, int depth = 0) const;
};

#endif // TREENODE_H
