import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// the interface for the initial state of AuthSlice

interface User{
    name: string;
    email: string;
}

interface LoginPayload{
    user: any;
    token: string;
}

export interface AuthState{
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
}

const initialState : AuthState = {
    user: null,
    token: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginPayload>)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true
        },
        logout: (state) =>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
