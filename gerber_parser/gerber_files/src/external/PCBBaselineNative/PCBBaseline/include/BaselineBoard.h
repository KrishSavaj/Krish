#ifndef BASELINE_BOARD_H
#define BASELINE_BOARD_H

#include <iostream>
#include <string>
#include <vector>
#include "PCBComponent.h"
#include "PCBObj.h"

namespace PCBDesign {

    // Class to represent the baseline board
    class BaselineBoard : public PCBObj {
    private:
        double height;                        // Height of the board
        double width;                         // Width of the board
        double thickness;                     // Thickness of the board
        std::vector<PCBComponent> components; // Components on the board

    public:
        // Constructor
        BaselineBoard();
        BaselineBoard(double h, double w, double t);

        // Getters
        double getHeight() const;
        double getWidth() const;
        double getThickness() const;
        // Getter for components
        const std::vector<PCBComponent>& getComponents() const;


        // Setters
        void setHeight(double h);
        void setWidth(double w);
        void setThickness(double t);

        // Add a component to the board
        void addComponent(const PCBComponent& comp);

        // Display board details
        void display() const;

        // Extract board dimensions from Gerber file
        void extractDimensionsFromGerber(const std::string& filename);
        // Dump function to output board details to stream

        void dumpAsJSON(std::ostream& os) const;

    };
}

#endif // BASELINE_BOARD_H
