import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createPost(e) {
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("file", files[0]);
    e.preventDefault();
    const options = {
      method: "POST",
      body: formData,
      credentials: "include",
    };
    const resp = await fetch("http://localhost:3000/post", options);
    const data = await resp.json();
    console.log(data);
    if (data.posted) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="body-section" onSubmit={createPost}>
      <form className="create-post">
        <h2>Got a great idea? Create a Blog.</h2>
        <input
          className="create-post-heading"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="create-post-heading"
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          className="create-post-file-upload"
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          className="create-post-content"
          value={content}
          onChange={(val) => setContent(val)}
        />
        <button>Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
