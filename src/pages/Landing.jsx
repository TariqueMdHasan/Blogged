import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()
  return (
    <div className='Landing'>
      <h1>go to Register page</h1>
      <button
        onClick={()=>{
          navigate('/auth')
        }}
      >Register/Login</button>
    </div>
  )
}

export default Landing