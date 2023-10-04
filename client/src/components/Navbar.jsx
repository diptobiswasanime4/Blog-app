import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://blog-app-api-1dg3.onrender.com/profile", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.log("Got an Error!", err);
      });
  }, []);

  async function logoutUser(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const resp = await fetch(
      "https://blog-app-api-1dg3.onrender.com/logout",
      options
    );
    const data = await resp.json();
    console.log(data);
    setUserInfo({});
  }

  const username = userInfo?.username;

  if (username) {
    return (
      <nav>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="create">
          Create
        </Link>
        <Link className="link" to="signin" onClick={logoutUser}>
          Logout
        </Link>
      </nav>
    );
  }
  return (
    <nav>
      <Link className="link" to="/">
        Home
      </Link>
      <div className="signin-signup">
        <Link className="link" to="signin">
          Signin
        </Link>
        <Link className="link" to="signup">
          Signup
        </Link>
      </div>
    </nav>
  );
}
