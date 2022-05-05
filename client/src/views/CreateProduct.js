import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Form from '../components/Form';

const CreateProduct = (props) => {

    const [form, setForm] = useState({
        title: "",
        price: 0,
        description: "",
        brand: "",
        category: "Beauty & Personal Care",
        productImgURL: "",
        rating: 0,
        prime: false,
        quantity: 1
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

        axios.post("http://localhost:8000/api/products/create", form)
            .then(res => {
                console.log(res)
                history.push("/admin/create-product")
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Form form={form} onSubmitProp={onSubmitHandler} onChangeHandlerProp={onChangeHandler} />
        </div>
    )
}

export default CreateProduct;