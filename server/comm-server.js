var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(6000);

io.on('connection', function (socket) {
    console.log('connected');
    socket.on('vote', function(vote) {
        io.emit('vote', vote);
    });
});