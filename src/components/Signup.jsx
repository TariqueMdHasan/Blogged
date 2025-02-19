import React from 'react'
import './signup.css'

function Signup({ onToggleAuth }) {
  return (
    <div className='sign-class'>
        <form action="submit">
            <h1>Register</h1>
            <label htmlFor="sign-name">Name</label> <br />
            <input 
                type="text" 
                id='sign-name' 
                className='sign-class-name'
                placeholder='Enter your name'
            /> <br />
            <span>*</span> <br />
            <label htmlFor="sign-emain">Email</label> <br />
            <input 
                type="email" 
                id='sign-email' 
                className='sign-class-email'
                placeholder='Enter your email'
            /> <br />
            <span>*</span> <br />
            <label htmlFor="sign-userName">User Name</label> <br />
            <input 
                type="text" 
                id='sign-userName' 
                className='sign-class-userName'
                placeholder='Enter your User Name'
            /> <br />
            <span>*</span> <br />
            <label htmlFor="sign-password">Password</label> <br />
            <input 
                type="password" 
                id='sign-password' 
                className='sign-class-password'
                placeholder='Enter your password'
            /> <br />
            <span>*</span> <br />
            <button type='submit' >submit</button> <br />
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