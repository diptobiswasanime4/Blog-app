const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  comment: String,
  author: String,
});

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: String,
    content: String,
    cover: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
