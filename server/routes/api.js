const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")

/// USER ROUTES ///
router.post("/user/create", async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    await user.save()
    res.json(user)
})


/// POST ROUTES ///

// GET request for post list
router.get("/", async (req, res) => {
    const posts = await Post.find()

    res.json(posts)
})

// GET request for one post
router.get("/post/:id", async (req, res) => {
    const post = await Post.findOne({_id: req.params.id})

    res.json(post)
})

// POST request for creating post
router.post("/post/create", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        author: req.body.author
    })

    await post.save()

    res.json(post)
})


// /// COMMENT ROUTES ///

// // GET request for comment list for a post
// router.get("/post/:postid/comments", async (req, res) => {
//     const comments = await Comment.find({author: req.params.postid})
// })

// // POST request for creating comment
// router.post("/post/comment/create", async (req, res) => {
//     const comment = new Comment({
//         content: req.body.content,
//         author: req.body.author
//     })

//     await comment.save()

//     res.json(comment)
// })

module.exports = router