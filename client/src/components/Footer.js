import { useContext, useState } from "react"
import Model from "react-modal"
import CommentContainer from './Comments'
import { UserContext } from "../UserContext"

const FooterContainer = ({post, comments, setNewComment}) => {

    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState('')

    const {userInfo} = useContext(UserContext)

    const createComment = async () => {
        await fetch("http://localhost:3001/api/post/comment/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content,
                author: userInfo._id,
                post: post._id
            })
        }).then(res => res.json())
          .then(data => {setNewComment(data)})
    }    

    return(
        <div className="footer-container">
            <div className='icon-container'>
                <div className="like-icon">❤</div>
                <div style={{marginTop: '20px'}}>1.1k</div>
            </div>
            <div className='icon-container'>
                <div className="like-icon" onClick={() => setVisible(true)}>💬</div>
                <Model isOpen={visible} onRequestClose={() => setVisible(false)} style={{
                    overlay: {
                        background: "rgba(15, 23, 42, 0.3)"
                    },
                    content: {
                        width: '400px',
                        height: '680px',
                        marginLeft: '71%',
                        marginTop: '35px',
                        color: 'white',
                        overflowY: 'scroll',
                        backgroundColor: 'black',
                        border: '0'
                    }
                }}>
                    <div className='response-header' style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>Responses ({comments.length})</h2>
                        <h2 onClick={() => setVisible(false)}>x</h2>
                    </div>
                    <div className='response-textarea'>
                        <textarea cols={47} rows={8} style={{backgroundColor: 'white'}} placeholder='What are your thoughts?' onChange={
                            (e) => {setContent(e.target.value)}
                        } value={content}></textarea>
                        <button className='respond-btn' onClick={createComment}>Respond</button>
                    </div>
                    <hr></hr>
                    <CommentContainer post={post} comments={comments}/>
                </Model>
                <div style={{marginTop: '20px'}}>{comments.length}</div>
            </div>
        </div>
    )
}

export default FooterContainer