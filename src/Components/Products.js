import React from 'react'
import { connect } from 'react-redux'
import { add_item_to_basket, setProductToDB } from '../Action/ProductAction'
import Store from "../Store/Store"

const Products = (props) => {
  var control_product = true;

  const add_item_to_Basket = () => {
    if(props.prd.length===0){
      setProductToDB({title:props.title,price:props.price.slice(0,-2),rating:props.rating,imageUrl:props.imageUrl,ASIN:props.ASIN})
      Store.dispatch(add_item_to_basket({title:props.title,price:props.price.slice(0,-2),rating:props.rating,imageUrl:props.imageUrl,ASIN:props.ASIN}))
    }else{
      props.prd.forEach(item=>{
        console.log(item)
        if(item.ASIN===props.ASIN){
          control_product=false
        }
      })
      if(control_product){
        Store.dispatch(add_item_to_basket({title:props.title,price:props.price.slice(0,-2),rating:props.rating,imageUrl:props.imageUrl,ASIN:props.ASIN}))
        setProductToDB({title:props.title,price:props.price.slice(0,-2),rating:props.rating,imageUrl:props.imageUrl,ASIN:props.ASIN})
      }
    }
  }

  return (
    <div className="product">
      <div className="product-info">
        <p>{props.title}</p>
        <div className="product-price">
          <small>$</small>
          <p>{props.price}</p>
        </div>
        <div className="product-rating">
          {props.rating}
        </div>
      </div>
      <img src={props.imageUrl} alt="" />
      <button onClick={add_item_to_Basket} className="add_basket">Add to Basket</button>
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

export default connect(MapstateToprops)(Products)