import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { userContext } from "./userContext";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import Navbar from "./layout/navbar";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Navbar />
      <userContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat/:room_id/:room_name" component={Chat} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
}

export default App;
