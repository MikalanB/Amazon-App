import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';
import Rating from '@mui/material/Rating';
import "../css/OrderConfirmation.css"
import axios from 'axios'

const OrderConfirmation = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products/all")
            .then(res=> {
                console.log(res.data)
                setProducts(res.data)
            })       
    }, []);

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // using Array map and Math.random
    const randomProducts = shuffle(products).map(item => {
        return <div className="product">
            <img src={item.productImgURL} alt={item.title} className="product-image"/>
            <span className="title">{item.title}</span>
            <div className="price-info">
                <span className="price">${item.price}</span>
                { item.prime === true ? <img className="prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" /> : ""}
            </div>
            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
        </div>
    }
    )

    console.log((products.length))

    return(
        <div>
            <div className="container1">
                <div className="order-confirm">
                    <CheckIcon sx={{color: "green"}}/>
                    <h3 style={{color: "green", marginLeft: '10px'}}>Thank you, your order has been placed</h3>
                </div>
                <h5>You will receive an email confirmation shortly.</h5>
                <Link to="/orders">View your Orders</Link>
            </div>
            <div>
                <div className="container-2">
                    <h3>More items to explore</h3>
                    <div className="products">
                        {randomProducts}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation;