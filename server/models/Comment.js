const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommmentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, ref: "User", 
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model("Comment", CommmentSchema)

module.exports = Comment