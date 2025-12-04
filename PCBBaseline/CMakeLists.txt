cmake_minimum_required(VERSION 3.14)
project(PCBBaseline LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)

# -----------------------------
# 1️⃣ Bring in GerberParser
# -----------------------------
add_subdirectory(${CMAKE_SOURCE_DIR}/../clean_code GerberParserBuild)

# -----------------------------
# 2️⃣ Create a separate AstCleanerLib
# -----------------------------
add_library(AstCleanerLib STATIC
    ../kicad-parser/src/ast_cleaner.cpp
)

target_include_directories(AstCleanerLib PUBLIC
    ../kicad-parser/src/include   # so PCBBaseline and PCBApp can see ast_cleaner.hpp
)

# -----------------------------
# 3️⃣ Build our main PCBBaselineLib
# -----------------------------
add_library(PCBBaselineLib STATIC
  src/BaselineBoard.cc
  src/GerberImporter.cc  
  src/AComponent.cc
  src/Coordinate.cc
  src/FundamentalShape.cc
  src/GUIComponent.cpp
  src/GUIComponentManager.cpp
  src/Geomclass.cc
  src/Net.cc
  src/PCB.cc
  src/PCBBoard.cc
  src/PCBComponent.cc
  # src/Pin.cc      <-- optionally include Pin.cc if needed
  src/PrintFunctions.cc
  src/Via.cc
  src/Wire.cc
  src/attribute.cpp
)

# Public headers
target_include_directories(PCBBaselineLib PUBLIC
  ${CMAKE_CURRENT_LIST_DIR}/include
  ${CMAKE_CURRENT_LIST_DIR}/../clean_code
)

# Include KiCad parser headers
get_filename_component(KICAD_INC
  "${CMAKE_CURRENT_LIST_DIR}/../kicad-parser/src/include"
  ABSOLUTE
)
message(STATUS "✅ KiCad headers at: ${KICAD_INC}")
target_include_directories(PCBBaselineLib PUBLIC ${KICAD_INC})

# Link PCBBaselineLib with GerberParser and AstCleanerLib
target_link_libraries(PCBBaselineLib PRIVATE GerberParser AstCleanerLib)

# -----------------------------
# 4️⃣ Build the main PCBApp executable
# -----------------------------
add_executable(PCBApp src/main.cc)

# Ensure Parser.h & other headers visible
target_include_directories(PCBApp PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/../clean_code
    ${KICAD_INC}
)

# Link executable with PCBBaselineLib (which already links AstCleanerLib)
target_link_libraries(PCBApp PRIVATE PCBBaselineLib)
