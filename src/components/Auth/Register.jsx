import React, { useState } from 'react';
import './auth.scss'
import Lorby from '../images/lorby-logo.svg'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeDisable} from '../images/eye-disable.svg'
import { ReactComponent as EyeActive} from '../images/eye-active.svg'
import { ReactComponent as ArrowBack} from '../images/arrow-icon.svg'
import Emoji from 'react-emoji-render';
import { useFormik } from 'formik';
import * as yup from 'yup'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passwordFormik = useFormik({
        initialValues:{
            password: '',
            confirmPassword: '',
        },

        validationSchema: yup.object({
            password: yup.string()
            .matches(/^.{8,15}$/, 'От 8 до 15 символов')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Строчные и прописные буквы')
            .matches(/\d/, 'Добавьте минимум 1 цифру')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Добавьте минимум 1 спецсимвол'),

            confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const navigate = useNavigate()

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleToggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    return (
        <div className='register-container'>
            <img src={Lorby} alt="" />

            <nav>
                <ArrowBack className='arrow-back' onClick={() => navigate('/')}/>
                <p>Назад</p>
            </nav>

            <form action="">
                <h1>Создать аккаунт</h1>
                <h1 className='lorby-title'>Lorby</h1>
                <input type="text" placeholder='Введи адрес почты' />
                <input className='login-input' type="text" placeholder='Придумай логин' />
                <input
                autoComplete='off'
                name='password'
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.password} 
                className='password-input' 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Создай пароль'
                style={(passwordFormik.touched.password && passwordFormik.errors.password ? {color: 'red'} : null)}
                />
                {showPassword ? 
                <EyeActive onClick={handleToggleShowPassword} className='eye-active'/> 
                : 
                <EyeDisable onClick={handleToggleShowPassword} className='eye-disable'/>}
                <ul>

        <li style={/^.{8,15}$/.test(passwordFormik.values.password) ? {color: '#1BA228'} : passwordFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            От 8 до 15 символов 
            {/^.{8,15}$/.test(passwordFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            passwordFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/^(?=.*[a-z])(?=.*[A-Z])/.test(passwordFormik.values.password)  ? {color: '#1BA228'} : passwordFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Строчные и прописные буквы 
            {/^(?=.*[a-z])(?=.*[A-Z])/.test(passwordFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            passwordFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/\d/.test(passwordFormik.values.password) ? {color: '#1BA228'} : passwordFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Минимум 1 цифра
            {/\d/.test(passwordFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            passwordFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/[!@#$%^&*(),.?":{}|<>]/.test(passwordFormik.values.password) ? {color: '#1BA228'} : passwordFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Минимум 1 спецсимвол (!, ", #, $...)
            {/[!@#$%^&*(),.?":{}|<>]/.test(passwordFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            passwordFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text='    ❌'/> 
            :
            ''
            }
        </li>

                </ul>
                <input
                autoComplete='off'
                name='confirmPassword'
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.confirmPassword} 
                className='confirmPassword-input' 
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Повтори пароль'
                style={(passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? {color: 'red'} : null)} 
                />
                {showConfirmPassword ? 
                <EyeActive onClick={handleToggleShowConfirmPassword} className='eye-activeConfirm'/> 
                : 
                <EyeDisable onClick={handleToggleShowConfirmPassword} className='eye-disableConfirm'/>}
                {passwordFormik.touched.confirmPassword 
                && 
                passwordFormik.errors.confirmPassword 
                ? 
                <p className='error-confirmPassword'>{passwordFormik.errors.confirmPassword}</p>
                :
                null
            } 
                <button
                disabled={
                    !passwordFormik.isValid
                    ||
                    passwordFormik.values.password === ''
                    ||
                    passwordFormik.values.confirmPassword === ''
                }
                className={passwordFormik.isValid ? 'enabled' : 'disabled'}>
                Далее
                </button>
            </form>
        </div>
    );
};

export default Register;