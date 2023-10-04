import React from "react";
import { Link, Navigate } from "react-router-dom";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const timeParts = createdAt.split("T");
  const time = timeParts[0] + " " + timeParts[1].split(".")[0];
  return (
    <Link className="post-link" to={`/post/${_id}`}>
      <div className="post">
        <img
          src={"https://blog-app-api-1dg3.onrender.com/" + cover}
          alt="SciFi Hallway"
        />
        <div className="post-text">
          <h2 className="title">{title}</h2>
          <div className="info">
            <h3 className="author">{author.username}</h3>
            <div className="time">{time}</div>
          </div>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
