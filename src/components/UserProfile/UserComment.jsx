import React, { useState, useEffect } from 'react';
// import './MyPComments.css';
import '../myProfileCom/MyPComments.css'
import axios from 'axios';
import Loader from '../Loader';
import { FaArrowAltCircleRight } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

function UserComments({userId}) {
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [userPd, setUserPd] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      
      try {
        const response = await axios.get(
          `https://blogbackend-wi2j.onrender.com/api/comment/user/${userId}`
        );

        if (!response.data) {
          throw new Error("Failed to fetch the comments");
        }
        setComment(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [userId]);

  return (
    <div className="MyPComments">
      {loading ? (
        <Loader />
      ) : comment.length > 0 ? ( 
        comment.map((item) => (
          <div key={item._id} className="MyComments-Author-Information">
            <div className="MyComments-Author-Identity">
              <div className="MyComments-for-delete-edit">
                <div className="MyComments-Autohor-PPic">
                  <img
                    src={item.user?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="Au"
                    className="MyComments-author-img"
                  />
                </div>
                <div className="MyComments-Author-Name-UserName">
                  <div className="MyComments-Author-Name">
                    <p>{item.user?.name || "Unknown"}</p>
                  </div>
                  <div className="MyComments-Author-UserName">
                    <p>@{item.user?.userName || "Unknown"}</p>
                  </div>
                </div>
              </div>
              <div className='FeedBlog-delete-edit MyComments-del-edit'>
                {/* <button className='FeedBlog-delete-edit-edit'><FaEdit /></button >
                <button className='FeedBlog-delete-edit-delete'><AiFillDelete /></button > */}
              </div>
            </div>

            <div className='MyComments'>
              <p>{item.text}</p>
              <div className='MyComments-date'>
                <p>{new Date(item.createdAt).toDateString()}</p>
                <button
                  onClick={()=>{
                    navigate(`/blogPage/${item.blog}`)
                  }}
                >Go to Blog<FaArrowAltCircleRight /></button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
}

export default UserComments;
