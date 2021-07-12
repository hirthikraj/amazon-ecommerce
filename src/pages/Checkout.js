import React, { useEffect, useState } from 'react'
import { useStateValue } from '../components/StateProvider'
import CheckOutProduct from '../components/CheckOutProduct';
import '../styles/CheckOut.css'
import CurrencyFormat from 'react-currency-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getTotalMoney } from '../components/Reducer';
import { Link } from 'react-router-dom';

function Checkout() {
    const [{cart,user}] = useStateValue();
    const[cost,setCost] = useState(0);
    const[qtyChange,setQtyChange] = useState(false);

    useEffect(()=>{
        setCost(getTotalMoney(cart));
    },[qtyChange,cart])

    return (
        <div className="checkout__container">
            {cart.length!==0?(<div className="container__left1">
            <h2>Shopping Cart</h2>
                <div className="cart__list">
                    {
                       cart.map((item)=>{
                          return(<CheckOutProduct item={item} qtyChange={qtyChange} setQtyChange={setQtyChange}/>); 
                       })
                    }
                </div>
                <div className="subtotal">
                <CurrencyFormat 
                        decimalScale={2}
                        value={cost}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        renderText = {(value) => (
                            <>
                            <p>
                                Subtotal ({cart.length} items): <strong>{value}</strong>
                            </p>
                            </>
                            )}
                />
                </div>
            </div>):(<div className="container__left2">
                <h2>Your Amazon Basket is empty</h2>
            </div>)}
            
            
            <div className="container__right">
                <div className="image"><img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="amazon" /></div>
                {user?(<div className="bottom">
                    <div className="row1"><div className="icon"><CheckCircleIcon className="icon"/></div> 
                    <div className="text"><p><span>Part of your order qualifies for FREE Delivery.</span> Select this option at checkout. Details</p> </div></div>
                    <div className="right__subtotal">
                <CurrencyFormat 
                        decimalScale={2}
                        value={cost}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        renderText = {(value) => (
                            <>
                            <p className="subtotal2">
                                Subtotal ({cart.length} items): <strong>{value}</strong>
                            </p>
                            <small>
                                <input type="checkbox" />This order contains a gift
                            </small>
                            </>
                            )}
                />
                <Link to="/payment"><button className="buy-btn">Buy Amazon items</button></Link>
                </div>
                </div>):(<div className="bottom">
                        <div className="signin">
                        <p> Sign in with your Amazon clone Account</p>
                        <Link to="/login"><button>Sign In with Amazon</button></Link>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default Checkout
