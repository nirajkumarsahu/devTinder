const express = require("express");

const connectDb = require("./config/database");
const app = express();
const User = require("./config/models/user");

app.post("/signup", async (req, res) => {
  const userOj = {
    firstName: "Niraj",
    lastName: "Sahu",
    emailId: "niraj@sahu.com",
    password: "niraj@123",
  };

  const user = new User(userOj);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res
      .status(400)
      .send("Error while adding user. Try again later.", +err.message);
  }
});
connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
