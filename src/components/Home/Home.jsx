import React, { useContext, useEffect, useState } from 'react';
import './home.scss'
import Lorby from '../images/lorby-human.svg'
import { AuthContext } from '../../context/AuthContextProvider';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Home = () => {
    const {checkAuth, handleLogout, isRegistered, isLogin} = useContext(AuthContext)
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false)

    const openLogoutModal = () => {
        setLogoutModalIsOpen(true)
    }

    const closeLogoutModal = () => {
        setLogoutModalIsOpen(false)
    }

    useEffect(() => {
        if  (localStorage.getItem('tokens')) {
            checkAuth()
        }
    })

    return (
        <div className='home-container'>
            {
            isRegistered            
            ?             
            <h1>Добро пожаловать!</h1> 
            : 
            isLogin
            ? 
            <h1>С возвращением!</h1> 
            : 
            null
            }

            <Modal
            isOpen={logoutModalIsOpen}
            onRequestClose={closeLogoutModal}
            contentLabel='Модальное окно выхода из аккаунта'
            className='logout-modal'
            >
                <h3>Выйти?</h3>
                <h4>Точно выйти?</h4>
                <button onClick={handleLogout}>Да, точно</button>
                <p onClick={closeLogoutModal}>Нет, остаться</p>
            </Modal>
                
                <p className='lorby-descr'>Lorby - твой личный репетитор</p>
                <img src={Lorby} alt="" />
                <p onClick={openLogoutModal} className='logout'>Выйти</p>
        </div>
    );
};

export default Home;