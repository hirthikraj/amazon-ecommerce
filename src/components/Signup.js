import{ Link,useHistory } from "react-router-dom";
import React, { useState } from 'react'
import '../styles/Signup.css'
import { auth,createUserDocument } from '../Firebase/Firebase'

function Signup() {
    const[username,setUserName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[loading,setLoading] = useState(false);

    const history = useHistory();

    const signup = async(e) => {
        e.preventDefault();
        setLoading(true);
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(({user}) => {
                createUserDocument(user,{username})
                history.push("/login");
                setLoading(false);
            })
            .catch((error) => { 
                alert(error.message)
                setLoading(false);});
    }

    return (
    <div className="wrapper">
        <div className="signup-container">
        <Link to="/"><img src="https://zeevector.com/wp-content/uploads/LOGO/Amazon-India-Logo-PNG-HD.png" alt="logo" /></Link>
        <div className="signup">
            <h2 className="title">Create Account</h2>
        <div className="signup-form">
        <form>
            <label ><b>Your name</b></label>
            <input type="text" name="uname" value={username} onChange={(e) => setUserName(e.target.value)} required/>

            <label ><b>Email</b></label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <label ><b>Password</b></label>
            <input type="password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            
            <p>We will send you a text to verify your phone.
                Message and Data rates may apply.</p>

            <button type="submit" onClick={signup} disabled={loading}>Continue</button>
        </form>
        <div className="footer">
            <p>Already have an account?<Link to="/login">Sign in </Link></p>
        </div>
        </div>
        </div>
        </div>
    </div>
        
    )
}

export default Signup
