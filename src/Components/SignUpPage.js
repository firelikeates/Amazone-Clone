import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../CSS/SignUp.css"
import { firebase, realtimedatabase } from "../Firebase/FirebaseConfig"

const SignUpPage = (props) => {

    var err1 = ""
    var namecontrol = false;
    var emailcontrol = false;
    var passwordcontrl = false;

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signupAction = (e) => {
        e.preventDefault()
        const email_doc = document.querySelector("#emailsignupid")
        const name_doc = document.querySelector("#name-signup");
        const password_doc = document.querySelector("#passwordsignupid");
        const re_password_doc = document.querySelector("#re-passwprd-signup");

        checkPasswords(password_doc, re_password_doc)
        checkEmail(email_doc)
        checkName(name_doc)

        if (namecontrol && emailcontrol && passwordcontrl) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                console.log(user)
                props.history.push("/Address")

            }).catch(err => {
                alert(err)
            })
            realtimedatabase.ref(`${props.user.uid}/User_Name`).set({
                name: name
            })
            
        }

    }

    const onchangeName = (e) => {
        setName(e.target.value)
    }
    const onchangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onchangePassword = (e) => {
        setPassword(e.target.value)
    }

    const Error1 = (inp, msg) => {
        inp.className = "form-control-is-invalid"
        const div = inp.nextElementSibling
        div.innerText = msg
        div.className = "invalid-feedback"
    }

    const checkName = (inp) => {
        if (inp.value === "") {
            Error1(inp, "This field is required!")
            namecontrol = false
        } else {
            Success(inp)
            namecontrol = true
        }
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

    const checkPasswords = (inp1, inp2) => {
        if (inp1.value === "") {
            Error1(inp1, "Password is required !")
            passwordcontrl = false

        } else if (inp2.value === "") {
            Error1(inp2, "Password is required !")
            passwordcontrl = false
        } else if (inp1.value.length < 6) {
            Error1(inp1, "Password must contains at least 6 character!")
            passwordcontrl = false
        }
        else {
            if (inp1.value !== inp2.value) {
                Error1(inp2, "Passwords do not match!")
                passwordcontrl = false
            } else {
                Success(inp2)
                passwordcontrl = true
            }
        }
    }

    return (
        <div className="container-signup">
            <Link className='img-top-a-signup' to="/">
                <img className='signup-img-top' src={"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"} alt="" />
            </Link>
            <div className="form-group-signup">
                <form onSubmit={signupAction}>
                    <h2>Create account</h2>
                    <h5>Your Name</h5>
                    <input value={name} onChange={onchangeName} type="text" id="name-signup" placeholder='Your first and last name' />
                    <div></div>
                    <h5>Email</h5>
                    <input value={email} onChange={onchangeEmail} type="text" id="emailsignupid" />
                    <div></div>
                    <h5>Password</h5>
                    <input value={password} onChange={onchangePassword} type="password" id="passwordsignupid" />
                    <div></div>
                    <h5>Re-Password</h5>
                    <input type="password" id='re-passwprd-signup' placeholder='At Least 6 character' />
                    <div></div>
                    <button className='signup-register-btn'>Sign Up</button>
                </form>
                <p>By signing-up you agree to Amazone's <a href="#">Conditions of Use </a><br />and <a href="#">Privacy Notice.</a> </p>
                <p className='sign_up_logiN-reminder'>Already have a account? <Link to={"/SignIn"}>Sign In</Link></p>
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

export default SignUpPage