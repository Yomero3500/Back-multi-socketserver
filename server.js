const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  console.log(`API corriendo en el puerto ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.id);
  socket.on("message", (data) => {
    const { tipo, valor, user } = data;
    const recipientChannel = `user_${user}`;
    console.log(tipo, valor, user);
    io.emit("message", data)
  });
});

