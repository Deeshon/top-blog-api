const Header = () => {
    return(
        <div className="header">
            <div style={{display: "flex", alignItems: "center"}}>
                <div className="icon">
                    <img src="/icon.png" width={"75px"}></img>
                </div>
                <div className="search">
                    <input type="text" placeholder="🔍︎ Search Medium"></input>
                </div>
            </div>
            <div style={{display: "flex", marginRight: "20px", alignItems: 'center'}}>
                <button className="write-post">✎ Write</button>
                <div className="profile">
                    <img src="/profile.jpg" width={"100px"}></img>
                </div>
            </div>
        </div>
    )
}

export default Header