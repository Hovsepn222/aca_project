import {configureStore} from "@reduxjs/toolkit";
import logInSlice from './logInStatus'

export default configureStore({
    reducer: {
        user: logInSlice
    }
})