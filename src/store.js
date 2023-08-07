import { configureStore } from '@reduxjs/toolkit';
import {authUserApi} from './slices/AuthUserSlice.js'
import {todoApi} from './slices/TodoApiSlice.js'
import todoSliceReducer from './slices/TodoSlice.js';
import authSliceReducer from './slices/authSlice.js';
import localStateSliceReducer from './slices/localState.js'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        todo: todoSliceReducer,
        localState: localStateSliceReducer,
[authUserApi.reducerPath ]: authUserApi.reducer,
[todoApi.reducerPath ]: todoApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware()
    .concat(authUserApi.middleware)
    .concat(todoApi.middleware),
    devTools: true
})


export default store