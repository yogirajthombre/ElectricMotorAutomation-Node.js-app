const mongoose = require("mongoose");

exports.connect = () => {
  return mongoose.connect(
    'mongodb://127.0.0.1:27017/ElectricMotorAutomationApp',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );
};