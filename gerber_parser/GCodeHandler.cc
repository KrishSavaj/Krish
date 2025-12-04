#include "GCodeHandler.h"
#include <iostream>
#include <sstream>
#include <cctype>
#include <algorithm>

// Helper function to trim whitespace (and asterisks) from both ends.
void GCodeHandler::trim(std::string& s) {
    // Remove leading whitespace and asterisks.
    s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !std::isspace(ch) && ch != '*';
    }));
    // Remove trailing whitespace and asterisks.
    s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !std::isspace(ch) && ch != '*';
    }).base(), s.end());
}

void GCodeHandler::processGCommand(int gcode, const std::string& params) {
    // Make a local copy of parameters for modification.
    std::string modParams = params;
    
    // Trim whitespace and asterisks.
    trim(modParams);
    
    // Optionally remove a leading 'G' if needed.
    if(gcode == 1 && !modParams.empty() && modParams.front() == 'G') {
        modParams.erase(0, 1);
        trim(modParams);
    }
    
    // Process based on G-code value.
    switch(gcode) {
        case 0: // G00: Rapid Positioning
            std::cout << "G00: Rapid Positioning. Params: " << modParams << std::endl;
            break;
        case 1: // G01: Linear Interpolation
            std::cout << "G01: Linear Interpolation. Params: " << modParams << std::endl;
            break;
        case 2: // G02: Circular Interpolation (clockwise)
            std::cout << "G02: Circular Interpolation (Clockwise). Params: " << modParams << std::endl;
            break;
        case 3: // G03: Circular Interpolation (counter-clockwise)
            std::cout << "G03: Circular Interpolation (Counter-Clockwise). Params: " << modParams << std::endl;
            break;
        case 4: // G04: Dwell
            std::cout << "G04: Dwell. Params: " << modParams << std::endl;
            break;
        case 6: // G06: Parabolic Interpolation
            std::cout << "G06: Parabolic Interpolation. Params: " << modParams << std::endl;
            break;
        case 9: // G09: Exact Stop (after block)
            std::cout << "G09: Exact Stop (after block). Params: " << modParams << std::endl;
            break;
        // --- Unassigned or Reserved G Codes ---
        case 10: case 11: case 12: case 13: case 14: 
        case 15: case 16:
            std::cout << "G" << gcode << ": Unassigned (DDFC)." << std::endl;
            break;

        // --- Plane Selection ---
        case 17: // G17: XY Plane Selection
            std::cout << "G17: XY Plane Selection." << std::endl;
            break;
        case 18: // G18: ZX Plane Selection
            std::cout << "G18: ZX Plane Selection." << std::endl;
            break;
        case 19: // G19: ZY Plane Selection
            std::cout << "G19: ZY Plane Selection." << std::endl;
            break;

        // --- More Unassigned Codes ---
        case 20: case 21: case 22: case 23: case 24:
            std::cout << "G" << gcode << ": Unassigned (DDFC)." << std::endl;
            break;
        case 25: case 26: case 27: case 28: case 29:
            std::cout << "G" << gcode << ": Permanently Unassigned (DDFC)." << std::endl;
            break;
        case 30: case 31: case 32:
            std::cout << "G" << gcode << ": Unassigned (DDFC)." << std::endl;
            break;

        // --- Thread Cutting Commands ---
        case 33: // G33: Thread Cutting, Constant Lead
            std::cout << "G33: Thread Cutting, Constant Lead." << std::endl;
            break;
        case 34: // G34: Thread Cutting, Increasing Lead
            std::cout << "G34: Thread Cutting, Increasing Lead." << std::endl;
            break;
        case 35: // G35: Thread Cutting, Decreasing Lead
            std::cout << "G35: Thread Cutting, Decreasing Lead." << std::endl;
            break;
        case 36: case 37: case 38: case 39:
            std::cout << "G" << gcode << ": Permanently Unassigned (DDFC)." << std::endl;
            break;

        // --- Cutter Compensation & Tool Offset ---
        case 40: // G40: Cancel Cutter Compensation/Tool Offset
            std::cout << "G40: Cancel Cutter Compensation/Tool Offset." << std::endl;
            break;
        case 41: // G41: Cutter Compensation Left
            std::cout << "G41: Cutter Compensation Left." << std::endl;
            break;
        case 42: // G42: Cutter Compensation Right
            std::cout << "G42: Cutter Compensation Right." << std::endl;
            break;
        case 43: // G43: Tool Offset Positive
            std::cout << "G43: Tool Offset Positive." << std::endl;
            break;
        case 44: // G44: Tool Offset Negative
            std::cout << "G44: Tool Offset Negative." << std::endl;
            break;
        case 45: case 46: case 47: case 48: 
        case 49: case 50: case 51: case 52:
            std::cout << "G" << gcode << ": Unassigned (DDFC)." << std::endl;
            break;

        // --- Dimension Shift & Zero Shifts ---
        case 53: // G53: Dimension Shift Cancel
            std::cout << "G53: Dimension Shift Cancel." << std::endl;
            break;
        case 54: case 55: case 56: case 57: case 58: case 59:
            std::cout << "G" << gcode << ": Zero Shift (Displaces program zero)." << std::endl;
            break;

        // --- Exact Stop per Block ---
        case 60: // G60: Exact Stop (after each block)
            std::cout << "G60: Exact Stop (after each block)." << std::endl;
            break;

        // --- Unassigned/Other for G61-G62 ---
        case 61: case 62:
            std::cout << "G" << gcode << ": Unassigned (DDCF)." << std::endl;
            break;

        // --- Tapping ---
        case 63: // G63: Tapping
            std::cout << "G63: Tapping." << std::endl;
            break;

        // --- Continuous Path Mode ---
        case 64: // G64: Continuous-path Mode
            std::cout << "G64: Continuous-path Mode." << std::endl;
            break;

        // --- Unassigned for G65-G69 ---
        case 65: case 66: case 67: case 68: case 69:
            std::cout << "G" << gcode << ": Unassigned (DDCF)." << std::endl;
            break;

        // --- Dimension Input Modes ---
        case 70: // G70: Dimension Input (Inch)
            std::cout << "G70: Dimension Input (Inch)." << std::endl;
            break;
        case 71: // G71: Dimension Input (Metric)
            std::cout << "G71: Dimension Input (Metric)." << std::endl;
            break;

        // --- Unassigned for G72-G73 ---
        case 72: case 73:
            std::cout << "G" << gcode << ": Unassigned (DDCF)." << std::endl;
            break;

        // --- Home Position ---
        case 74: // G74: Home Position
            std::cout << "G74: Home Position." << std::endl;
            break;

        // --- Unassigned for G75-G79 ---
        case 75: case 76: case 77: case 78: case 79:
            std::cout << "G" << gcode << ": Unassigned (DDCF)." << std::endl;
            break;

        // --- Fixed Cycle Cancel ---
        case 80: // G80: Fixed Cycle Cancel
            std::cout << "G80: Fixed Cycle Cancel." << std::endl;
            break;

        // --- Fixed Cycles (G81-G89) ---
        case 81: case 82: case 83: case 84: case 85:
        case 86: case 87: case 88: case 89:
            std::cout << "G" << gcode << ": Fixed Cycle Operation." << std::endl;
            // Implement specific fixed cycle operations (e.g., drilling, tapping, boring) as needed.
            break;

        // --- Dimensioning and Feed Modes ---
        case 91: // G91: Incremental Dimensioning
            std::cout << "G91: Incremental Dimensioning. Params: " << modParams << std::endl;
            // Set relative positioning mode.
            break;
        case 92: // G92: Preload Registers (no motion)
            std::cout << "G92: Preload Registers. Params: " << modParams << std::endl;
            // Set or modify register values without causing motion.
            break;
        case 93: // G93: Inverse Time Feed
            std::cout << "G93: Inverse Time Feed. Params: " << modParams << std::endl;
            // Feed rate is reciprocal to the time to execute the block.
            break;
        case 94: // G94: Feed per Minute
            std::cout << "G94: Feed per Minute. Params: " << modParams << std::endl;
            // Feed rate units: mm/inch per minute.
            break;
        case 95: // G95: Feed per Revolution
            std::cout << "G95: Feed per Revolution. Params: " << modParams << std::endl;
            // Feed rate units: mm/inch per revolution.
            break;
        case 96: // G96: Constant Surface Speed
            std::cout << "G96: Constant Surface Speed. Params: " << modParams << std::endl;
            // S word interpreted as surface speed (m/ft per minute).
            break;
        case 97: // G97: Spindle Speed in RPM
            std::cout << "G97: Spindle Speed in RPM. Params: " << modParams << std::endl;
            // S word interpreted as spindle speed in revolutions per minute.
            break;

        // --- Unassigned or Extended G-codes ---
        case 98: case 99:
            std::cout << "G" << gcode << ": Unassigned (DDFC)." << std::endl;
            break;
        default:
            if(gcode >= 100 && gcode <= 999) {
                std::cout << "G" << gcode << ": Unassigned three-digit G-code (DDFC)." << std::endl;
            } else {
                std::cerr << "Unsupported or unhandled G-code: G" << gcode << std::endl;
            }
            break;
    }
}
void GCodeHandler::handle(const std::string& line) {
    std::cout << "Processing G-code: " << line << std::endl;
    // For instance: "G01 X10 Y20" -> code: 1, params: "X10 Y20"
    if(line.empty())
        return;
    
    std::istringstream iss(line);
    std::string token;
    if(iss >> token) {
        if(token[0] == 'G' || token[0] == 'g') {
            // Remove the letter 'G' and parse the numeric part.
            int gcode = std::stoi(token.substr(1));
            std::string params;
            std::getline(iss, params);
            processGCommand(gcode, params);
        } else {
            std::cerr << "Invalid G-code format: " << line << std::endl;
        }
    }
}

