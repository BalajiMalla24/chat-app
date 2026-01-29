import express from 'express';
import { Server } from 'socket.io';
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

// Used to store online users
const Usersocketmap = {}; // { userId: socketId } userId from database

const getReciversocketid = (userId) => {
    return Usersocketmap[userId];
};

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        Usersocketmap[userId] = socket.id;
        console.log("User ID:", userId);
    }

    // Send updated online users
    io.emit("getOnlineUsers", Object.keys(Usersocketmap));

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);

        if (userId) {
            delete Usersocketmap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(Usersocketmap)); // Send updated users
    });
});

export { io, server, app, getReciversocketid };
