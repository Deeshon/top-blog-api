import { useState, useEffect } from "react"
import PostsContainer from "./Posts";
import Header from "./Header";
import SubContainer from "./Sub-Container";

const API_BASE = "http://localhost:3001/api"

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
      displayPosts()
    }, [])
  
    const displayPosts = () => {
      fetch(API_BASE)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.error("error", err))
    }

    return(
        <div className="App">
        <Header />
        <h1>HEllo</h1>
        <SubContainer />
        <PostsContainer posts={posts}/>
      </div>
    )
}

export default Home

