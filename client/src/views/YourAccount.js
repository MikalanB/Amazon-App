import React, {useContext, useState} from 'react';
import CartContext from '../context/CartContext';
var store = require('store')

const YourAccount = (props) => {

    const user = store.get('user')


    return (
        <div>
            <div className="header__checkout">
                <h4>Your Orders</h4>
            </div>
        </div>
    )
}

export default YourAccount;