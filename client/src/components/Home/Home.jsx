import React from "react";
import Particles from "react-particles-js";
import Signin from "../ Signin /Signin.jsx";
import Logo from "../Logo/ Logo.jsx";
import styles from "./Home.module.css";
import Navigation from "../Navigation/Navigation";
import RegisterDriver from "../Driver/register/registerDriver.jsx";
import { Switch, Route } from "react-router-dom";
import DriversRecored from "../Driver/search/searchDriver.jsx";
import EditDriver from "../Driver/edit/edit.jsx";

const particlesOptions = {
  particles: {
    number: {
      value: 45,
      density: {
        enable: true,
        value_area: 330,
      },
    },
  },
};

const Home = () => {
  return (
    <div className={styles.full_page}>
      <Particles params={particlesOptions} className={styles.particls} />
      <Navigation isSignedIn={false} />
      <div>
        <Logo />
      </div>
      <Switch>
        <Route path="/EditDriver/:id" component={EditDriver} />
        <Route path="/searchDriver" component={DriversRecored} />
        <Route path="/registerNewDriver" component={RegisterDriver} />
        <Route path="/" exact component={Signin} />
      </Switch>
    </div>
  );
};

export default Home;
