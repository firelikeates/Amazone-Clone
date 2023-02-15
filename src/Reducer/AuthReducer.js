const authstate={
    name:"",
    user:null
}

const AuthReducer=(state=authstate,action)=>{
    switch(action.type){
        case "GET_USER_NAME":
            return{
                ...state,
                name:action.name
            }
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
        default:
            return state
    }
}

export default AuthReducer