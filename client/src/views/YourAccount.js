import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import "../css/Account.css";
var store = require('store')

const YourAccount = (props) => {

    const user = store.get('user')


    return (
        <div>
            <div className="account__body">
                <h3 style={{marginLeft: "30px"}}>Your Account</h3>
                <div className="account__group">
                    <div className="options">
                        <Link className="link-tag" to="/orders">
                        <div className="account__option">
                            <div>
                                <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png" alt="search orders"/>
                            </div>
                            <div className="option__text">
                                <h5>Your Orders</h5>
                                <p>Track, return or buy things again</p>
                            </div>
                        </div>
                        </Link>
                        <Link className="link-tag" to="#">
                        <div className="account__option">
                            <div>
                                <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png" alt="Gift Cards"/>
                            </div>
                            <div className="option__text">
                                <h5>Gift Cards</h5>
                                <p>View balance, redeem, or reload</p>
                            </div>
                        </div>
                        </Link>
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png" alt="Digital Services and Devices"/>
                                </div>
                                <div className="option__text">
                                    <h5>Digital Services and Device Support</h5>
                                    <p>Troubleshoot device issues</p>
                                </div>
                            </div>
                        </Link>
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png" alt="Lists"/>
                                </div>
                                <div className="option__text">
                                    <h5>Your Lists</h5>
                                    <p>View, modify, and share your lists, or create new ones</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="options">
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png" alt="login and Security"/>
                                </div>
                                <div className="option__text">
                                    <h5>Login & security</h5>
                                    <p>View, modify, and share your lists, or create new ones</p>
                                </div>
                            </div>
                        </Link>
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png" alt="Payments"/>
                                </div>
                                <div className="option__text">
                                    <h5>Your Payments</h5>
                                    <p>Manage payment methods and settings, view all transactions</p>
                                </div>
                            </div>
                        </Link>
                        <Link className="link-tag" to="#">
                                <div className="account__option">
                                    <div>
                                        <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/9_messages._CB654640573_.jpg" alt="Messages"/>
                                    </div>
                                    <div className="option__text">
                                        <h5>Your Messages</h5>
                                        <p>View messages to adn from Amazon, sellers and buyers</p>
                                    </div>
                                </div>
                            </Link>
                            <Link className="link-tag" to="/customer-service">
                                <div className="account__option">
                                    <div>
                                        <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png" alt="Customer service"/>
                                    </div>
                                    <div className="option__text">
                                        <h5>Customert Service</h5>
                                        <p></p>
                                    </div>
                                </div>
                            </Link>
                        
                    </div>
                    <div className="options__less">
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Prime_clear-bg._CB423472251_.png" alt="Prime member"/>
                                </div>
                                <div className="option__text">
                                    <h5>Prime</h5>
                                    <p>View benefits and payment settings</p>
                                </div>
                            </div>
                        </Link>
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png" alt="profile"/>
                                </div>
                                <div className="option__text">
                                    <h5>Your Profiles</h5>
                                    <p>Manage, add, or remove user profiles for personalized experiences</p>
                                </div>
                            </div>
                        </Link>
                        <Link className="link-tag" to="#">
                            <div className="account__option">
                                <div>
                                    <img className="option__image" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/10_archived_orders._CB654640573_.png" alt="Archived orders"/>
                                </div>
                                <div className="option__text">
                                    <h5>Archived orders</h5>
                                    <p>View and manage your archived orders</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourAccount;