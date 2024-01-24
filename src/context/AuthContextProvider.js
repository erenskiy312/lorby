import axios from 'axios';
import React, { useState } from 'react';
import { createContext } from "react"
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()
const API = 'https://neobook.online/lorby/authentication'

const AuthContextProvider = ({children}) => {
    const [error, setError] = useState(null)
    const [registeredEmail, setRegisteredEmail] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (formData, registeredEmail) => {

        try {
            const res = await axios.post(`${API}/register/`, formData)
            navigate('/confirm-email')
            localStorage.setItem('email', registeredEmail)
            setRegisteredEmail(registeredEmail)
            console.log(res);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleLogin = async (formData) => {
        try {
            const res = await axios.post(`${API}/email-confirm/`,  formData)
            navigate('/home')
        } catch (error) {
            if(error.response){
                setError(error.response.data)
            }
        }
    }

    const values = {
        handleRegister,
        registeredEmail,
        handleLogin,
        error
    }
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;