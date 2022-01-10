let WebSocketModule = require("ws");
let server = WebSocketModule.Server;
let newSocket = new server({ port: 9009 });

let users = [];
newSocket.on("connection", (socket) => {
  console.log("Another client connected");
  socket.on("message", (message) => {
    let inputMess = JSON.parse(message);
    if (inputMess.type === "message") {
      //   console.log(users);
      newSocket.clients.forEach((client) => {
        if (client !== socket)
          client.send(
            JSON.stringify({
              type: "message",
              user: inputMess.user,
              text: inputMess.text,
            })
          );
      });
    } else if (inputMess.type === "user") {
      if (users.includes(inputMess.text)) console.log("+");
      if (!users.includes(inputMess.text)) {
        users.push(inputMess.text);
        console.log(users);
        newSocket.clients.forEach((client) => {
          console.log(inputMess.text);
          client.send(JSON.stringify({ type: "users", text: inputMess.text }));
        });
      }
    }
  });

  socket.on("close", function () {
    console.log("I lost a client");
    users = [];
  });
});
