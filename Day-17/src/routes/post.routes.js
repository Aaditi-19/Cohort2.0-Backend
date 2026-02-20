const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const identifyUser = require("../middlewares/auth.middleware")
const upload = multer({storage : multer.memoryStorage()})


/**
 * POST /api/post/ [protected]
 * -req.body = {caption, imageFile}
 */
postRouter.post("/",upload.single("img"), identifyUser,postController.createPostController)

/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/", identifyUser ,postController.getPostController)


/**
 * GET /api/posts/details/:postID
 */
postRouter.get("/details/:postID", identifyUser, postController.getPostDetailsController)

module.exports = postRouter