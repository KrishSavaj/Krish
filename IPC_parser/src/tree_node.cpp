#include "./include/tree_node.h"
#include<iostream>
#include <vector>
#include<utility>
using namespace std;


// Constructor
TreeNode::TreeNode(const string& nodeName) : name(nodeName) {}

// Add an attribute
void TreeNode::addAttribute(const string& key, const string& value) {
    attributes.emplace_back(key, value);
}

// Add a child node
void TreeNode::addChild(const TreeNode& child) {
    children.push_back(child);
}

// Set text content
void TreeNode::setText(const string& content) {
    text = content;
}

// Write the tree to a file recursively
void TreeNode::writeTreeToFile(ofstream& outFile, int depth) const {
    // Indentation for hierarchy
    string indent(depth * 2, ' ');

    // Write the element name
    outFile << indent << name;

    // Write attributes
    if (!attributes.empty()) {
        outFile << " [";
        for (const auto& attr : attributes) {
            outFile << attr.first << "=\"" << attr.second << "\" ";
        }
        outFile << "]";
    }

    // Write text content
    if (!text.empty()) {
        outFile << " : " << text;
    }

    outFile << endl;

    // Recursively write children
    for (const auto& child : children) {
        child.writeTreeToFile(outFile, depth + 1);
    }
}
