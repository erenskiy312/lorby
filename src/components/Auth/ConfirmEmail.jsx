import React, { useContext } from 'react';
import Lorby from '../images/lorby-logo.svg'
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowBack} from '../images/arrow-icon.svg'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { AuthContext } from '../../context/AuthContextProvider';

const ConfirmEmail = () => {

    const { registeredEmail, handleConfirmEmail, codeError } = useContext(AuthContext)
    
    const navigate = useNavigate()

    const codeFormik = useFormik({
        initialValues: {
            code: ''
        },

        validationSchema: yup.object({
            code: yup.string()
            .required('Введите код')
        }),

        onSubmit: () => {
        }
    })

    const handleSave = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('code', codeFormik.values.code.replace(/\s/g, ''))
        handleConfirmEmail(formData)
    }

    
    return (
        <div className='confirmEmail-container'>
            <img src={Lorby} alt="" />

            <nav>
                <ArrowBack className='arrow-back' onClick={() => navigate('/register')}/>
                <p>Назад</p>
            </nav>

            <form action="submit" onSubmit={handleSave}>
                <h2 className='first-title'>Введи 4-значный код,</h2>
                <h2 className='second-title'>высланный на</h2>
                <h2 className='thirty-title'>{registeredEmail}</h2>
                <InputMask
                style={
                codeError 
                ? 
                {border: '1px solid red'} 
                : 
                null
                }
                onChange={codeFormik.handleChange}
                onBlur={codeFormik.handleBlur}
                value={codeFormik.values.code} 
                id='code'
                name='code'
                mask='  9      9      9      9'
                autoComplete='off'
                maskChar='_'
                className='code-input'
                />
                {codeError
                ? 
                <p style={{ position: 'absolute', color: 'red', marginTop: '33vh'}}>{codeError}</p>
                :
                null
                }
                <button
                disabled={
               !codeFormik.isValid
                ||
                codeFormik.values.code === ''
                }
                className={codeFormik.isValid ? 'enabled' : 'disabled'}
                >
                    Подтвердить
                </button>
                <p>Выслать код повторно</p>
            </form>
        </div>
    );
};

export default ConfirmEmail;