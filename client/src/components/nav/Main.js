import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Main() {
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate()

    const handleLogout = () => {
        setAuth({
            user: null,
            token: '',
            refreshToken: ''
        })
        window.localStorage.removeItem('auth');
        navigate('/');
        toast.success('You have logged out')
    }

    //Check if a user is considered 'logged in' by verifying if the 'auth' object is not null, 
    //the 'user' property is not null, and both the 'token' and 'refreshToken' properties are present and truthy.
    /** Another way to write this 
     * let isLogin = false;
     * 
    if (auth && auth.user !== null && auth.token && auth.refreshToken) {
        isLogin = true;
    }
     */
    const isLogin = auth?.user !== null && auth.token && auth.refreshToken

    const handlePostAd = () => {
        if (isLogin) {
            navigate('/ad/create');
        } else {
            navigate('/login');
            toast.error('Please Log In')
        }
    }

    return (
        <nav className="nav d-flex justify-content-between p-2 lead">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>

            <a className="nav-link" onClick={handlePostAd} style={{ cursor: 'pointer' }}>Post Ad</a>

            {!isLogin ? (
                <>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </>
            ) : ('')}

            {!isLogin ? ('') : (
                <div className="dropdown">
                    <li>
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            {auth?.user?.name ? auth.user.name : auth.user.username}
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li>
                                <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Log out</a>
                            </li>
                        </ul>
                    </li>
                </div>
            )}
        </nav>
    )
}