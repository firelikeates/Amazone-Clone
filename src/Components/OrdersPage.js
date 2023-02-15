import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { realtimedatabase } from '../Firebase/FirebaseConfig'
import "../CSS/Order.css"
import OrdersItem from './OrdersItem'

const OrdersPage = (props) => {
    const [totalorder, SetTotalOrder] = useState(props.orders.length)
    useEffect(() => {
        SetTotalOrder(props.orders.length)
        console.log(props.orders)
    }, [])

    return (
        <>
            <div className="orders-container">
                <div className="card">
                    <div className="card-header">
                        <h3>Your Orders</h3>
                        <div className="search-orders">
                            <input type="text" placeholder='search-orders' />
                            <i className="fa fa-search"></i>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="links-orders-body">
                            <Link to={"/orders"}>Orders</Link>
                            <Link>Buy Again</Link>
                            <Link>Not Yet Shipped</Link>
                            <Link>Digital Orders</Link>
                            <Link>Local Store Orders</Link>
                            <Link>Cancelled Orders</Link>
                        </div>
                        <hr style={{ marginBottom: "8px" }} />
                        <div className="info_of_places_prd">
                            <h4>{Object.keys(props.orders).length} orders placed in</h4>
                            <select id="info_orders_placed_select">
                                <option value="30-days">Last 30 Days</option>
                                <option value="3-months">Past 3 Months</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="orders-products">
                            {Object.entries(props.orders).map((item, index) => {
                                console.log(item);
                                return <OrdersItem key={index} item={item[1]} />
                            })}
                        </div>
                    </div>
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
        </>
    )
}

const MapstateToprops = (state) => {
    return {
        orders: state.product.orders,
        user: state.auth.user
    }
}

export default connect(MapstateToprops)(OrdersPage)