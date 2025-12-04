cmake_minimum_required(VERSION 3.10)

# Project name and version
project(kicadParser VERSION 1.0 LANGUAGES C CXX)

# Set CMP0079 policy to avoid linking errors
if(POLICY CMP0079)
    cmake_policy(SET CMP0079 NEW)
endif()

# Where to drop executables
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR})

# Find Flex and Bison
find_package(FLEX REQUIRED)
find_package(BISON REQUIRED)

# Directories
set(SRC_DIR       ${CMAKE_CURRENT_SOURCE_DIR}/src)
set(GENERATED_DIR ${CMAKE_CURRENT_BINARY_DIR}/generated)

# Ensure generated folder exists
file(MAKE_DIRECTORY ${GENERATED_DIR})

# Bison: generate parser.cpp + parser.hpp
BISON_TARGET(
  KiCadParserGrammar
  ${SRC_DIR}/parser.y
  ${GENERATED_DIR}/parser.cpp
  DEFINES_FILE ${GENERATED_DIR}/parser.hpp

)

# Flex: generate lexer.cpp
FLEX_TARGET(
  KiCadScanner
  ${SRC_DIR}/lexer.l
  ${GENERATED_DIR}/lexer.cpp
)

# Make the scanner depend on the parser header
ADD_FLEX_BISON_DEPENDENCY(KiCadScanner KiCadParserGrammar)

# Source files for the parser's own executable (do NOT include ast_cleaner.cpp here)
set(KICAD_SOURCES
  ${SRC_DIR}/main.cpp
  ${SRC_DIR}/ast.cpp
  ${SRC_DIR}/sexpr.cpp
  ${SRC_DIR}/sexception.cpp
  ${SRC_DIR}/shapes.cpp

  # Generated files
  ${BISON_KiCadParserGrammar_OUTPUTS}
  ${FLEX_KiCadScanner_OUTPUTS}
)



# Build the parser executable (ast_cleaner *is not* compiled into it directly)
add_executable(kicadParser ${KICAD_SOURCES})
target_include_directories(kicadParser PRIVATE
  ${SRC_DIR}
  ${SRC_DIR}/include
  ${GENERATED_DIR}
  ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Make the core library available BEFORE we bring in PCBBaseline
# (PCBBaseline's CMake will link against kicadCore)
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../PCBBaseline PCBBaselineLib)

# Link the parser executable with the core and with the PCBBaseline lib
target_link_libraries(kicadParser PRIVATE PCBBaselineLib)



# Debug: print include directories
get_target_property(INCLUDE_DIRS kicadParser INCLUDE_DIRECTORIES)
message(STATUS "kicadParser include directories: ${INCLUDE_DIRS}")
