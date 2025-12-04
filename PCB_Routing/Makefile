# Makefile for PCB Autorouter Project

# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++17 -Wall -I../PCBBaseline/include -I../PCB_Routing

# Sources
SRC = main.cpp pcb_router.cpp occupancy_grid.cpp astar_router.cpp ml_ga_net_ordering.cpp \
    ../PCBBaseline/src/PCBBoard.cc \
    ../PCBBaseline/src/PCBComponent.cc ../PCBBaseline/src/Pin.cc ../PCBBaseline/src/Coordinate.cc ../PCBBaseline/src/json_utils.cpp\
    
# Executable name
TARGET = main

# Python environment
VENV = venv
PYTHON = $(VENV)/bin/python3
# Default target
all: $(TARGET)

# Build C++ code
$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET)

# Run the full pipeline: C++ -> Python scripts
run: $(TARGET)
	./$(TARGET)

# Clean build files
clean:
	rm -f $(TARGET)

.PHONY: all run clean
