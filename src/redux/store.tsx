import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    },
})

console.log("store.getState = ", store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;