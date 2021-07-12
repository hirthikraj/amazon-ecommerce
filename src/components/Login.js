import{ Link,useHistory } from "react-router-dom";
import React, { useState } from 'react'
import '../styles/Login.css'
import { auth } from "../Firebase/Firebase";

function Login() {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[loading,setLoading] = useState(false);
    const history = useHistory();

    const login = e => {
        e.preventDefault();
        setLoading(true);
        auth
            .signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                setLoading(false);
                history.push("/");
            })
            .catch((error) => {
                setLoading(false);
                alert(error.message)
            })
    }
    return (
    <div className="wrapper">
        <div className="login-container">
        <Link to="/"><img src="https://zeevector.com/wp-content/uploads/LOGO/Amazon-India-Logo-PNG-HD.png" alt="logo" /></Link>
        <div className="login">
            <h2 className="title">Sign-In</h2>
        <div className="login-form">
        <form>
            <label for="email"><b>Email</b></label>
            <input type="email" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <label for="psw"><b>Password</b></label>
            <input type="password"name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required/>
           
           <button type="submit" disabled={loading} onClick={login}>Sign In</button>
        </form>
        </div>
        </div>
        <div className="footer">
            <span>New to Amazon?</span>
            <Link to="/signup"><button>Create your Amazon account</button></Link>
        </div>
        </div>
    </div>
        
    )
}

export default Login
