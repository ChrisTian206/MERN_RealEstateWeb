import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export default function AccessAccount() {
    const [auth, setAuth] = useAuth();
    const { token } = useParams();
    const navigate = useNavigate()
    //the [] at the tail means token is one of the dependency,
    //without token, don't run requestActivation();
    useEffect(() => {
        if (token) requestActivation()
    }, [token])

    const requestActivation = async () => {
        try {
            const { data } = await axios.post('/register', { token })
            if (data.err) {
                toast.error(data.err)
            } else {
                //localStorage only stores key value pairs. value can only be strings,
                //saving JSON need to use JSON.stringify(), then
                //retrieving JSON need to use JSON.parse(window.localStorage.getItem())
                window.localStorage.setItem('auth', JSON.stringify(data))
                setAuth(data)
                toast.success('Success! Welcome!')
                navigate('/');
            }
        } catch (err) {
            console.log(err)
            toast.error('Error Occur, try again later.')
        }
    }
    return (
        <div className="display-1 d-flex justify-content-center align-items-center vh-100"
            style={{ marginTop: '-5%' }}>

            Account Activate Page
        </div>
    )
}