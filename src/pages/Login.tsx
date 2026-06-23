import React, { useState } from 'react'
import { loginApi } from '../api/authApi';

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await loginApi(email, password);
      console.log(response);
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

      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
      </form>

    </div>
  )
}

export default Login