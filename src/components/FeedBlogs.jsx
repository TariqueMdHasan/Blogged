import React, { useState, useEffect } from "react";
import "./FeedBlogs.css";
import { AiFillDelete } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Loader from "./Loader";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FeedBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleDeleteBlog = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://blogbackend-wi2j.onrender.com/api/blog/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      toast.success("blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Blog not deleted");
    }
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const fetchBlogs = async () => {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.id);

        const response = await axios.get(
          "https://blogbackend-wi2j.onrender.com/api/blog"
        );
        
        if (!response.data) {
          throw new Error("Failed to fetch blogs");
        }
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [userId]);

  return (
    <div className="FeedBlogs">
      {Loading ? (
        <Loader />
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="FeedBlog-container" key={blog._id}>
            <div className="FeedBlog-Author-Information">
              <div className="BlogFeed-Author-Identity">
                <div className="FeedBlog-Autohor-PPic">
                  <img
                    onClick={() => {
                      navigate(`/User-Profile/${blog.author._id}`);
                    }}
                    src={
                      blog.author?.profilePicture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Author"
                    className="FeedBlog-author-img"
                  />
                </div>
                <div className="FeedBlog-Author-Name-UserName">
                  <div className="FeedBlog-Author-Name">
                    <p
                      onClick={() => {
                        navigate(`/User-Profile/${blog.author._id}`);
                      }}
                    >{blog.author?.name || "Unknown"}</p>
                  </div>
                  <div className="FeedBlog-Author-UserName">
                    <p
                      onClick={() => {
                        navigate(`/User-Profile/${blog.author._id}`);
                      }}
                    >@{blog.author?.userName || "Unknown"}</p>
                  </div>
                </div>
              </div>

              {userId === blog.author._id ? (
                <div className="FeedBlog-delete-edit">
                  {/* <button className="FeedBlog-delete-edit-edit">
                    <FaEdit />
                  </button> */}
                  <button
                    className="FeedBlog-delete-edit-delete"
                    onClick={() => {
                      handleDeleteBlog(blog._id);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="FeedBlog-Blog-Information">
              <div className="FeedBlog-Blog-Image">
                <img
                  src={blog.blogImages || "https://via.placeholder.com/300"}
                  alt="Blog"
                  className="FeedBlog-blog-img"
                />
              </div>
              <div className="Feedblog-content-texts">
                <div className="FeedBlog-title">
                  <p className="FeedBlog-content-title">
                    {blog.title.length > 60
                      ? blog.title.substring(0, 60) + "..."
                      : blog.title}
                  </p>
                </div>
                <div className="FeedBlog-content">
                  <div className="FeedBlog-content-para">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          blog?.content.length > 180
                            ? blog?.content.substring(0, 180) + "..."
                            : blog?.content,
                      }}
                    />
                  </div>
                </div>
                <div className="FeedBlog-Date-Comment">
                  <div className="FeedBlog-date">
                    {new Date(blog.createdAt).toDateString()}
                  </div>
                  <div className="FeedBlog-Total-Comments">
                    <button
                      onClick={() => {
                        navigate(`/blogPage/${blog._id}`);
                      }}
                      className="FeedBlog-Total-Comments-gtb"
                    >
                      Go to blog
                      <FaArrowAltCircleRight />
                    </button>
                    <button
                      className="FeedBlog-Total-Comments-c"
                      onClick={() => {
                        navigate(`/blogPage/${blog._id}`);
                      }}
                    >
                      Comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading blogs</p>
      )}
    </div>
  );
}

export default FeedBlogs;
