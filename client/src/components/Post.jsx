import React from "react";

const Post = () => {
  return (
    <div className="post">
      <img src="\src\assets\images\SciFi.jpg" alt="SciFi Hallway" />
      <div className="post-text">
        <h2 className="title">Nova Hallway</h2>
        <div className="info">
          <h3 className="author">Arya</h3>
          <div className="time">2023-10-03</div>
        </div>
        <p className="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          temporibus provident totam explicabo vero, quibusdam repellendus, quis
          enim suscipit voluptatum quos. Nostrum nesciunt ratione voluptas!
        </p>
      </div>
    </div>
  );
};

export default Post;
