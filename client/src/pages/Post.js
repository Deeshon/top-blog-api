import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

const API_BASE = "http://localhost:3001"
const moment = require('moment')
moment.locale()

const Post = ({userData, setUserData}) => {

    const [post, setPost] = useState([])
    const {id} = useParams()

    useEffect(() => {
        displayPost(id)
    }, [])

    const displayPost = (id) => {
        console.log(id)
        fetch(API_BASE + "/api/post/" + id)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error("Error:", err))
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="post-view">
                <h4 className="post-date">{moment(post.timestamp).format('LL')}</h4>
                <h1 className="post-title">{post.title}</h1>
                <img src="/ai.jpg" width={'800px'}></img>
                <p className="post-content">
                    {post.content}
                </p>
            </div>
        </div>
    )
}

export default Post