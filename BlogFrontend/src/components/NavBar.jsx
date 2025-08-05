import { Link, useLocation } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {

    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if(location.pathname === '/') {
            window.location.reload(); 
        }
    }

    return (
        <nav className= "NavBarMain" >
            <Link to="/">
                <h1 className= "NavBarTitle">Marshall's Blog</h1>
            </Link>
            <div className= "NavBarLinks">
            {isLoggedIn ?  (
                <span>Welcome, {user ? user.userName : 'User'}</span>
            ) : (
                <span>Welcome, Guest</span>
            )}
            <br />
            <Link to="/" >Home</Link>
            {isLoggedIn ? (
                <>
                {user.isAdmin && <Link to="/upload">Upload Blog</Link>}
                <Link to="/" onClick={handleLogout}>LogOut</Link>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link>
                <Link to="/signUp">SignUp</Link>
                </>
            )}
            </div>
        </nav>
    )
}

export default NavBar