const zmq = require("zeromq");

async function runServer() {
    const sock = new zmq.Reply();

    await sock.bind("tcp://127.0.0.1:5555");
    console.log("Server listening on port 5555...");

    for await (const [msg] of sock) {
        console.log(`Received: ${msg.toString()}`);
        await sock.send("Hello from Server!");
    }
}

runServer();
