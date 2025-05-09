import React, { useState, useEffect } from 'react'
import './MyProfile.css'
import { FaUserEdit } from "react-icons/fa";
import MyPBlogs from './myProfileCom/MyPBlogs'
import MyPAnalytics from './myProfileCom/MyPAnalytics';
import MyPComments from './myProfileCom/MyPComments';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const navigate = useNavigate()
  const [active, setActive] = useState("MyPBlogs")
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
        console.error("error while fetching data")
        setError("something went wrong")
      }
    }
    fetchUserProfile()
  },[])


  if(error) return <p>{error}</p>
  if(!user) return <p>Loading...</p>








  const renderComponent = () => {
    switch (active) {
      case "MyPBlogs":
        return <MyPBlogs />;
      case "MyPComments":
        return <MyPComments />;
      case "MyPAnalytics":
        return <MyPAnalytics />;
      default:
        return <MyPBlogs />
    }
  }

  const getSliderPosition = () => {
    switch (active) {
      case "MyPBlogs":
        return "0%";
      case "MyPComments":
        return "33.33%";
      case "MyPAnalytics":
        return "66.66%";
      default:
        return "0%";
    }
  };



  return (
    <div className='MyProfile'>
      <div className='MyProfile-information'>
        <div className='MyProfile-information-container'>
          <div className='MyProfile-information-photo-container'>
            <img 
              src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}  
              alt="MyPr"
              className='MyProfile-information-photo'
            />
          </div>
          <h2 >{user.name}</h2>
          <p>@{user.userName}</p>
          <p>{user.email}</p>
          <div className='MyProfile-information-About-Me'>
            <p>
              {user.bio}
            </p>
          </div>
          <button 
            onClick={()=>{
              navigate('/Edit-Profile')
            }}
          
          className='MyProfile-information-Edit-button'><FaUserEdit />Edit Profile</button>
        </div>
      </div>
      <div className='MyProfile-blogs-nav-container'>
        <div className='MyProfile-blogs-nav-parent'>
          <div className='MyProfile-blogs-nav'>
            <div className='MyProfile-slider' style={{ left: getSliderPosition() }}></div>
            <div
              className={`MyProfile-blogs-nav-MyBlogs ${active === "MyPBlogs" ? "active" : ""}`}
              onClick={() => setActive("MyPBlogs")}
            >
              <p>Blogs</p>
            </div>
            <div
              className={`MyProfile-blogs-nav-MyComments ${active === "MyPComments" ? "active" : ""}`}
              onClick={() => setActive("MyPComments")}
            >
              <p>Comments</p>
            </div>
            <div
              className={`MyProfile-blogs-nav-MyAnalitycs ${active === "MyPAnalytics" ? "active" : ""}`}
              onClick={() => setActive("MyPAnalytics")}
            >
              <p>Analytics</p>
            </div>
          </div>
        </div>
        <div className='MyProfile-blogs-AllData'>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default MyProfile