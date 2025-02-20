import React from 'react'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const navigate = useNavigate()
  return (
    <div>
        <h1>Hi Tariqueeeeeeeeee.....</h1>
        <button 
            onClick={()=>
                navigate('/blogForm')
            } 
        >+++</button>
    </div>
  )
}

export default Feed