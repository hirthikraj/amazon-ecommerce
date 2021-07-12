import React from 'react'
import '../styles/Categories.css'
import{ Link } from "react-router-dom";

function Categories({categories,filterCategory}) {
    return (
        <div className="category">
            {
                categories.map((singleCategory,index) => {
                    return(
                        <Link to="/" key={index}><button className="filter-btn"  onClick={() => filterCategory(singleCategory)}>{singleCategory}</button></Link>
                    );
                })
            }
        </div>
    )
}

export default Categories
