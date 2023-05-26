import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"

const API_BASE = "http://localhost:3001"

const Write = () => {

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")

    const {userInfo} = useContext(UserContext)

    const createPost = async () => {
        await fetch(API_BASE + "/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                summary: summary,
                content: content,
                author: userInfo._id
            })
        })

        window.location.href = "http://localhost:3000"

    }

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <WriteHeader createPost={createPost} />
            <div className="write-container">
                <input 
                    className="write-title"
                    type="text" 
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <input 
                    type="text" 
                    placeholder="Summary"
                    className="write-summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                ></input>
                <textarea 
                    cols={100} 
                    rows={15} 
                    placeholder='Write something...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
        </div>
    )
}

const WriteHeader = ({createPost}) => {
    return(
        <div className="write-header">
             <div className="icon" style={{display: 'flex', alignItems: 'center'}}>
                <img src="/icon.png" width={"75px"}></img> 
                <p style={{paddingLeft: '20px'}}>Draft in deeshonhunukumbura18</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="publish" onClick={createPost}>Publish</div>
                <div className="profile">
                        <img src="/profile.jpg" width={"100px"}></img>
                </div>
            </div>
        </div>
    )
}

export default Write