const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res, next) {
  User.find()
    .then(function (users) {
      res.json(users);
    })
    .catch(next);
});

router.put("/:id", function (req, res, next) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    function (user) {
      res.send(user);
    }
  );
});

router.delete("/:id", function (req, res, next) {
  User.findByIdAndRemove({ _id: req.params.id }).then(function (user) {
    res.send(user);
  });
});

module.exports = router;
