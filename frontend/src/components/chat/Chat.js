import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { socket } from "../home/Home";

const Chat = () => {
  const { user, setUser } = useContext(userContext);
  const [message, setMessage] = useState("");
  let { room_id, room_name } = useParams();
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, room_id, () => {
        setMessage("");
      });
    }
  };

  useEffect(() => {
    socket.emit("join", { name: user.name, room_id, user_id: user.id });
  }, [room_id, user.id, user.name]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  return (
    <div>
      <div>
        {room_id} {room_name}
      </div>
      <h1>Chat {JSON.stringify(user)} </h1>
      <pre>{JSON.stringify(messages, null, "\t")}</pre>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button>Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
