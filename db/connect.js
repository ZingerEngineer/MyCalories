const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost/calories-db");
    mongoose.Promise = global.Promise;
}

const DB = { connect };

module.exports = DB;