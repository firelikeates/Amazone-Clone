import { combineReducers, createStore, applyMiddleware } from "redux"
import {ProductReducer} from "../Reducer/ProductReducer"
import AuthReducer from "../Reducer/AuthReducer"
import thunk from "redux-thunk"


const Store = createStore(
    combineReducers(
        {
            product: ProductReducer,
            auth: AuthReducer
        }
    ),
    applyMiddleware(thunk)
)

export default Store