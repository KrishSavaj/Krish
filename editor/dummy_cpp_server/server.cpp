#include <zmq.hpp>
#include <iostream>
#include <fstream>
#include <string>
#include <chrono>
#include <iomanip>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Global log file stream
std::ofstream logFile;

// Function to get current timestamp
std::string getCurrentTimestamp() {
    auto now = std::chrono::system_clock::now();
    auto time = std::chrono::system_clock::to_time_t(now);
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
        now.time_since_epoch()) % 1000;
    
    std::stringstream ss;
    ss << std::put_time(std::localtime(&time), "%Y-%m-%d %H:%M:%S")
       << '.' << std::setfill('0') << std::setw(3) << ms.count();
    return ss.str();
}

// Function to log the incoming request
void logRequest(const json& request) {
    logFile << "\n[" << getCurrentTimestamp() << "] ========== INCOMING REQUEST ==========\n";
    logFile << "Type: " << request.value("type", "unknown") << "\n";
    logFile << "Request ID: " << request.value("requestId", "unknown") << "\n";
    logFile << "Payload: " << request.value("payload", json::object()).dump(2) << "\n";
    logFile << "Full Request: " << request.dump(2) << "\n";
    logFile << "======================================\n\n";
    logFile.flush();  // Ensure immediate write
}

// Function to create a success response
json createSuccessResponse(const std::string& requestId, const json& data = json::object()) {
    json response;
    response["requestId"] = requestId;
    response["status"] = 0;  // 0 = no error
    response["message"] = "Success";
    
    if (!data.empty()) {
        response["data"] = data;
    }
    
    return response;
}

// Function to create an error response
json createErrorResponse(const std::string& requestId, const std::string& message) {
    json response;
    response["requestId"] = requestId;
    response["status"] = 1;  // 1 = error
    response["message"] = message;
    
    return response;
}

// Handle getCanvas request
json handleGetCanvas(const json& payload) {
    json data;
    data["version"] = "0.0.1";
    data["components"] = json::array();
    data["wires"] = json::array();
    
    // Add dummy component
    json component;
    component["componentId"] = "1";
    component["canvasComponentId"] = "C1";
    component["position"] = {{"x", 100}, {"y", 150}};
    component["width"] = 50;
    component["height"] = 50;
    data["components"].push_back(component);
    
    // Add dummy wire
    json wire;
    wire["id"] = 1;
    wire["connPoint1"] = {{"canvasComponentId", "C1"}, {"pinId", "P1"}};
    wire["connPoint2"] = {{"canvasComponentId", "C2"}, {"pinId", "P2"}};
    data["wires"].push_back(wire);
    
    return data;
}

// Process request and generate response
json processRequest(const json& request) {
    std::string type = request.value("type", "");
    std::string requestId = request.value("requestId", "unknown");
    json payload = request.value("payload", json::object());
    
    logRequest(request);
    
    // Handle different operation types
    if (type == "getCanvas") {
        json data = handleGetCanvas(payload);
        return createSuccessResponse(requestId, data);
    } 
    else if (type == "addComponent" || 
             type == "deleteComponents" || 
             type == "moveComponent" || 
             type == "rotateComponents" || 
             type == "flipX" || 
             type == "flipY" || 
             type == "resizeComponent" || 
             type == "pasteComponents" || 
             type == "addWire" || 
             type == "deleteWire") {
        // For all other operations, just return success
        return createSuccessResponse(requestId);
    }
    else {
        return createErrorResponse(requestId, "Unknown operation type: " + type);
    }
}

int main() {
    // Open log file
    logFile.open("server.log", std::ios::out | std::ios::app);
    if (!logFile.is_open()) {
        std::cerr << "Error: Could not open log file\n";
        return 1;
    }
    
    // Create ZeroMQ context and socket
    zmq::context_t context(1);
    zmq::socket_t socket(context, zmq::socket_type::rep);
    
    std::string endpoint = "tcp://*:5555";
    
    try {
        socket.bind(endpoint);
        logFile << "\n[" << getCurrentTimestamp() << "] ✓ Dummy C++ Server started successfully\n";
        logFile << "[" << getCurrentTimestamp() << "] ✓ Listening on " << endpoint << "\n";
        logFile << "[" << getCurrentTimestamp() << "] ✓ Waiting for requests...\n\n";
        logFile.flush();
        
        std::cout << "✓ Server started - logging to server.log\n";
    } catch (const zmq::error_t& e) {
        logFile << "[" << getCurrentTimestamp() << "] Error binding socket: " << e.what() << "\n";
        logFile.close();
        std::cerr << "Error binding socket: " << e.what() << std::endl;
        return 1;
    }
    
    while (true) {
        try {
            // Receive request
            zmq::message_t request_msg;
            auto result = socket.recv(request_msg, zmq::recv_flags::none);
            
            if (!result) {
                logFile << "[" << getCurrentTimestamp() << "] Error receiving message\n";
                logFile.flush();
                continue;
            }
            
            // Parse JSON request
            std::string request_str(static_cast<char*>(request_msg.data()), request_msg.size());
            json request;
            
            try {
                request = json::parse(request_str);
            } catch (const json::parse_error& e) {
                logFile << "[" << getCurrentTimestamp() << "] JSON parse error: " << e.what() << "\n";
                logFile.flush();
                
                // Send error response
                json error_response = createErrorResponse("unknown", "Invalid JSON format");
                std::string response_str = error_response.dump();
                zmq::message_t response_msg(response_str.size());
                memcpy(response_msg.data(), response_str.c_str(), response_str.size());
                socket.send(response_msg, zmq::send_flags::none);
                continue;
            }
            
            // Process request and create response
            json response = processRequest(request);
            
            // Log response
            logFile << "[" << getCurrentTimestamp() << "] ========== SENDING RESPONSE ==========\n";
            logFile << response.dump(2) << "\n";
            logFile << "======================================\n\n";
            logFile.flush();
            
            // Send response
            std::string response_str = response.dump();
            zmq::message_t response_msg(response_str.size());
            memcpy(response_msg.data(), response_str.c_str(), response_str.size());
            socket.send(response_msg, zmq::send_flags::none);
            
        } catch (const zmq::error_t& e) {
            logFile << "[" << getCurrentTimestamp() << "] ZeroMQ error: " << e.what() << "\n";
            logFile.flush();
            break;
        } catch (const std::exception& e) {
            logFile << "[" << getCurrentTimestamp() << "] Unexpected error: " << e.what() << "\n";
            logFile.flush();
        }
    }
    
    logFile << "[" << getCurrentTimestamp() << "] Server shutting down\n";
    logFile.close();
    return 0;
}
