import React, { useEffect, useState } from 'react'
import '../styles/Thankyou.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { auth,store } from "../Firebase/Firebase";
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';


function Thankyou() {
    const[username,setUsername] = useState('Sign in');
    const[{cart,user}] = useStateValue();
    useEffect(()=>{
        auth.onAuthStateChanged((authuser)=>{
            if(authuser && user)
            {
                store.collection('users').get().then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        if(user.uid===doc.id)
                        {
                           const data = doc.data();
                           setUsername(data.username);
                        }
                    })
                })
            }
        })
    },[user])

    return (
        <div className="thankyouBox">
           <p className="thankYouTitle"><span><CheckCircleIcon className="tickIcon"/></span>Thank you, your order has beem confirmed!</p>
           <p className="text">Thank you for shopping with us <strong>{user?username :''}</strong>. We'll send a confirmation once if you're item has shipped. If you would like to check the status of your order, Click the button below.</p>
           <Link to="/orders">Your Orders</Link> 
        </div>
    )
}

export default Thankyou
