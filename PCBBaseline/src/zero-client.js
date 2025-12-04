import zmq from "zeromq";

async function runClient() {
    const sock = new zmq.Request();
    
    sock.connect("ipc:///tmp/zeromq-ipc");
    console.log("Client connected to server...");

   let SIZE = 100*1024;
   let x = Buffer.alloc(SIZE,"A");
   let t1 = (new Date()).getTime();
   let LIM = 100;
   for (let i =0; i < LIM; i++){
       await sock.send(x);
       await sock.receive();
   }
   let t2= (new Date()).getTime();
   let dur = (t2-t1)/1000;
   let bw = SIZE/dur * LIM;
   bw = bw/ 1000;

   console.log("Size = " + SIZE + "B Bandwidth = " + bw.toFixed(2) + " KB/s");
}

runClient();
