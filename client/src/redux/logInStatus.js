import { createSlice } from '@reduxjs/toolkit'

const logInSlice = createSlice({
    name: 'logInStatus',
    initialState: {
        logged: 'false'
    },
    reducers: {
        login: state => {state.logged = true},
        logout: state => {state.logged = false}
    }
})

export const { login, logout } = logInSlice.actions;
export default logInSlice.reducer;
