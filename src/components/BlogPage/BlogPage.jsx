import React, { useState, useEffect } from "react";
import "./BlogPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function BlogPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [commentId, setCommentId] = useState(null);

  const handleChange = (e) => {
    setCommentText({ ...commentText, [e.target.name]: e.target.value });
  };

  // http://localhost:5000/api/comment/delete/67b47bf86d2013482d0cdc28
  const handleDeleteBlog = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://blogbackend-wi2j.onrender.com/api/comment/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      toast.success("blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Blog not deleted");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      // const sendComment = await axios.post(`https://blogbackend-wi2j.onrender.com/api/blog/${id}`,
      const sendComment = await axios.post(
        `https://blogbackend-wi2j.onrender.com/api/comment/create/${id}`,
        commentText,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (sendComment.status === 200) {
        toast.success("Comment Sent");
        setComment([...comment, sendComment.data.comment]);
      } else {
        toast.error("Comment not send");
      }
      setCommentText({ text: "" });
    } catch (error) {
      console.log("Error registration user", error);
      toast.error("An error occured during registration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const decoded = jwtDecode(token);
        setCommentId(decoded.userId || decoded.id);
        const response = await axios.get(
          `https://blogbackend-wi2j.onrender.com/api/blog/${id}`
        );
        if (!response.data) throw new Error("Failed to fetch blog");
        setBlog(response.data.blog);
        // console.log(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);





  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentResponse = await axios.get(
          `https://blogbackend-wi2j.onrender.com/api/comment/blog/${id}`
        );
        if (!commentResponse.data) throw new Error("Failed to fetch comments");
        setComment(commentResponse.data.comments);
        // console.log(commentResponse.data.comments)
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <div className="BlogPage">
      {loading ? (
        <Loader />
      ) : (
        <div className="BlogPage-blog-comment-container">
          <div className="BlogPage-blog-container">
            <div className="BlogPage-blog-author-container">
              <div className="BlogPage-blog-image-parent">
                <img
                  className="BlogPage-blog-image"
                  src={blog?.blogImages}
                  alt="adsfas"
                />
              </div>
              <div className="BlogPage-author-info">
                <div className="FeedBlog-Autohor-PPic">
                  <img
                    src={
                      blog?.author?.profilePicture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Author"
                    className="FeedBlog-author-img"
                    onClick={() => {
                      navigate(`/User-Profile/${blog.author._id}`);
                    }}
                  />
                </div>
                <div className="feedPage-author-info-name-userName">
                  <p
                    className="feedPage-author-info-name"
                    onClick={() => {
                      navigate(`/User-Profile/${blog.author._id}`);
                    }}
                  >
                    {blog?.author?.name}
                  </p>
                  <p
                    className="feedPage-author-info-userName"
                    onClick={() => {
                      navigate(`/User-Profile/${blog.author._id}`);
                    }}
                  >
                    @{blog?.author?.userName}
                  </p>
                  {/* <p>hgdf jdfhg dfshg fsfghsd gsdklhgad gklgadjhg </p> */}
                </div>
              </div>
            </div>
            <p className="feedBlog-date">{new Date(blog?.createdAt).toDateString()}</p>
            <h3 className="BlogPage-blog-title">{blog?.title}</h3>
            {/* <p> */}
            {/* {blog?.content} */}
            <div className="BlogPage-blog-content" dangerouslySetInnerHTML={{ __html: blog?.content }} />
            {/* </p> */}
            <div className="BlogPage-bottom-blank"></div>
          </div>

          <div className="BlogPage-commentForm-comments">
            {/* comment form */}
            <div className="BlogPage-commentForm">
              <form
                className="BlogPage-commentForm-form"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Comment here"
                  name="text"
                  value={commentText.text || ""}
                  onChange={handleChange}
                  required
                />
                <button type="submit">
                  <IoSend />
                </button>
              </form>
            </div>
            {/* comments from here */}
            <div className="BlogPage-Comments">
              {comment.length > 0 ? (
                comment.map((item) => (
                  <div
                    key={item._id}
                    className="BlogPage-Comments-Author-Information"
                  >
                    <div className="BlogPage-Comments-Author-Identity">
                      <div className="BlogPage-Comments-for-delete-edit">
                        <div className="BlogPage-Comments-Autohor-PPic">
                          <img
                            src={
                              item.user?.profilePicture ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            alt="Au"
                            className="BlogPage-Comments-author-img"
                            onClick={() => {
                              navigate(`/User-Profile/${item.user?._id}`);
                            }}
                          />
                        </div>
                        <div className="BlogPage-Comments-Author-Name-UserName">
                          <div className="BlogPage-Comments-Author-Name">
                            <p
                              onClick={() => {
                                navigate(`/User-Profile/${item.user?._id}`);
                              }}
                            >{item.user?.name || "Unknown"}</p>
                          </div>
                          <div className="BlogPage-Comments-Author-UserName">
                            <p
                              onClick={() => {
                                navigate(`/User-Profile/${item.user?._id}`);
                              }}
                            >@{item.user?.userName || "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                        { commentId === item.user?._id ? (
                          <div className="BlogPage-Comments-delete-edit BlogPage-del-edit">
                            {/* <button 
                              className="BlogPage-Comments-delete-edit-edit"
                              
                            >
                              <FaEdit />
                            </button> */}
                            <button 
                              className="BlogPage-Comments-delete-edit-delete"
                              onClick={() => {
                                handleDeleteBlog(item._id);
                              }}
                              >
                              <AiFillDelete />
                            </button>
                          </div>
                        ): (
                          <div></div>
                        )
                        }
                    </div>

                    <div className="BlogPage-Comments-date-btn">
                      <p className="BlogPage-Comments-text">{item.text}</p>
                      <div className="BlogPage-Comments-date">
                        <p className="BlogPage-comments-date-text">{new Date(item.createdAt).toDateString()}</p>
                        <button
                          onClick={() => {
                            navigate("/feed");
                          }}
                        >
                          Go to Home
                          <FaArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Comments Available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
