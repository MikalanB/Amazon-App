import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Products = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [ products, setProducts ] = useState([])

    const history = useHistory();

    useEffect(()=>{
        // axios.get("http://localhost:8000/api/users/getLoggedInUser", {withCredentials:true})
        //     .then(res=>{
        //         console.log("Successfully logged in user", res)
        //         if(res.data.results){
        //             //this means the user is logged in and can accees this page
        //             setLoggedInUser(res.data.results)
        //         }
        //     })
        //     .catch(err=>{
        //         //this means someone who is not logged in tried to access the dashboard
        //         console.log("err when getting logged in user", err)
        //         history.push("/")
        //     })
        axios.get("http://localhost:8000/api/products/all")
            .then(res=> {
                console.log(res.data)
                setProducts(res.data)
            })       
    }, []);

    return(
        <div>
            <div className="products">
                {
                    products.map((item, i) => {
                        return <Link to={`/view/${item._id}`} className="link" key={i}>
                            <div className="product">
                            <img src={item.productImgURL} alt={item.title} className="product-image"/>
                            <span className="title">{item.title}</span>
                            <div className="price-info">
                                <span className="price">${item.price}</span>
                                { item.prime === true ? <img className="prime" src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._CB659998231_.png" alt="Prime verification" /> : ""}
                            </div>
                            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                        </div>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default Products;