import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPostDetails(data);
      })
      .catch((err) => {
        console.log("Got an error.", err);
      });
  }, []);
  return (
    <div className="body-section">
      <div className="post-details">
        <img
          src={"http://localhost:3000/" + postDetails.cover}
          alt="SciFi Hallway"
        />
        <div className="post-text">
          <div className="title-container">
            <h1 className="title">{postDetails.title}</h1>
            {userInfo.id == postDetails.author?._id && (
              <Link className="edit-btn" to={`/edit/${id}`}>
                <button>Edit</button>
              </Link>
            )}
          </div>
          <div className="info">
            <h3 className="author">{postDetails.author?.username}</h3>
            <div className="time">{postDetails.createdAt}</div>
          </div>
          <p className="summary">{postDetails.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
