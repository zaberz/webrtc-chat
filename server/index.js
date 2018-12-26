const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const os = require('os');

const http = require('http').Server(app);
const https = require('https');
const socket = require('socket.io');

var privateKey = fs.readFileSync(path.join(__dirname, './2_zzz.lizimeow.cn.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './1_zzz.lizimeow.cn_bundle.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);
// todo
const io = socket(httpsServer);
// const io = socket(http);

app.use(express.static(path.join(__dirname, '../dist')));
//allow custom header and CORS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
// let port = 80;
let port = 10000;
http.listen(port, () => {
    console.log('listening on *:' + port);
});

// todo
let httpsPort = 443;
httpsServer.listen(httpsPort, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', httpsPort);
});

io.sockets.on('connection', function (socket) {

    socket.on('createOrJoin', (room) => {
        let clientsInRoom = io.sockets.adapter.rooms[room];
        let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        console.log(numClients);
        if (numClients === 0) {
            socket.join(room);
            console.log('create');
            socket.emit('create', room, socket.id);
        } else if (numClients === 1) {
            // io.sockets.in(room).emit('join', room);
            socket.join(room);
            // socket.emit('joined', room, socket.id);
            socket.to(room).emit('guestJoin', room);
            socket.to(room).emit('ready', room);
            // socket.broadcast.emit('guestJoin', room);
            // io.sockets.in(room).emit('ready', room);
        } else { // max two clients
            socket.emit('full', room);
        }
    });

    socket.on('getOffer', offer => {
        let rooms = Object.keys(socket.rooms).filter(room => (room !== socket.id));
        rooms.map(room => {
            socket.to(room).broadcast.emit('getOffer', offer);
        });
        // socket.broadcast.emit('getOffer', offer);
    });
    socket.on('getAnswer', answer => {
        let rooms = Object.keys(socket.rooms).filter(room => (room !== socket.id));
        rooms.map(room => {
            socket.to(room).broadcast.emit('getAnswer', answer);
        });
        // socket.broadcast.emit('getAnswer', answer);
    });

    socket.on('message', message => {
        let rooms = Object.keys(socket.rooms).filter(room => (room !== socket.id));
        rooms.map(room => {
            socket.to(room).broadcast.emit('message', message);
        });
        // socket.broadcast.emit('message', message);
    });

    socket.on('getAvailableRooms', () => {
        socket.emit('getAvailableRooms', getAvailableRooms(io.sockets.adapter));
    });
    // convenience function to log server messages on the client
    // function log() {
    //     let array = ['Message from server:'];
    //     array.push.apply(array, arguments);
    //     socket.emit('log', array);
    // }
    //
    // socket.on('message', function (message) {
    //     log('Client said: ', message);
    //     // for a real app, would be room-only (not broadcast)
    //     socket.broadcast.emit('message', message);
    // });
    //
    // socket.on('create or join', function (room) {
    //     log('Received request to create or join room ' + room);
    //
    //     let clientsInRoom = io.sockets.adapter.rooms[room];
    //     let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    //     log('Room ' + room + ' now has ' + numClients + ' client(s)');
    //
    //     if (numClients === 0) {
    //         socket.join(room);
    //         log('Client ID ' + socket.id + ' created room ' + room);
    //         socket.emit('created', room, socket.id);
    //     } else if (numClients === 1) {
    //         log('Client ID ' + socket.id + ' joined room ' + room);
    //         // io.sockets.in(room).emit('join', room);
    //         socket.join(room);
    //         socket.emit('joined', room, socket.id);
    //         io.sockets.in(room).emit('ready', room);
    //         socket.broadcast.emit('ready', room);
    //     } else { // max two clients
    //         socket.emit('full', room);
    //     }
    // });
    //
    // socket.on('ipaddr', function () {
    //     let ifaces = os.networkInterfaces();
    //     for (let dev in ifaces) {
    //         ifaces[dev].forEach(function (details) {
    //             if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
    //                 socket.emit('ipaddr', details.address);
    //             }
    //         });
    //     }
    // });
    //
    // socket.on('disconnect', function (reason) {
    //     console.log(`Peer or server disconnected. Reason: ${reason}.`);
    //     socket.broadcast.emit('bye');
    // });
    //
    // socket.on('bye', function (room) {
    //     console.log(`Peer said bye on room ${room}.`);
    // });
});

function getAvailableRooms(adapter) {
    let {rooms, sids} = adapter;
    let availableRooms = Object.keys(rooms).filter(key => {
        return Object.keys(sids).indexOf(key) === -1;
    });
    return availableRooms;
}