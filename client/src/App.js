import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import axios from 'axios';
import "./css/Header.css";
import Main from './views/Main';
import YourAccount from './views/YourAccount';
import CustomerService from './views/CustomerService';
import CreateProduct from './views/CreateProduct';
import Delete from './views/Delete';
import Update from './views/Update';
import ViewProduct from './views/ViewProduct';
import YourCart from './views/YourCart';
import CartContext from './context/CartContext';
import { Fragment, useState, useEffect } from 'react';
import Login from './views/Login';
import Header from './components/Header';
import Register from './views/Register';
import AuthContext from './context/AuthContext';
import { useHistory } from 'react-router-dom';
import Checkout from './views/Checkout';
var store = require('store')


function App() {

  const [basket, setBasket] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const cart = store.set('cart', basket);

  const history = useHistory();

  return (
    <div className="App">
      <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <CartContext.Provider value={{basket, setBasket}}>
    <Switch>
      <Fragment>
        <Route exact path="/">
          <Header />
          <Main />
        </Route>
        <Route exact path="/dashboard">
          <Header />
          <Main />
        </Route>
        <Route exact path="/admin/create-product">
          <CreateProduct />
        </Route>
        <Route exact path="/account">
          <Header />
          <YourAccount />
        </Route>
        <Route exact path="/view/:_id">
          <Header />
          <ViewProduct />
        </Route>
        <Route exact path="/customer-service">
          <Header />
          <CustomerService />
        </Route>
        <Route exact path="/delete">
          <Delete />
        </Route>
        <Route exact path="/admin/update/:_id">
          <Update />
        </Route>
        <Route exact path="/cart">
          <Header />
          <YourCart />
        </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/displayCheckout">
        <Checkout />
      </Route>
      </Fragment>
    </Switch>
    </CartContext.Provider>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
