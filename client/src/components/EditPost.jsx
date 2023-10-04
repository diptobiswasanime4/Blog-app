import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blog-app-api-1dg3.onrender.com/post/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      })
      .catch((err) => console.log("Got an error while editing post!", err));
  }, []);

  async function editPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("file", files[0]);
    formData.set("id", id);
    e.preventDefault();
    const options = {
      method: "PUT",
      body: formData,
      credentials: "include",
    };
    const resp = await fetch(
      "https://blog-app-api-1dg3.onrender.com/post",
      options
    );
    const data = await resp.json();
    console.log(data);
    if (data.posted) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className="body-section" onSubmit={editPost}>
      <form className="create-post">
        <h2>Want to change something? Go ahead.</h2>
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
        <button>Update</button>
      </form>
    </div>
  );
}

export default EditPost;
