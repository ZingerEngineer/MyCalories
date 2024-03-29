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
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
}, { versionKey: false });

const user = mongoose.model("User", userSchema);
module.exports = user;
