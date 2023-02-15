import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import "../CSS/Address.css"
import { firebase, realtimedatabase } from "../Firebase/FirebaseConfig"


const SetAddress = (props) => {
    const history = useHistory()

    let dataliststring = "<option value=''>--Please select a country--</option>"

    var firstcontrol=false;
    var secondcontrol=true;

    useEffect(() => {
        setoptions()
    }, [])

    const Error1 = (inp, msg) => {
        inp.className = "form-control-is-invalid"
        const div = inp.nextElementSibling
        div.innerText = msg
        div.className = "invalid-feedback"
    }

    const Success = (inp) => {
        inp.className = "form-control-is-valid"
        const div = inp.nextElementSibling
        div.innerText = ""
        div.className = ""
    }

    const validate = (inps) => {
        inps.forEach(inp => {
            if (inp.value === "") {
                Error1(inp, `${inp.id} information is required!`)
            } else {
                Success(inp)
            }
        })
    }

    const OnformSubmit = e => {
        e.preventDefault()
        const apartment = document.getElementById("Apartment")
        const fullname = document.getElementById("Full Name")
        const street = document.getElementById("Street")
        const city = document.querySelector("#City")
        const state = document.getElementById("State/Province/Region");
        const zip_code = document.getElementById("Zip Code")
        const phone_number = document.getElementById("Phone Number")

        const inputs = document.querySelectorAll("input")
        validate(inputs)
        inputs.forEach(inp => {
            if (inp.value === "") {
                firstcontrol = false
                secondcontrol = false
            } else {
                firstcontrol = true
            }
        })
        if (firstcontrol && secondcontrol) {
            var soru = window.confirm("Are you sure to use this address?")
            if (soru) {
                realtimedatabase.ref(`${props.user.uid}/Address`).set({
                    Full_Name:fullname.value,
                    City:city.value,
                    State:state.value,
                    Apartment:apartment.value,
                    Zip_Code:zip_code.value,
                    Phone_Number:phone_number.value,
                    street:street.value
                })
                history.push("/")
            }
        }
    }

    const setoptions = async () => {
        let sorgu = require("./Countries/Country.json")
        for (let i of sorgu) {
            dataliststring += `<option value=${i.code}>${i.name}</option>`
        }
        document.querySelector("select").innerHTML = dataliststring
    }

    return (
        <div className="set_address">
            <div className="set_address-container">
                <Link style={{ marginBottom: "16px" }} className='img-top-a-signup-address' to="/">
                    <img className='signup-img-top' src={"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"} alt="" />
                </Link>
                <form onSubmit={OnformSubmit} className='form-address' >
                    <h1>Add a new address</h1>
                    <label htmlFor="Country">Country/Religon</label>
                    <select className='form-control-select'>

                    </select>
                    <div></div>
                    <label htmlFor="Name">Full Name (First and Last name)</label>
                    <input id='Full Name' type="text" className='form-control' />
                    <div></div>
                    <label htmlFor="street">Street Address</label>
                    <input id='Street' type="text" placeholder='Street address, P.O box, company name, c/o' className='form-control' />
                    <div></div>
                    <input type="text" id='Apartment' className='form-control' placeholder='Apartment, suite, unit, building, floor, etc' />
                    <div></div>
                    <label htmlFor="city">City</label>
                    <input id='City' type="text" className='form-control' />
                    <div></div>
                    <label htmlFor="State">State/Province/Region</label>
                    <input id='State/Province/Region' type="text" className="form-control" />
                    <div></div>
                    <label htmlFor="zip-code">Zip Code</label>
                    <input id='Zip Code' type="text" className='form-control' />
                    <div></div>
                    <label htmlFor="phone-number">Phone Number</label>
                    <input id='Phone Number' type="tel" className='form-control' />
                    <div></div>
                    <button role={"button"} className='btn-use-this-address'>Use this address</button>
                </form>
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

export default SetAddress