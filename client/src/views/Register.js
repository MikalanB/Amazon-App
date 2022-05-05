import React, {useState} from 'react';
import "../css/Register.css";
import { Divider } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import BasicMenu from '../components/BasicMenu';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { Auth } from 'aws-amplify';
var store = require('store')

const Register = (props) => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });
    
    // async function signUp() {
    //     try {
    //         const { user } = await Auth.signUp({
    //             email,
    //             password,
    //             attributes: {
    //                 firstName,
    //                 lastName,          // optional
    //                 phoneNumber,   // optional - E.164 number convention
    //                 // other custom attributes 
    //             }
    //         });
    //         console.log(user);
    //     } catch (error) {
    //         console.log('error signing up:', error);
    //     }
    // }

    const [loggedInUser, setLoggedInUser] = useState({}); 


    const history = useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        console.log("Successful")

        axios.post("http://localhost:8000/api/users/create", form, {withCredentials: true})
            .then(res => {
                console.log("successful", res)
                setLoggedInUser(res.data.results)
                store.set("user", loggedInUser)
                history.push("/")
            })
            .catch(err => console.error(err))
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
            <RegisterForm form={form} onChangeHandlerProp={onChangeHandler} onSubmitProp={onSubmitHandler}/>
                <p>
                    By continuing, you agree to Mikalan's <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088" >Amazon Clone's Conditions of Use</a> and <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">Privacy Notice</a>.
                </p>

                <BasicMenu />
            </div>
            <Divider/>
            <span>Already have an account? <Link to="/signin" className='login__signInButton'>Sign-In</Link></span>
        </div>

        
    )
}


export default Register;