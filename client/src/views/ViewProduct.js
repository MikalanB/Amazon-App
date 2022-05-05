import React, {useContext} from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import LockIcon from '@mui/icons-material/Lock';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../css/ViewProduct.css'
import CartContext from '../context/CartContext';
var store = require('store')

const ViewProduct = (props) => {
    const {_id} = useParams();
    const [product, setProduct] = useState([])
    const [images, setImages] = useState({})
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState([])
    const [qty, setQty] = useState(1);
    
    const { basket, setBasket } = useContext(CartContext);

    function round(num, decimalPlaces = 0) {
        num = Math.round(num + "e" + decimalPlaces);
        return Number(num + "e" + -decimalPlaces);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log("plau?")

        const item = {
            _id: product._id, 
            title: product.title,
            price: product.price,
            description: product.description,
            brand: product.brand,
            category: product.category,
            productImgURL: product.productImgURL,
            rating: product.rating,
            prime: product.prime,
            quantity: product.quantity,
            prodQty: qty
        };
        const newState = [...basket, item]
            setBasket(newState);
            store.set('cart', newState);
            const total = newState.reduce((accumulator, object) => {
                    return accumulator + round((object.price * object.prodQty), 2);
                }, 0)
            store.set('total', total);
            }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect (() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                //console.log(res.data.productImgURL[0].split(','))
                setProduct(res.data)
                setImages({
                    1: res.data.productImgURL[0].split(',')[0],
                    2: res.data.productImgURL[0].split(',')[1],
                    3: res.data.productImgURL[0].split(',')[2],
                    4: res.data.productImgURL[0].split(',')[3],
                    5: res.data.productImgURL[0].split(',')[4]
                })
                setRating(res.data.rating)
                setDescription(res.data.description.split('\n\n'))
                //addItem([res.data])
            })
            .catch(err => {console.log(err)});
    }, [_id])

    return(
        <div className="wrapper">
            <div className="container-1">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div id="carousel" className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={images[1]} className="d-block w-100" alt={product.title} style={{ height: "100%", objectFit: "contain"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src={images[2]} className="d-block w-100" alt={product.title} style={{ height: "100%", objectFit: "contain"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src={images[3]} className="d-block w-100" alt={product.title} style={{ height: "100%", objectFit: "contain"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src={images[4]} className="d-block w-100" alt={product.title} style={{ height: "100%", objectFit: "contain"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src={images[5]} className="d-block w-100" alt={product.title} />
                        </div>
                    </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                </div>
            </div>
            <div className="container-2">
                <div className="item-title-info">
                    <h4>{product.title}</h4>
                    <Rating precision={0.5} name="simple-controlled" value={product.rating ? product.rating : 5} readOnly/>
                    <Divider />
                </div>
                <div className="price-info-1">
                    <span className="price">${product.price}</span>
                    <span>{ product.prime === true 
                    ? <span>
                        <img className="prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" />
                        <Button aria-describedby={id} variant="text" onClick={handleClick}>& Free Returns</Button>
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
                            <Typography sx={{ p: 2, overflowWrap: "break-word", color: "black", width: "250px", display: "flex", flexDirection: "column" }}>
                                <span style={{marginBottom: 10}}><strong>Return this item for free</strong></span>
                                <span>Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no shipping charges. <a href="https://www.amazon.com/freereturns">Learn more about free returns.</a></span>
                            </Typography>
                            {/* <Typography sx={{ p: 2, overflowWrap: "break-word", color: "black", }}>Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no shipping charges.</Typography> */}
                        </Popover>
                        </span>
                    : ""}
                    </span>
                </div>
                <div className="brand-info">
                    <span className="brand"><strong>Brand: </strong> {product.brand}</span>
                    <span className="brand"><strong>Category: </strong> {product.category}</span>
                    <Divider/>
                </div>
                <div className="description">
                    <h5 className="description-header">About this item</h5>
                    <ul>
                        { description.map((item, i) => {
                                return <li key={i}>{ item }</li>
                        }) }
                    </ul>
                </div>
            </div>
            <div className="container-3">
                <div className="buy-description">
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label={
                        <div className="buy-new">
                            <span>Buy new: </span> <span className="price">${product.price}</span>
                            </div>} />
                    </RadioGroup>
                    </FormControl>
                        <div>
                            <span>{ product.prime === true 
                            ? <span>
                                <img className="prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" />
                                <Button aria-describedby={id} variant="text" onClick={handleClick}>& Free Returns</Button>
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
                                    <Typography sx={{ p: 2, overflowWrap: "break-word", color: "black", width: "250px", display: "flex", flexDirection: "column" }}>
                                        <span style={{marginBottom: 10}}><strong>Return this item for free</strong></span>
                                        <span>Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no shipping charges. <a href="https://www.amazon.com/freereturns">Learn more about free returns.</a></span>
                                    </Typography>
                                </Popover>
                                </span>
                            : ""}
                            </span>
                        </div>
                        {/* <span>Buy new: </span>
                        <span>{product.price}</span> */}
                </div>
                <div style={{height: "50px"}}>
                    {
                    product.quantity < 10 ? <h4 style={{ color: 'red'}}>Only {product.quantity} left in stock!</h4>
                    : product.quantity > 10 && product.quantity < 30 ? <h4 style={{ color: 'red'}}>Low in Stock</h4>
                    : <h4 style={{ color: 'green'}}>In Stock</h4>
                }
                </div>
                <div className="choose-quantity">
                <form onSubmit={onSubmitHandler}>
                    <div className="form-floating mb-3">
                        <select className="form-select" aria-label="Default select example" name="qty" onChange={(event) => setQty(event.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <label htmlFor="floatingSelect">Quantity</label>
                    </div>
                        <input type="submit" id="add-to-cart" className="btn btn-warning" value="Add to cart" />
                    </form>
                    <Button aria-describedby={id} variant="text" onClick={handleClick}> <LockIcon /> Secure Transaction </Button>
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
                        {/* <Typography sx={{ p: 2, overflowWrap: "break-word", color: "black", width: "250px", display: "flex", flexDirection: "column" }}>
                            <span style={{marginBottom: 10}}><strong>Your Transaction is secure</strong></span>
                            <span>We work hard to protect your security and privacy. Our payment security system encrypts your information during transmission. We don’t share your credit card details with third-party sellers, and we don’t sell your information to others.<a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201909010&ref_=buybox-secureTransaction-learnMore-web">Learn more.</a></span>
                        </Typography> */}
                        {/* <Typography sx={{ p: 2, overflowWrap: "break-word", color: "black", }}>Free returns are available for the shipping address you chose. You can return the item for any reason in new and unused condition: no shipping charges.</Typography> */}
                    </Popover>
                </div>
                </div>
        </div>
    )
}

export default ViewProduct;