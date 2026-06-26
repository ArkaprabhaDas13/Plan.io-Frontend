import React, {useEffect} from "react";
import AppRoutes from './routes/AppRoutes.tsx';
import { BrowserRouter } from "react-router-dom";
import { loginSuccess } from "./redux/authSlice.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store.tsx";
import { getUserDetails } from "./api/authApi.ts";


const App = () => {

  const dispatch = useDispatch<AppDispatch>();

  // load the token and the user details on page refresh from the Local Storage
  const token = localStorage.getItem("token");
  // if(token)
  // {
  //   const userDetails = getUserDetails(token);
  //   console.log("User Details = ", userDetails);
  // }

  const user = localStorage.getItem("user");

  if(token && user)
  {
    dispatch(loginSuccess({
      user: JSON.parse(user),
      token
    }))
  }


  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App