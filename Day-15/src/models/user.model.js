const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username already exists"],
        required: [true, "username is required"]
    },
    email:{
        type: String,
        unique: [true, "account with this email already exists"],
        required: [true, "email is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/d73tuiu52/default-avatar-profile-icon-social-600nw-1906669723.webp"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel