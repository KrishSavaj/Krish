#ifndef SRHANDLER_H
#define SRHANDLER_H

#include <string>

namespace PCBDesign {

// Structure to store Step and Repeat parameters.
struct StepAndRepeat {
    int repX;       // Number of repetitions along the X axis.
    int repY;       // Number of repetitions along the Y axis.
    double offsetX; // Offset in the X direction, in mm.
    double offsetY; // Offset in the Y direction, in mm.
};

// Function to parse a Step and Repeat (SR) command string.
// Example input: "%SRX5Y3I1000J2000*%"
StepAndRepeat parseStepAndRepeat(const std::string &srCommand);

} // namespace PCBDesign

#endif // SRHANDLER_H
