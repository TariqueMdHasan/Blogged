import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from 'axios';
import Loader from './Loader'

function Signup({ onToggleAuth }) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)


    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // https://blogbackend-wi2j.onrender.com

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // const URL = process.env.BASE_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")

        try {
            setLoading(true)
            const response = await axios.post("https://blogbackend-wi2j.onrender.com/api/outh/register", formData);
            // const response = await axios.post("http://localhost:5000/api/outh/register", formData)
            // const response = await axios.post(`${URL}/api/outh/register`, formData)
            if (response.status === 200) {
                toast.success('Registration Successfull')
                localStorage.setItem("token", response.data.token)
                setMessage(response.data.message)
                navigate('/feed')
            } else {
                toast.error('Registration failed')
            }




        } catch (error) {
            console.error('Error registering user', error)
            toast.error('An error occured during registration')
        } finally {
            setLoading(false)
        }
    }






    return (

        <div className='sign-class'>
            
             <h1>Register</h1>
            <form action="submit" className='sign-class-form' onSubmit={handleSubmit} >
                <label htmlFor="sign-name" className='sfn1 sfn' >Name</label>
                <input
                    type="text"
                    name='name'
                    id='sign-name'
                    className='sign-class-name'
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {/* <span>*</span> <br /> */}
            <label htmlFor="sign-emain" className='sfn2 sfn'>Email</label>
            <input
                type="email"
                name='email'
                id='sign-email'
                className='sign-class-email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                required
            />
            {/* <span>*</span> <br /> */}
            <label htmlFor="sign-userName" className='sfn3 sfn' >User Name</label>
            <input
                type="text"
                name='userName'
                id='sign-userName'
                className='sign-class-userName'
                placeholder='Enter your User Name'
                value={formData.userName}
                onChange={handleChange}
                required
            />
            {/* <span>*</span> <br /> */}
            <label htmlFor="sign-password" className='sfn4 sfn' >Password</label>
            <input
                type={showPassword ? 'text' : 'password'}
                id='sign-password'
                className='sign-class-password'
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
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
            {
                message && <p>{message}</p>
            }

            {
                loading? <Loader /> :
                <button
                    type='submit'
                    className='reg-btn'
                >
                    Register
                </button>
            }


            <br />

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