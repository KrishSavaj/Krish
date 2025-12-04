cmake_minimum_required(VERSION 3.28.3)
project(ODB_Parser CXX)

# Require C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set paths
set(SRC_DIR ${CMAKE_SOURCE_DIR}/src)
set(INCLUDE_DIR ${CMAKE_SOURCE_DIR}/include)
set(LIB_DIR /home/ritik/thought2design/pcbdev/libs)
set(VCPKG_LIB_DIR /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/out/build/linux-release/vcpkg_installed/x64-linux/lib)

# Find all source files in src directory
file(GLOB_RECURSE SRC_FILES ${SRC_DIR}/*.cpp)

# Define the executable
add_executable(ODB_Parser ${SRC_FILES})

# Include directories
target_include_directories(ODB_Parser PRIVATE 
    ${INCLUDE_DIR}
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/OdbDesignLib
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/OdbDesignLib/FileModel/Design
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/Utils
    /home/ritik/vcpkg/installed/x64-linux/include
)

# Link shared libraries
target_link_directories(ODB_Parser PRIVATE ${LIB_DIR} ${VCPKG_LIB_DIR})
target_link_libraries(ODB_Parser PRIVATE OdbDesign Utils xml2 protobuf protobuf-lite)

# RPATH so binary can locate libs at runtime
set_target_properties(ODB_Parser PROPERTIES
    INSTALL_RPATH "${LIB_DIR};${VCPKG_LIB_DIR}"
)

# Enable warnings
target_compile_options(ODB_Parser PRIVATE -Wall -Wextra -Wno-address)