const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://deeshonhunukumbura18:nyctophile101@cluster0.8fga7hp.mongodb.net/top_blog_api?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB")).catch(console.error)

app.get("/" , (req, res) => {
    res.send("Hello world")
})


app.listen(3001, () => console.log("Server started on port 3001"))