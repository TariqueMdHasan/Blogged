import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Feed.css';
import Intro from '../components/Intro';
import { IoIosCreate } from "react-icons/io";
import FeedBlogs from '../components/FeedBlogs';
import FeedCat from '../components/FeedCat';

function Feed() {
    const navigate = useNavigate()
  return (
    <div className='Feed'>
        <div className="FeedLeft">
            <Intro />
        </div>
        <div className="FeedCenter">
          <FeedBlogs />
        </div>
        <div className="FeedRight">
          <button 
                className='WriteBlogButton'
                onClick={()=>
                    navigate('/blogForm')
                } 
            ><IoIosCreate/> Write Blog</button>
            <div>
              <FeedCat />
            </div>
        </div>
    </div>
  )
}

export default Feed