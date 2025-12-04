#ifndef SYMBOL_H
#define SYMBOL_H

#include <iostream>
#include <string>
#include <vector>
#include "Pin.h"

namespace PCBDesign{

class Symbol {
    //Symbol class as per the KiCad convention, read more at https://dev-docs.kicad.org/en/file-formats/sexpr-intro/index.html#_symbols
    private:
        std::string library_unit_id;
        std::vector<Pin> pins;
        
    
};

}

#endif // SYMBOL_H