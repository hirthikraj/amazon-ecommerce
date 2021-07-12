import React, { useState } from 'react'
import '../styles/Payment.css'
import { useStateValue } from '../components/StateProvider'
import CheckOutProduct from '../components/CheckOutProduct';
import CurrencyFormat from 'react-currency-format';
import { getTotalMoney } from '../components/Reducer';
import { useHistory } from 'react-router-dom';
import { store } from "../Firebase/Firebase";
import PaymentIcon from '@material-ui/icons/Payment';

function Payment() {
    const [{cart,user},dispatch] = useStateValue();
    const[amount] = useState(getTotalMoney(cart));
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cart);

        if(user)
        {
            store
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(new Date().toString())
                .set({
                    cart:cart,
                    amount:amount,
                    orderedAt:new Date()
                })
            
            history.push("/thankyou");

            dispatch({
                type:"EMPTY_CART",
            })
        }
        else
        {
            console.log("Please sign In to place your order");
        }
    }
    
    return (
        <div className="paymentContainer">
            <h2 className="title">Place Your Order</h2>

            <div className="address">
            <label>Delivery Address</label>
            <div className="inputarea">
            <div className="HouseNo"><span> House No </span> <input type="text" required /></div>
            <div className="street"><span> Street </span><input type="text" required /></div>
            <div className="Area"><span>Area </span> <input type="text" required /></div>
            <div className="city"><span>City </span> <input type="text" required /></div>
            <div className="state"><span>State </span> <input type="text" required /></div>
            </div>
            </div>
            
            <div className="orders">
                <h2>Review Your Order</h2>
                <div className="cart__list">
                    {
                       cart.map((item)=>{
                          return(<div className="pro"><CheckOutProduct item={item} hide={true}/></div>); 
                       })
                    }
                </div>
            </div>

            <div className="paymentbill">
            <h2>Payment</h2>
            <div className="payment">
            <CurrencyFormat 
                        decimalScale={2}
                        value={getTotalMoney(cart)}
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
                <div className="cashonDelivery">
                    <p><PaymentIcon className="icon"/>Cash on Delivery</p>
                </div>
            </div>
            </div>
            <button className="proceedBtn" onClick={handleSubmit}>Place Your Order</button>
        </div>
    )
}

export default Payment
