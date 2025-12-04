#ifndef FORMAT_CLASSIFICATION_H
#define FORMAT_CLASSIFICATION_H

#include <stdexcept>
#include <string>
#include <iostream>
#include <cctype>

struct FormatClassification {
    char motionType;
    char unit;
    int digitalMotions;
    int dimensionMotions;
    int simultaneousMotions;
};
// Function declarations:
FormatClassification parseFormatClassification(const std::string &input);
void printClassification(const FormatClassification &fc,const std::string &rawLine);
#endif // FORMAT_CLASSIFICATION_H
