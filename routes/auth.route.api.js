const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/regster", function (req, res, next) {
  User.create(req.body)
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
