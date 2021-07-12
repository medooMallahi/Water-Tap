import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Water-Tap</div>
      <div className={styles.signIn}> Log In</div>
    </header>
  );
};

export default Header;
