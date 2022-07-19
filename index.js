const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/calories-db");
mongoose.Promise = global.Promise;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api/product", require("./routes/product.route.api"));
app.use("/api/user", require("./routes/user.route.api"));
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});
app.listen(4000, function () {
  console.log("listening..");
});
