const express = require("express");
const productRoute = require("./product.route");
const usersRoute = require("./user.route");

const router = express.Router();

router.use("/product", productRoute);
router.use("/user", usersRoute);


exports.privateRouter = router;