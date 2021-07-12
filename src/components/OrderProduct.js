import React from 'react'
import CheckOutProduct from './CheckOutProduct'
import '../styles/OrderProduct.css'
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

const getmeTime = (item) => {
    console.log(item.data.orderedAt.seconds)
    return(moment.unix(item.data.orderedAt.seconds).format('MMMM Do YYYY, h:mma'));
}

function OrderProduct({item}) {
    return (
        <div className="order">
            <div className="time">
            <p>Ordered At: <span>{getmeTime(item)}</span></p>
            </div>
            {
                item.data?.cart.map((product)=>{
                    return <CheckOutProduct item={product} hide={true}/>
                })
            }
            <div className="amount">
                <CurrencyFormat 
                        decimalScale={2}
                        value={item.data.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        renderText = {(value) => (
                            <>
                            <p>
                                Order Total: <strong>{value}</strong>
                            </p>
                            </>
                            )}
                /></div>
        </div>
    )
}

export default OrderProduct
