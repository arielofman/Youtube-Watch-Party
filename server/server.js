var express = require('express')
var cors = require('cors')
const scraper = require('./scraper')

const SERVER_USERNAME = "System Message";

const { addUserToRoom, getUserByIdFromRoom, deleteUserFromRoom, getUsersFromRoom, setRoomHostById, getTotalUsersInRoom, getHostIdFromRoom, deleteUserRoom } = require('./users')

const { getCurrentTime } = require('./time')

var app = express()
var http = require('http').createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: '*', // TODO: change this in production
    }
});

app.get('/', function (req, res) {
    res.send('Youtube Watch Party Server')
});

var corsOptions = {
    origin: '*', // TODO: change this in production
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//API route
app.get('/api/search', cors(corsOptions), (req, res) => {
    scraper.youtube(req.query.q, req.query.key, req.query.pageToken)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

http.listen(process.env.PORT || 5000, function () {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at http://%s:%s', host, port)
});

io.on('connection', function (socket) {

    socket.on('join', ({ username, roomId }, callback) => {
        const user = addUserToRoom(socket.id, username, roomId)
        socket.join(roomId)

        if (user.host) {
            io.to(socket.id).emit('server:promote-to-host');
        }

        io.to(roomId).emit('server:new-joiner', { username: SERVER_USERNAME, content: `${username} just entered the room!`, time: getCurrentTime(), isServer: true }); // emit to all in room

        io.to(roomId).emit('server:total-users', { totalUsers: getTotalUsersInRoom(roomId) }); // emit to all in room

        socket.on("disconnect", () => {
            const wasHost = getUserByIdFromRoom(socket.id, roomId).host

            deleteUserFromRoom(socket.id, roomId)

            io.to(roomId).emit('server:disconnected', { username: SERVER_USERNAME, content: `${username} has just disconnected!`, time: getCurrentTime(), isServer: true }); // emit to all in room          

            if (getTotalUsersInRoom(roomId) > 0 && wasHost) {
                let randomUser = getUsersFromRoom(roomId)[0]
                setRoomHostById(randomUser.id, roomId, true)
                io.to(randomUser.id).emit('server:promote-to-host');
            }

            if (getTotalUsersInRoom(roomId) > 0) {
                io.to(roomId).emit('server:total-users', { totalUsers: getTotalUsersInRoom(roomId) }); // emit to all in room
            } else {
                deleteUserRoom(roomId)
            }
        });
    });

    socket.on('client:request-sync', ({ roomId }, callback) => {
        io.to(getHostIdFromRoom(roomId)).emit('server:request-host-data');
    });

    socket.on('client:host-data', ({ playing, currentTime, playbackRate, roomId }, callback) => {
        socket.to(roomId).emit('server:host-data', { playing, currentTime, playbackRate })
    });

    socket.on('client:video-change', ({ videoCode, roomId }, callback) => {
        socket.to(roomId).emit('server:video-change', { videoCode })
    });

    socket.on('client:seekTo', ({ username, currentTime, roomId }, callback) => {
        socket.to(roomId).emit('server:seekTo', { username, currentTime, isServer: true })
    });

    socket.on('client:message', ({ username, content, roomId, isServer }, callback) => {
        socket.to(roomId).emit('server:message', { username, content, time: getCurrentTime(), isServer })
    });

    socket.on('client:play', ({ roomId }, callback) => {
        socket.to(roomId).emit('server:play', {})
    });

    socket.on('client:pause', ({ roomId }, callback) => {
        socket.to(roomId).emit('server:pause', {})
    });

    socket.on('client:update-playbackRate', ({ roomId, playbackRate }, callback) => {
        socket.to(roomId).emit('server:update-playbackRate', { playbackRate })
    });
})