import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../context/CartContext';
import "../css/Checkout.css";
import {Link} from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';
import { Divider } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import Paypal from '../components/Paypal';
var store = require('store')


const Checkout = () => {

    const {basket, setBasket} = useContext(CartContext)
    var cart = store.get('cart');
    var total = store.get("total")
    var user = store.get('user');

    const onDeleteHandler = (index) => {
        console.log(index);
    
        const copyState = [...cart];
        copyState.splice(index, 1);
        setBasket(copyState);
        store.set('cart', copyState);
        store.set('total', subTotal(copyState));
    }

    const onUpdateQty = (e, index) => {
        total = store.get("total")
        const cartItems = cart[index];
        cartItems.prodQty = parseInt(e);
        //const newCart = [...cart.slice(0, index), cartItems, ...cart.slice(index + 1)]

        console.log(cart);
        setBasket(cart)
        store.set('cart', cart);
        store.set('total', subTotal(cart))
    }

    function round(num, decimalPlaces = 2) {
        num = Math.round(num + "e" + decimalPlaces);
        return Number(num + "e" + -decimalPlaces);
    }

    const subTotal = (array) => {
        const total = array.reduce((accumulator, object) => {
            return accumulator +  round((object.price * object.prodQty), 2);
        }, 0)

        store.set('total', total);
        return total;
    }

    const [form, setForm] = useState({
        fullName: user.address[0],
        phoneNumber: user.address[1],
        address1: user.address[2],
        address2: user.address[3],
        city: user.address[4],
        stateLoc: user.address[5],
        zipCode: user.address[6],
        country: user.address[7],
        defaultAddress: user.address[8]
    });

    const history = useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        console.log("Successful")

        const userForm = store.get("user");
        userForm.address = [form.fullName, form.phoneNumber, form.address1, form.address2, form.city, form.stateLoc, form.zipCode, form.country, form.defaultAddress];
        console.log(userForm);

        axios.put(`http://localhost:8000/api/users/${user._id}/`, userForm)
            .then(res => {
                console.log(res)
                store.set("user", userForm);
                history.push("/displayCheckout")
            })
            .catch(err => console.error(err))
    }

    const [order, setOrder] = useState({
        orderID: "111-" + String(Math.floor((Math.random() * 99999))) + "-" + String(Math.floor(Math.random() * 9999999)),
        order_date: new Date(),
        items_ordered: [cart],
        deliveryAddress: user.address,
        order_total: total,
        user_id: user._id
    })

    console.log(order);

    const placeOrder = () => {
        axios.post("http://localhost:8000/api/orders/create", order)
            .then(res => {
                console.log(res)
                store.set("cart", []);
                history.push("/orderConfirmation")
            })
            .catch (err => {console.log(err)})
    }

    return (
        <div>
            <div className="checkoutProduct">
                <Link to="/"><img className="checkoutProduct__image" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="logo"/></Link>
                <h3>Checkout {cart?.length === 1 ? <span> 1 item</span> : <span>{cart?.length} items</span>}</h3>
                <LockIcon sx={{marginRight: "10px"}}/>
            </div>
            <div className="checkoutLayout">
                <div className="checkout_information">
                    <div className="shipping__container">
                        <div className="checkout__header" style={{marginTop: "10px"}}>
                            <h4>1</h4>
                            <h4 style={{marginLeft: "30px"}}>Shipping Address</h4>
                        </div> 
                        <div className="shipping_information">
                            {
                                user.address?.length < 1
                                ? <span>
                                    <AddressForm form={form} onSubmitProp={onSubmitHandler} onChangeHandlerProp={onChangeHandler}/>
                                    </span>
                                
                                : <span className="customer_address">
                                    <p className="my-auto">{user.address[0]},</p>
                                    <p className="my-auto">{user.address[2]?.toUpperCase()} {user.address[3]?.toUpperCase()} </p>
                                    <p className="my-auto">{user.address[4]?.toUpperCase()}, {user.address[5]?.toUpperCase()} {user.address[6]}</p>
                                </span>
                            }
                        </div>
                        {user.address?.length > 1
                        ? <span>  
                            <AddressForm form={form} onSubmitProp={onSubmitHandler} onChangeHandlerProp={onChangeHandler}/>
                        </span>
                        : <span></span>}
                    </div>
                    <Divider sx={{marginBottom: "10px"}}/>
                    <div className="paymentMethod__container">
                        <div className="checkout__header">
                            <h4>2</h4>
                            <h4 style={{marginLeft: "30px"}}>Payment Method</h4>
                        </div>
                        <div className="payment_method_section">
                            <div className="payment_method">
                                <div className="payment_method_option">
                                    <Paypal amount={total} user={user}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider sx={{marginBottom: "10px"}}/>
                    <div className="checkout__header">
                        <h4>3</h4>
                        <h4 style={{marginLeft: "30px"}}>Review Items and shipping</h4>
                    </div>
                    <div className="cart_container">
                        { cart?.length !== 0 ? <span>
                            {cart.map((item, i) => {
                                return <div key={i} className="prod-container">
                                    <span>
                                        <img src={item.productImgURL} alt={item.title} className="product-image"/>
                                    </span>
                                    <span className="split">
                                        <span className="prod-title">
                                            {item.title}
                                        </span>
                                        <span className="prod-brand">
                                            by: {item.brand}
                                        </span>
                                        <span>
                                        {
                                            item.quantity < 10 ? <h4 style={{ color: 'red'}}>Only {item.quantity} left in stock!</h4>
                                            : item.quantity > 10 && item.quantity < 30 ? <h4 style={{ color: 'red'}}>Low in Stock</h4>
                                            : <h4 style={{ color: 'green'}}>In Stock</h4>
                                        }
                                        </span>
                                        <span className="prod-prime">
                                            <span>{ item.prime === true 
                                                ? <span>
                                                    <img className="prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" />
                                                    <span>Free Delivery</span>
                                                    </span>
                                                : "Free Shipping"}
                                                </span>
                                        </span>
                                        <span className="prod-quantity">
                                            <div className="form-floating mb-3 w-50">
                                                <select className="form-select" aria-label="Default select example" value={cart[i].prodQty} name="qty" onChange={(event) => onUpdateQty(event.target.value, i)}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                                <label htmlFor="floatingSelect">Quantity</label>
                                            </div>
                                        </span>
                                    </span>
                                    <span className="prod-price">
                                        ${item.price}
                                    </span>
                                </div>
                            })} </span>
                        : <h2 style= {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100}}>Your Cart is empty! </h2> }
                    </div>
                </div>
                
                <div className="checkout-box">
                    <div className="total">
                        <span>Subtotal ({cart?.length < 2 && cart?.length > 1 ? <span>{`${cart.length} item`}</span>  : <span>{`${cart.length} items`}</span>}):</span>
                        <span className="price">${total}</span>
                    </div>
                    <FormGroup style={{textAlign: "left"}}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="This order contains a gift" />
                    </FormGroup>
                    <button onClick={placeOrder} id="check-out" className="btn btn-warning">Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout;