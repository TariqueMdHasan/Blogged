import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'
import landingLady from '../photos/land.png'

function Landing() {
  const navigate = useNavigate()
  return (
    <div className='Landing'>
      <div className='Landing-div'>
        {/* <button
          onClick={()=>{
            navigate('/auth')
          }}
        >Register/Login</button> */}

        <h1>Stories, Insights, and Ideas That Matter.</h1>
        <h2>Dive into articles on tech, life, learning, and everything in between.</h2>
        <button
          onClick={()=>{
            navigate('/auth')
          }}
        >Register/Login</button>
        {/* <img src={landingLady} alt="A lady writing blog for her page"  /> */}
      </div>
      <div className="landingImage">
        <img src={landingLady} alt="A lady writing blog for her page"  />
      </div>
      
    </div>
  )
}

export default Landing