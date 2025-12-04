#ifndef PRINTFUNCTIONS_H
#define PRINTFUNCTIONS_H

#include "PCBComponent.h"
#include "AComponent.h"
#include "Net.h"
#include "Pin.h"
#include "Wire.h"
#include "Via.h"
#include "FundamentalShape.h"

namespace PCBDesign {

	// Function to print a PCBComponent
	void printPCBComponent(const PCBComponent& component);

	// Function to print an AComponent
	void printAComponent(const AComponent& component);

	// Function to print a Net
	void printNet(const Net& net);

	// Function to print a Pin
	void printPin(const Pin& pin);

	// Function to print a Wire
	void printWire(const Wire& wire);

	// Function to print a Via
	void printVia(const Via& via);

	// Function to print a FundamentalShape
	void printShape(const FundamentalShape& shape);

} // namespace PCBDesign

#endif // PRINTFUNCTIONS_HPP
