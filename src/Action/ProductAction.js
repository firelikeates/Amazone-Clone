import { realtimedatabase, firebase } from "../Firebase/FirebaseConfig"
import Store from "../Store/Store";

var uid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        uid = user.uid
    }
})

export const add_item_to_basket = (item) => ({
    type: "ADD_BASKET",
    items: item
})
export const clearbasket = () => ({
    type: "CLEAR_BASKET"
})
export const remove_item_from_basket = (id) => ({
    type: "REMOVE_ITEM_FROM_BASKET",
    id: id
})
export const increment_basket_total_item = () => ({
    type: "INCREMENT_TOTAL_ITEM_BASKET"
})
export const decrement_basket_total_item = () => ({
    type: "DECREMENT_TOTAL_ITEM_BASKET"
})
export const increment_basket_total_price = (price) => ({
    type: "INCREMENT_TOTAL_PRICE_BASKET",
    price: price
})
export const decrement_basket_total_price = (price) => ({
    type: "DECREMENT_TOTAL_PRICE_BASKET",
    price: price
})
export const set_basket_total_items = (number1) => ({
    type: "SET_TOTAL_ITEMS_BASKET",
    number1: number1
})
export const set_basket_total_price = (price) => ({
    type: "SET_TOTAL_PRİCE_BASKET",
    price: price
})
export const remove_all_items_from_basket = (id) => ({
    type: "REMOVE_ALL_SAME_ITEMS_FROM_BASKET",
    id: id
})

export const set_input_search = (keyword) => ({
    type: "SET_KEYWORD_SEARCH",
    keyword: keyword
})

export const Set_Search_Results = (list) => ({
    type: "SET_SEARCH_RESULTS",
    payload: list
})

export const setProductToDB = (prd) => {
    realtimedatabase.ref(`${uid}/Products/${prd.ASIN}`).push(prd)
}
export const removeOneItemFromDB = async  (id1) => {
    var id_of_firebase_prd = ""
    await realtimedatabase.ref(`${uid}/Products/${id1}`).once("value").then(res => {
        var liste=Object.keys(res.val())
        id_of_firebase_prd=liste[liste.length-1]
    })
    
    await realtimedatabase.ref(`${uid}/Products/${id1}/${id_of_firebase_prd}`).remove()

}
export const clearprddb = () => {
    realtimedatabase.ref(`${uid}/Products`).set(null)
}
export const removeAllSameItems=(id)=>{
    realtimedatabase.ref(`${uid}/Products/${id}`).set(null)
}
export const set_orders = (list)=>({
    type:"SET_ORDERS",
    payload:list
})
export const set_orders_to_db = (list)=>{
    realtimedatabase.ref(`${uid}/Orders`).set(list).then(()=>{
        Store.dispatch(set_orders(list))
    })
}
const add_order =(order)=>({
    type:"ADD_ORDER",
    order:order
})
export const add_orders_to_db = (order)=>{
    realtimedatabase.ref(`${uid}/Orders`).push(order).then(()=>{
        Store.dispatch(add_order(order))
    })
}