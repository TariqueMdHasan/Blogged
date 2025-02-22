import React, { useState } from 'react'
import './MyProfile.css'
import { FaUserEdit } from "react-icons/fa";
import MyPBlogs from './myProfileCom/MyPBlogs'
import MyPAnalytics from './myProfileCom/MyPAnalytics';
import MyPComments from './myProfileCom/MyPComments';

function MyProfile() {
  const [active, setActive] = useState("MyPBlogs")

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
            <img src="" alt="MyPr" />
          </div>
          <h2>Md Tarique Hasan</h2>
          <p>@tariqueMdHasan</p>
          <p>mdtariquehasan@gmail.com</p>
          <div className='MyProfile-information-About-Me'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ipsa nam harum quas libero amet delectus debitis porro sequi dolores odit, et suscipit voluptates explicabo? Aliquam animi eligendi modi vel!
            </p>
          </div>
          <button className='MyProfile-information-Edit-button'><FaUserEdit />Edit Profile</button>
        </div>
      </div>
      <div className='MyProfile-blogs-nav-container'>
        <div className='MyProfile-blogs-nav-parent'>
          <div className='MyProfile-blogs-nav'>
            <div className='MyProfile-slider' style={{ left: getSliderPosition() }}></div>
            <div
              // className={`MyProfile-blogs-nav-MyBlogs ${active === "MyPBlogs" ? "active" : ""}`}
              className='MyProfile-blogs-nav-MyBlogs'
              onClick={() => setActive("MyPBlogs")}
            >
              <p>Blogs</p>
            </div>
            <div
              // className={`MyProfile-blogs-nav-MyComments ${active === "MyPComments" ? "active" : ""}`}
              className='MyProfile-blogs-nav-MyComments'
              onClick={() => setActive("MyPComments")}
            >
              <p>Comments</p>
            </div>
            <div
              // className={`MyProfile-blogs-nav-MyAnalitycs ${active === "MyPAnalytics" ? "active" : ""}`}
              className='MyProfile-blogs-nav-MyAnalitycs'
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