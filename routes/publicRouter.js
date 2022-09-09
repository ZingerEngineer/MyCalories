const express = require("express");
const authRouter = require("./auth.route.api");

const router = express.Router();

router.use("/auth", authRouter);

exports.publicRouter = router;