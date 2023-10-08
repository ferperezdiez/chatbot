



const LogOut = () => {


    const logOut = () => {
        localStorage.removeItem('key')
        window.location = "/";
    }

    return (
        <button style={{
            width: "20%", backgroundColor: "transparent", border: "none", cursor: "pointer", marginRight: "3rem"
        }} onClick={logOut}>Logout</button>
    )
}

export default LogOut;