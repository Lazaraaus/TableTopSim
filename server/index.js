
const express = require('express');
const server = express();

const http = require('http').createServer(server);

const io = require('socket.io')(http);

let players = [];

io.on('connection', (socket) => {
    // Log connection
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    // Send chat message
    socket.on('send', (text) => {
        // Package text to emit to all clients
        let sendText = "<" + socket.id + ">" + text;

        // Parse Chat Texts from Chat Commands
        if (text === 'Make Card') {
            console.log("Make Card command was sent");
            io.emit('create token', 130, 180);
        };
        if (text === 'Make Hero') {
            console.log("Make Hero command was sent");
            io.emit('create token', 100, 100);
        };

        // Just normal chat text
        io.emit('receive', sendText);

    })
    
    // Log disconnect
    socket.on('disconnect', () => {
        console.log('A user has disconnected: ' + socket.id);

        players = players.filter(player => player !== socket.id);
    })
})

const PORT = 5001;
http.listen(PORT, () => {
    // log server start
    console.log("Application listneing on PORT: " + PORT);
    console.log("http://localhost:" + PORT);
})
