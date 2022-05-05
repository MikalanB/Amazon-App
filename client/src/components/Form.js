import React, { useState } from 'react';
import axios from 'axios';


const Form = (props) => {

    const { form, onSubmitProp, onChangeHandlerProp } = props;
    
    return(
        <div>
            <h1>Create Amazon Products </h1>
            <div className="d-flex flex-column w-50 justify-content-center mx-auto">
                <form onSubmit={onSubmitProp} className="row g-3 needs-validation">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Title of Product" name="title" onChange={onChangeHandlerProp} value={form.title} />
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Price of Product" name="price" onChange={onChangeHandlerProp} value={form.price} />
                        <label htmlFor="floatingInput">Price</label>
                        {form.price === 0 ? "" : form.price < 1 ? <span className="alert-danger">Price needs to be at least $1!</span> : ""}
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" className="form-control" id="floatingInput" placeholder="name@example.com" style={{height: "150px"}} name="description" onChange={onChangeHandlerProp} value={form.description} ></textarea>
                        <label htmlFor="floatingInput">Description</label>
                        {form.description.length === 0 ? "" : form.description.length < 10 ? <span className="alert-danger">Description needs at least 10 characters!</span> : ""}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="brand of Product" name="brand" onChange={onChangeHandlerProp} value={form.brand} />
                        <label htmlFor="floatingInput">Brand</label>
                    </div>
                    <div className="form-floating mb-3">
                    <select className="form-select" aria-label="Default select example" name="category" onChange={onChangeHandlerProp}>
                        <option disabled>Select a Category</option>
                        <option>Beauty & Personal Care</option>
                        <option>Electronics</option>
                        <option>Grocery & Gourmet Food</option>
                        <option>Health, Household & Baby Care</option>
                        <option>Pet Supplies</option>
                        <option>Video Games</option>
                    </select>
                    <label htmlFor="floatingSelect">Category</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" className="form-control" id="floatingInput" placeholder="name@example.com" style={{height: "150px"}} name="productImgURL" onChange={onChangeHandlerProp} value={form.productImgURL} ></textarea>
                        <label htmlFor="floatingInput">Product Image</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder="Title of Product" name="rating" onChange={onChangeHandlerProp} value={form.rating} />
                        <label htmlFor="floatingInput">Rating</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="defaultCheck1" onChange={onChangeHandlerProp} name="prime"/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Prime?
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder="Price of Product" name="quantity" onChange={onChangeHandlerProp} value={form.quantity} />
                        <label htmlFor="floatingInput">Quantity</label>
                        {/* {form.price === 0 ? "" : form.price < 1 ? <span className="alert-danger">Price needs to be at least $1!</span> : ""} */}
                    </div>
                    <input type="submit" className="btn btn-primary btn-lg " value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default Form;