
// std::string DirectiveHandler::getAxisSelect() const { return axisSelect; }
#include "ImageHandler.h"
#include "GerberImage.h"
#include <iostream>
#include<algorithm>

// Global or member vector to store parsed directives.
// For this implementation, we'll store them as a member variable inside DirectiveHandler.
// (Make sure your DirectiveHandler.h class has: 
//    private:
//       std::vector<GerberDirective> parsedDirectives;
 
// Generalized cleanLine() that removes leading/trailing '%', '*', whitespace and newline characters.
std::string ImageHandler::cleanLine(const std::string& line) {
    std::string lineCopy = line;

    // Remove leading '%' and whitespace/newlines
    while (!lineCopy.empty() && (lineCopy.front() == '%' ||
                                 lineCopy.front() == '\r' ||
                                 lineCopy.front() == '\n' ||
                                 std::isspace(lineCopy.front()))) {
        lineCopy.erase(0, 1);
    }

    // Remove trailing '*' and '%' and whitespace/newlines
    while (!lineCopy.empty() && (lineCopy.back() == '*' ||
                                 lineCopy.back() == '%' ||
                                 lineCopy.back() == '\r' ||
                                 lineCopy.back() == '\n' ||
                                 std::isspace(lineCopy.back()))) {
        lineCopy.pop_back();
    }

    return lineCopy;
}

// Helper: Splits a parameter string using the given delimiter.
std::vector<std::string> ImageHandler::splitParameters(const std::string& params, char delimiter) {
    std::vector<std::string> tokens;
    std::istringstream iss(params);
    std::string token;
    while (std::getline(iss, token, delimiter)) {
        // Remove leading/trailing whitespace from token
        token.erase(token.begin(), std::find_if(token.begin(), token.end(), [](unsigned char ch) {
            return !std::isspace(ch);
        }));
        token.erase(std::find_if(token.rbegin(), token.rend(), [](unsigned char ch) {
            return !std::isspace(ch);
        }).base(), token.end());
        if (!token.empty())
            tokens.push_back(token);
    }
    return tokens;
}

void ImageHandler::processImage(std::string line) {
    // Print the raw directive (for debugging)
    //std::cout << "[Raw Directive]%" << line << "*%" << std::endl;

    // Clean the line first.
    line = cleanLine(line);
    
    // Step 2: Remove a leading '%' if it still exists
    if (!line.empty() && line.front() == '%') {
        line.erase(0, 1);
        std::cout << "Removed extra '%', line now: [" << line << "]" << std::endl;
    }

    // Step 3: Defensive check – must have at least 2 characters for the directive key.
    if (line.length() < 2) {
        std::cout << "[Warning] Skipping short line." << std::endl;
        return;
    }

    // Create a GerberDirective object.
    GerberImage image;
    std::string typeStr = line.substr(0, 2);  // Extract the first two characters as type code.
    image.type = stringToImageType(typeStr);
    image.params = line.substr(2);    // The remaining part is the parameters.

    // Print only if the directive is known
    if (image.type != ImageType::Unknown) {
        std::cout << "Parsed directive: type=[" << imageTypeToString(image.type)
                  << "] params=[" << image.params << "]\n";
    }

    // Store the parsed directive.
    parsedImages.push_back(image);

    // Process further for logging or detailed parsing if needed.
    if (image.type == ImageType::IF) {
        handleIF(line);
    } else if (image.type == ImageType::IJ) {
        handleIJ(line);
    } else if (image.type == ImageType::IN) {
        handleIN(line);
    } else if (image.type == ImageType::IO) {
        handleIO(line);
    } else if (image.type == ImageType::IP) {
        handleIP(line);
    } else if (image.type == ImageType::IR) {
        handleIR(line);
    }
       
}

void ImageHandler::printImages() const {
    std::cout << "=== Image Values (Re-serialized) ===\n";
    for (const auto& d : parsedImages) {
        switch (d.type) {
            case ImageType::IF:
            case ImageType::IJ:
            case ImageType::IN:
            case ImageType::IO:
            case ImageType::IP:
            case ImageType::IR:
                std::cout << d.serialize() << "\n";
                break;
            default:
                // skip everything else
                break;
        }
    }
}

// Getter to access the parsed directives.
const std::vector<GerberImage>& ImageHandler::getParsedImages() const {
    return parsedImages;
}


// --- Existing handlers (you can keep these or refine them as needed) ---

 void ImageHandler::handleIF(const std::string& line) {
    std::string filename = line.substr(2); // Skip "IF"
    std::cout << "  [IF Info] Image File Name: " << filename << "\n";
    this->imageFileName = filename; // store if needed
}

void ImageHandler::handleIJ(const std::string& line) {
    std::string params = line.substr(2); // Skip "IJ"
    std::cout << "  [IJ Info] Justify Params: " << params << "\n";
    this->imageJustify = params; // store if needed
}

void ImageHandler::handleIN(const std::string& line) {
    std::string name = line.substr(2); // Skip "IN"
    std::cout << "  [IN Info] Image Name: " << name << "\n";
    this->imageName = name;
}

void ImageHandler::handleIO(const std::string& line) {
    std::string params = line.substr(2); // Skip "IO"
    std::cout << "  [IO Info] Image Offset: " << params << "\n";
    this->imageOffset = params;
}

void ImageHandler::handleIP(const std::string& line) {
    std::string polarity = line.substr(2); // Skip "IP"
    std::cout << "  [IP Info] Image Polarity: " << polarity << "\n";
    this->imagePolarity = polarity; // "POS" or "NEG"
}

void ImageHandler::handleIR(const std::string& line) {
    std::string angle = line.substr(2); // Skip "IR"
    std::cout << "  [IR Info] Image Rotation Angle: " << angle << " degrees\n";
    this->imageRotation = angle;
}
