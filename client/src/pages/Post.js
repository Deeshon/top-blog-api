import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import CommentContainer from "../components/Footer"
import FooterContainer from "../components/Footer"

const API_BASE = "http://localhost:3001"
const moment = require('moment')
moment.locale()

const Post = ({userData, setUserData}) => {

    const [post, setPost] = useState([])
    const {id} = useParams()

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        displayPost(id)
        displayComments(id)
    }, [newComment])

    const displayPost = (id) => {
        console.log(id)
        fetch(API_BASE + "/api/post/" + id)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error("Error:", err))
    }
    const displayComments = async (id) => {
        await fetch(API_BASE + "/api/comments/" + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => {
            setComments(data)
        })
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '100px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="post-view">
                    <h4 className="post-date">{moment(post.timestamp).format('LL')}</h4>
                    <h1 className="post-title">{post.title}</h1>
                    <img src="/ai.jpg" width={'700px'}></img>
                    <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
                    <hr></hr>
                </div>
            </div>
            <FooterContainer post={post} comments={comments} setNewComment={setNewComment} />
        </div>
    )
}

export default Post