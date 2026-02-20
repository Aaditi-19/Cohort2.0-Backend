const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    followers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followers is required"]
    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    }
    
}, {
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema)

modules.exports = followModel