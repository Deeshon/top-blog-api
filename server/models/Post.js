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
    author: {
        type: Schema.Types.ObjectId, ref: "User", required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post