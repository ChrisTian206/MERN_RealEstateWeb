import { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios'
import { API } from '../config'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
        refreshToken: '',
    });

    useEffect(() => {
        let fromLocSto = localStorage.getItem('auth');
        if (fromLocSto) setAuth(JSON.parse(fromLocSto))
    }, [])

    //provides axios with server root route
    axios.defaults.baseURL = API

    //When making axios requrests, bundle headers' authorization and refresh_token with auth.token and auth.refreshToken
    //btw, the ?. is called optional chaining. So instead of going into error when auth has no token. This would 
    //return a undefined. IF auth has token, it would just be the same as auth.token
    axios.defaults.headers.common["Authorization"] = auth?.token;
    axios.defaults.headers.common['refresh_token'] = auth?.refreshToken;

    axios.interceptors.response.use(
        (res) => { return res; },

        async (err) => {
            const originalConfig = err.config;

            if (err.response) {
                // token is expired
                //Changed from 401 to 500. 401 is for unauthorized. 500 is for internal server error
                //When token is expired, the server would return a 500 error.
                if (err.response.status === 500 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const { data } = await axios.get("/refresh-token");
                        axios.defaults.headers.common["token"] = data.token;
                        axios.defaults.headers.common["refresh_token"] = data.refreshToken;

                        setAuth(data);
                        localStorage.setItem("auth", JSON.stringify(data));

                        return axios(originalConfig);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }

                        return Promise.reject(_error);
                    }
                }

                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }

            return Promise.reject(err);
        }
    );


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }; 