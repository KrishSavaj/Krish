#pragma once

#include <string>
#include <vector>
#include <fstream>
#include <iostream>
#include <memory>

#include "GUIComponent.h"
#include "FileArchive.h"

using namespace std;

//---------------------------------------------
// Class: BoardRepeatRecord
//---------------------------------------------
class BoardRepeatRecord : virtual public GUIComponent
{
private:
    std::string name; // Nested step name
    double x;         // Placement X
    double y;         // Placement Y
    double dx;        // Horizontal spacing
    double dy;        // Vertical spacing
    int nx;           // Number of horizontal repetitions
    int ny;           // Number of vertical repetitions
    int angle;        // Rotation angle in degrees
    bool flip;        // Flip flag
    bool mirror;      // Mirror flag

public:
    BoardRepeatRecord();
    BoardRepeatRecord(std::string name, double x, double y, double dx, double dy,
                      int nx, int ny, int angle, bool flip, bool mirror);
    ~BoardRepeatRecord();

    // Getters
    std::string getName() const;
    double getX() const;
    double getY() const;
    double getDX() const;
    double getDY() const;
    int getNX() const;
    int getNY() const;
    int getAngle() const;
    bool isFlipped() const;
    bool isMirrored() const;
};

//---------------------------------------------
// Class: ODBBoardHeaderInfo
//---------------------------------------------
class ODBBoardHeaderInfo : virtual public GUIComponent
{
private:
    std::string units;
    std::string Id;
    double XDatum;
    double YDatum;
    double XOrigin;
    double YOrigin;
    double TopActive;
    double BottomActive;
    double LeftActive;
    double RightActive;
    std::string AffectingBOM;
    bool AffectingBOMChanged;

    std::vector<BoardRepeatRecord *> StepRepeatRecords;

public:
    ODBBoardHeaderInfo();
    explicit ODBBoardHeaderInfo(const Odb::Lib::FileModel::Design::StepHdrFile &hdr);
    ~ODBBoardHeaderInfo();

    std::vector<BoardRepeatRecord *> getBoardRepeatRecords();
    void writeToFile(const std::string &filename = "board_hdr_info") const;
};
