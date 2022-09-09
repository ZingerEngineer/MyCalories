const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const { secret } = require("../config");

router.post("/register", async function (req, res, next) {
  try {
    let signupData = req.body;
    const hash = await bcrypt.hash(signupData.password, 10);
    signupData.password = hash;
    const user = await (await User.create(signupData)).toJSON();
    delete user.password;
    const token = jwt.sign(
      {
        _id: user._id,
      },
      secret,
      { expiresIn: "60d" }
    );
    res.setHeader("Authorization", token).status(200).json({ user });
  } catch (error) {
    res.status(400).json({
      message: "Error happened",
      error,
    });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    let loginData = req.body;
    const foundUser = await User.findOne({ email: loginData.email });

    if (!foundUser) {
      res.status(400).json({
        message: "No user found",
        isFound: false
      });
      return;
    }

    const isCorrect = await bcrypt.compare(
      loginData.password,
      foundUser.password
    );
    if (!isCorrect) {
      res.status(400).json({
        message: "wrong password",
        isCorrect: false
      });
      return;
    }
    const token = jwt.sign(
      {
        _id: foundUser._id,
      },
      secret,
      { expiresIn: "60d" }
    );
    res.setHeader("Authorization", token).status(200).json({ user : foundUser });
  } catch (error) {
    res.status(400).json({
      message: "Error happened",
      error,
    });
  }
});

module.exports = router;
