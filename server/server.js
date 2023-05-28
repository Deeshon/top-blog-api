const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const apiRouter = require("./routes/api")

const app = express()

app.use(express.json())
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use("/api", apiRouter)

mongoose.connect("mongodb+srv://deeshonhunukumbura18:nyctophile101@cluster0.8fga7hp.mongodb.net/top_blog_api?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB")).catch(console.error)




app.listen(3001, () => console.log("Server started on port 3001"))