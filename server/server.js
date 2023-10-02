const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://diptobiswasanime4:abcd1234@cluster0.fljv3fw.mongodb.net/UserDB?retryWrites=true&w=majority";

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
  const checkExistingUser = await User.findOne({ username });
  if (checkExistingUser) {
    res.json({ msg: "User already exists." });
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      password,
      hashPassword,
    });
    await newUser.save();
    res.json({ username, password, hashPassword });
  }
});

app.post("/login", (req, res) => {
  res.json({ username, password });
});

// Start App
app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}...`);
});
