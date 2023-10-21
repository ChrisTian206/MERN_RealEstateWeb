import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

export default function PrivateRoute() {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (auth?.token) getCurrentUser()
    }, [auth?.token])

    const getCurrentUser = async () => {
        try {
            console.log("in PrivateRoute, ", auth?.token)
            const { data } = await axios.get('/current-user', {
                headers: {
                    Authorization: auth?.token,
                }
            });
            console.log(data)
            setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
        }
    };

    return ok ? <Outlet /> : '';
}