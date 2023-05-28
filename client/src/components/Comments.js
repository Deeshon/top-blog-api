import { useEffect, useState } from "react"

const moment = require('moment')
moment.locale()

export default function CommentContainer({post, comments}) {

    return(
        <div className="comment-container">
            {
                comments.map((comment) => {
                    return <Comment comment={comment} />
                })
            }
        </div>
    )
}

const Comment = ({comment}) => {

    return (
        <div className="comment">
            <div className='comment-header'>
                <img src="/profile-removebg-preview.png" width={"100px"}  style={{marginLeft: '-40px'}}></img>
                <div style={{marginTop: '15px',}}>
                    {comment.author.username}
                    <br />
                    {moment(comment.timestamp).format('DD/MM HH:mm:ss')}
                </div>
            </div>
            <div className="comment-content">
                <p>{comment.content}</p>
            </div>
            <div className='comment-footer'>
                <div className='icon-container'>
                    <div className="like-icon">❤</div>
                    <div style={{marginTop: '10px', fontSize: '14px'}}>1.1k</div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}