const mongoose = require("mongoose");
const mongodb_url = "mongodburl"

exports.connect = () => {
  return mongoose.connect(
     mongodb_url,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );
};