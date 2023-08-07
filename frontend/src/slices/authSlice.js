import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,
    profileInfo: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.profileInfo = action.payload
        },
    

    login: (state, action) =>{
        state.userInfo = action.payload,
        localStorage.setItem("userInfo",JSON.stringify(action.payload))
    },

    logout: (state)=>{
        state.userInfo = null,
        state.profileInfo = null,        
        localStorage.removeItem("userInfo") 
    }
}
})

export const {setUserInfo, login, logout} = authSlice.actions
export default authSlice.reducer