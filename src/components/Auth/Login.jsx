import React, { useContext, useState } from 'react';
import './auth.scss'
import Lorby from '../images/lorby-logo.svg'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeDisable} from '../images/eye-disable.svg'
import { ReactComponent as EyeActive} from '../images/eye-active.svg'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { AuthContext } from '../../context/AuthContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const { handleLogin } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()



    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        validationSchema: yup.object({
            username: yup.string()
            .required('Ввведите логин'),


            password: yup.string()
            .matches(/^.{8,15}$/, 'От 8 до 15 символов')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Строчные и прописные буквы')
            .matches(/\d/, 'Добавьте минимум 1 цифру')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Добавьте минимум 1 спецсимвол'),
        })
    })

    const handleSave = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('username', loginFormik.values.username)
        formData.append('password', loginFormik.values.password)
        handleLogin(formData)
    }

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (

        <div className='login-container'>
            <ToastContainer style={{marginLeft: '25%'}} position='top-center' autoClose='10000'/>
            <img src={Lorby} alt="" />
            <form action="submit" onSubmit={handleSave}>
            <h1>Вэлком бэк!</h1>
                <input
                name='username'
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.username} 
                type="text" placeholder='Введи логин' />

                <input
                name='password'
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.password} 
                className='password-input' 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Введи пароль' />
                {showPassword 
                ? 
                <EyeActive onClick={handleToggleShowPassword} className='eye-active'/> 
                : 
                <EyeDisable onClick={handleToggleShowPassword} className='eye-disable'/>}

                <button
                disabled={
                !loginFormik.isValid
                ||
                loginFormik.values.username === ''
                ||
                loginFormik.values.password === ''
                }
                className={loginFormik.isValid ? 'enabled' : 'disabled'}
                >
                Войти
                </button>
            <p onClick={() => navigate('/register')}>У меня еще нет аккаунта</p>
            </form>
        </div>
    );
};

export default Login;