import React, {useEffect} from "react";
import AppRoutes from './routes/AppRoutes.tsx';
import { BrowserRouter, redirect } from "react-router-dom";
import { loginSuccess, logout } from "./redux/authSlice.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store.tsx";
import { getUserDetails } from "./api/authApi.ts";

const App = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(()=>{
     console.log("Use Effect ran!");

     const initializeAuth = async()=>{
        // load the token and the user details on page refresh from the Local Storage
        const token = localStorage.getItem("token");
    
        try{
          // call the /aboutMe api 
          const response = await getUserDetails(token);

          dispatch(loginSuccess({
            user: response,
            token
          }))
        }catch(err){
          // LOGOUT IF not authenticated
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logout());
        } 
     }
     initializeAuth();
  }, [])


  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App