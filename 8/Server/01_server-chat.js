let WebSocketModule = require('ws')
let server = WebSocketModule.Server;
let newSocket = new server({port: 9009});

newSocket.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log('Received', message);
        socket.send('From server:', message);
    });
    socket.on('close', function() {
        console.log('I lost a client');
    })
});