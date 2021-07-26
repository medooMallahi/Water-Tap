import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = ({ isSignedIn }) => {
  const location = useLocation();

  if (
    location.pathname === "/searchDriver" ||
    location.pathname === "/registerNewDriver" ||
    location.pathname === "/EditDriver"
  ) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link className="f3 link dim black  pa3 pointer" to="/searchDriver">
          Show Drivers
        </Link>

        <Link
          className="f3 link dim black  pa3 pointer"
          to="/registerNewDriver"
        >
          Register New Driver
        </Link>
      </nav>
    );
  } else {
    return <div></div>;
  }
};

export default Navigation;
