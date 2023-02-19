import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUpPage from './Components/SignUpPage';
import { useHistory } from 'react-router-dom';


const App2 = () => {
    const Func = ()=>{
        useHistory().push("/SignIn")
    }
    Func()
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/SignIn"} component={SignIn} />
                <Route path={"/SignUp"} component={SignUpPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default App2
