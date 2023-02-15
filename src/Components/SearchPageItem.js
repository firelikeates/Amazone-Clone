import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { add_item_to_basket,setProductToDB } from '../Action/ProductAction'
import Store from "../Store/Store"

const SearchPageItem = (props) => {
  var control_product = true;
  var sayi=Math.round(Number(props.item.rating))
  var yildiz=""
  useEffect(()=>{
    for( let i =0;i<sayi;i++){
      yildiz+="⭐"
    }
  },[])
  

  const add_item_to_Basket = () => {
    if (props.prd.length === 0) {
      setProductToDB({title:props.item.title,price:parseFloat(props.item.price),rating:props.item.rating,imageUrl:props.item.imageUrl,ASIN:props.item.ASIN})
      Store.dispatch(add_item_to_basket({ title: props.item.title, price: props.item.price, rating: props.item.rating, imageUrl: props.item.imageUrl, ASIN: props.item.ASIN }))
    } else {
      props.prd.forEach(item => {
        if (item.ASIN === props.item.ASIN) {
          control_product = false
        }
      })
      if (control_product) {
        setProductToDB({title:props.item.title,price:parseFloat(props.item.price),rating:props.item.rating,imageUrl:props.item.imageUrl,ASIN:props.item.ASIN})

        Store.dispatch(add_item_to_basket({ title: props.item.title, price: props.item.price, rating: props.item.rating, imageUrl: props.item.imageUrl, ASIN: props.item.ASIN }))
      }
    }
  }
  return (

    <div className="product-search">
      <div className="product-info">
        <p>{props.item.title}</p>
        <div className="product-price">
          <small>$</small>
          <p>{String(props.item.price.slice(0,-2))}</p>
        </div>
        <div className="product-rating">
          {yildiz}
        </div>
      </div>
      <img src={props.item.imageUrl} alt="" />
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

export default connect(MapstateToprops)(SearchPageItem)