import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "./view/Home";
import { Dashboard } from "./components";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  );
}

export default App;
