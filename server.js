
const express = require('express')
const http = require('http')


const app = express();//creat expresss app

const server = http.createServer(app);// by using httpmodule creatServer cl 
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



const io = require('socket.io')(server)
var users = {}
io.on('connection', (socket) => {//socket==all_users
    //console.log(socket.id)
    socket.on('new-user-joined', (userName) => {
        users[socket.id] = userName;
        //console.log(users)
        socket.broadcast.emit('user-connected', userName);
        io.emit('user-list', users)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', user = users[socket.id]);
        delete users[socket.id]
        io.emit('user-list', users)
    })
    socket.on('message', (data) => {
        socket.broadcast.emit("message", { user: data.user, msg: data.msg });

    })
})

server.listen(port, () => {
    console.log("Server started  at " +port);
})