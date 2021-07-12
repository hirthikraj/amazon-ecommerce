import React, { useState } from 'react'
import '../styles/Product.css'
import CurrencyFormat from 'react-currency-format';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';

const MIN_RATING = 1;
const MAX_RATING = 5;

function Product({product,setNotify,btn}) {
    const [ rating ] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING));
    const [state,dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type:"ADD_TO_CART",
            item: {
                id:product.id,
                image:product.image,
                title:product.title,
                desc:product.description,
                price:product.price * 74,
                qty:1
            },
        });
        setNotify({
            isOpen:true,
            type:'success',
            message:`${product.title} is Added to the Cart`
        })
    };

    return (
        <div className="product" key={product.id}>
            <img src={product.image} alt={product.category} className="product__image" />
            <p className="product__title">{product.title}</p>
            <p className="product__desc">{product.description}</p>
            <CurrencyFormat className="product__price" decimalScale = {2} value={product.price*74} displayType={'text'} thousandSeparator={true} prefix={'₹'} />
            <div className="rating">
            {
               Array.apply(null, { length: rating }).map((e, i) => (
                <StarIcon key={i} className="star__icon"/>
              ))
            }
            </div>
            <button className="product__btn" onClick={addToBasket} disabled={btn}>{`${btn?'Added to the Cart':'Add to Cart'}`}</button>
        </div>
    )
}

export default Product
