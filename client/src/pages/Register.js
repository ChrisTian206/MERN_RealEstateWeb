import { useState } from "react";
import axios from 'axios';
import { API } from "../config";
import toast from 'react-hot-toast'

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //console.log({ email, password })
            const { data } = await axios.post(`${API}/pre-register`, { email, password });
            //console.log({ data })
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('please check your email for activate token.')
            }
        } catch (err) {
            console.log(err);
            toast.error('Error occur')
        }
    }
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5"> Register </h1>
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
                                autoFocus
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button className="btn btn-primary col-12 mb-4">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}