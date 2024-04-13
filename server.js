const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const port = 3001;

app.use(express.json());

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});

const ServerSI = new Server(server, {
  cors: {
    origin: "*",
  },
});

ServerSI.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("datos", (message) => {
    ServerSI.emit("newClient", message);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});