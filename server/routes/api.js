const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")

const salt = bcrypt.genSaltSync(10)

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization

    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1]

        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

/// USER ROUTES ///
router.post("/user/create", async (req, res) => {
    const {username, password} = req.body
    const user = new User({
        username,
        password: bcrypt.hashSync(password, salt)
    })

    await user.save()
    res.json(user)
})

router.post("/user/signin", async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    try {
        const pass = bcrypt.compareSync(password, user.password)
        if (pass) {
            jwt.sign({user}, 'secretkey', {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token).send('ok')
            })
        }
    } catch {
        res.sendStatus(400)
    }
    
})

router.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, 'secretkey', {}, (err, authData) => {
        if (err) throw err
        res.json(authData)
    })

    res.json(req.cookies)
})

router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})


/// POST ROUTES ///

// GET request for post list
router.get("/", async (req, res) => {
    const posts = await Post.find({isPublished: true}).populate("author").sort({timestamp: -1})

    res.json(posts)
})

router.get("/:id/posts", async (req, res) => {
    const posts = await Post.find({author: req.params.id})

    res.json(posts)
})

// GET request for one post
router.get("/post/:id", async (req, res) => {
    const post = await Post.findOne({_id: req.params.id})

    res.json(post)
})

// POST request for creating post
router.post("/post/create", upload.single('file'), async (req, res) => {
    
    const {originalname, path} = req.file
    const ext = originalname.split('.')[1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath )

    const post = new Post({
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        author: req.body.author,
        image: newPath
    })

    await post.save()

    // res.json({post})
})

router.delete("/post/delete/:id", async (req, res) => {
    await Post.deleteOne({_id: req.params.id})
})


router.get('/post/update/:id', async (req, res) => {
   const post = await Post.findOne({_id: req.params.id})

    res.json(post)
})

router.put('/post/update/:id', async (req, res) => {
    await Post.updateOne({_id: req.params.id}, {$set: {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
    }})
})


router.put('/:postid/like', async (req, res) => {
    await Post.updateOne({_id: req.params.postid}, {
        likes: req.body.likes
    })
})

router.put('/posts/update/:postid', async (req, res) => {

    const post = await Post.findOne({_id: req.params.postid})
    const newPost = await Post.updateOne({_id: req.params.postid}, {$set : {
        isPublished: !post.isPublished
    }})

    res.json(newPost)

})

/// COMMENT ROUTES ///

// GET request for comment list for a post
router.get("/comments/:postid", async (req, res) => {
    const comments = await Comment.find({post: req.params.postid}).populate('author').sort({timestamp: -1})

    res.json(comments)
})

// POST request for creating comment
router.post("/post/comment/create", async (req, res) => {
    const comment = new Comment({
        content: req.body.content,
        author: req.body.author,
        post: req.body.post
    })

    await comment.save()

    res.json(comment)
})

module.exports = router