const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
      _id : {
        type : mongoose.Types.ObjectId,
      },
      phoneNumber : {
          type : String,
          required : true,
      },
      password : {
          type : String,
          required : true,
      },
      waterLevel:[
        {
          type: mongoose.Types.ObjectId,
          ref: "WaterLevel",
        }
      ],
})


module.exports = mongoose.model("Users", userSchema)


