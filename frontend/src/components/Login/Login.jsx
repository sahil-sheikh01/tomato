import { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import { toast } from "react-toastify"

const Login = ({ setShowLogin }) => {

    const { setToken, backendUrl } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))
    }

    const login = async (event) => {
        event.preventDefault();

        let url = backendUrl

        if (currentState === "Login") {
            url += "/api/user/login";
        } else {
            url += "/api/user/register";
        }

        const response = await axios.post(url, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return (
        <div className='login'>
            <form onSubmit={login} className='login-container'>
                <div className="login-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>

                <div className="login-inputs">
                    {currentState === "Sign Up" ?
                        <input onChange={onChangeHandler} type="text" name='name' value={data.name} placeholder='Full Name' required /> : <></>
                    }
                    <input onChange={onChangeHandler} type="email" name='email' value={data.email} placeholder='Email' required />
                    <input onChange={onChangeHandler} type="password" name='password' value={data.password} placeholder='Password' required />
                </div>

                <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

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