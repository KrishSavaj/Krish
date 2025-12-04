#ifndef XMLTREEBUILDER_H
#define XMLTREEBUILDER_H

#include "tree_node.h"
#include "tinyxml2.h"

using namespace tinyxml2;

// Class responsible for parsing XML and building the tree
class XmlTreeBuilder {
public:
    // Function to parse an XML element into a TreeNode
    TreeNode parseXmlElement(XMLElement* element);
};

#endif // XMLTREEBUILDER_H
