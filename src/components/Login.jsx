import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"
import Loader from './Loader'

function Login({ onToggleAuth }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState("")
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value,})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("")
        try{
            setLoading(true)
            const response = await axios.post("https://blogbackend-wi2j.onrender.com/api/outh/login", formData)
            if(response.status===200){
                toast.success('Login Successfull')
                localStorage.setItem("token", response.data.token)
                setMessage(response.data.message)
                navigate('/feed')
            }else{
                toast.error("Login Failed")
            }

        }catch(error){
            console.error('Error Login', error)
            toast.error('An error occured during Login')
        }finally{
            setLoading(false)
        }
    }




  return (
    <div className='login-class'>
        <h1>Login</h1>
        {/* <form action="submit"> */}
        <form action="submit" onSubmit={handleSubmit} >
            
            <label htmlFor="login-email">Email</label> 
            <input 
                type="email"
                name='email'
                id='login-email' 
                className='login-class-email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                required
            /> 
            {/* <span>*</span> <br /> */}
            <label htmlFor="login-password">Password</label> 
            <input 
                type= {showPassword ? 'text' : 'password'} 
                name='password'
                id='login-password' 
                className='login-class-password'
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
                required
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
            {
                message && <p>{message}</p>
            }
            {/* <Loader /> */}
            {
                loading? <Loader />:
                <button 
                    className='login-btn'
                >Login</button> 
            }
            
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