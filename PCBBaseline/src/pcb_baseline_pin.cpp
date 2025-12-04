#include "../include/pcb_baseline_pin.h"
#include <iostream>




PCBBaselinePin::PCBBaselinePin() {



    int pinNumber = 0;
    pinType type = UNDEFINED;
    electricalType electricalTypes = UNDEFINED;
    double x = 0.0;
    double y = 0.0;
    double angle = 0.0;

    // x = isk 10000


    ipc int*x = &x(pcbBaseline)

    

    ipcPin = new IPCPin( );
    odbPin = new ODBPinRecord();
    pcbPin = new PCBDesign::Pin(0, PCBDesign::PinType::UNDEFINED, 0.0, 0.0, 0.0);




    

}


void setPinNumber(int pinNum) { pinNumber = pinNum; }
void setType(pinType t) { type = t; }
void setElectricalType(electricalType eType) { electricalTypes = eType; }
void setX(double xCoord) { 
    x = xCoord;
 }
void setY(double yCoord) { 
    y = yCoord; 
}
void setAngle(double ang) { angle = ang; }
void setPinName(const std::string &name) { pinName = name; }

void getPinNumber() const { return pinNumber; }
void getType() const { return type; }
void getElectricalType() const { return electricalTypes; }
void getX() const { return x; }
void getY() const { return y; }
void getAngle() const { return angle; }
void getPinName() const { return pinName; }


~PCBBaselinePin::~PCBBaselinePin(){
    delete ipcPin;
    delete odbPin;
    delete pcbPin;
}
