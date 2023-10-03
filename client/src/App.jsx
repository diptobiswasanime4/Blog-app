import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Post from "./components/Post";

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="signin" element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Routes>
      <Footer />
    </main>
  );
}

function Home() {
  return (
    <div className="body-section">
      <div className="posts">
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default App;
