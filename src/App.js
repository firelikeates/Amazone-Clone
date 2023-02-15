import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutPage from './Components/CheckoutPage';
import HeaderProject from './Components/HeaderProject';
import HomePage from './Components/HomePage';
import SignIn from './Components/SignIn';
import SignUpPage from './Components/SignUpPage';
import { firebase, realtimedatabase } from "./Firebase/FirebaseConfig"
import Store from "../src/Store/Store"
import { set_user } from './Action/AuthAction';
import PaymentPage from './Components/PaymentPage';
import SetAddress from './Components/SetAddress';
import SearchPage from './Components/SearchPage';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import OrdersPage from './Components/OrdersPage';

const promise = loadStripe("pk_test_51MYunnIVebneKS5lBD5XPi2vQZhspJWk0BxA7Xl192PYODYbwNzSh8Yz9TRErplMINyukdG77tEX8Jf9YUJVc94400jsPgZGL0");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await Store.dispatch(set_user(user))
        await this.setState({ user: user })
      } else {
        await Store.dispatch(set_user(null))
        await this.setState({ user: null })
      }
    })
  }
  render() {
    return (
      <BrowserRouter>

        <Switch>
          <Route path="/" exact >
            <HeaderProject user1={this.state.user} />
            <HomePage />
          </Route>
          <Route path="/checkout">
            <HeaderProject user1={this.state.user} />
            <CheckoutPage />
          </Route>
          <Route path="/SignUp" >
            <SignUpPage user={this.state.user} />
          </Route>
          <Route path={"/SignIn"}>
            <SignIn user={this.state.user} />
          </Route>
          <Route path={"/Payment"}>
            <HeaderProject user1={this.state.user} />
            <Elements stripe={promise}>
              <PaymentPage />
            </Elements>

          </Route>
          <Route path={"/Address"}>
            <SetAddress user={this.state.user} />
          </Route>
          <Route exact path={"/search/:keyword"}>
            <HeaderProject />
            <SearchPage />
          </Route>
          <Route path={"/orders"}>
            <HeaderProject/>
            <OrdersPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

const MapstateToprops = (state) => {
  return {
    user: state.auth.user
  }
}
export default connect(MapstateToprops)(App)