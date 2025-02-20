import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'


function Login({ onToggleAuth }) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }





  return (
    <div className='login-class'>
        <h1>Login</h1>
        {/* <form action="submit"> */}
        <form >
            
            <label htmlFor="login-email">Email</label> 
            <input 
                type="email" 
                id='login-email' 
                className='login-class-email'
                placeholder='Enter your email'
            /> 
            {/* <span>*</span> <br /> */}
            <label htmlFor="login-password">Password</label> 
            <input 
                type= {showPassword ? 'text' : 'password'} 
                id='login-password' 
                className='login-class-password'
                placeholder='Enter your password'
            /> 
            {/* <span>*</span> <br /> */}
            <div className='login-class-checkbox'>
                <input 
                    onChange={handleShowPassword}
                    type="checkbox" 
                    id='pw-cd' 
                />
                <h5 >Show Password</h5>
            </div>
            <button 
                // type='submit' 
                className='login-btn'
                onClick={() => navigate('/feed')} 
            >Login</button> 
            <p>Do not have an account? Please 
               <button
                    className='login-class-Reg-button'
                    type='button'
                    onClick={onToggleAuth}
               >
                Register</button> 
            </p> 
        </form>
    </div>
  )
}

export default Login