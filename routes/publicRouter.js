const express = require("express");

const router = express.Router();

router.use("/", (req, res, next) => {
    res.json({
        zpi: 'this is public router',
    })
});

exports.publicRouter = router;