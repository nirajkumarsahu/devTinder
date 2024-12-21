const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./config/models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //   const userOj = {
  //     firstName: "Niraj",
  //     lastName: "Sahu",
  //     emailId: "niraj@sahu.com",
  //     password: "niraj@123",
  //   };

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res
      .status(400)
      .send("Error while adding user. Try again later.", +err.message);
  }
});

// Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error while fetching user", +err.message);
  }
});

// Feed API - GET / feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error while fetching users", +err.message);
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId}); alternate way
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error while deleting user", +err.message);
  }
});

// Update data of a user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: data }, data);
    res.send("User updated successfully");
  } catch {
    res.status(400).send("Error while updating user", +err.message);
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
