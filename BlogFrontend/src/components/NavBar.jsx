import { Link, useLocation } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {

    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token');
        if(location.pathname === '/') {
            window.location.reload; 
        }
    }

    return (
        <nav className= "NavBarMain" >
            <Link to="/">
                <h1 className= "NavBarTitle">Marshall's Blog</h1>
            </Link>
            <div className= "NavBarLinks">
            <Link to="/" >Home</Link>
            {isLoggedIn ? (
                <Link to="/" onClick={handleLogout}>LogOut</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
            </div>
        </nav>
    )
}

export default NavBar