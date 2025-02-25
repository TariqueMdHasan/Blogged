import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPBlogs.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Loader from "../Loader";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyPBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // http://localhost:5000/api/blog/myBlogs

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
    const fetchBlogs = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Please Login");
        return;
      }
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.id);
        // console.log(userId)

        const response = await axios.get(
          "https://blogbackend-wi2j.onrender.com/api/blog/myBlogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Fetched Data:", response.data);
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
    <div className="MyOwn-Blogs">
      {loading ? (
        <Loader />
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="FeedBlog-container" key={blog._id}>
            {/* <div className='FeedBlog'> */}
            <div className="FeedBlog-Author-Information">
              <div className="BlogFeed-Author-Identity">
                <div className="FeedBlog-Autohor-PPic">
                  <img
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
                    {blog.author?.name || "Unknown"}
                  </div>
                  <div className="FeedBlog-Author-UserName">
                    @{blog.author?.userName || "Unknown"}
                  </div>
                </div>
              </div>

              {userId === blog.author._id ? (
                <div className="FeedBlog-delete-edit">
                  <button className="FeedBlog-delete-edit-edit">
                    <FaEdit />
                  </button>
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
                <div>.</div>
              )}
            </div>
            <div className="FeedBlog-Blog-Information">
              <div className="FeedBlog-Blog-Image">
                <img
                  src={
                    blog.blogImages ||
                    "https://random-image-pepebigotes.vercel.app/api/random-image"
                  }
                  alt="Blog"
                  className="FeedBlog-blog-img"
                />
              </div>
              <div className="Feedblog-content-texts">
                <div className="FeedBlog-title">
                  <p className="FeedBlog-content-title">
                    {/* {blog.title} */}
                    {blog.title.length > 60
                      ? blog.title.substring(0, 60) + "..."
                      : blog.title}
                  </p>
                </div>
                <div className="FeedBlog-content">
                  <p className="FeedBlog-content-para">
                    {/* {blog.content} */}
                    {/* {blog.content.length > 180 ? blog.content.substring(0, 180) + "..." : blog.content} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          blog?.content.length > 180
                            ? blog?.content.substring(0, 180) + "..."
                            : blog?.content,
                      }}
                    />
                  </p>
                </div>
                <div className="FeedBlog-Date-Comment">
                  <div className="FeedBlog-date">
                    {new Date(blog.createdAt).toDateString()}
                  </div>
                  <div className="FeedBlog-Total-Comments">
                    <button
                      className="FeedBlog-Total-Comments-gtb"
                      onClick={() => {
                        // navigate("/blogPage");
                        navigate(`/blogPage/${blog._id}`);
                      }}
                    >
                      Go to blog
                      <FaArrowAltCircleRight />
                    </button>
                    <button
                      className="FeedBlog-Total-Comments-c"
                      onClick={() => {
                        // navigate("/blogPage");
                        navigate(`/blogPage/${blog._id}`);
                      }}
                    >
                      Comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        ))
      ) : (
        <p>No blogs found. Start writing your first blog</p>
      )}
    </div>
  );
}

export default MyPBlogs;
