import React from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Form from '../components/Form';

const Update = (props) => {
    const {_id} = useParams();
    const [form, setForm] = useState({
        title: "",
        price: 0,
        description: "",
        brand: "",
        category: "Beauty & Personal Care",
        productImgURL: "",
        rating: 0,
        prime: false,
        quantity: 0,
    });

    const history = useHistory();

    useEffect (() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                console.log(res.data)
                setForm({
                    title: res.data.title,
                    price: res.data.price,
                    description: res.data.description,
                    brand: res.data.brand,
                    category: res.data.category,
                    productImgURL: res.data.productImgURL,
                    rating: res.data.rating,
                    prime :res.data.prime,
                    quantity: res.data.quantity,
                })
            })
            .catch(err => {console.log(err)});
    }, [])

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        console.log("You working?")

        axios.put(`http://localhost:8000/api/products/${_id}`, form)
            .then(res => {
                console.log(res)
                history.push("/delete")
            })
            .catch(err => console.error(err))
    }

    return (
        <Form form={form} onSubmitProp={onSubmitHandler} onChangeHandlerProp={onChangeHandler}/>
    )
}

export default Update;