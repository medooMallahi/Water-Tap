import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RegisterDriver from "./components/Driver/register/registerDriver";

function App() {
  const user = useSelector((state) => state.entities.user);

  return (
    <React.Fragment>
      <Navigation isSignedIn={user.auth ? true : false} />
      <Home />
    </React.Fragment>
  );
}

export default App;
