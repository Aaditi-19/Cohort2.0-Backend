const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})

/**
 * POST /api/post/ [protected]
 * -req.body = {caption, imageFile}
 */
postRouter.post("/",upload.single("img"), postController.createPostController)

/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/", postController.getPostController)



module.exports = postRouter