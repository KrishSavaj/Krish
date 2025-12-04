const zmq = require("zeromq");

// Displays GUI data in a table format
function displayTable(guiString) {
    const rows = guiString.split(";").filter(row => row.trim() !== ""); // Split by ';'

    console.log("\n╔════════════════╦════════════════╦════════════════╗");
    console.log("║    Name        ║    Value       ║    Type        ║");
    console.log("╠════════════════╬════════════════╬════════════════╣");

    for (const row of rows) {
        if (!row.includes("#")) continue; // Skip empty or incorrect entries

        const parts = row.split("#"); // Split by '#'
        
        // Ensures exactly 3 elements (name, value, type)
        if (parts.length !== 3) {
            console.error(`Warning: Invalid entry -> ${row}`);
            continue;  // Skip this row
        }

        const [name, value, type] = parts;
        console.log(`║ ${name.padEnd(14)} ║ ${value.padEnd(14)} ║ ${type.padEnd(14)} ║`);
    }

    console.log("╚════════════════╩════════════════╩════════════════╝");
}

    //Function requests GUI data from C++ server

    async function getGUIData() {
        const sock = new zmq.Request();
        await sock.connect("ipc:///tmp/zmq_ipc"); //Connect to C++ server

        console.log("Requesting GUI data...");
        await sock.send("GET_GUI"); //Requesting GUI string

        const [reply] = await sock.receive(); //Receive response
        const guiString = reply.toString();

        console.log("\n Received GUI data:");
        console.log(guiString); //Print raw string

        //Parse and display as table
        displayTable(guiString);

        sock.close();
    }

    //Execute client request
    getGUIData();