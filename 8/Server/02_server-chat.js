let WebSocketModule = require('ws')
let server = WebSocketModule.Server;
let newSocket = new server({port: 9009});

let users = [];
newSocket.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log('Received', message);
        newSocket.clients.forEach(client => {
            if(client !== socket)
            client.send(`From server: ${message}`);
        })
        
    });
    socket.on('close', function() {
        console.log('I lost a client');
    })
});