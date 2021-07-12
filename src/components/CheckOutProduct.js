import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import '../styles/CheckOutProduct.css';
import { useStateValue } from './StateProvider';
import FlipMove from "react-flip-move";

function CheckOutProduct({item,setQtyChange,qtyChange,hide}) {
    const[{cart},dispatch] = useStateValue();
    const[qty,setQty] = useState(1);

    const deleteFromCart = () => {
        dispatch({
            type:"REMOVE_FROM_CART",
            id:item.id
        });
    }

    const customLeaveAnimation = {
        from: { transform: 'translateX(0)', opacity:'0' },
        to:   { transform: 'translateX(-100%)', opacity:'0' }
      };

    useEffect(() => {
       item.qty=qty;
    }, [qty,cart])  

    const handleChange = async (e) => {
        // item.qty=qty;
        setQty(e.target.value)
        setQtyChange(!qtyChange);
    }

    return (
        <FlipMove easing="ease-in-out" leaveAnimation={customLeaveAnimation} duration-="500">
        <div className="checkout__product" key={item.id}>
            <div className="checkout__product__left">
            <img src={item.image} alt={item.title} />
            </div>
            <div className="checkout__product__right">
                <p className="checkout__title">{item.title}</p>
                <p className="checkout__desc">{item.desc}</p>
                <p className="stock">in stock</p>
                <p className="shipping">Eligible for FREE Shipping</p>
                <CurrencyFormat className="checkout__product__price"value={item.price} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'₹'} />
                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" alt="amazon" />
                {hide?(<div className="totalPrice">
                <p>Quantity: {item.qty}</p>
                <p>Total Price: {item.qty*item.price}</p>
                </div>):( <div className="last__Row">
                <div className="quantity">
                    <label for="cars">Qty </label>
                        <select id="qty" name="numbers" value={qty} onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                </div>
                <div className="delete">
                    <button className="del-btn" onClick={deleteFromCart}>Delete</button>
                </div>
               </div>)}
               
            </div>
        </div>
        </FlipMove>
    )
}

export default CheckOutProduct
