import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';

function Signup() {
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [mail,setMail] = useState('');
    const [pass,setPass] = useState('');

    const handelSignup = async (e)=>{
        e.preventDefault();
        try {
            const data =  await axios.post("http://localhost:8000/api/signup",{name,mobile,mail,pass});
         //  console.log(data)
            if(data){
              alert('Signup successful!!!');
              window.location.href = '/';
            }
        } catch (error) {
            console.log("Error in signup")
        }
    } 

    return (
        <div className='signup-container'>
          <h1>Sign Up Page</h1>
          <br/>
          <Link className='signup-link' to={'/'}>already registered login</Link>
          <br/>
          <form>
          <label className='signup-label'>Enter your name : </label>
            <input className='signup-input'placeholder='your name' type='string' value={name} onChange={(e)=>setName(e.target.value)}/>
            <br/>
            <label className='signup-label'>Enter your Mobile number : </label>
            <input className='signup-input'placeholder='your mobile number' type='string' value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <br/>
            <label className='signup-label'>Enter your mail : </label>
            <input className='signup-input'placeholder='your email' type='mail' value={mail} onChange={(e)=>setMail(e.target.value)}/>
            <br/>
            <label className='signup-label'>Enter your password : </label>
            <input className='signup-input'placeholder='your password' type='string' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            <br/>
            <button className='signup-button' onClick={handelSignup}>Submit</button>
          </form>
        </div>
      )
}

export default Signup
