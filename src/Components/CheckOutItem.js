import { firebase, realtimedatabase } from '../Firebase/FirebaseConfig'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { add_item_to_basket, decrement_basket_total_item, decrement_basket_total_price, increment_basket_total_item, increment_basket_total_price, removeAllSameItems, removeOneItemFromDB, remove_item_from_basket, setProductToDB } from '../Action/ProductAction'
import Store from '../Store/Store'



const CheckOutItem = (props) => {
    const [totalsameitemlength, setTotalsameitemlength] = useState(props.sayi)
    useEffect(() => {
        console.log(3131)
    }, [props.prd.length])


    const incrementproduct = () => {
        setTotalsameitemlength(totalsameitemlength + 1)
        Store.dispatch(increment_basket_total_item())
        Store.dispatch(increment_basket_total_price(parseFloat(props.prd2.price)))
        Store.dispatch(add_item_to_basket({ title: props.prd2.title, price: parseFloat(props.prd2.price), rating: props.prd2.rating, imageUrl: props.prd2.imageUrl, ASIN: props.prd2.ASIN }))
        setProductToDB({ title: props.prd2.title, price: parseFloat(props.prd2.price), rating: props.prd2.rating, imageUrl: props.prd2.imageUrl, ASIN: props.prd2.ASIN })
        console.log(props.prd)
        setTotalsameitemlength(totalsameitemlength + 1)
    }
    //remove one item from basket
    const decrement_product = () => {
        if (totalsameitemlength !== 1) {
            setTotalsameitemlength(totalsameitemlength - 1)
            Store.dispatch(decrement_basket_total_item())
            Store.dispatch(decrement_basket_total_price(parseFloat(props.prd2.price)))
            Store.dispatch(remove_item_from_basket(props.prd2.ASIN))
            removeOneItemFromDB(props.prd2.ASIN)
            setTotalsameitemlength(totalsameitemlength - 1)
        }
    }
    //remove all same items from basket
    const Remove_item_from_basket = async () => {
        await props.remove_item(props.prd2.ASIN, parseFloat(props.prd2.price), totalsameitemlength)

    }
    return (

        <div className="products-checkout">
            <img className='checkout-img' src={props.prd2.imageUrl} alt="" />
            <div className="product-info-checkout">
                <p>{props.prd2.title}</p>
                <div className="product-price-checkout">
                    <small>$</small>
                    <p>{parseFloat(props.prd2.price).toFixed(2)}</p>
                </div>
                <div className="product-rating-checkout">
                    {props.prd2.rating}
                </div>
                <div className="same-item">
                    <h6>{totalsameitemlength}</h6>
                    <i onClick={decrement_product} className="fa fa-minus-circle"></i>
                    <i onClick={incrementproduct} className="fa fa-plus-circle"></i>
                </div>
                <button onClick={Remove_item_from_basket} className="remove_from_basket_btn">Remove From Basket</button>
            </div>

        </div>
    )
}
const MapstateToprops = (state) => {
    return {
        prd: state.product.basket,
        total_price: state.product.basket_total_price,
        total_items: state.product.basket_total_items
    }
}

export default connect(MapstateToprops)(CheckOutItem)