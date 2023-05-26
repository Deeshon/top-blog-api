import { useState, useEffect } from "react"
import PostsContainer from "../components/Posts";
import Header from "../components/Header";
import SubContainer from "../components/Sub-Container";

const API_BASE = "http://localhost:3001/api"

const Home = ({userData, setUserData}) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
      displayPosts()
    }, [])
  
    const displayPosts = async () => {
      await fetch(API_BASE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json())
        .then(data => {
          setPosts(data)
        })



      // fetch(API_BASE)
      //   .then(res => res.json())
      //   .then(data => setPosts(data))
      //   .catch(err => console.error("error", err))
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

