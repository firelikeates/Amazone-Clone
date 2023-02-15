import React from 'react'
import { Link, Redirect, useHistory } from "react-router-dom"
import logo from "../Pictures/Amazon-Logo-Font-1-scaled.webp"
import "../CSS/SignIn.css"
import { useState } from 'react'
import {firebase} from "../Firebase/FirebaseConfig"

const SignIn = (props) => {
    var emailcontrol;
    var passwordcontrol;

    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const onFormSubmit =async e => {
        e.preventDefault()
        const email1 = document.querySelector("#emailsigninid")
        const password1 = document.querySelector("#passwordsigninid")
        checkEmail(email1)
        checkPassword(password1)
        if(emailcontrol && passwordcontrol){
            // control the infos that database has and current values
            firebase.auth().signInWithEmailAndPassword(email,password).then(auth=>{
                history.push("/")
            }).catch(err=>{
                alert(err)
            })

        }
    }

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

    const checkEmail = (inp) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inp.value === "") {
            Error1(inp, "Email is required!")
            emailcontrol = false
        } else {
            if (re.test(inp.value)) {
                Success(inp)
                emailcontrol = true
            } else {
                Error1(inp, "Invalid email address")
                emailcontrol = false
            }
        }
    }

    const checkPassword = (inp) => {
        if (inp.value === "") {
            Error1(inp, "Password is required !")
            passwordcontrol = false
        } else {
            Success(inp)
            passwordcontrol=true
        }
    }

    const onchangeemail = (e) => {
        setEmail(e.target.value)
    }
    const onchangepasword = e => {
        setPassword(e.target.value)
    }


    return (
        <div className="signin-container">
            <Link className='img-top-a-signin' to="/">
                <img className='signin-img-top' src={"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"} alt="" />
            </Link>
            <div className="form-group-signin">
                <form onSubmit={onFormSubmit}>
                    <h1>Sign In</h1>
                    <h5>Email</h5>
                    <input value={email} placeholder="email" onChange={onchangeemail} className="form-control" type="text" id="emailsigninid" />
                    <div></div>
                    <h5>Password</h5>
                    <input value={password} placeholder="password" onChange={onchangepasword} className="form-control" type="password" id="passwordsigninid" />
                    <div></div>
                    <button className='signin-register-btn'>Sign In</button>
                </form>
                <p>By signing-in you agree to Amazone's <a href="#">Conditions of Use </a><br />and <a href="#">Privacy Notice.</a> </p>
            </div>
            <div className="line-group-signin">
                <div className="first-line-signin"></div>
                <p>New to Amazon?</p>
                <div className="second-line-signin"></div>
            </div>
            <Link to={"/SignUp"} className="signin-create-btn">Create a Amazon Account</Link>
            <footer className='signin-footer'>
                <div className="top-part-footer-signin">
                    <Link>Conditions of Use</Link>
                    <Link>Privacy Notice</Link>
                    <Link>Help</Link>
                </div>
                <div className="bottom-part-footer-signin">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
            </footer>
        </div>
    )
}

export default SignIn