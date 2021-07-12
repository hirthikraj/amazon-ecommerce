import React, { useEffect } from 'react'
import { useState } from 'react';
import '../styles/Home.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Product from '../components/Product';
import Notifications from '../components/Notifications';

const banners = [{id:1,image:"https://m.media-amazon.com/images/I/61HinPmsWSL._SX1500_.jpg",name:"amazon1"},
{id:2,image:"https://m.media-amazon.com/images/I/71FzQCchyoL._SX1500_.jpg",name:"amazon2"},
{id:3,image:"https://m.media-amazon.com/images/I/61aUfpZteZL._SX1500_.jpg",name:"amazon3"},
{id:4,image:"https://m.media-amazon.com/images/I/61WY0yvLMWL._SX1500_.jpg",name:"amazon4"}
,{id:5,image:"https://m.media-amazon.com/images/I/71BdOjblEBL._SX1500_.jpg",name:"amazon5"}];


function Home({products}) {
    const[index,setIndex] = useState(0);
    const[notify,setNotify] = useState({
        isOpen: false,
        type:'success',
        message:'Added to the Cart',
    })

    useEffect(()=>{
        const lastIndex = banners.length-1;
        if(index<0)
        {
            setIndex(lastIndex);
        }
        else if(index>lastIndex)
        {
            setIndex(0);
        }
    },[index])


    return (
        <div className="home">
            <div className="banner">
               
                {banners.map((banner,bannerIndex)=>{
                    const {id,image,name} = banner;
                    let position = 'nextSlide';
                    if(index===bannerIndex)
                        position ='currentSlide';
                    else if(bannerIndex===index-1 || index===0 && bannerIndex==banners.length-1 )
                        position ='prevSlide';
                    return(
                        <div key={id} className={position}>
                            <div className="container">
                            <NavigateBeforeIcon className="prev" onClick={()=> setIndex(index+1)}/>
                            <img src={image} className=".home__banner" alt={name} />
                            <NavigateNextIcon className="next" onClick={() => setIndex(index-1)}/>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Notifications notify={notify} setNotify={setNotify}></Notifications>
            <div className="products">
                {
                   products.map((product,index)=>{
                       return (<Product product={product} key={index} notify={notify} setNotify={setNotify}></Product>);
                   })
                }
            </div>
        </div>
    )
}

export default Home
