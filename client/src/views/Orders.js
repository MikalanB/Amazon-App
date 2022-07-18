import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
import '../css/Orders.css'
import OrdersTab from '../components/OrdersTab';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';
var store = require('store')

const Orders =() => {

    var user = store.get('user');
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/orders/user/${user._id}`)
            .then(res=> {
                // console.log("found orders")
                // console.log(res.data)
                setOrders(res.data)
            })
            .catch (err => {console.log(err)})

    }, [])

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;  

    let customer_items_ordered = []
    customer_items_ordered.push(orders.map(order => { return order.items_ordered[0].map(item => { return item.title }) }))

const allOrders = orders.map((item, i) => {
        return <div className="order" key={i}>
            <span className="order-header">
                <span className="order-header-left">
                    <span className="container">
                        <p className="order-info-line-1">ORDER PLACED</p>
                        <p className="order-info-line-2">{moment(item.order_date).format('LL')}</p>
                    </span>
                    <span className="container">
                        <p className="order-info-line-1">TOTAL</p>
                        <p className="order-info-line-2">${item.order_total}</p>
                    </span>
                    <span className="container">
                        <p className="order-info-line-1">SHIP TO</p>
                        <Button aria-describedby={id} variant="text" onClick={handleClick} sx={{backgroundColor: "#F0F2F1", height: "30px", width: "200px", color: "#007185"}}>
                        {item.user_id.firstName} {item.user_id.lastName}
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column' }}><strong>{item.deliveryAddress[0]},</strong> <span>{item.deliveryAddress[2]},</span> <span>{item.deliveryAddress[3]},</span> <span>{item.deliveryAddress[4]},</span> <span>{item.deliveryAddress[5]} {item.deliveryAddress[6]}</span></Typography>
                        </Popover>
                    </span>
                </span>
                <span className="order-header-right">
                    <span className="container">
                        <span className="order-info-line-1">ORDER # {item.orderID}</span>
                        <Link to={`/view/order/${item._id}`} style={{color: "#007185", textDecoration: "none"}}><p>View order details</p></Link>
                    </span>
                </span>
            </span>
            <span className="order-info-container">
                <span className="order-info-left">
                    <span className="order_information">
                        <span className="order_status">
                            <span className="order_status_line1">On its way</span>
                            <span className="order_status_line2">Your order is on is getting ready to be shipped!</span>
                        </span>
                        <span>{item.items_ordered[0].map((prod, i) => {
                            return <Link to={`/view/${prod._id}`}  key={i} className="order_item">
                                <img className="order_prod_img" src={prod.productImgURL[0]} alt="product image"/>
                                <span className="order_prod_title">{prod.title}</span>
                            </Link>
                        })}</span>
                    </span>
                </span>
                <span className="order-info-right">
                    <button className="track_package">Track Package</button>
                    <button className="track_package">Get Help</button>
                </span>
            </span>
            </div>
    })

    const buyAgain = orders.map(order => { return <div className="buyAgain_container"> { order.items_ordered[0].map(item => { 
        return <span className="buyAgain_item">
                    <img className="order_prod_img" src={item.productImgURL[0]} alt="product image"/>
                    <span className="item-title"> {item.title }</span> 
                    <span> ${item.price} </span>
                    { item.prime === true ? <img className="order_prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" /> : ""}
                    <button className="btn btn-warning" id="buyAgain-add-to-cart"> Add to Cart</button>
            </span>
})}</div> })

    return (
        <div>
            <h3 className="orders-label">Your Orders</h3>
            <div className="orders-container">
                <OrdersTab allOrdersTab={allOrders} buyAgainTab={buyAgain}/>
            </div>
        </div>
    )
}

export default Orders;