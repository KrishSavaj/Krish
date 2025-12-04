#include <iostream>
#include <zmq.hpp>
#include <sstream>
#include <vector>
#include <iomanip>

using namespace std;

//Function displays received GUI data string as table
void displayTable(const string &guiString)
{
    vector<vector<string>> tableData;
    stringstream ss(guiString);
    string entry;

    while (getline(ss, entry, ';'))
    {
        if(entry.empty())
            continue;

        stringstream entryStream(entry);
        vector<string> row;
        string value;

        while (getline(entryStream, value, '#'))
        {
            row.push_back(value);
        }

        if(row.size() == 3) //(name,value, type)
            tableData.push_back(row);
    }

    //Table header
    cout << "\n┌───────────────────┬───────────────────┬───────────────────┐" << endl;
    cout << "│ Attribute Name    │ Value             │ Type              │" << endl;
    cout << "├───────────────────┼───────────────────┼───────────────────┤" << endl;

    //Print the rows

    for (const auto &row : tableData)
    {
        cout << "| " << setw(18) << left << row[0]
             << "| " << setw(18) << left << row[1]
             << "| " << setw(18) << left << row[2] << "|" << endl;
    }

    cout << "└───────────────────┴───────────────────┴───────────────────┘" << endl;

}

int main()
{
    zmq::context_t context(1);
    zmq::socket_t socket(context, ZMQ_REQ);
    socket.connect("ipc:///tmp/zmq_ipc");

//send request
    cout << "Requesting GUI Data..." << endl;
    string requestMessage = "GET_GUI";
    zmq::message_t request(requestMessage.size());
    memcpy(request.data(), requestMessage.c_str(), requestMessage.size());
    socket.send(request, zmq::send_flags::none);

// Receive response
    zmq::message_t reply;
    socket.recv(reply, zmq::recv_flags::none);
    string guiString =reply.to_string();

    cout << "\nReceived GUI Data: " << endl;
    cout << guiString <<endl;

    //display in table format
    displayTable(guiString);

    return 0;

}