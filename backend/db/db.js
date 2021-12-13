const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const socket = require("socket.io");
const http = require("http");
const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
const server = http.createServer(app);
const io = socket(server, { cors: { origin: " http://localhost:3000" } });
const PORT = process.env.PORT || 8000;

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id: " + connection.threadId);
});

server.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`${socket.id} is connected`);

    socket.emit("connected", `${socket.id} is connected`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("user joined Room:", data);
    });

    socket.on("message", (data) => {
        // emits an event to all the connected clients with the value of the received message
        socket.to(data[0]).emit("message", [data[1], data[2]]);
        // socket.broadcast.emit("message", data);
    });
});

module.exports = connection;
