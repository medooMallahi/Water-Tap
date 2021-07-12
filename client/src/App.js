import React from "react";
import { Switch, Route } from "react-router-dom";

import MainLayout from "./ hoc/mainLayout";
import "./App.css";
import RegisterDriver from "./components/Driver/register/registerDriver";
import Header from "./components/header/header";
import SideBar from "./components/sideBar/sideBar";
import SearchDriver from "./components/Driver/search/searchDriver";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <SideBar />
        <MainLayout>
          <Switch>
            <Route path="/searchDriver" component={SearchDriver} />
            <Route path="/" component={RegisterDriver} />
          </Switch>
        </MainLayout>
      </div>
    </div>
  );
}

export default App;
