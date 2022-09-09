const express = require("express");
const bodyParser = require("body-parser");
const { privateRouter } = require("./routes/privateRouter");
const { publicRouter } = require("./routes/publicRouter");
const DB = require("./db/connect");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const app = express();
const PORT = 4000;

// DB connection
DB.connect();

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.json());

// Global middleware
app.use((req, res, next) => {
  console.log("From global middleware");
  next();
});

const authorizationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const _id = jwt.verify(token, secret)._id;
    console.log(_id);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

// Custom middleware
const logging = (req, res, next) => {
  console.log("From private router middleware");
  next();
};

// Public routes
app.use("/api/public", publicRouter);

// Private routes that require token
app.use("/api", authorizationMiddleware, logging, privateRouter);

// Initialize server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
