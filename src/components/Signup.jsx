import React, { useState } from 'react'
import './signup.css'

function Signup({ onToggleAuth }) {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }




  return (
    <div className='sign-class'>
        <h1>Register</h1>
        <form action="submit" className='sign-class-form'>
            <label htmlFor="sign-name" className='sfn1 sfn' >Name</label> 
            <input 
                type="text" 
                id='sign-name' 
                className='sign-class-name'
                placeholder='Enter your name'
            /> 
            {/* <span>*</span> <br /> */}
            <label htmlFor="sign-emain" className='sfn2 sfn'>Email</label> 
            <input 
                type="email" 
                id='sign-email' 
                className='sign-class-email'
                placeholder='Enter your email'
            /> 
            {/* <span>*</span> <br /> */}
            <label htmlFor="sign-userName" className='sfn3 sfn' >User Name</label> 
            <input 
                type="text" 
                id='sign-userName' 
                className='sign-class-userName'
                placeholder='Enter your User Name'
            /> 
            {/* <span>*</span> <br /> */}
            <label htmlFor="sign-password" className='sfn4 sfn' >Password</label> 
            <input 
                type={showPassword ? 'text' : 'password'}
                id='sign-password' 
                className='sign-class-password'
                placeholder='Enter your password'
            /> 
            {/* <span>*</span> <br /> */}
            <div className='reg-class-checkbox'>
                <input 
                    type="checkbox" 
                    id='reg-pw-cd' 
                    onChange={handleShowPassword}
                />
                <h5 >Show Password</h5>
            </div>
            <button type='submit' className='reg-btn' >submit</button> <br />
            <p>Already have an account? Please 
                <button
                    className='sign-class-Reg-button'
                    type='button'
                    onClick={onToggleAuth}
                >Login</button>
            </p>
        </form>
    </div>
  )
}

export default Signup