import React, { useState } from 'react';
import "../css/Register.css";

const RegisterForm = (props) => {

    const { form, onSubmitProp, onChangeHandlerProp } = props;
    
    return(
        <div>
            <h2>Create account </h2>
            <div className="d-flex flex-column justify-content-center">
                <form onSubmit={onSubmitProp} className="row g-3 needs-validation">
                    <div className="mb-1 ">
                        <label htmlFor="floatingInput">First Name</label>
                        <input type="text" className="formInput" id="formInput" name="firstName" onChange={onChangeHandlerProp} value={form.firstName} />
                        {form.firstName.length === 0 ? "" : form.firstName < 2 ? <span className="alert-danger">First name must be at least 2 characters</span> : ""}
                    </div>
                    <div className=" mb-1">
                        <label htmlFor="floatingInput">Last Name</label>
                        <input type="text" className="formInput" id="formInput" name="lastName" onChange={onChangeHandlerProp} value={form.lastName} />
                        {form.lastName.length === 0 ? "" : form.lastName < 2 ? <span className="alert-danger">Last name must be at least 2 characters</span> : ""}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="floatingInput">Email</label>
                        <input type="text" className="formInputl" id="formInput" name="email" onChange={onChangeHandlerProp} value={form.email} />
                        {form.email.length === 0 ? "" : form.email.length < 5 ? <span className="alert-danger">Email needs at least 5 characters!</span> : ""}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="floatingInput">Phone Number</label>
                        <input type="text" className="formInput" id="formInput" name="phoneNumber" onChange={onChangeHandlerProp} value={form.phoneNumber} />
                        {form.phoneNumber.length === 0 ? "" : form.phoneNumber.length < 5 ? <span className="alert-danger">Email needs at least 5 characters!</span> : ""}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="floatingInput">Password</label>
                        <input type="password" className="formInput" id="formInput" name="password" placeholder="At least 6 characters" onChange={onChangeHandlerProp} value={form.password} />
                        {form.password.length === 0 ? "" : form.password.length < 6 ? <span className="alert-danger">Password must be at least 6 characters!</span> : ""}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="floatingInput">Re-enter Password</label>
                        <input type="password" className="formInput" id="formInput" name="confirmPassword" onChange={onChangeHandlerProp} value={form.confirmPassword} />
                        {form.confirmPassword.length === 0 ? "" : form.confirmPassword.length < 5 ? <span className="alert-danger">Password needs at least 5 characters!</span> : ""}
                    </div>

                    <input type="submit" className="login__signInButton" style={{ backgroundColor: "#f0c14b" }} value="Continue"/>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;