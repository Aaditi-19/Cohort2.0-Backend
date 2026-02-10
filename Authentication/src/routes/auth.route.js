const express = require("express");
const autheRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * POST /api/auth/register
 */
autheRouter.post("/register", async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const isUserExists = await userModel.findOne({
        email
    });
    if (isUserExists) {
        return res.status(409).json({
            message: "user already exists",
        })
    }
    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign({
        id:user._id,   
    }, process.env.JWT_SECRET, {expiresIn:"1h"})

    res.cookie("token", token);
    res.status(201).json({
        message :"user registered successfully",
        user :{
            name : user.name,
            email : user.email,
        },
      
    })
    
})

/**
 * GET /api/auyh/get-me
 */
autheRouter.get("/get-me", async(req,res)=>{
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);
    const user = await userModel.findById(decoded.id)
    res.json({
        name : user.name,
        email : user.email,
    })
})

autheRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message : "user not found!"
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    
    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message : "incorrect password",
        })
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET, {expiresIn : "1h"})

    res.cookie("token", token)

    res.json({
        message:"user logged in successfully",
        user:{
            name:user.name,
            email:user.email,
        }
    })
})

module.exports = autheRouter;