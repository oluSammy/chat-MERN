import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../userContext";
import { Link } from "react-router-dom";
import RoomList from "./RoomList";
import io from "socket.io-client";

export const socket = io("http://127.0.0.1:5000");

const Home = () => {
  // const ENDPT = "localhost:5000";

  // useEffect(() => {
  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [socket]);

  const { user, setUser } = useContext(userContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-room", room);

    setRoom("");
  };

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
      console.log(room);
    });
  }, [rooms]);

  useEffect(() => {
    socket.on("output-rooms", (newRooms) => {
      setRooms(newRooms);
    });
  }, []);

  const setAsJohn = () => {
    const john = {
      name: "John",
      email: "john@emil.com",
      password: "123",
      id: "123",
    };

    setUser(john);
  };

  const setAsTom = () => {
    const tom = {
      name: "Tom",
      email: "tom@emil.com",
      password: "1232",
      id: "1213",
    };

    setUser(tom);
  };
  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Welcome {user && user.name} </span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Enter A room now"
                      id="room"
                      type="text"
                      className="validate"
                      value={room}
                      onChange={(e) => {
                        setRoom(e.target.value);
                      }}
                    />
                    <label htmlFor="room">Room</label>
                  </div>
                </div>
                <button className="btn">Create Room</button>
              </form>
            </div>
            <div className="card-action">
              <button href="#2" onClick={setAsJohn}>
                set as john
              </button>
              <button href="#2" onClick={setAsTom}>
                set as tom
              </button>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <RoomList rooms={rooms} />
        </div>
      </div>

      <Link to="/chat">Go to chat</Link>
    </div>
  );
};

export default Home;
