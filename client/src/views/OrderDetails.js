import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../css/OrderDetails.css';
import CartContext from '../context/CartContext';
import moment from 'moment'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
var store = require('store')

const OrderDetails = (props) => {

    const [order, setOrder] = useState([]) // store all info related to an 0rder
    const [deliveryAddress, setDeliveryAddress] = useState([]) // stores delivery address
    const [items, setItems] = useState([]) // store items ordered
    const {_id} = useParams();  // get the id from the url
    const { basket, setBasket } = useContext(CartContext);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/orders/${_id}`)
            .then(res=> {
                console.log(res.data)
                setOrder(res.data)
                setDeliveryAddress(res.data.deliveryAddress)
                setItems(res.data.items_ordered[0])
            })
            .catch(err => console.error(err))
    }, [_id])

    function round(num, decimalPlaces = 0) {
        num = Math.round(num + "e" + decimalPlaces);
        return Number(num + "e" + -decimalPlaces);
    }

    const buyAgainButton = (item) => {
        const item_ordered = {
            _id: item._id, 
            title: item.title,
            price: item.price,
            description: item.description,
            brand: item.brand,
            category: item.category,
            productImgURL: item.productImgURL,
            rating: item.rating,
            prime: item.prime,
            quantity: item.quantity,
            prodQty: 1
        };

        console.log(item_ordered)  

        const newState = [...basket, item_ordered]
            setBasket(newState);
            console.log(newState)
            store.set('cart', newState);
            const total = newState.reduce((accumulator, object) => {
                    return accumulator + round((object.price * object.prodQty), 2);
                }, 0)
            store.set('total', total);
    }

    return (
        <div className="orders-wrapper">
            <div className="order-header-container">
                <h3 className="order-page-title">Order Details</h3>
                <span className="order-details">
                    <p>Ordered on {moment(order.order_date).format('LL')}</p> 
                    <p style={{color: 'lightgray', marginLeft: '5px', marginRight: '5px'}}>|</p>
                    <p>Order# {order.orderID}</p>
                </span>
            </div>    
            <div className="order-details-wrapper">
                <div className="order-information-container">
                    <span className="order-shipping-information">
                        <p className="order-section-header">Shipping Address</p>
                        <p>{deliveryAddress[0]}</p>
                        <p>{deliveryAddress[1]}</p>
                        <p>{deliveryAddress[2]}</p>
                        <p>{deliveryAddress[3]}</p>
                        <p>{deliveryAddress[4]}, {deliveryAddress[5]} {deliveryAddress[6]}</p>
                    </span>
                    <span className="order-payment-method">
                        <p className="order-payment-header">Payment Method:</p>
                        <img src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png" alt="paypal logo" className="paypal-payment-img"/>
                    </span>
                    <span className="order-summary">
                        <p className="order-section-header">Order Summary:</p>
                        <span className="order-section-header-line">
                            <p>Item(s) Subtotal: </p>
                            <p>${order.order_total}</p>
                        </span>
                        <span className="order-section-header-line">
                            <p>Shipping & Handling: </p>
                            <p>$0.00</p>
                        </span>
                        <span className="order-section-header-line">
                            <p>Total before tax: </p>
                            <p>${order.order_total}</p>
                        </span>
                        <span className="order-section-header-line">
                            <p>Estimated tax to be collect: </p>
                            <p>$0.00</p>
                        </span>
                        <span className="order-section-header-line">
                            <p className="order-section-header">Grand Total: </p>
                            <p>${order.order_total}</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className="items-ordered-container">
                <div className="left-order-container">
                    <div className="order-delivery-container">
                        <p className="order-delivery-status">On it's Way</p>
                        <p className="order-delivery-message">Your package is on it's way</p>
                    </div>
                    <div className="ordered-items-information">
                        {items.map((item, i) => {
                            return <div className="item-ordered-container" key={i}>
                                <span>
                                    <img src={item.productImgURL[0]} alt={item.title} className="item-ordered-image"/>
                                </span>
                                <span className="item-information">
                                    <p style={{color: "#007185"}}>{item.title}</p>
                                    <p>Sold by: <span style={{color: "#007185"}}>{item.brand}</span></p>
                                    <p>${item.price}</p>
                                    <button className="btn btn-warning" id="buy-again-button" onClick={() => buyAgainButton(item)}><ShoppingCartOutlinedIcon /> Buy it again</button>
                                </span>
                            </div>
                        })}
                    </div>
                </div>
                <div className="right-order-container">
                    <button onClick="#">Track Package</button>
                    <button onClick="#">Return Items</button>
                    <button onClick="#">Share gift receipt</button>
                    <button onClick="#">Leave Seller Feedback</button>
                    <button onClick="#">Write a product review</button>
                    <button onClick="#">Archive Order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;