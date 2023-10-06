import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function PostDetails() {
  const [comment, setComment] = useState("");
  const [postDetails, setPostDetails] = useState({});
  const [allComments, setAllComments] = useState([]);
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

  async function commentInPost(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({
        comment,
        userInfo,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(`http://localhost:3000/post/${id}`, options);
    const data = await resp.json();
    console.log(data.comments);
    setComment("");
    setAllComments(data.comments);
  }
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
      <div className="comments-section">
        <h1>Comments Section</h1>
        <form className="user-comment" onSubmit={commentInPost}>
          <input
            type="text"
            placeholder="Comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Comment</button>
        </form>
        <hr />
        <div className="comments">
          {allComments.map((oneComment, index) => {
            return (
              <div className="comment" key={index}>
                <div className="comment-author">{oneComment.author}</div>
                <div className="comment-text">{oneComment.comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
