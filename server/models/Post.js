const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, ref: "User", required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post