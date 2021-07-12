import React from "react";
import { Link } from "react-router-dom";

import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div class={styles.sideNavItem}>
        <Link className={styles.sideNavLink} to="/">
          New Driver
        </Link>
      </div>
      <div class={styles.sideNavItem}>
        <Link className={styles.sideNavLink} to="/searchDriver">
          Drivers
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
