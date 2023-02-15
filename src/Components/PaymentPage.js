import React, { useEffect, useState } from 'react'
import Store from '../Store/Store'
import { Link, useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import "../CSS/Payment.css"
import CheckOutItemFinally from './CheckOutItemFinally'
import firebase from 'firebase'
import { add_orders_to_db, clearprddb,clearbasket, set_basket_total_price, set_orders_to_db } from '../Action/ProductAction'
import { realtimedatabase } from '../Firebase/FirebaseConfig'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import instance from '../axios'



const PaymentPage = (props) => {
    const history = useHistory()
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("");

    const [error, SetError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, Setprocessing] = useState("")
    const [succeeded, SetSucceeded] = useState("")
    const [totalPirce, SetTotalPrice] = useState(0)
    const [clientSecret, setClientSecret] = useState(true)

    var previous_item = [];
    var toplam = 0;

    useEffect(() => {
        if (props.user) setEmail(props.user.email)
        props.prd.forEach(a => {

            toplam += parseFloat(a.price)
        })

        Store.dispatch(set_basket_total_price(toplam))
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                realtimedatabase.ref(`${user.uid}/Address`).once("value").then(res => {
                    var street = res.val().street;
                    var city1 = res.val().City
                    setStreet(street)
                    setCity(city1)
                })
            } else {
            }
        })
    }, [])

    useEffect(() => {

        const getClientSecret =async () => {
            const response = await instance({
                method:"post",
                url:`/payments/create?total=${Math.trunc(props.total_price * 100)}`
            })

            setClientSecret(response.data.clientSecret)
            console.log(clientSecret)
        }

        getClientSecret()

    }, [props.prd])

    console.log("cleint", clientSecret);
    const handleSubmit = async e => {
        e.preventDefault()
        Setprocessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                type: "card",
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            Setprocessing(false)
            SetError(null)
            SetSucceeded(true)
            Store.dispatch(clearbasket())
            clearprddb()
            props.prd.forEach(item=>{
                add_orders_to_db(item)
            })
            history.push("/orders")
            window.location.reload()
        })
    }

    const handleChange = e => {
        setDisabled(e.empty)
        SetError(e.error ? e.error.message : "")
    }

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>CheckOut &#40;{props.prd.length} Items&#41;</h1>
                <section className="payment_section_1">
                    <div className="payment-title">Delivery Address</div>
                    <div className="payment_address">
                        <p>{email}</p>
                        <p>{street}</p>
                        <p>{city}</p>
                    </div>
                </section>
                <section className="payment_section_2">
                    <div className="payment-title">Review Items and Delivery</div>
                    <div className="payment_items">
                        {props.prd.map((item, index) => {
                            var sayi = props.prd.filter(x => x.ASIN === item.ASIN).length
                            previous_item.push(item.ASIN)
                            if (previous_item.filter(x => x === item.ASIN).length <= 1) {
                                return <CheckOutItemFinally sayi={sayi} key={index} prd2={item} />
                            }
                        })}
                    </div>
                </section>
                <section className="payment_section_3">
                    <div className="payment-title">Payment Method</div>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="price_container">
                                Order Total: ${props.total_price}
                                <button disabled={processing || disabled || succeeded}><span>{processing ? "Proccessing" : "Buy Now"}</span></button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </section>
            </div>
            <footer className='signup-footer'>
                <div className="top-part-footer-signup">
                    <Link>Conditions of Use</Link>
                    <Link>Privacy Notice</Link>
                    <Link>Help</Link>
                </div>
                <div className="bottom-part-footer-signup">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
            </footer>
        </div>
    )
}

const MapstateToprops = (state) => {
    return {
        prd: state.product.basket,
        total_price: state.product.basket_total_price,
        total_items: state.product.basket_total_items,
        user: state.auth.user,
        orders:state.product.orders
    }
}

export default connect(MapstateToprops)(PaymentPage)