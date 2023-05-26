import Model  from "react-modal"
import { useState } from "react"

const Login = () => {

    const [visible, setVisible] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")

    const userSignIn = async () => {
        const response = await fetch("http://localhost:3001/api/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
            credentials: 'include'
        })

        if (response.ok) {
            setVisible(false)
        } else {
            alert('Sign in failed')
        }

    }

    return(
        <div style={{width: '1530px', height: '500px'}}>
            <Model isOpen={true} style={{
            overlay: {
                backgroundColor: 'rgb(15 23 42)'
            },
            content: {
                backgroundColor: 'rgb(15 23 42)',
                width: '450px',
                height: '400px',
                marginTop: '100px',
                marginLeft: '32%',
                color: 'white'
            }
        }}>
                <div className="login-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <h1>Sign in</h1>
                    </div>
                    <div>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </div>
                    <div>
                        <button className="model-sign-in" onClick={userSignIn}>Sign in</button>
                    </div>
                </div>
        </Model>

        </div>
    )
}

export default Login
