import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import "../css/Login.css";
import { Divider } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import BasicMenu from '../components/BasicMenu';
import AuthContext from '../context/AuthContext';
var store = require('store');

const Login = (props) => {

    const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    let [loginformErrors, setloginFormErrors] = useState("")

    const history = useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {form}, {withCredentials: true})
            .then(res => {
                console.log("successful maybe?", res)
                if(res.data.error){
                    console.log("Try again!!!")
                    setloginFormErrors(res.data.error)
                }else{
                    console.log("definitely successful")
                    console.log(res.data.results)
                    setLoggedInUser(res.data.results)
                    // store.set('user', loggedInUser)
                    history.push("/dashboard")
                }
            })
            .catch(err => {
                console.error(err)
                setloginFormErrors("Invalid credentials")
            })
    }

    return(
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={onSubmitHandler}>
                    <p className="text-danger">{loginformErrors}</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChangeHandler}/>
                        {form.email.length === 0 ? "" : form.email.length < 5 ? <span className="alert-danger">Email needs at least 5 characters!</span> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={onChangeHandler}/>
                        {form.password.length === 0 ? "" : form.password.length < 6 ? <span className="alert-danger">Password must be at least 6 characters!</span> : ""}
                    </div>

                    <input type='submit' className='login__signInButton' value="Sign In" style={{ backgroundColor: "#f0c14b" }}/>
                </form>

                <p>
                    By continuing, you agree to Mikalan's <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088" >Amazon Clone's Conditions of Use</a> and <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">Privacy Notice</a>.
                </p>

                <BasicMenu />
            </div>
            <Divider sx={{color: 'black'}}>New to Amazon?</Divider>
            <Link to="/register" className='register__button'>Create your Amazon Account</Link>
        </div>

        
    )
}


export default Login;