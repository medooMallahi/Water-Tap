import React from "react";

const Navigation = ({ isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 link dim black  pa3 pointer">Search Drivers</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 link dim black  pa1 pointer"></p>
      </nav>
    );
  }
};

export default Navigation;
