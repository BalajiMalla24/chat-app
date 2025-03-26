import express from 'express'
import { Server } from 'socket.io'
import http from "http"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
})

const Usersocketmap = {} // { userId: socketId } userId from database

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id)

    const userId = socket.handshake.query.userId
   
    if(userId) Usersocketmap[userId] = socket.id
     console.log(userId)
    io.emit("getOnlineUsers", Object.keys(Usersocketmap)) // Send updated users

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id)

        delete Usersocketmap[userId];

        io.emit("getOnlineUsers", Object.keys(Usersocketmap)) // Send updated users
    })
})

export { io, server, app }
