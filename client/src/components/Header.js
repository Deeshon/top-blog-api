import { Link } from "react-router-dom"
import Model from 'react-modal'
import Login from "./Login"
import Signup from './Signup'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"

const Header = () => {

    const {userInfo, setUserInfo} = useContext(UserContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3001/api/profile", {
            credentials: 'include'
        }).then(res => res.json())
          .then(data => setUserInfo(data.user))

    }, [])

    const logout = () => {
        fetch("http://localhost:3001/api/logout", {
            credentials: 'include',
            method: 'POST'
        })

        setUserInfo(null)
    }

    return(
        <div className="header">
            <div style={{display: "flex", alignItems: "center"}}>
                <Link to='/' className="icon">
                    <img src="/icon.png" width={"75px"}></img>
                </Link>
                <div className="search">
                    <input type="text" placeholder="🔍︎ Search Medium"></input>
                </div>
            </div>
            {userInfo && (
                <div style={{display: "flex", marginRight: "40px", alignItems: 'center'}}>
                    <Link to={"/post/create"}>
                    <button className="write-post">✎ Write</button>
                    </Link>
                    <div className="profile" onClick={() => setVisible(!visible)}>
                        <img src="/profile.jpg" width={"100px"}></img>
                        <Model isOpen={visible} style={{
                            overlay: {
                                background: "rgba(15, 23, 42, 0.3)"
                            },
                            content: {
                                width: '200px',
                                height: '110px',
                                marginTop: '30px',
                                marginLeft: '85%',
                                backgroundColor: 'black',
                                color: 'white',
                                border: '0',
                                textAlign: 'center'

                            }
                        }}>
                            <h3 style={{margin: '0'}}>{userInfo.username}</h3>
                            <button className='btn' onClick={logout} style={{marginTop: '10px', width: '150px'}}>Log out</button>
                        </Model>
                    </div>
                </div>
            )}
            {!userInfo && (
                <div style={{display: 'flex'}}>
                    <Link to='/login' className="btn">Sign in</Link>
                    <Link to='/signup' className="btn">Sign up</Link>
                </div>
            )}


        </div>
    )

//  else {
//         return(
//             <div className="header">
//                 <div style={{display: "flex", alignItems: "center"}}>
//                     <div className="icon">
//                         <img src="/icon.png" width={"75px"}></img>
//                     </div>
//                     <div className="search">
//                         <input type="text" placeholder="🔍︎ Search Medium"></input>
//                     </div>
//                 </div>
                // <div style={{display: 'flex'}}>
                //     <Login token={token} setToken={setToken} />
                //     <Signup />
                // </div>
//             </div>
//         )
//     }


}

export default Header