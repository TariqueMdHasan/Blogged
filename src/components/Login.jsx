import React from 'react'
import './login.css'

function Login({ onToggleAuth }) {
  return (
    <div className='login-class'>
        <form action="submit">
            <h1>Login</h1>
            <label htmlFor="login-email">Email</label> <br />
            <input 
                type="email" 
                id='login-email' 
                className='login-class-email'
                placeholder='Enter your email'
            /> <br />
            <span>*</span> <br />
            <label htmlFor="login-password">Password</label> <br />
            <input 
                type="password" 
                id='login-password' 
                className='login-class-password'
                placeholder='Enter your password'
            /> <br />
            <span>*</span> <br />
            <button type='submit' >Submit</button> <br />
            <p>Do not have an account? Please 
               <button
                    className='login-class-Reg-button'
                    type='button'
                    onClick={onToggleAuth}
               >
                Register</button> 
            </p> 
            {/* <button>Sign up</button> */}
        </form>
    </div>
  )
}

export default Login