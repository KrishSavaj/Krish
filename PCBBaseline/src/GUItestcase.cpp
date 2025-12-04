#include <iostream>
#include <string>
#include <map>
#include <sstream>
#include "../include/attribute.h"
#include "../include/GUIComponent.h"
#include <zmq.hpp>

int main()
{
    // Simple test of the Layer class and GUIComponent functionality.
    Layer layer;
    // cout << "GUI: " << layer.createGUI() << endl;
    cout << "Name: " << layer.getValue("name") << endl;
    cout << "Number: " << layer.getValue("number") << endl;
    cout << "Type: " << layer.getValue("type") << endl;
    cout << "Width: " << layer.getValue("width") << endl;
    cout << "Height: " << layer.getValue("height") << endl;
    // Update the name attribute.
    layer.setValue("name", "1234567890");     // future scope for constraints, idea: we will implement isalphanumeric. If not, we will throw an error.
    layer.setValue("name", "New Layer Name"); // checking for valid value
    layer.setValue("number", "RITIK");        // checking for invalid value
    layer.setValue("number", "101");          // checking for valid value
    layer.setValue("type", "ANISH");          // checking for invalid value
    layer.setValue("type", "2");              // checking for valid value
    layer.setValue("width", "IIT DELHI");     // checking for invalid value
    layer.setValue("width", "100.0");         // checking for valid value
    layer.setValue("height", "HAUZ KHAS");    // checking for invalid value
    layer.setValue("height", "200.0");        // checking for valid value
    // Print the updated name attribute.
    cout << "Updated Name: " << layer.getValue("name") << endl;
    cout << "Updated Number: " << layer.getValue("number") << endl;
    cout << "Updated Type: " << layer.getValue("type") << endl;
    cout << "Updated Width: " << layer.getValue("width") << endl;
    cout << "Updated Height: " << layer.getValue("height") << endl;
    // Print the GUI string.
    string guiString = layer.getGUIstring();
    
    //zeroMQ IPC server

    cout << "initializing zmq IPC server " << endl;
    zmq::context_t context(1);
    zmq::socket_t socket(context, ZMQ_REP);
    socket.bind("ipc:///tmp/zmq_ipc");

    cout << "Server is running, waiting for requests.." << endl;

    while(true)
    { 
        zmq::message_t request;
        socket.recv(request, zmq::recv_flags::none);
        string requestStr = request.to_string();
        cout << "received request: " << requestStr << endl;
    
    if(requestStr == "GET_GUI")
    {
        cout << "Sending GUI Data..." << endl;
        zmq::message_t reply(guiString.size()+1);
        memcpy(reply.data(), guiString.c_str(), guiString.size()+1);
        socket.send(reply, zmq::send_flags::none);
    }
    else
    {
        cerr << "Error: Invalid request received " << requestStr << endl;
    }
    }
    return 0;
}
