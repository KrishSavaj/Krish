#include "./include/xml_tree_builder.h"

// Parse an XML element into a TreeNode
TreeNode XmlTreeBuilder::parseXmlElement(XMLElement* element) {
    TreeNode node(element->Name());

    // Add attributes
    const XMLAttribute* attribute = element->FirstAttribute();
    while (attribute) {
        node.addAttribute(attribute->Name(), attribute->Value());
        attribute = attribute->Next();
    }

    // Add text content if present
    const char* text = element->GetText();
    if (text) {
        node.setText(text);
    }

    // Add children elements
    XMLElement* child = element->FirstChildElement();
    while (child) {
        node.addChild(parseXmlElement(child));
        child = child->NextSiblingElement();
    }

    return node;
}
