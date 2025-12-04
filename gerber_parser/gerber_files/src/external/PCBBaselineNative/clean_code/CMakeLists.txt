cmake_minimum_required(VERSION 3.14)
project(GerberParser LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)

# Create library from your parser code
add_library(GerberParser
  Parser.cc
  CommandProcessor.cc
  ApertureHandler.cc
  ImageHandler.cc
  LayerHandler.cc
  GCodeHandler.cc     
  FCodeHandler.cc    
  FormatHandler.cc
  DirectiveHandler.cc
  FormatClassification.cc
  SRHandler.cc
  TCodeHandler.cc
  ACodeHandler.cc
  BufferManager.cc
  CoordinateProcessor.cc
  DCodeHandler.cc
  ErrorHandler.cc
  GerberObj.cc
  MCodeHandler.cc
  OCodeHandler.cc
  RCodeHandler.cc
)

# Include your own headers
target_include_directories(GerberParser
  PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}
)