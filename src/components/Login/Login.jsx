import { useState } from 'react';
import styles from './login.module.css';
import { login, register } from '../../utils/apiCall';
import Modal from '../modal/modal';

const Login = () => {
    const userDataMock = {
        email: '',
        company: ''
    }
    const [input, setInput] = useState('');
    const [userData, setUserData] = useState(userDataMock);
    const [showRegisterModal, setShowModal] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [flipHasAKey, setflipHasAKey] = useState(true)

    
    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleMailChange = (event) => {
        setUserData(prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
    });
    };
    
    const handleKeySubmit = async (event) => {
        event.preventDefault();
        try{
            const result = await login(input);
            if(result.message && result.message === "ok"){
                localStorage.setItem('key', result.key);
                window.location = "/";
            } else {
                setShowKeyModal(true)
            }
            setInput('');
        }
        catch(err){ 
            console.log(err) 
        }
    };

    const handleMailSubmit = async (event) => {
        event.preventDefault();
        try{
            const result = await register(userData.email, userData.company)
            if(result.accepted) setShowModal(true)
            console.log(result);
            setUserData(userDataMock)
        }
        catch(err){
            console.log(err)
        }
    };

    const flip = () => {
        setflipHasAKey(!flipHasAKey)
    }
    
    const explanation = `By entering the key, you will be 
    able to interact with an AI that will simulate an interview, assuming my role. 
    Its responses will be based on my data, previously uploaded. `;

    const emailRequestText = `Please enter you company name and email address to receive 
    the necessary key for interacting with the AI.`;

    const registerModalTitle = `The key was sent to your email`;
    
    const registerTitle = `Please check your email and enter the code you received to be able to interact with the chatbot`

    const keyModalTitle = "It seems that you have not registered"

    const keyModalContent = "Please enter your email address to receive the key"

    return (
        <div className={styles['Login-container']}>
            {<label className={styles['text']}>{flipHasAKey ? explanation : emailRequestText}</label>}
            {flipHasAKey ? <form className={styles['login-form']} onSubmit={handleKeySubmit}>
                    <label className={styles['login-label']}>ApiKey</label>
                    <input name='password' 
                        value={input} 
                        type='password' onChange={(e) => handleChange(e)} 
                        className={styles['login-input']} 
                        placeholder='enter the key'/>
                    <button className={styles['login-button']}>send</button>
            </form>
            :
            <form onSubmit={handleMailSubmit} className={styles['login-form']}>
                <label className={styles['login-label']}>Register</label>
                <input  className={styles['login-input']}  
                        name='company'
                        placeholder='Company name' 
                        onChange={handleMailChange} 
                        value={userData.company} />
                <input  className={styles['login-input']}
                        name='email'  
                        placeholder='Email address' 
                        onChange={handleMailChange} 
                        value={userData.email} />
                <button className={styles['login-button']}>send</button>
            </form>}
            <div className={styles['label-change-cards']}>
                {flipHasAKey ? "Do you need a key?" 
                : `Do you already have a key? `}
            </div>
            <div onClick={flip} className={styles['change-cards']}>Click here</div>
            {showRegisterModal && 
                <Modal title={registerModalTitle} 
                    content={registerTitle} 
                    setShowModal={setShowModal} />
            };
            {showKeyModal && 
                <Modal title={keyModalTitle}
                    content={keyModalContent}
                    setShowModal={setShowKeyModal}
                    />
            }
            
        </div>
        
    )
};

export default Login;