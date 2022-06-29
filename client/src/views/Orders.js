import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
import '../css/Orders.css'
import OrdersTab from '../components/OrdersTab';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
var store = require('store')

const Orders =() => {

    var user = store.get('user');
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/orders/user/${user._id}`)
            .then(res=> {
                console.log("found orders")
                console.log(res.data)
                setOrders(res.data)
            })
            .catch (err => {console.log(err)})

    }, [])

    function join(t, a, s) {
        function format(m) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(t);
        }
        return a.map(format).join(s);
        }
    let a = [{month: 'long'}, {day: 'numeric'}, {year: 'numeric'}];

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

const allOrders = orders.map((item, i) => {
        return <div className="order" key={i}>
            <span className="order-header">
                <span className="order-header-left">
                    <span className="container">
                        <p className="order-info-line-1">ORDER PLACED</p>
                        <p className="order-info-line-2">{join(new Date(item.order_date), a, ' ')}</p>
                    </span>
                    <span className="container">
                        <p className="order-info-line-1">TOTAL</p>
                        <p className="order-info-line-2">${item.order_total}</p>
                    </span>
                    <span className="container">
                        <p className="order-info-line-1">SHIP TO</p>
                        <Button aria-describedby={id} variant="text" onClick={handleClick} sx={{backgroundColor: "white"}}>
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
                            <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column' }}><span>{item.deliveryAddress[2]},</span> <span>{item.deliveryAddress[3]},</span> <span>{item.deliveryAddress[4]},</span> <span>{item.deliveryAddress[5]} {item.deliveryAddress[6]}</span></Typography>
                        </Popover>
                    </span>
                </span>
                <span className="order-header-right">
                    <span className="container">
                        <span className="order-info-line-1">ORDER # {item.orderID}</span>
                        <Link to="/order-details"><p>View order details</p></Link>
                    </span>
                </span>
            </span>
            <span className="order-info-container">
                <span className="order-info-left">
                    <span className="order_information">
                        <p>On its way</p>
                        <p>Your order has been placed and is on its way to you!</p>
                        {item.items_ordered.map((prod, i) => {
                            return <div key={i} className="prod">
                                <p>{prod.productImgURL[0]}</p>
                                <p>{prod.title}</p>
                            </div>
                        })}
                    </span>
                </span>
            </span>
            </div>
    })

    return (
        <div>
            <div className="orders-container">
                <h3>Your Orders</h3>
                <OrdersTab allOrders={allOrders}/>
            </div>
        </div>
    )
}

export default Orders;