import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default () => {
    const [ products, setProducts ] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/products/all")
            .then(res=> {
                console.log(res.data)
                setProducts(res.data)
            })       
    }, []);

    const onDeleteHandler = (_id, arrIndex) => {
        console.log("delete")
        axios.delete("http://localhost:8000/api/products/" + _id)
            .then(res => {
                console.log(res)
                const copyState = [...products]
                copyState.splice(arrIndex, 1)
                setProducts(copyState)
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <Link to="/admin/create-product">Create product</Link>
            <h1>All Products</h1>
            <div className="d-flex flex-column justify-content-center">
                    {
                        products.map((item, i) => {
                            return <div key={i} className="list-group d-flex flex-row justify-content-center">
                                <Link to={`/admin/update/${item._id}`} className="list-group-item list-group-item-action mx-auto w-50">{item.title}</Link>
                                <button className="btn btn-danger btn-md my-3 mx-4" onClick={() => onDeleteHandler(item._id, i)}>Delete {item.title}</button>                            

                            </div>
                        })
                    }
            </div>
        </div>
    )
}