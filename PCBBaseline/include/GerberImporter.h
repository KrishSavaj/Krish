// #pragma once
// #include "Parser.h"
// #include "BaselineBoard.h"

// /// Parses a Gerber file and fills BaselineBoard
// void importGerber(const std::string& filename, BaselineBoard& board);
#pragma once
#include <string>
#include "Parser.h"
#include "BaselineBoard.h"

namespace PCBDesign {

/// Parses a Gerber file and fills a BaselineBoard
void importGerber(const std::string& filename, BaselineBoard &board);

} // namespace PCBDesign
