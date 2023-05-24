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


    return(
        <Link to={`/post/${post._id}`}>
            <div className='post' key={post._id}>
                <div className='post-title'>
                    <h3>{post.title}</h3>
                </div>
                <div className='post-summary'>
                    {post.summary}
                </div>
                <div className='readmore'>
                    Read More 》
                </div>
                <br></br>
                <br></br>

                <hr></hr>
            </div>
        </Link>
    )
}

export default PostsContainer


