const express = require("express");
const router = express.Router();
const user = require("../models/user");
const product = require("../models/product");

router.get("/food", function (res, req, next) {
  console.log("get");
});

router.post("/food/", function (res, req, next) {
  console.log("push");
});

router.put("/food/:id", function (res, req, next) {
  console.log("put");
});

router.delete("/food/:id", function (res, req, next) {
  console.log("delete");
});
module.exports = router;
