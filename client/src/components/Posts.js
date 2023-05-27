import React from 'react'
import { Link } from 'react-router-dom'

const PostsContainer = ({posts, sendData}) => {
    return(
        <div className="post-container">
            <div>
                {
                    posts.map((post) => {
                        return (<PreviewPost post={post} sendData={sendData} />)
                    })
                }
            </div>
        </div>
    )
}

const PreviewPost = ({post}) => {

    const deletePost = async (id) => {
        await fetch("http://localhost:3001/api/post/delete" + id, {
            method: 'DELETE',   
        })

    }


    return(
        <div style={{display: 'flex'}}>
            <Link to={`/post/${post._id}`}>
                <div className='post' key={post._id}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex'}}>
                            <img src="/profile-removebg-preview.png" width={"100px"}  style={{marginLeft: '-40px'}}></img>
                            <h4 style={{marginLeft: '-20px'}}>@{post.author.username}</h4>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='post-title'>
                        <h3>{post.title}</h3>
                    </div>
                    <div className='post-summary'>
                        {post.summary}
                    </div>
                    <div className='readmore'>
                        Read More 》
                    </div>
                </div>
            </Link>
            <div style={{marginTop: '20px'}}>
                <button className="edit-post" onClick={() => alert('clicked')}>✎</button>
                <button className="delete-post" onClick={() => {
                    deletePost(post._id)
                    }}>✖</button>
            </div>
        </div>
    )
}

export default PostsContainer


