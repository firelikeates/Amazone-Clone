import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import SearchPageItem from './SearchPageItem'
import { Link } from "react-router-dom";
import "../CSS/Search.css"
import Store from '../Store/Store';
import { Set_Search_Results } from '../Action/ProductAction';

const SearchPage = (props) => {

  const [array, SetArray] = useState(props.searchresults);
  const [key, SetKey] = useState("")
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f215235837msh5cc8fa193213c01p11e10cjsn36b327e741b7',
      'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
    }
  }
  function  responseFunc(responseData){
    Store.dispatch(Set_Search_Results(responseData))
  }
  useEffect(() => {
    if (props.keyword !== "") {
      fetch(`https://amazon-price1.p.rapidapi.com/search?keywords=${props.keyword}&marketplace=ES`, options)
        .then(response => response.json())
        .then(response => responseFunc(response))
        .catch(err => console.error(err))

    }else{
      console.log(31)
    }
  }, [props.keyword])



  return (
    <div className="container-home-page">
        <div className="products-part">
          <div className="home-row-search">
            {array.map((item,index)=>{
              if(index<2){
                return <SearchPageItem item={item} key={index} />
              }
            })}
          </div>
          <div className="home-row-search">
            {array.map((item,index)=>{
              if(index<4 && index>1){
                return <SearchPageItem item={item} key={index} />
              }
            })}
          </div>
          <div className="home-row-search">
            {array.map((item,index)=>{
              if(index<6 && index>3){
                return <SearchPageItem item={item} key={index} />
              }
            })}
          </div>
          <div className="home-row-search">
            {array.map((item,index)=>{
              if(index<8 && index>5){
                return <SearchPageItem item={item} key={index} />
              }
            })}
          </div>
          <div className="home-row-search">
            {array.map((item,index)=>{
              if(index>=8){
                return <SearchPageItem item={item} key={index} />
              }
            })}
          </div>
        </div>
        <footer className='home-footer'>
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

const MapStateToProps = (state) => {
  return {
    keyword: state.product.keyword,
    searchresults:state.product.searchresults
  }
}

export default connect(MapStateToProps)(SearchPage)



