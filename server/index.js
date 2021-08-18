const express = require("express");
const cors = require("cors");
const http = require("http");
const { addUser, removeUser, getUser } = require("./helper");
const mongoose = require("mongoose");
const Room = require("./models/Room");

const mongoDB =
  "mongodb+srv://olumorin:C9slWWBcTpwLBMrg@cluster0.bssga.mongodb.net/chat?retryWrites=true&w=majority";

// C9slWWBcTpwLBMrg olumorin

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  Room.find().then((result) => {
    socket.emit("output-rooms", result);
  });

  socket.on("create-room", (name) => {
    console.log(`The room name received is ${name}`);
    const room = new Room({ name });
    room.save().then((result) => {
      console.log(result);
      io.emit("room-created", result);
    });
  });

  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      user_id,
      room_id,
    });

    socket.join(room_id);

    if (error) {
      console.log("join error", error);
    } else {
      // console.log("join user", user);
    }
  });

  socket.on("sendMessage", (message, room_id, cb) => {
    const user = getUser(socket.id);

    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };

    console.log("message", msgToStore);
    io.to(user.room_id).emit("message", msgToStore);
    cb();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
