const postModel = require("../models/post.model")
const postRouter = require("../routes/post.routes")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){

    console.log(req.body, req.file)

    const token = req.cookies.token
    if(!token){
        return res.status(404).json({
            message: "token not provided, unauthorized access!"
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    }catch(err){
        return res.status(401).json({
            message : "unauthorized user"
        })
    }

    console.log(decoded)

    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort2/insta_clone"
    })

    const post = await postModel.create({
        caption : req.body.caption,
        imgURL : file.url,
        user : decoded.id

    })

    res.status(201).json({
        message : "post created successfully",
        post
    })
}

async function getPostController(req,res){
    const token = req.cookies.token

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message : "Token in valid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "Posts fetched successfully",
        posts
    })
}
module.exports = {
    createPostController,
    getPostController
}
