const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WaterLevelSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    isMotorRunning: {
        type: Boolean,
        required: true,
        default: false,
    },
    waterLevel: {
        type: String,
        required: true,
        default: "0.0",
    },

})



module.exports = mongoose.model("WaterLevel", WaterLevelSchema)