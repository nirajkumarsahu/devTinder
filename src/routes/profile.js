const express = require("express");
const profileRouter = express.Router();
const fs = require("fs");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch(
  "/profile/edit",
  userAuth,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!validateEditProfileData(req)) {
        throw new Error("Invalid Edit Request");
      }

      const loggedInUser = req.user;
      Object.keys(req.body).forEach((key) => {
        loggedInUser[key] = req.body[key];
      });
      if (req.file) {
        loggedInUser.resume = req.file.path; // or store filename / full URL
      }

      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName} Profile updated successfully`,
        data: loggedInUser,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

profileRouter.delete("/profile/delete-resume", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user.resume) return res.status(404).send("No resume to delete");

    // const filePath = path.join(__dirname, "..", user.resume);
    const filePath = path.resolve("uploads", path.basename(user.resume));
    console.log("Trying to delete file:", filePath);

    fs.unlink(filePath, async (err) => {
      if (err) return res.status(500).send("Failed to delete file");

      user.resume = undefined;
      await user.save();
      res.send("Resume deleted successfully");
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

profileRouter.use("/uploads", userAuth, express.static("uploads"));

module.exports = profileRouter;
