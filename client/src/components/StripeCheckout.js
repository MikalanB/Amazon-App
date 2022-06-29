import React from 'react';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
var store = require('store')

const STRIPE_PUBLISHABLE = "pk_test_51GrfG2KHY2hncVaQdxdXNLkOAmEURoMVJSYuz6zaRJMbZs56VjcjSmkXrtgwlDjtjjPiybIEavgIEdhVyA4jDZFD00Qusl84FB";

// const onToken = (user, checkout) => token =>  
//     StripeCheck(user, token.id);
// const history = useHistory();

const successPayment = data => {
    console.log('Payment Successful');
    // history.push("/confirmation")
};

const onToken = (amount, description) => token => {

    axios.post("http://localhost:3000/api/payment",
        {
        description,
        source: token.id,
        currency: "USD",
        amount: (amount * 100)
        })
        .then(successPayment)
        .catch(
            console.log("Error processing payment")
        );
}
        
const StripeCheck = ({ amount, user, checkout }) => 
    <StripeCheckout
        name="AMAZON CLONE WEB APP"
        amount={amount * 100}
        token={onToken(user,checkout)}
        currency="USD"
        stripeKey={STRIPE_PUBLISHABLE}
        ComponentClass="div"
/>


export default StripeCheck;