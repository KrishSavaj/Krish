cmake_minimum_required(VERSION 3.28.3)
project(ODB_Parser CXX)

# Require C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set paths
set(SRC_DIR ${CMAKE_SOURCE_DIR}/src)
set(INCLUDE_DIR ${CMAKE_SOURCE_DIR}/include)
set(LIB_DIR /home/ritik/tmp/pcbdev/libs)
set(VCPKG_LIB_DIR /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/out/build/linux-release/vcpkg_installed/x64-linux/lib)

# Find all source files in src directory
file(GLOB_RECURSE SRC_FILES ${SRC_DIR}/*.cpp)

# Define the executable
add_executable(ODB_Parser ${SRC_FILES})

target_include_directories(ODB_Parser PRIVATE 
    ${INCLUDE_DIR}  # ODB_Parser headers
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/OdbDesignLib  # OdbDesign headers
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/OdbDesignLib/FileModel/Design  # StepDirectory.h location
    /home/ritik/thought2design/pcbdev/libSrc/OdbDesign_new/Utils  # Utils for crow_win.h
    /home/ritik/vcpkg/installed/x64-linux/include  # Correct Crow path for crow.h
)


# Link shared libraries
target_link_directories(ODB_Parser PRIVATE ${LIB_DIR} ${VCPKG_LIB_DIR})
target_link_libraries(ODB_Parser PRIVATE OdbDesign Utils protobuf protobuf-lite)

# Set rpath so the executable can find shared libraries at runtime
set_target_properties(ODB_Parser PROPERTIES
    INSTALL_RPATH "${LIB_DIR};${VCPKG_LIB_DIR}"
)

# Enable warnings
target_compile_options(ODB_Parser PRIVATE -Wall -Wextra -Wno-address)
