const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ""
    },
    imgURL : {
        type : String,
        required : [true, "image url is required*"]
    },
    user : {
        ref:"users",
        type : mongoose.Schema.Types.ObjectId,
        required : [true, "user ID is required for creating post*"]
    }

})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel