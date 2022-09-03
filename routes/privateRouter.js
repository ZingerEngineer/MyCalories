const express = require("express");
const productRoute = require("./product.route.api");
const usersRoute = require("./user.route.api");

const router = express.Router();

router.use("/product", productRoute);
router.use("/user", usersRoute);


exports.privateRouter = router;