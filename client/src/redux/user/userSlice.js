import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart : (state, action)=>{
            state.loading = true;
        },

        signInSuccess : (state, action) =>{
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload
        },
        signInFailure : (state, action) =>{
            state.loading = false;
            state.error = action.payload
        },

        updateStart : (state, action)=>{
            state.loading= true;
        },

        updateSuccess : (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload
        },

        updateFailure : (state, action) =>{
            state.loading = false;
            state.error = action.payload
        },

        deleteStart : (state, action)=>{
            state.loading = true;
        },

        deleteSuccess : (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null
        },

        deleteFailure : (state, action) =>{
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {signInStart, signInFailure, signInSuccess, updateFailure, updateStart, updateSuccess, deleteStart, deleteSuccess, deleteFailure} = userSlice.actions

export default userSlice.reducer