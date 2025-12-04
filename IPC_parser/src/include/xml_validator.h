#ifndef XML_VALIDATOR_H
#define XML_VALIDATOR_H

#include <string>

void validateXML(const std::string& xmlPath, const std::string& schemaPath, const std::string& logFilePath);

#endif // XML_VALIDATOR_H