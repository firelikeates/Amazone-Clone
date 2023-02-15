import React from 'react'
import { Link } from "react-router-dom"
import "../CSS/Home.css"
import Products from './Products'


const HomePage = () => {
    return (
        <div className="container-home-page">
            <div className="imgpart-home">
                <img src="https://m.media-amazon.com/images/S/relevo-segment-images/us/offer_hero_slot_vine_web/b6888527c04a2b7b8e0877f29fb492a49b63c6d85448eb977eb3b1ec_0/6a83d1a9b75648fc1491e44556401580d7a51aa830dbba6566836b4a.jpg" alt="" className="prime-img" />
                <h1 id="prime-hero-module-headline" className="headline1">New members, try Prime <br /><span className="text-highlight">Free for 30 days</span></h1>
                <h2 id="prime-hero-module-subheadline" className="headline2">Free delivery, popular movies and shows,<br /> exclusive deals, and more
                </h2>
                <h2 className="headline3">Only $14.99/month after trial. Cancel anytime.
                </h2>
                <a href='#' className='headline4'>

                    Explore other plans
                </a>
                <button className="home-btn-30-days">Start your free 30-day trail</button>
            </div>
            <div className="products-part">
                <div className="home-row">
                    <Products title={"The Lean StartUp: How Constant Innovation Creates Radically Successful Businesses Paperback"} ASIN={"12321341"} price={"19.99"} rating={"⭐⭐⭐"} imageUrl={"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"} />
                    <Products title={"Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"} ASIN={"49538094"} price={"239.00"} rating={"⭐⭐⭐⭐"} imageUrl={"https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"} />

                </div>
                <div className="home-row">
                    <Products title={"Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"} ASIN={"4903850"} price={"199.99"} rating={"⭐⭐⭐"} imageUrl={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"} />
                    <Products title={"New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"} ASIN={"3254354345"} price={"598.99"} rating={"⭐⭐⭐⭐"} imageUrl={"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"} />
                    <Products title={"Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"} ASIN={"23445930"} price={"98.99"} rating={"⭐⭐⭐⭐⭐"} imageUrl={"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"} />
                </div>
                <div className="home-row">
                    <Products title={"Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"} ASIN={"90829332"} price={"1094.98"} rating={"⭐⭐⭐⭐"} imageUrl={"https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"} />
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

export default HomePage

