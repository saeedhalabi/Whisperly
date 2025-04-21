import React from "react";
import { Link } from "react-router";

const Unauthorized: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1 style={{ fontSize: "3rem", color: "crimson" }}>401 - Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <Link to="/" style={{ color: "dodgerblue", textDecoration: "underline" }}>
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
