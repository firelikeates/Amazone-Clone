import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { add_item_to_basket, clearbasket, clearprddb, decrement_basket_total_item, removeAllSameItems, remove_all_items_from_basket, set_basket_total_items, set_basket_total_price } from '../Action/ProductAction';
import "../CSS/CheckOutPage.css"
import Store from '../Store/Store'
import { remove_item_from_basket } from '../Action/ProductAction'
import CheckOutItem from './CheckOutItem';
import { useHistory } from 'react-router-dom';
import { realtimedatabase } from '../Firebase/FirebaseConfig';

const CheckoutPage = (props) => {
    const history = useHistory()

    const [email, setEmail] = useState("")
    var previous_item = []
    let toplam = 0;
    useEffect(() => {

        if (props.user) {
            setEmail(props.user.email)
            
        }
        totallengthfunc()
    }, [])


    const totallengthfunc = () => {
        Store.dispatch(set_basket_total_items(props.prd.length));

        props.prd.forEach(a => {

            toplam += parseFloat(a.price)
        })

        Store.dispatch(set_basket_total_price(toplam))
    }
    const Remove_item_from_basket =async (id, price, total_items_miktari) => {
        await removeAllSameItems(id)
        Store.dispatch(set_basket_total_items(Number(props.total_items) - Number(total_items_miktari)))
        Store.dispatch(set_basket_total_price(Number(props.total_price) - Number(total_items_miktari) * Number(price)))
        await Store.dispatch(remove_all_items_from_basket(id))
        
    }

    const clearall = () => {
        Store.dispatch(clearbasket())
        clearprddb()
    }

    return (
        <div className="checkout">
            <div className="checkout-left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout_ad" />
                <div>
                    <div className="left-top-checkout">
                        <div className='text-part'>
                            <h4>Hello, {props.user ? props.user.email : "Guest"}</h4>
                            <h2 className='checkout_title'>Your Shopping Basket</h2>
                        </div>
                        <button onClick={clearall} className='clear-all-basket'>Clear All</button>
                    </div>
                    <div className="products-checkout-main-content">
                        {props.prd.map((item, index) => {
                            var sayi = props.prd.filter(x=>x.ASIN===item.ASIN).length
                            previous_item.push(item.ASIN)
                            if (previous_item.filter(x => x === item.ASIN).length <= 1) {
                                return <CheckOutItem sayi={sayi} remove_item={Remove_item_from_basket} key={index} subtotal={Number(props.total_price)} totallength={Number(props.total_items)} prd2={item} />
                            }
                        })}

                    </div>
                </div>
            </div>
            <div className="checkout-right">
                <div className="subtotal">
                    <div className="totalitems">
                        <strong>Subtotal </strong> &#40;{props.total_items} items &#41; : <strong>{Number(props.total_price).toFixed(2)}$</strong>
                    </div>
                    <div className="checkout-inputpart">
                        <input type="checkbox" id="checkout-checkbox-subtotal" />
                        <p>This order contains a gift</p>
                    </div>
                    <button onClick={() => { history.push("/Payment") }} className="checkout-right-btn">Proceed to Checkout</button>

                </div>
            </div>
        </div>
    )
}

const MapstateToprops = (state) => {
    return {
        prd: state.product.basket,
        total_price: state.product.basket_total_price,
        total_items: state.product.basket_total_items,
        user: state.auth.user
    }
}

export default connect(MapstateToprops)(CheckoutPage)