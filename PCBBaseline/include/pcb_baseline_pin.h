#ifndef PCBASELINE_PIN_H
#define PCBASELINE_PIN_H

#include  "../../IPC_parser/src/include/ipc_pin.h"
#include  "../../ODB_Parser/include/ODBBoardEdaData.h"
#include "pin.h"



class PCBBaselinePin {
    private:
    enum electricalType{
        ELECTRICAL,
        MECHANICAL,
        UNDEFINED,
    };
    enum pinType {
        SURFACE,
        THRU,  
        BLIND,
    };
        int pinNumber,
        pinType type,
        electricalType electricalTypes, 
        double x, 
        double y, 
        double angle
        std::string pinName;


        IPCPin *ipcPin;
        ODBPinRecord *odbPin;
        PCBDesign::Pin *pcbPin;



    public:
        PCBBaselinePin();
        void setPinNumber(int pinNum);
        void setType(pinType t);
        void setElectricalType(electricalType eType);
        void setX(double xCoord);
        void setY(double yCoord);
        void setAngle(double ang);
        void setPinName(const std::string &name);

        void getPinNumber() const;
        void getType() const;
        void getElectricalType() const;
        void getX() const;
        void getY() const;
        void getAngle() const;
        void getPinName() const;
        ~PCBBaselinePin();

};


#endif