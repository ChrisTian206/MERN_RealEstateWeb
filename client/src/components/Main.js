import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
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

    return (
        <nav className="nav d-flex justify-content-between p-2 lead">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>

            <div className="dropdown">
                <li>
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        User
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
        </nav>
    )
}