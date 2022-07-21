import React , {useRef, useContext} from 'react';
import "./Register.css";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {
    const email = useRef();   //usong this instead of use state beacuse use state re renders every time so use use ref
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const password = useRef();
    const username = useRef();
    const passwordCheck = useRef();
    const navigate=useNavigate();


    const handleFormSubmit =async (e) => {
        e.preventDefault();
        if(password.current.value!==passwordCheck.current.value){
            console.log(true);
            passwordCheck.current.setCustomValidity("Passwords do not match");
        }else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
    
            }
            try{
                console.log(user);
               await axios.post("http://localhost:4000/api/register", user);
               navigate("/login");

            }catch(err){
                console.log(err);
            }
         
        }
      

    };
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Postagrammm</h3>
                    <span className="loginDesc">Connecting hearts together!💞</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleFormSubmit}>
                        <input placeholder="enter your username" type="text" required className="loginInput" ref={username} />
                        <input placeholder="enter your email address" type="Email" required className="loginInput" ref={email} />
                        <input placeholder="enter your Password" type="Password" required className="loginInput" ref={password} />
                        <input placeholder="Re-enter your Password" type="Password" required className="loginInput" ref={passwordCheck} />
                        <button className='loginButton' type="submit" >Sign UP</button>
                        <span className="loginforgot">Already have an account</span>
                        <button className="loginRegister">Logn in</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register;