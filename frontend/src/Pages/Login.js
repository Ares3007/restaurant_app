import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css'

function Login() {
    const [mail,setMail] = useState('');
    const [pass,setPass] = useState('');

   const handelLogin = async (e)=>{
   e.preventDefault();
    try {
        const {data} =  await axios.post("http://localhost:8000/api/login",{mail,pass});
      //  console.log(data.user._id)
        if(data.message==='login success'){
          localStorage.setItem('token',data.token);
          alert("Login successful!!!")
            window.location.href=`/admin-category/${data.user._id}`
        }else{
          alert("Login failed! Please check mail or password");
        }
   } catch (error) {
    console.log("error in login handel")
   }
   }
  return (
    <div className='login-container'>
      <h1>Login Page</h1>
      <br/>
      <Link to={'/signup'} className='login-link'>If new please Signup</Link>
      <br/>
      <form>
        <label className='login-label'>Enter your mail : </label>
        <input className='login-input' placeholder='your email' type='string' value={mail} onChange={(e)=>setMail(e.target.value)}/>
        <br/>
        <label className='login-label'>Enter your password : </label>
        <input className='login-input'placeholder='your password' type='string' value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <br/>
        <button className='login-button' onClick={handelLogin}>Submit</button>
      </form>
    </div>
  )
}

export default Login
