import React, { useState } from 'react';
import './auth.scss'
import Lorby from '../images/lorby-logo.svg'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeDisable} from '../images/eye-disable.svg'
import { ReactComponent as EyeActive} from '../images/eye-active.svg'

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (

        <div className='login-container'>
            <img src={Lorby} alt="" />
            <form action="">
            <h1>Вэлком бэк!</h1>
                <input type="text" placeholder='Введи логин' />

                <input 
                className='password-input' 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Введи пароль' />
                {showPassword 
                ? 
                <EyeActive onClick={handleToggleShowPassword} className='eye-active'/> 
                : 
                <EyeDisable onClick={handleToggleShowPassword} className='eye-disable'/>}

                <button>Войти</button>
            <p onClick={() => navigate('/register')}>У меня еще нет аккаунта</p>
            </form>
        </div>
    );
};

export default Login;