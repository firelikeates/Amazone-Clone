const initalState = {
    basket: [],
    basket_total_price: 0,
    basket_total_items: 0,
    header_total_items: 0,
    keyword:"",
    searchresults:[],
    orders:[]
}

export const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.items]
            }
        case "CLEAR_BASKET":
            return {
                ...state,
                basket: [],
                basket_total_items: 0,
                basket_total_price: 0
            }
        case "REMOVE_ITEM_FROM_BASKET":
            const index = state.basket.findIndex((i) => action.id === i.ASIN)
            let newbasket = [...state.basket]
            if (index > -1) {
                newbasket.splice(index, 1)
            } else {
                console.warn("Abooo")
            }
            return {
                ...state,
                basket: newbasket
            }

        case "REMOVE_ALL_SAME_ITEMS_FROM_BASKET":
            const newbasket2= state.basket.filter((item) => {
                console.log(item);
                return item.ASIN!==action.id
            })
            return {
                ...state,
                basket:newbasket2
            }

        case "INCREMENT_TOTAL_ITEM_BASKET":
            return {
                ...state,
                basket_total_items: state.basket_total_items + 1
            }
        case "DECREMENT_TOTAL_ITEM_BASKET":
            return {
                ...state,
                basket_total_items: state.basket_total_items - 1
            }
        case "INCREMENT_TOTAL_PRICE_BASKET":
            return {
                ...state,
                basket_total_price: state.basket_total_price + action.price,
            }
        case "DECREMENT_TOTAL_PRICE_BASKET":
            return {
                ...state,
                basket_total_price: state.basket_total_price - action.price
            }
        case "SET_TOTAL_PRİCE_BASKET":
            return {
                ...state,
                basket_total_price: action.price
            }
        case "SET_TOTAL_ITEMS_BASKET":
            return {
                ...state,
                basket_total_items: action.number1
            }
        case "SET_HEADER_TOATAL_ITEM":
            return {
                ...state,
                header_total_items: state.header_total_items + 1
            }
        case "SET_KEYWORD_SEARCH":
            return{
                ...state,
                keyword:action.keyword
            }
        case "SET_SEARCH_RESULTS":
            return{
                ...state,
                searchresults:action.payload
            }
        case "SET_ORDERS":
            return{
                ...state,
                orders:action.payload
            }
        case "ADD_ORDERS":
            return{
                ...state,
                orders:state.orders.push(action.order)
            }
        default:
            return state
    }
}
