#include "FormatClassification.h"
#include <iostream>
#include <stdexcept>
#include <cctype>

// Unified parser for format classification.
// This function supports two cases:
// 1) A simple classification string with exactly 5 or 6 non-space characters (e.g. "PM322" or "PM724D").
//    In the case of 6 characters, only the first 5 are used.
// 2) A longer directive header (e.g. "%:/DS X05Y03 ...") in which case it uses the first token.
FormatClassification parseFormatClassification(const std::string &input) {
    // Remove the "%:" prefix if it exists.
    std::string effectiveInput = input;
    if (effectiveInput.find("%:") == 0) {
        effectiveInput = effectiveInput.substr(2); // Remove the first two characters.
    }
    
    // Remove all spaces to produce a condensed string.
    std::string condensed;
    for (char c : effectiveInput) {
        if (!std::isspace(static_cast<unsigned char>(c))) {
            condensed.push_back(c);
        }
    }
    
    FormatClassification fc;
    // Accept classification strings of length 5 or 6.
    if (condensed.size() == 5 || condensed.size() == 6) {
        // Use only the first 5 characters.
        fc.motionType = condensed[0];
        fc.unit = condensed[1];
        fc.digitalMotions = condensed[2] - '0';
        fc.dimensionMotions = condensed[3] - '0';
        fc.simultaneousMotions = condensed[4] - '0';
        // Optionally, handle or log the extra character if condensed.size() == 6.
        if (condensed.size() == 6) {
            // For example:
            // std::cout << "Warning: Extra character '" << condensed[5] << "' ignored in classification." << std::endl;
        }
    }
    else {
        // Otherwise, try to extract the header token.
        size_t pos = effectiveInput.find(' ');
        if (pos != std::string::npos) {
            std::string header = effectiveInput.substr(0, pos);
            // Remove any spaces from header (if any)
            std::string hdr;
            for (char c : header) {
                if (!std::isspace(static_cast<unsigned char>(c))) {
                    hdr.push_back(c);
                }
            }
            if (hdr.size() >= 5) {
                fc.motionType = hdr[0];
                fc.unit = hdr[1];
                fc.digitalMotions = hdr[2] - '0';
                fc.dimensionMotions = hdr[3] - '0';
                fc.simultaneousMotions = hdr[4] - '0';
            }
            else {
                throw std::runtime_error("Invalid classification header: less than 5 characters.");
            }
        }
        else {
            throw std::runtime_error("Classification line does not contain spaces.");
        }
    }
    return fc;
}

// Unified printer for the classification.
void printClassification(const FormatClassification &fc, const std::string &rawLine) {
    std::cout << "[Raw Line] " << rawLine << "\n";
    std::cout << "Format Classification:" << std::endl;
    std::cout << "  Motion type: ";
    switch (fc.motionType) {
        case 'P': std::cout << "Positioning only"; break;
        case 'L': std::cout << "Positioning and line motion"; break;
        case 'D': std::cout << "Positioning, line motion and contouring"; break;
        case 'C': std::cout << "Contouring only"; break;
        default:  std::cout << fc.motionType; break;
    }
    std::cout << std::endl;
    
    std::cout << "  Units: ";
    switch (fc.unit) {
        case 'M': std::cout << "Metric"; break;
        case 'I': std::cout << "Inch"; break;
        case 'N': std::cout << "Both (accepts both)"; break;
        default:  std::cout << fc.unit; break;
    }
    std::cout << std::endl;
    
    std::cout << "  Motions controlled digitally/symbolically: " << fc.digitalMotions << std::endl;
    std::cout << "  Motions controlled by dimension words: " << fc.dimensionMotions << std::endl;
    std::cout << "  Simultaneously controlled motions: " << fc.simultaneousMotions << std::endl;
}
