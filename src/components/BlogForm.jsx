import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from './Loader'


const BlogForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        blogImages: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, blogImages: file });


            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }

            setImagePreview(URL.createObjectURL(file));
        }
        console.log("Selected Image:", file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        
        const plainTextContent = formData.content.replace(/<(.|\n)*?>/g, "").trim();
        
        if (!formData.title.trim()) {
            toast.error("Please enter a title");
            setLoading(false);
            return;
        }
        
        if (!plainTextContent || plainTextContent === "&nbsp;") {
            toast.error("Please enter content");
            setLoading(false);
            return;
        }
    
        if (!formData.category) {
            toast.error("Please select a category");
            setLoading(false);
            return;
        }
    
        if (!formData.blogImages) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }
    
        const token = localStorage.getItem("token");
        if (!token) {
            toast.info("User is not authenticated. Please log in.");
            setLoading(false);
            return;
        }
    
        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("category", formData.category);
        data.append("blogImages", formData.blogImages);
    
        console.log("Form Data Before Submit:", Object.fromEntries(data.entries()));
    
        try {
            const response = await axios.post(
                "https://blogbackend-wi2j.onrender.com/api/blog/create",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 201 || response.status === 200) {
                toast.success("Blog Created Successfully!");
                navigate("/feed");
            } else {
                toast.error("Blog creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting blog post:", error);
            toast.error(error.response?.data?.message || "Failed to submit blog post.");
        } finally {
            setLoading(false);
        }
    };
    
    





    return (
        <div className="blog-form">
            <div className="blogForm-header">
                <h2>Create a Blog Post</h2>
            </div>
            <button
                className="blogForm-cancel"
                onClick={() => navigate('/feed')}
                type="button"
            >
                Cancel
            </button>
            <form onSubmit={handleSubmit} className="blogForm-form">
                <div className="blogForm-form-inputs">
                    {/* Content */}
                    <div className="blogForm-groupContent">
                        <label className="blogForm-groupContent-label">Content:</label>
                        <ReactQuill
                            value={formData.content || ""}
                            onChange={handleContentChange}
                            className="blogForm-editor"
                            placeholder="Write something amazing..."
                        />
                    </div>
                    {/* Title & Category */}
                    <div className="blogForm-form-group">
                        <div className="blogForm-input-group">
                            <div className="blogForm-groupTitle">
                                <label className="blogForm-gt-label">Title:</label>
                                <input
                                    className="blogForm-inputTitle"
                                    type="text"
                                    name="title"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="blogForm-groupCategory">
                                <label className="blogForm-gc-label">category:</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="blogForm-select"
                                >
                                    <option value="">Select a catagory</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Food">Food</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Music">Music</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Education">Education</option>
                                    <option value="Business">Business</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="blogForm-groupImage">
                            <label>Upload Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="blogForm-fileInput"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="blogForm-imagePreview"
                                />
                            )}

                            {/* Submit Button */}
                            <button type="submit" className="blogForm-button" disabled={loading}>
                                {loading ? <Loader/> : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;







