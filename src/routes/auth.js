const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(404).send("EmailId is not present in the DB");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      //   expiresIn: "1h",
      // });
      // console.log(token);

      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.status(400).send("Login Successfully");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull!");
});
module.exports = authRouter;
