const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );

  }

});


const upload = multer({
  storage
});

// =======================
// REGISTER USER
// =======================

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// LOGIN USER
// =======================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "greatcars-secret-key",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put(
  "/profile/:id",
  upload.single("profilePicture"),
  async (req, res) => {

    try {

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }


      if(req.file){

        user.profilePicture =
        `/images/${req.file.filename}`;

      }


      await user.save();


      res.json({
        message: "Profile picture updated",
        profilePicture: user.profilePicture
      });


    } catch(err){

      res.status(500).json({
        message: err.message
      });

    }

  }
)


  

module.exports = router;