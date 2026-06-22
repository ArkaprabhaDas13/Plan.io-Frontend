import React, {useState} from 'react'

const Register = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent)=>{

  }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='name'/>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
          <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
          <button>sign up</button>
        </form>
    </div>
  )
}

export default Register