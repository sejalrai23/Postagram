import React, { useRef, useContext } from 'react';
import "./login.css";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    const email = useRef();   //usong this instead of use state beacuse use state re renders every time so use use ref
    const {user ,isFetching , error , dispatch}=useContext(AuthContext);
    const password = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch);

    };

    console.log(user);
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Postagrammm</h3>
                    <span className="loginDesc">Connecting hearts together!💞</span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleFormSubmit} className="loginBox">
                        <input placeholder="enter your email address" type="Email" required className="loginInput" ref={email}/>
                        <input placeholder="enter your Password" type="Password" required className="loginInput" ref={password} />
                        <button className='loginButton' disabled={isFetching} type="submit">{isFetching ? <CircularProgress  /> : "Log In"}</button>
                        <span className="loginforgot">Forgot Password?</span>
                        <button className="loginRegister">Create a new account</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login 