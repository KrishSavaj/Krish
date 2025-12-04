

#include "./include/xml_validator.h"
#include <iostream>
#include <fstream>
#include <libxml/parser.h>
#include <libxml/xmlschemas.h>
#include <ctime>

// // Custom error handler for logging validation errors
// void xmlValidationErrorHandler(void userData, const xmlErrorPtr* error) {
//     std::ofstream *logFile = static_cast<std::ofstream *>(userData);
//     if (logFile && logFile->is_open() && error && error->message) {
//         *logFile << "Validation Error: " << error->message;
//     }
// }

void validateXML(const std::string &xmlPath, const std::string &schemaPath, const std::string &logFilePath) {
    xmlSchemaParserCtxtPtr parserCtxt = nullptr;
    xmlSchemaPtr schema = nullptr;
    xmlSchemaValidCtxtPtr validCtxt = nullptr;
    xmlDocPtr doc = nullptr;
    
    std::ofstream logFile(logFilePath, std::ios::app); // Append mode
    if (!logFile.is_open()) {
        std::cerr << "Error: Unable to open log file for writing." << std::endl;
        return;
    }

    // Get current timestamp
    time_t now = time(nullptr);
    logFile << "===== XML Validation Log [" << ctime(&now) << "] =====" << std::endl;

    // Check if XML and schema files exist
    std::ifstream xmlFileCheck(xmlPath);
    std::ifstream schemaFileCheck(schemaPath);
    if ((!xmlFileCheck.good()) || (!schemaFileCheck.good())) {
        logFile << "Error: One or both input files do not exist." << std::endl;
        return;
    }

    try {
        // Load the schema
        parserCtxt = xmlSchemaNewParserCtxt(schemaPath.c_str());
        if (!parserCtxt)
            throw std::runtime_error("Failed to create schema parsing context.");

        schema = xmlSchemaParse(parserCtxt);
        if (!schema)
            throw std::runtime_error("Failed to parse schema.");

        validCtxt = xmlSchemaNewValidCtxt(schema);
        if (!validCtxt)
            throw std::runtime_error("Failed to create schema validation context.");

        // Set custom error handler
        // xmlSetStructuredErrorFunc(static_cast<void*>(&logFile), xmlValidationErrorHandler);
        // xmlSetStructuredErrorFunc(static_cast<void*>(&logFile), xmlValidationErrorHandler);


        // Load the XML file
        doc = xmlReadFile(xmlPath.c_str(), nullptr, 0);
        if (!doc)
            throw std::runtime_error("Failed to parse XML file.");

        // Validate the XML against the schema
        int validationResult = xmlSchemaValidateDoc(validCtxt, doc);
        if (validationResult == 0) {
            std::cout << "✅ The XML file is valid against the provided schema." << std::endl;
            logFile << "✅ The XML file is valid against the provided schema." << std::endl;
        } else if (validationResult > 0) {
            std::cout << "❌ The XML file is NOT valid. Validation errors found." << std::endl;
            logFile << "❌ The XML file is NOT valid. Validation errors found." << std::endl;
        } else {
            std::cout << "⚠️ Validation encountered an internal error." << std::endl;
            logFile << "⚠️ Validation encountered an internal error." << std::endl;
        }
    } catch (const std::exception &e) {
        logFile << "❗ Error: " << e.what() << std::endl;
    }

    // Cleanup
    if (doc)
        xmlFreeDoc(doc);
    if (validCtxt)
        xmlSchemaFreeValidCtxt(validCtxt);
    if (schema)
        xmlSchemaFree(schema);
    if (parserCtxt)
        xmlSchemaFreeParserCtxt(parserCtxt);
    xmlCleanupParser();

    logFile << "========================================\n" << std::endl;
    logFile.close();
}
