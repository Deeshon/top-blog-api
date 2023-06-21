import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { useParams } from "react-router"
import PostsContainer from "../components/Posts"
import { Link } from "react-router-dom"

export default function Profile() {

    const {userInfo} = useContext(UserContext)
    const {id} = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        displayPosts(id)
    }, [posts])

    const displayPosts = async (id) => {
        await fetch(`http://localhost:3001/api/${id}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }).then(res => res.json())
          .then(data => {
            setPosts(data)
          })
    }

    const togglePublish = async (postId) => {
        await fetch(`http://localhost:3001/api/posts/update/${postId}`, {
            method: 'PUT',
        }).then(res => res.json())
          .then(data => console.log(data))
    }




    return(
        <div style={{display:'flex', justifyContent: 'center', width: '1530px', color: 'white'}}>
            <div style={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '700px'}}>
                <div>
                    <h1 style={{color: 'white', fontSize:'40px'}}>Deeshon Hunukumbura</h1>
                </div>
                <div>
                    <p style={{fontSize: '18px'}}>Your posts</p>
                    <hr></hr>
                </div>
                <div>
                    {
                        posts.map((post) => {
                            return (
                            
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '600px'}}>
                                    <Link to={`/post/${post._id}`}>
                                        <div className='profile-post'>
                                            <h3>{post.title}</h3>
                                        </div>
                                    </Link>
                                    <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px', marginLeft: '10px',}} >
                                        <button className="edit-post" onClick={() => {window.location.href = `http://localhost:3000/post/update/${post._id}`}}>✎</button>
                                        <button className="delete-post">✖</button>
                                        <button className="publish-post"><h3 style={{margin: '0'}} onClick={() => {togglePublish(post._id)}}>{post.isPublished?"P":"U"}</h3></button>
                                    </div>
                                </div>
                        )
                        })
                    }
                </div>
            </div>
            <hr></hr>
            <div style={{width: '400px', height:'600px'}}>no</div>
            </div>
        </div>
    )
}