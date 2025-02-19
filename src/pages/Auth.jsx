import React, { useState } from 'react'
import Signup from '../components/Signup'
import './Auth.css'
import Login from '../components/Login'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)




  return (
    <div className='auth'>
      <div className='auth-buttons'>
        <div className={`auth-slider ${isLogin? 'left': 'right'}`} ></div>
          <button
            className={`auth-login ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >Login</button>
          <button
            className={`auth-register ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >Register</button>
      </div>
      {/* {isLogin ?
        <Login onToggleAuth={() => setIsLogin(false)} />
        :
        <Signup onToggleAuth={() => setIsLogin(true)} />
      } */}
      <div className={`auth-form ${isLogin ? 'show-signup' : 'show-login'}`}>
        <Login onToggleAuth={() => setIsLogin(false)} />
        <Signup onToggleAuth={() => setIsLogin(true)} />
      </div>
    </div>
  )
}

export default Auth