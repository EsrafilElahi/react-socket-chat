const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = 8000;


io.on("connection", (socket) => {
  // new Message
  socket.on("send message", (body) => {
    io.emit("add msg", body);
  });

  // delete Message
  socket.on("delete message", (id) => {
    io.emit("remove msg", id);
  });

  // disConnection
  socket.on("dis connection", () => {
    console.log("the user disConnected!");
  });
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});