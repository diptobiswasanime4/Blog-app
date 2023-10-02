import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">logo</Link>
      <div className="signin-signup">
        <Link to="signin">Signin</Link>
        <Link to="signup">Signup</Link>
      </div>
    </nav>
  );
}
