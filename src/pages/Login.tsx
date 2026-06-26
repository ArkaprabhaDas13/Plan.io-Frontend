import React, { useState } from 'react'
import { loginApi } from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { loginSuccess } from '../redux/authSlice';
import type { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await loginApi(email, password);
      // Save user details to Local Storage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      // Populate the REDUX STORE
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }))
      if(response.user)
      {
        navigate("/dashboard");
      }
      else
      {
        navigate("/login");
      }
    }catch(err){
      if(err instanceof Error)
      {
        console.log(err.message);
      }
    }
  }

  return (
    <div>

      <h1>Login:</h1>

      <button onClick={()=>{console.log(user, token, isAuthenticated)}}>show auth details</button>

      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
      </form>
      <button onClick={()=>{navigate("/register")}}>Register</button>

    </div>
  )
}

export default Login