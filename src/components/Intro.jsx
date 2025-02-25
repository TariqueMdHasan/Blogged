import React, { useState, useEffect } from 'react'
import './Intro.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [error, setError] = useState("")

  useEffect(()=> {
    const fetchUserProfile = async() => {
      const token = localStorage.getItem("token");
      if(!token){
        setError("Please Login")
        return
      }
      try{
        const response = await axios.get("https://blogbackend-wi2j.onrender.com/api/outh/getuserdata",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
        setUser(response.data.user)
        // console.log(response.data.user)

      }catch(error){
        setError("Failed to get user data")
      }
    }
    fetchUserProfile()
  },[])

  if(error) return <p>{error}</p>
  if(!user) return <p>Loading...</p>



  return (
    <div className='Intro'>
        <div className='IntroLeft'>
        <div 
          className='ProfileImage'
          onClick={()=>{
            navigate('/myProfile')
          }}
        >
          {
            user.profilePicture ? 
            <img src={user.profilePicture} 
              alt="profile identity" 
              className='profile-visual-identity'
            /> :
            null
          }
        </div >
            <h4
              className='intro-myName'
              onClick={()=>{
                navigate('/myProfile')
              }}
            >{user.name}</h4>
            <h5
              className='intro-myUserName'
              onClick={()=>{
                navigate('/myProfile')
              }}
            >@{user.userName}</h5>
        </div>
    </div>
  )
}

export default Intro