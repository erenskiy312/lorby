import React, { useContext, useState } from 'react';
import './auth.scss'
import Lorby from '../images/lorby-logo.svg'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeDisable} from '../images/eye-disable.svg'
import { ReactComponent as EyeActive} from '../images/eye-active.svg'
import { ReactComponent as ArrowBack} from '../images/arrow-icon.svg'
import Emoji from 'react-emoji-render';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { AuthContext } from '../../context/AuthContextProvider';


const Register = () => {
    const {handleRegister} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const registrationFormik = useFormik({
        initialValues:{
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema: yup.object({

            email: yup.string()
            .required('Введите электронную почту')
            .email('Введите корректный адрес электронной почты'),

            username: yup.string()
            .required('Ввведите логин'),


            password: yup.string()
            .matches(/^.{8,15}$/, 'От 8 до 15 символов')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Строчные и прописные буквы')
            .matches(/\d/, 'Добавьте минимум 1 цифру')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Добавьте минимум 1 спецсимвол'),

            confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        }),
        onSubmit:  () => {
            
        }
    })

    const  handleSave = (e) => {
        e.preventDefault()
            let formData = new FormData()
            formData.append('email', registrationFormik.values.email);
            formData.append('username', registrationFormik.values.username);
            formData.append('password', registrationFormik.values.password);
            formData.append('password_confirm', registrationFormik.values.confirmPassword)
            handleRegister(formData, registrationFormik.values.email)

    }
    
    // const handleSave = (e) => {
    //     e.preventDefault()
    //     let formData = new FormData()
    //     formData.append('email', email),
    //     formData.append('username', username),
    //     formData.append('password', password),
    //     formData.append('confirm_Password', confirmPassword),
    // }

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
                <ArrowBack className='arrow-back' onClick={() => navigate('/login')}/>
                <p>Назад</p>
            </nav>

            <form action="submit">
                <h1>Создать аккаунт</h1>
                <h1 className='lorby-title'>Lorby</h1>
                <input
                name='email'
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                value={registrationFormik.values.email} 
                type="text" placeholder='Введи адрес почты' />
                <input
                name='username'
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                value={registrationFormik.values.username} 
                className='login-input' type="text" placeholder='Придумай логин' />
                <input
                autoComplete='off'
                name='password'
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                value={registrationFormik.values.password} 
                className='password-input' 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Создай пароль'
                style={(registrationFormik.touched.password && registrationFormik.errors.password ? {color: 'red'} : null)}
                />
                {showPassword ? 
                <EyeActive onClick={handleToggleShowPassword} className='eye-active'/> 
                : 
                <EyeDisable onClick={handleToggleShowPassword} className='eye-disable'/>}
                <ul>

        <li style={/^.{8,15}$/.test(registrationFormik.values.password) ? {color: '#1BA228'} : registrationFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            От 8 до 15 символов 
            {/^.{8,15}$/.test(registrationFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            registrationFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/^(?=.*[a-z])(?=.*[A-Z])/.test(registrationFormik.values.password)  ? {color: '#1BA228'} : registrationFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Строчные и прописные буквы 
            {/^(?=.*[a-z])(?=.*[A-Z])/.test(registrationFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            registrationFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/\d/.test(registrationFormik.values.password) ? {color: '#1BA228'} : registrationFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Минимум 1 цифра
            {/\d/.test(registrationFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            registrationFormik.values.password.length > 0 
            ?
            <Emoji style={{position: 'absolute'}} text=' ❌'/> 
            :
            ''
            }
        </li>

        <li style={/[!@#$%^&*(),.?":{}|<>]/.test(registrationFormik.values.password) ? {color: '#1BA228'} : registrationFormik.values.password.length > 0  ? {color: 'red'} : {color: 'grey'}}>
            Минимум 1 спецсимвол (!, ", #, $...)
            {/[!@#$%^&*(),.?":{}|<>]/.test(registrationFormik.values.password)
            ? 
            <Emoji style={{position: 'absolute'}} text=' ✅'/> 
            : 
            registrationFormik.values.password.length > 0 
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
                onChange={registrationFormik.handleChange}
                onBlur={registrationFormik.handleBlur}
                value={registrationFormik.values.confirmPassword} 
                className='confirmPassword-input' 
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Повтори пароль'
                style={(registrationFormik.touched.confirmPassword && registrationFormik.errors.confirmPassword ? {color: 'red'} : null)} 
                />
                {showConfirmPassword ? 
                <EyeActive onClick={handleToggleShowConfirmPassword} className='eye-activeConfirm'/> 
                : 
                <EyeDisable onClick={handleToggleShowConfirmPassword} className='eye-disableConfirm'/>}
                {registrationFormik.touched.confirmPassword 
                && 
                registrationFormik.errors.confirmPassword 
                ? 
                <p className='error-confirmPassword'>{registrationFormik.errors.confirmPassword}</p>
                :
                null
            } 
                <button
                onClick={handleSave}
                disabled={
                    !registrationFormik.isValid
                    ||
                    registrationFormik.values.password === ''
                    ||
                    registrationFormik.values.confirmPassword === ''
                }
                className={registrationFormik.isValid ? 'enabled' : 'disabled'}>
                Далее
                </button>
            </form>
            {
}
        </div>
    );
};
                


export default Register;