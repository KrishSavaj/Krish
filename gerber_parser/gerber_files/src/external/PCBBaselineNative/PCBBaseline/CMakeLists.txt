cmake_minimum_required(VERSION 3.14)
project(PCBBaseline LANGUAGES CXX)

# Tell CMake to export compile commands for IntelliSense
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 20)

# Include your GerberParser project
add_subdirectory(${CMAKE_SOURCE_DIR}/../clean_code GerberParserBuild)

# ================================
# 1️⃣ Create a STATIC Library for common logic
# ================================
add_library(PCBBaselineLib STATIC
  src/BaselineBoard.cc
  src/GerberImporter.cc  
  src/AComponent.cc
  src/Coordinate.cc
  src/FundamentalShape.cc
  src/GUIComponent.cpp
  src/Geomclass.cc
  src/Net.cc
  src/PCB.cc
  src/PCBBoard.cc
  src/PCBComponent.cc
  src/Pin.cc
  src/PrintFunctions.cc
  src/Via.cc
  src/Wire.cc
  src/attribute.cpp
)

# ================================
# 2️⃣ Include Directories for the Library
# ================================
target_include_directories(PCBBaselineLib
  PUBLIC src
  PUBLIC ${CMAKE_SOURCE_DIR}/include
  PUBLIC ${CMAKE_SOURCE_DIR}/../clean_code/
  PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include/
)

# Link with GerberParser
target_link_libraries(PCBBaselineLib PRIVATE GerberParser)

# ================================
# 3️⃣ Create the Executable for PCBApp
# ================================
add_executable(PCBApp src/main.cc)

# Link it with the library
target_link_libraries(PCBApp PRIVATE PCBBaselineLib)

