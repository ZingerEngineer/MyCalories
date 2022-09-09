const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", function (req, res, next) {
  Product.find()
    .then(function (products) {
      res.json(products);
    })
    .catch(next);
});

router.post("/", function (req, res, next) {
  Product.create(req.body)
    .then(function (product) {
      res.send(product);
    })
    .catch(next);
});

router.put("/:id", function (req, res, next) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then(function (product) {
    res.send(product);
  });
});

router.delete("/:id", function (req, res, next) {
  Product.findByIdAndRemove({ _id: req.params.id }).then(function (product) {
    res.send(product);
  });
});

module.exports = router;
