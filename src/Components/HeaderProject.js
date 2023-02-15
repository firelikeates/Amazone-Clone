import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { connect } from "react-redux"
import { Link, Redirect, useHistory } from 'react-router-dom'
import Store from "../Store/Store"
import "../CSS/Header.css"
import logo from "../Pictures/Amazon-Logo-Font-1-scaled.webp"
import { firebase, realtimedatabase } from "../Firebase/FirebaseConfig"
import { set_input_search } from '../Action/ProductAction'



const HeaderProject = (props) => {
    const history=useHistory()

    const [basketnumber, setBasketNumber] = useState(Number(props.prd.length))
    const [name, setName] = useState("");
    const [user, SetUser] = useState(null)
    const [keyword, SetKeyword] = useState("")
    

    useEffect(() => {
        var string1 = ""
        var index;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                realtimedatabase.ref(`${user.uid}/User_Name`).once("value").then(res => {
                    index = String(res.val().name).indexOf(" ")
                    string1 = String(res.val().name).slice(0, index)
                    setName(string1)
                    SetUser(user)
                })
            } else {
                SetUser(null)
            }
        })



    }, [])
    useEffect(() => {
        setBasketNumber(Number(props.prd.length))
    }, [Number(props.prd.length)])

    const signoutfunc = () => {
        if (props.user) {
            firebase.auth().signOut()
        }
    }
    const keywordOnChange = (e) => {
        SetKeyword(e.target.value)
    }
    const OnFormSubmit = (e)=>{
        e.preventDefault();
        Store.dispatch(set_input_search(keyword))
        history.push(`/search/${keyword}`)
    }
    const searchOnClick = e=>{
        Store.dispatch(set_input_search(keyword))
        history.push(`/search/${keyword}`)

    }

    return (
        <header>
            <div className="container">
                <Link to={"/"} className="header-img-part">
                    <img src={logo} className='img-amazone-header' alt="" />
                </Link >
                <div className="header-search-part">
                    <form onSubmit={OnFormSubmit} className="form-header">
                        <input onChange={keywordOnChange} value={keyword} type="text" placeholder='search...' />
                        <i style={{cursor:"pointer"}}  onClick={searchOnClick} className="fa fa-search"></i>
                    </form>
                </div>
                <nav className="header-links">
                    <Link to={!props.user && "/SignIn"} onClick={signoutfunc} className="linkgroup-one">
                        <span className='one'>Hello, {user !== null ? name : "Guest"}</span>
                        <span className='two'>{props.user ? `Sign Out` : `Sign In`}</span>
                    </Link>
                    <Link to={"/orders"} className="linkgroup-two">
                        <span className='one'>Returns</span>
                        <span className='two'>& Orders</span>
                    </Link>
                    <Link className="linkgroup-three">
                        <span className='one'>Your</span>
                        <span className='two'>Prime</span>
                    </Link>
                    <Link to={"/checkout"} className="market-part">
                        <i className="fa fa-shopping-basket"></i>
                        <div>{basketnumber}</div>
                    </Link>
                </nav>
            </div>
        </header>
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

export default connect(MapstateToprops)(HeaderProject)