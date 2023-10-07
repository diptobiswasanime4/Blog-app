import { useState } from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="signin" element={<Signin />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="create" element={<CreatePost />}></Route>
          <Route path="profile" element={<UserProfile />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>
          <Route path="/edit/:id" element={<EditPost />}></Route>
        </Route>
      </Routes>
    </main>
  );
}

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

function Home() {
  return (
    <div className="body-section">
      <Posts />
    </div>
  );
}

export default App;
