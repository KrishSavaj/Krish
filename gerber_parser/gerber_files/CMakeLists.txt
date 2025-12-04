#CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(PCBBaseline LANGUAGES C CXX)

# Set the standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable directly from source files
add_executable(GUI_serverv13
    src/GUItestcase_v13.cpp
    src/GUIComponent.cpp
    src/attribute.cpp
)


add_custom_target(run_gui
    COMMAND npm install
    COMMAND npx electron .
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/src
    COMMENT "Launching Electron GUI via npx electron..."
)
