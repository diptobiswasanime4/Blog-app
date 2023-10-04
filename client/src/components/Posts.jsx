import React, { useState } from "react";
import Post from "./Post";
import { useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-app-api-1dg3.onrender.com/post")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log("Got an error.", err);
      });
  }, []);
  return (
    <div className="posts">
      <h1>Discover exciting Blogs!</h1>
      {posts.map((post, index) => {
        return <Post key={index} {...post} />;
      })}
    </div>
  );
}

export default Posts;
