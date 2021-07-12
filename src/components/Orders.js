import React, { useEffect } from 'react'
import '../styles/Orders.css'
import { store } from "../Firebase/Firebase";
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import OrderProduct from './OrderProduct';
import {Link} from 'react-router-dom'

function Orders() {
    const[order,setOrder] = useState([]);
    const[{user}] = useStateValue();
 
    useEffect(() => {
        if(user){
            store
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('orderedAt','desc')
            .onSnapshot((snapshot)=>{
                setOrder(snapshot.docs.map((doc)=> ({
                    id:doc.id,
                    data : doc.data()
                })))
            })
        }
        else
        {
            setOrder([]);
        }
    }, [])

    return (
        <div className="orderContainer">
            <div className="ordersTitle">
            <h2>Your Orders</h2>
            </div>
            {user?(<div className="orderList">
                {
                    order.map((item)=>{
                      return  <OrderProduct item={item}/>
                    })
                }
            </div>):
            (<div className="signIn">
               <p> Sign in with your Amazon clone Account</p>
               <Link to="/login"><button>Sign In with Amazon</button></Link>
            </div>)}
            
        </div>
    )
}

export default Orders
