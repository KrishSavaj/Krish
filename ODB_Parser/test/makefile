CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Wno-address \
    -I/home/ritik/pcbdev/libSrc/OdbDesign_new/OdbDesignLib/FileModel/Design/ \
    -I/home/ritik/pcbdev/libSrc/OdbDesign_new/Utils \
    -I/home/ritik/pcbdev/libSrc/OdbDesign_new/out/build/linux-debug/vcpkg_installed/x64-linux/include/ \
    -I/home/ritik/pcbdev/libSrc/OdbDesign_new/OdbDesignLib \
    -I/home/ritik/pcbdev/libSrc/OdbDesign_new/out/build/linux-release/vcpkg_installed/x64-linux/include \
    -I/home/ritik/vcpkg/packages/crow_x64-linux/include \
    -I/home/ritik/vcpkg/packages/boost-asio_x64-linux/include/boost \
    -I/home/ritik/vcpkg/installed/x64-linux/include/asio \
    -I/home/ritik/pcbdev/ODB_Parser/include \
    -DASIO_STANDALONE

LDFLAGS = -L/home/ritik/pcbdev/libs \
          -Wl,-rpath,/home/ritik/pcbdev/libs \
          -lOdbDesign -lUtils \
          -L/home/ritik/pcbdev/libSrc/OdbDesign_new/out/build/linux-release/vcpkg_installed/x64-linux/lib \
          -Wl,-rpath,/home/ritik/pcbdev/libSrc/OdbDesign_new/out/build/linux-release/vcpkg_installed/x64-linux/lib \
          -lprotobuf -lprotobuf-lite

# List of source files
SRC = src/main.cpp \
      src/extractStepData.cpp \
      src/extractLayerData.cpp \
      src/extractComponentDataFromLayer.cpp \
      src/extractFeaturesDataFromLayer.cpp \
      src/extractAttributeDataFromLayer.cpp \
      src/extractNetlistData.cpp \
      src/extractEddaDData.cpp \
      src/extractAttrListFileFromStep.cpp \
      src/extractProfileFileFromStep.cpp \
      src/extractStepHdrFileData.cpp    \
      src/extractMatrixFileData.cpp \
      src/extractStandardFontsFileData.cpp \
      src/extractSymbolsDirectoriesData.cpp \
      src/extractMiscInfoFileData.cpp \
      src/extractMiscAttrListFile.cpp \


# Convert .cpp files to .o files
OBJ = $(patsubst %.cpp,%.o,$(SRC))

# Output binary name
TARGET = out

all: $(TARGET)

$(TARGET): $(OBJ)
	@echo "Linking $(TARGET) ..."
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ) $(LDFLAGS)
	@touch $(TARGET) # Update timestamp to avoid unnecessary relinks

# Compile each .cpp file into a corresponding .o file
%.o: %.cpp
	@mkdir -p $(dir $@)  # Ensure output directories exist
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)

