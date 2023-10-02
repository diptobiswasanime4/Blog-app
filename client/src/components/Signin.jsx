import React from "react";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function LoginUser(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch("http://localhost:3000/login", options);
  }
  return (
    <div className="body-section">
      <form className="signin-form" onSubmit={LoginUser}>
        <h2>Welcome back! Please Login.</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signin;
