import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main style={{ padding: "1rem", textAlign: "center", color: "white" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link style={{ color: "white", textDecoration: "underline" }} to="/">
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;