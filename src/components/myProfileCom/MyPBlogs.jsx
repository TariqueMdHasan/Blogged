import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './MyPBlogs.css'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Loader from '../Loader'

function MyPBlogs() {
  const [blogs, setBlogs] = useState([])
  const [Loading, setLoading] = useState(false)


  // http://localhost:5000/api/blog/myBlogs

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const token = localStorage.getItem("token");
      if(!token){
        console.log("Please Login")
        return
      }
        try {
            const response = await axios.get("https://blogbackend-wi2j.onrender.com/api/blog/myBlogs",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }
            )
            
            console.log("Fetched Data:", response.data); 
            if (!response.data) {
                throw new Error("Failed to fetch blogs")
            }
            setBlogs(response.data.blogs)
        } catch (error) {
            console.error("Error fetching blogs", error)
        }finally{
          setLoading(false)
        }
    }
    fetchBlogs()
}, [])




  return (
    <div className='MyOwn-Blogs'>
      {
        Loading? <Loader /> :
        (
          blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className='FeedBlog-container' key={blog._id} >
                {/* <div className='FeedBlog'> */}
                <div className="FeedBlog-Author-Information">
                  <div className="BlogFeed-Author-Identity">
                    <div className='FeedBlog-Autohor-PPic'>
                      <img src={blog.author?.profilePicture || "https://via.placeholder.com/50"}
                        alt="Author"
                        className="FeedBlog-author-img"
                      />
                    </div>
                    <div className="FeedBlog-Author-Name-UserName">
                      <div className='FeedBlog-Author-Name'>{blog.author?.name || 'Unknown'}</div>
                      <div className='FeedBlog-Author-UserName'>@{blog.author?.userName || 'Unknown'}</div>
                    </div>
                  </div>
  
                  <div className='FeedBlog-delete-edit'>
                    <button className='FeedBlog-delete-edit-edit'><FaEdit /></button >
                    <button className='FeedBlog-delete-edit-delete'><AiFillDelete /></button >
                  </div>
                </div>
                <div className="FeedBlog-Blog-Information">
                  <div className="FeedBlog-Blog-Image">
                    <img src={blog.blogImages || "https://via.placeholder.com/300"}
                      alt="Blog"
                      className="FeedBlog-blog-img"
                    />
                  </div>
                  <div className='Feedblog-content-texts' >
                    <div className='FeedBlog-title'>
                      <p className='FeedBlog-content-title'>{blog.title}</p>
                    </div>
                    <div className='FeedBlog-content'>
                      <p className='FeedBlog-content-para'>{blog.content}</p>
                    </div>
                    <div className="FeedBlog-Date-Comment">
                      <div className='FeedBlog-date'>{new Date(blog.createdAt).toDateString()}</div>
                      <div className='FeedBlog-Total-Comments'>0 Comments</div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            ))
          ) : (
            <p>No blogs found. Start writing your first blog</p>
          )
        )
      }
    </div>
  )
}

export default MyPBlogs