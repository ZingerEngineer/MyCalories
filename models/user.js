const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    require: [true, "First name is required"],
  },
  lastName: {
    type: String,
    require: [true, "Last name is required"],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
