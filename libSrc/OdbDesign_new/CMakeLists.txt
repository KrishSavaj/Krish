# CMakeList.txt : Top-level CMake project file, do global configuration
# and include sub-projects here.
#
cmake_minimum_required(VERSION 3.21)

# -----------------------------
# Automatically use vcpkg if available
# -----------------------------
if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    if(EXISTS "$ENV{HOME}/vcpkg/scripts/buildsystems/vcpkg.cmake")
        set(CMAKE_TOOLCHAIN_FILE "$ENV{HOME}/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain file")
        message(STATUS "Using vcpkg toolchain: ${CMAKE_TOOLCHAIN_FILE}")
        # Force vcpkg to use system binaries permanently
        set(ENV{VCPKG_FORCE_SYSTEM_BINARIES} "1")
    endif()
endif()

project("OdbDesign")

# require C++17 compiler
set(MY_CXX_STANDARD 17)
set(CXX_STANDARD ${MY_CXX_STANDARD})
set(CMAKE_CXX_STANDARD ${MY_CXX_STANDARD})
set(CMAKE_CXX_STANDARD_REQUIRED True)

# only use ccache locally, i.e. not in CI
#if (NOT DEFINED ENV{CI})
#    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_EXE}")
#endif()

# -----------------------------
# GoogleTest support
# -----------------------------
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()

# Enable Hot Reload for MSVC compilers if supported.
if(POLICY CMP0141)
    cmake_policy(SET CMP0141 NEW)
    set(CMAKE_MSVC_DEBUG_INFORMATION_FORMAT "$<IF:$<AND:$<C_COMPILER_ID:MSVC>,$<CXX_COMPILER_ID:MSVC>>,$<$<CONFIG:Debug,RelWithDebInfo>:EditAndContinue>,$<$<CONFIG:Debug,RelWithDebInfo>:ProgramDatabase>>")
endif()

# -----------------------------
# Compiler-specific flags
# -----------------------------
if(MSVC)
    add_compile_options(/W4 /wd4251 /wd4100)
    set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}")
    set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/../../libs")
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}")
else()
    add_compile_options(-Wall -Wextra -Wpedantic -Wno-unused-parameter)
endif()

# -----------------------------
# Include sub-projects
# -----------------------------
add_subdirectory("OdbDesignLib")
add_subdirectory("OdbDesignApp")
add_subdirectory("OdbDesignServer")
add_subdirectory("Utils")
add_subdirectory("OdbDesignTests")
