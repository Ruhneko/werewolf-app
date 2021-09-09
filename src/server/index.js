const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())

const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3231

const SocketManager = require ('./SocketManager')

app.use(express.static(__dirname + '../../../build'))

io.on('connection', SocketManager)

server.listen(PORT, ()=>{
    console.log("Connected to port:" + PORT)
})