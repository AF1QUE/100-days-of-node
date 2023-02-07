const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true).connect(url);
};

module.exports = connectDB;
