import React from 'react'
import Store from '../Store/Store'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { add_item_to_basket, setProductToDB } from '../Action/ProductAction'

const OrdersItem = (props) => {
    const history = useHistory()

    const buy_it_again=async ()=>{
        await Store.dispatch(add_item_to_basket(props.item))
        await setProductToDB(props.item)
        await history.push("/checkout")
    }

    return (
        <div className="orders-row">
            <img src={props.item.imageUrl} alt="" />
            <div className="orders-product-info">
                <h5 style={{color:"rgb(36,83,153)",marginBottom:"6px"}}>{props.item.title}</h5>
                <p style={{marginTop:"6px",marginBottom:"6px"}}><strong>${Number(props.item.price).toFixed(2)}</strong></p>
                <p style={{marginTop:"6px",marginBottom:"6px"}}>{props.item.rating}</p>
                <button onClick={buy_it_again} className="btn-order-buy-it-again">Buy It Again</button>
            </div>
            <div className="right-orders-buttons">
                <button>Order Details</button>
                <button>Write a product review</button>
                <button>Archive Order</button>
            </div>
        </div>
    )
}
const MapstateToprops=(state)=>{
    return{

    }
}
export default OrdersItem