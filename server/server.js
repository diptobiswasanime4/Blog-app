const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

const PORT = 3000;

const uploadMiddleware = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const connectionString =
  "mongodb+srv://diptobiswasanime4:abcd1234@cluster0.fljv3fw.mongodb.net/UserDB?retryWrites=true&w=majority";
const JWT_SECRET = "s3cr3tkey";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Failed to connect to DB. Got an error!", err));

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Blog App Home Page" });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const UserDoc = await User.findOne({ username });
  if (UserDoc) {
    res.json({ msg: "User already exists.", registered: false });
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      password,
      hashPassword,
    });
    await newUser.save();
    res.json({ username, registered: true });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const UserDoc = await User.findOne({ username });
  if (!UserDoc) {
    res.json({ msg: "Invalid username.", loggedIn: false });
  } else {
    const checkPassword = bcrypt.compareSync(password, UserDoc.hashPassword);
    if (!checkPassword) {
      res.json({ msg: "Invalid password.", loggedIn: false });
    } else {
      jwt.sign({ username, id: UserDoc._id }, JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .json({ username, id: UserDoc._id, token, loggedIn: true });
      });
    }
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, JWT_SECRET, {}, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  } catch (err) {
    res.json({ msg: "JWT is missing!", Error: err });
  }
});

app.post("/logout", async (req, res) => {
  const { username } = req.body;
  res
    .cookie("token", "")
    .json({ msg: "Logged out", username, loggedIn: false });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const { title, summary, content } = req.body;
    const { token } = req.cookies;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    jwt.verify(token, JWT_SECRET, {}, async (err, data) => {
      if (err) throw err;
      postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: data.id,
      });
    });

    res.json({ postDoc, posted: true });
  } catch (err) {
    res.json({ msg: "Got an Error!", Error: err });
  }
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(posts);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath = "";
    if (req.file) {
      const { originalname, path } = req.file;

      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { id, title, summary, content } = req.body;
    const { token } = req.cookies;
    let postDoc = await Post.findById(id);
    jwt.verify(token, JWT_SECRET, {}, async (err, data) => {
      if (err) throw err;
      postDoc = await Post.findByIdAndUpdate(id, {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
    });

    res.json({ postDoc, posted: true });
  } catch (err) {
    res.json({ msg: "Got an Error!", Error: err });
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id }).populate(
      "author",
      ["username"]
    );
    res.json(post);
  } catch (err) {
    res.json({ msg: "Post not found!", Error: err });
  }
});

// Start App
app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}...`);
});
