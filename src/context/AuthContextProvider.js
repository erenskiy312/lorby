import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext()
const API = 'https://neobook.online/lorby/authentication'

const AuthContextProvider = ({children}) => {
    const [codeError, setCodeError] = useState(null)
    const [registeredEmail, setRegisteredEmail] = useState('')
    const [isRegistered, setRegistered] = useState(false)
    const [isLogin, setLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/lorby')

    }, [])


    const handleRegister = async (formData, registeredEmail) => {

        try {
            const res = await axios.post(`${API}/register/`, formData)
            navigate('/confirm-email')
            localStorage.setItem('email', registeredEmail)
            setRegisteredEmail(registeredEmail)
            setRegistered(true)
            console.log(res);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    
    const handleConfirmEmail = async (formData) => {
        try {
            const res = await axios.post(`${API}/email-confirm/`,  formData)
            navigate('/home')
            console.log(res);
        } catch (error) {
            setCodeError(Object.values(error.response.data).flat(2))
        }
    }

    const handleLogin = async (formData) => {
        try {

            const res = await axios.post(`${API}/login/`, formData)
            navigate('/home')
            setLogin(true)


            console.log(res);
        } catch (error) {
           toast.error(<p>{Object.values(error.response.data).flat(2)}</p>)
        }
    }

    const checkAuth = async () => {
        try {

            const tokens = JSON.parse(localStorage.getItem('tokens'))
            const Authorization = `Bearer ${tokens.access}`

            const config = {
                headers: {
                    Authorization
                }
            }

            const res = await axios.post(`${API}/login/refresh/`, {
            refresh: tokens.refresh
            },
            config,
            );

            localStorage.setItem('tokens', JSON.stringify({
                access: res.data.access,
                refresh: tokens.refresh
            }))

            console.log(res);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    // const handleLogout = async () => {
    //     try {
    //         const tokens = JSON.parse(localStorage.getItem('tokens'))
            

    //         const res = await axios.post(`${API}/logout/`,{
    //             refresh_token: tokens.refresh
    //         })

    //         localStorage.removeItem('tokens')

    //         console.log(res);
    //     } catch (error) {
    //         navigate('/login')
    //     }
    // }

    const handleLogout = () => {
        localStorage.removeItem('tokens')
        localStorage.removeItem('email')
        navigate('/lorby')
    }

    const values = {
        handleRegister,
        registeredEmail,
        handleConfirmEmail,
        codeError,
        handleLogin,
        checkAuth,
        handleLogout,
        isRegistered,
        isLogin
    }
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;