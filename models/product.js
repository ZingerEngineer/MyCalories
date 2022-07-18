const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  },
  kCaloryPerGm: {
    type: Number,
  },
},{ versionKey: false });
const product = mongoose.model("Product", productSchema);
module.exports = product;
