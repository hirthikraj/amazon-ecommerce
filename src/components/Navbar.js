import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Categories from './Categories';
import{ Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth,store } from "../Firebase/Firebase";
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

function Navbar({categories,filterCategory}) {
    const[bginput,setBgInput] = useState(false);
    const[{cart,user}] = useStateValue();
    const[username,setUsername] = useState('Sign in');
    const[open,setOpen] = useState(false);

    const signout = e =>{
        e.preventDefault()
        if(user){
            setUsername('Sign in');
            auth.signOut();
        }
    }

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
        <div className="navbar">
        <div className="top__navbar">
            <MenuIcon className="icon" onClick={()=>setOpen(!open)}/>
            {open?(<div className="slider">
            <div className="option-mobile">
                <Link to = {user?'/':'/signup'}>
                <span classname="row-1">Hello, {username}</span>
                <p  classname="row-2">Account & Lists</p>
                </Link>
            </div>
            {
                user?(<div className="option-mobile">
                    <button onClick={signout}>Sign out</button>
            </div>):('')
            }
            <div className="option-mobile">
                <Link to="/orders">
                <span  classname="first_row">Returns</span>
                <p classname="second_row">& Orders</p>
                </Link>
            </div>
            <CancelIcon className="cancel-icon" onClick={()=>setOpen(!open)}/>
            </div>):('')}
            <Link to="/"><img src="https://www.pikpng.com/pngl/b/327-3272114_amazon-de-marketplace-amazon-logo-on-black-clipart.png" className="amazon-logo" alt="Amazon India "/></Link>
           <div className={`search__input ${bginput?'bgcolor':''}`}>
               <input type="text" onFocus={()=>setBgInput(!bginput)} onBlur={()=>setBgInput(!bginput)}/>
               <SearchIcon className="search-logo"/>
           </div>
        <div className="navbar__options">
            <div className="option">
                <Link to = {user?'/':'/signup'}>
                <span classname="row-1">Hello, {username}</span>
                <p  classname="row-2">Account & Lists</p>
                </Link>
            </div>
            {
                user?(<div className="option">
                    <button onClick={signout}>Sign out</button>
            </div>):('')
            }
            <div className="option">
                <Link to="/orders">
                <span  classname="first_row">Returns</span>
                <p classname="second_row">& Orders</p>
                </Link>
            </div>
            <div className="cart_option">
                <Link to="/checkout"><ShoppingCartOutlinedIcon className="cart-logo"/></Link>
                <div className="counter">
                <p>{cart.length}</p>
                <span>Cart</span>
                </div>
                
            </div>
            </div>
        </div>
        <div className="bottom_navbar">
           <Categories categories={categories} filterCategory={filterCategory}></Categories>
        </div>
        </div>
    )
}

export default Navbar
