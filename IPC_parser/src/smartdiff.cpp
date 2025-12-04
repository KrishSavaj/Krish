#include <iostream>
#include <string>
#include <vector>
#include <list>
#include "./include/pugixml.hpp"

// ANSI escape codes for console colors
// (For Windows < 10, these may not work)
#define COLOR_RED   "\033[31m"
#define COLOR_GREEN "\033[32m"
#define COLOR_RESET "\033[0m"

/**
 * @brief Recursively prints an entire XML node and its children in RED.
 * This is used when a required node is missing entirely.
 */
void print_node_red(pugi::xml_node node, const std::string& indent) {
    if (node.type() == pugi::node_comment) return;
    if (node.type() == pugi::node_pcdata && std::string(node.value()).find_first_not_of(" \t\n\r") == std::string::npos) return;

    // std::cout << indent << COLOR_RED << "<" << node.name();
    for (pugi::xml_attribute attr : node.attributes()) {
        // std::cout << " " << attr.name() << "=\"" << attr.value() << "\"";
    }

    if (!node.first_child()) {
        // std::cout << " />" << COLOR_RESET << std::endl;
        return;
    }
    // std::cout << ">" << COLOR_RESET << std::endl;

    for (pugi::xml_node child : node.children()) {
        print_node_red(child, indent + "  ");
    }

    // std::cout << indent << COLOR_RED << "</" << node.name() << ">" << COLOR_RESET << std::endl;
}

/**
 * @brief Checks if a target node is a valid "match" for a reference node.
 * A match means:
 * 1. Tag names are identical.
 * 2. All attributes from ref_node exist in target_node with the same value.
 * (target_node is allowed to have *extra* attributes).
 */
bool nodes_are_semantic_match(pugi::xml_node ref_node, pugi::xml_node target_node) {
    if (std::string(ref_node.name()) != std::string(target_node.name())) {
        return false;
    }

    // Check if all attributes from ref are present and correct in target
    for (pugi::xml_attribute ref_attr : ref_node.attributes()) {
        pugi::xml_attribute target_attr = target_node.attribute(ref_attr.name());

        // Target is missing a required attribute
        if (!target_attr) {
            return false;
        }
        
        // Attribute values don't match
        if (std::string(ref_attr.value()) != std::string(target_attr.value())) {
            return false;
        }
    }
    return true;
}

/**
 * @brief The core validation function.
 * Given a reference node, it prints it and its attributes, coloring them
 * based on whether they are found in the corresponding target_match node.
 * * It then recursively validates its children by finding matches for them
 * within the target_match node.
 *
 * @return bool True if all children and attributes were found, False otherwise.
 */
bool validate_and_print_recursive(pugi::xml_node ref_node, pugi::xml_node target_match, const std::string& indent) {
    if (ref_node.type() == pugi::node_comment) return true;
    if (ref_node.type() == pugi::node_pcdata && std::string(ref_node.value()).find_first_not_of(" \t\n\r") == std::string::npos) return true;

    bool all_ok = true;

    // --- 1. Print the Element Tag and Attributes ---
    // std::cout << indent << COLOR_GREEN << "<" << ref_node.name();

    for (pugi::xml_attribute ref_attr : ref_node.attributes()) {
        pugi::xml_attribute target_attr = target_match.attribute(ref_attr.name());

        if (!target_attr || std::string(ref_attr.value()) != std::string(target_attr.value())) {
            // std::cout << COLOR_RED; // Attribute missing or value mismatch
            all_ok = false;
        } else {
            // std::cout << COLOR_GREEN;
        }
        // std::cout << " " << ref_attr.name() << "=\"" << ref_attr.value() << "\"";
    }

    // Check for "blank" attributes in target that are acceptable
    for (pugi::xml_attribute target_attr : target_match.attributes()) {
        if (!ref_node.attribute(target_attr.name()) && std::string(target_attr.value()) == "") {
             // std::cout << COLOR_GREEN << " " << target_attr.name() << "=\"\"";
        }
    }


    if (!ref_node.first_child()) {
        // std::cout << COLOR_GREEN << " />" << COLOR_RESET << std::endl;
        return all_ok;
    }
    // std::cout << COLOR_GREEN << ">" << COLOR_RESET << std::endl;

    // --- 2. Match and Recurse for Children ---
    
    // Get all children from the reference node
    std::vector<pugi::xml_node> ref_children;
    for(pugi::xml_node child : ref_node.children()) {
        if (child.type() != pugi::node_comment && 
           (child.type() != pugi::node_pcdata || std::string(child.value()).find_first_not_of(" \t\n\r") != std::string::npos)) {
            ref_children.push_back(child);
        }
    }

    // Get a mutable list of available children from the target node
    std::list<pugi::xml_node> available_target_children;
    for(pugi::xml_node child : target_match.children()) {
        available_target_children.push_back(child);
    }

    for (pugi::xml_node ref_child : ref_children) {
        bool found_match = false;
        
        // Find a matching node in the target's available children
        for (auto it = available_target_children.begin(); it != available_target_children.end(); ++it) {
            pugi::xml_node target_child = *it;
            if (nodes_are_semantic_match(ref_child, target_child)) {
                
                // Found a match! Recurse.
                if (!validate_and_print_recursive(ref_child, target_child, indent + "  ")) {
                    all_ok = false;
                }
                
                // "Consume" this target node so it can't be matched again
                available_target_children.erase(it); 
                found_match = true;
                break;
            }
        }

        // If no match was found for this ref_child, print it all in red.
        if (!found_match) {
            print_node_red(ref_child, indent + "  ");
            all_ok = false;
        }
    }

    // std::cout << indent << COLOR_GREEN << "</" << ref_node.name() << ">" << COLOR_RESET << std::endl;
    return all_ok;
}


int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: " << argv[0] << " <reference_xml> <output_xml>" << std::endl;
        return 1;
    }

    std::string ref_filename = argv[1];
    std::string target_filename = argv[2];

    pugi::xml_document ref_doc;
    pugi::xml_parse_result ref_result = ref_doc.load_file(ref_filename.c_str());
    if (!ref_result) {
        std::cerr << "Error parsing reference file: " << ref_filename << std::endl;
        std::cerr << "Description: " << ref_result.description() << " at offset " << ref_result.offset << std::endl;
        return 1;
    }

    pugi::xml_document target_doc;
    pugi::xml_parse_result target_result = target_doc.load_file(target_filename.c_str());
    if (!target_result) {
        std::cerr << "Error parsing target file: " << target_filename << std::endl;
        std::cerr << "Description: " << target_result.description() << " at offset " << target_result.offset << std::endl;
        return 1;
    }

    // Start validation from the root element
    pugi::xml_node ref_root = ref_doc.document_element();
    pugi::xml_node target_root = target_doc.document_element();

    // Check if roots themselves are a match before starting
    if (!nodes_are_semantic_match(ref_root, target_root)) {
        // std::cout << "Root element <" << ref_root.name() << "> does not match or is missing attributes in target." << std::endl;
        // Run the print anyway to show the attribute differences
    }

    // std::cout << "--- Validation Log for " << ref_filename << " ---" << std::endl;
    bool success = validate_and_print_recursive(ref_root, target_root, "");
    // std::cout << "--- End of Log ---" << std::endl;

    if (success) {
        // std::cout << "\nValidation Result: " << COLOR_GREEN << "PASSED" << COLOR_RESET << std::endl;
        // std::cout << "output.xml contains all required elements and attributes from smallest_circuit.xml." << std::endl;
    } else {
        // std::cout << "\nValidation Result: " << COLOR_RED << "FAILED" << COLOR_RESET << std::endl;
        // std::cout << "output.xml is missing elements or attributes. See RED items above." << std::endl;
    }

    return success ? 0 : 1;
}