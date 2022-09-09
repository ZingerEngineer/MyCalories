const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.post("/register", function (req, res, next) {
  let signupData = req.body;
 bcrypt.hash(signupData.password, 10, function(err, hash) {
  signupData.password = hash
});
  User.create(signupData)
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});


router.post("/login", function (req, res, next) {
  // User.create(req.body)
  //   .then(function (user) {
  //     res.send(user);
  //   })
  //   .catch(next);
});

module.exports = router;
