import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./Product";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51MdHjFSAIR8IObaZxsC8iiVu1CR57voWUhkzRQdVy2Iif2TEWxZh7nwIweLq6X82xC05KVTpTJW8kKcvQUAL0H7s00qM1zw5Oq");


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(( ) => {

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>>', authUser);

      if(authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
   <div className="app">

   <Switch>
   <Route path="/login">
    <Login />
   </Route>

    <Route path="/checkout">
    <Header />
     <Checkout />
    </Route>

    <Route path = "/payment">
      <Header />
      <Elements stripe={promise}>
      <Payment />
      </Elements>
    
    </Route>
    <Route path="/">
    <Header />
     <Home />
    </Route>

   </Switch>
    
     </div>  

    </Router>
   
   
  );
}

export default App;
