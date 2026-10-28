import { useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign Up");

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return (
        <div className='login'>
            <form className='login-container'>
                <div className="login-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>

                <div className="login-inputs">
                    {currentState === "Sign Up" ?
                        <input type="text" placeholder='Full Name' required /> : <></>
                    }
                    <input type="email" placeholder='Email' required />
                    <input type="password" placeholder='Password' required />
                </div>

                <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {
                    currentState === "Login" ?
                        <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p> :
                        <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Click here</span></p>
                }
            </form>
        </div>
    )
}

export default Login