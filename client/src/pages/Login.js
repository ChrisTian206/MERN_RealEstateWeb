import { useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            //console.log({ email, password })
            //below is a sample of {data}
            const { data } = await axios.post(`/login`, { email, password });
            //console.log({ data })
            if (data.error) {
                toast.error(data.error)
                setLoading(false)
            } else {
                setAuth(data);
                window.localStorage.setItem('auth', JSON.stringify(data))
                toast.success('Welcome Back! You have successfully logged in!')
                setLoading(false)
                navigate('/')
            }
        } catch (err) {
            console.log(err);
            toast.error('Error occur')
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5"> Login </h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="enter your email"
                                className="form-control mb-4 mt-4"
                                required
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="enter your password"
                                className="form-control mb-4"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button
                                disabled={loading}
                                className="btn btn-primary col-12 mb-4">

                                {loading ? 'Loading..' : 'Login'}</button>
                        </form>

                        <Link to='/auth/forgot-password'>Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJjNmQ1ODkxOTVmOTU5M2QyNDNiZDYiLCJpYXQiOjE2OTc0MTA3MjUsImV4cCI6MTY5NzQxNDMyNX0.nF1MXRtNWmVN9Y0puj-MuUOY05h4Ejqa-VGcCvnX3L4",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJjNmQ1ODkxOTVmOTU5M2QyNDNiZDYiLCJpYXQiOjE2OTc0MTA3MjUsImV4cCI6MTY5ODAxNTUyNX0.GXj8XYDIHqeB5pMa6LxWN5BPjyON9s9jjVmaRklN4fk",
//     "user": {
//         "_id": "652c6d589195f9593d243bd6",
//         "username": "34efb378-a02b-49ca-a684-fd1688e9f0c9",
//         "name": "",
//         "email": "wtian.mcs@gmail.com",
//         "address": "",
//         "phone": "",
//         "role": [
//             "Renter"
//         ],
//         "enquiredProperties": [],
//         "wishlish": [],
//         "createdAt": "2023-10-15T22:53:12.970Z",
//         "updatedAt": "2023-10-15T22:53:12.970Z",
//         "__v": 0
//     }
// }