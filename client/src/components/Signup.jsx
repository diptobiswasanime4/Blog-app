import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({
        firstname,
        middlename,
        lastname,
        email,
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch("http://localhost:3000/register", options);
    const data = await resp.json();
    console.log(data);
  }

  return (
    <div className="body-section">
      <form className="signup-form" onSubmit={registerUser}>
        <h2>New User? Please Register.</h2>
        <div className="firstname-lastname">
          <input
            type="text"
            placeholder="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="middlename"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
          />
          <input
            type="text"
            placeholder="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
