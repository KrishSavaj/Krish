# Makefile for C++ ZeroMQ Server

CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
LDFLAGS = -lzmq -pthread

TARGET = server
SRC = server.cpp

# macOS specific flags (Homebrew installations)
UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
    # Force Homebrew paths first to avoid Anaconda conflicts
    CXXFLAGS := -I/opt/homebrew/include -I/usr/local/include $(CXXFLAGS)
    LDFLAGS := -L/opt/homebrew/lib -L/usr/local/lib $(LDFLAGS)
endif

all: $(TARGET)

$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET) $(LDFLAGS)

clean:
	rm -f $(TARGET)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run
