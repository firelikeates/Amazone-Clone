import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store/Store';
import { realtimedatabase, firebase } from './Firebase/FirebaseConfig';
import { add_item_to_basket, set_orders } from './Action/ProductAction';


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    realtimedatabase.ref(`${user.uid}/Products`).once("value").then(res => {
      if (res.val()) {
        Object.keys(res.val()).forEach(function (key) {
          Object.keys(res.val()[key]).forEach(function (key2) {
            Store.dispatch(add_item_to_basket(Object.values(res.val()[key])[0]))
          })
        })
      }
    }).then(() => {
      realtimedatabase.ref(`${user.uid}/Orders`).once("value").then((res)=>{
        Store.dispatch(set_orders(res.val()))
      })
    }).then(()=>{
      ReactDOM.render(
        <BrowserRouter>
          <Provider store={Store}>
            <App />
          </Provider>
        </BrowserRouter>,
        document.getElementById('root'))
    })
  } else { }
})

