import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from "react-router"

const API_BASE = "http://localhost:3001"

const Write = () => {

    const tempTitle = 'This is the temp title'

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")

    const [post, setPost] = useState([])
    const {id} = useParams()

    const {userInfo} = useContext(UserContext)
    
    useEffect(() => {
        if (id) {
            getPostData(id)
        }
    }, [id])

    const getPostData = async (id) => {
        try {
            await fetch(API_BASE + "/api/post/update/" + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
              .then(data => {
                setPost(data)
                setContent(data.content)
            })
        } catch {

        }


    }

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

    const updatePost = async (id) => {
        await fetch(API_BASE + "/api/post/update/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                summary: summary,
                content: content,
            })
        })
    }

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <WriteHeader createPost={createPost} id={id} updatePost={updatePost} />
            <div className="write-container">
                <input 
                    className="write-title"
                    type="text" 
                    placeholder={"Title"}
                    defaultValue={post?post.title:title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <input 
                    type="text" 
                    placeholder="Summary"
                    className="write-summary"
                    defaultValue={post?post.summary:summary}
                    onChange={(e) => setSummary(e.target.value)}
                ></input>
                <ReactQuill readOnly={false}
                    style={{
                        minHeight: '300px',
                        width: '900px',
                        color: 'black',
                        backgroundColor: 'white'
                    }}
                    value={content}
                    onChange={(newValue) => setContent(newValue)}
                    
                    />
                {/* <textarea 
                    cols={100} 
                    rows={15} 
                    placeholder='Write something...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea> */}
            </div>
        </div>
    )
}

const WriteHeader = ({createPost, id, updatePost}) => {
    return(
        <div className="write-header">
             <div className="icon" style={{display: 'flex', alignItems: 'center'}}>
                <img src="/icon.png" width={"75px"}></img> 
                <p style={{paddingLeft: '20px'}}>Draft in deeshonhunukumbura18</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {!id && (
                    <div className="publish" onClick={createPost}>Publish</div>
                )}
                {id && (
                    <div className="publish" onClick={() => {
                        updatePost(id)
                        window.location.href = "http://localhost:3000"
                    }}>Update</div>
                )}

                <div className="profile">
                        <img src="/profile.jpg" width={"100px"}></img>
                </div>
            </div>
        </div>
    )
}

export default Write