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
  const userChannel = `usuario${socket.id}`;
  socket.join(userChannel);
  socket.on("message", (data) => {
    console.log(data);
    const { tipo, valor, user } = data;
    const recipientChannel = `user_${user}`;
    if (io.sockets.adapter.rooms.has(recipientChannel)) {
      io.to(recipientChannel).emit("message", {
        from: socket.decoded.username,
        message: {valor: valor, tipo: tipo},
      });
    } else {
      console.log(`El usuario ${user} no está conectado actualmente.`);
    }
  });
});