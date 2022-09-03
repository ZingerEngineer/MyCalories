const express = require("express");
const bodyParser = require("body-parser");
const { router } = require("./routes/router");
const DB = require("./db/connect");

const app = express();
const PORT = 4000;

// DB connection
DB.connect();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// Initialize router
app.use('/api', router);

// Initialize server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
