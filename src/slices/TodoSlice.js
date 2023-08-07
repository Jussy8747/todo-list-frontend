import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: null
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
    SetTodo: (state, action) => {
            state.todos = action.payload  
        },
    }
})


export const {SetTodo} = todoSlice.actions
export default todoSlice.reducer
