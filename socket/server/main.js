var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    text: "Comenzar Conversación",
    author: "Bot"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
    console.log('Un usuario se ha conectado con Sockets');
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(9090, function() {
    console.log("Servidor corriendo: ");
});