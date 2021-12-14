import React from "react";
import Login from "./Component/Login";
import Nav from "./Component/Nav";
import "./App.css";

function App() {
  return (
    <div className="home">
      <Nav title="React Chat Login" />
      <p>Home Page Login To Chat</p>
      <hr className="hr"/>
      <Login />
    </div>
  );
}

export default App;
