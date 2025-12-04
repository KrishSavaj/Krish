cmake_minimum_required(VERSION 3.10)

# Project name and settings
project(IPC_PARSER)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Option to use a custom libxml2 installation
option(USE_CUSTOM_LIBXML2 "Use custom libxml2 installation" ON)

if(USE_CUSTOM_LIBXML2)
    # Specify the custom paths for libxml2 relative to the current directory
    set(LIBXML2_INCLUDE_DIRS "${CMAKE_CURRENT_SOURCE_DIR}/../libs/include/libxml2")
    # set(LIBXML2_LIBRARY_DIRS "${CMAKE_CURRENT_SOURCE_DIR}/../libs/lib")
    set(LIBXML2_LIBRARIES "${CMAKE_CURRENT_SOURCE_DIR}/../libs/libxml2.so.2.14.0")
# else()
#     # Use pkg-config to locate the system default libxml2 installation
#     find_package(PkgConfig REQUIRED)
#     pkg_check_modules(LIBXML2 REQUIRED libxml-2.0)
endif()

# Set include and library directories
set(PCBBaseline_DIR ${CMAKE_SOURCE_DIR}/../PCBBaseline)
include_directories(${PCBBaseline_DIR}/include)  # Include PCBComponent.h & GUIComponent.h

# include_directories(${CMAKE_SOURCE_DIR}/../PCBBaseline/include)

# include_directories(../../PCBBaseline/src)
include_directories(${LIBXML2_INCLUDE_DIRS})
link_directories(${LIBXML2_LIBRARY_DIRS})
set(CMAKE_BUILD_TYPE Debug)


# Define the source files for the project
set(SOURCE_FILES
    ${CMAKE_SOURCE_DIR}/src/main.cpp 
    ${CMAKE_SOURCE_DIR}/src/tinyxml2.cpp 
    ${CMAKE_SOURCE_DIR}/src/tree_node.cpp 
    ${CMAKE_SOURCE_DIR}/src/xml_tree_builder.cpp
    ${CMAKE_SOURCE_DIR}/src/xml_validator.cpp
    ${CMAKE_SOURCE_DIR}/src/net.cpp
    ${CMAKE_SOURCE_DIR}/src/polyline.cpp
    ${CMAKE_SOURCE_DIR}/src/ecad.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_component.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc2581c.cpp
    ${CMAKE_SOURCE_DIR}/src/cad_header.cpp
    ${CMAKE_SOURCE_DIR}/src/cad_data.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_layer.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_step.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_package.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_layer_feature.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_polygon.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_pin.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_marking.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_line.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_history_record.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_content.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_logistic_header.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_non_standard_attribute.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_outline.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_assembly_drawing.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_line.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_user_special.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_polyline.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_silkscreen.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_pick_up_point.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_xForm.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_location.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_set.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_feature.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_pad.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_datum.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_bom.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_bom_header.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_bom_item.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_avl.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_avl_header.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_avl_item.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_profile.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_padstackdef.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_shapes.cpp
    ${CMAKE_SOURCE_DIR}/src/ipc_user_primitive_ref.cpp



    ${PCBBaseline_DIR}/src/GUIComponent.cpp





)

# Create the executable target
add_executable(${PROJECT_NAME} ${SOURCE_FILES})

# Link libxml2 to the target
target_link_libraries(${PROJECT_NAME} ${LIBXML2_LIBRARIES})

# Enable additional compiler warnings
target_compile_options(${PROJECT_NAME} PRIVATE -Wall -Wextra)

# Force include common header in all source files
target_compile_options(${PROJECT_NAME} PRIVATE -include ${CMAKE_SOURCE_DIR}/src/include/common.h)

# Add any additional include directories if necessary (e.g., project-specific headers)
target_include_directories(${PROJECT_NAME} PRIVATE ${LIBXML2_INCLUDE_DIRS} ${CMAKE_SOURCE_DIR}/include)


