import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogForm.css";

const BlogForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null); // Store image preview

    // Handle text inputs (Title & Category)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle WYSIWYG content change
    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    // Handle Image Upload & Preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file)); // Generate preview
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("category", formData.category);
        if (formData.image) {
            data.append("image", formData.image);
        }

        // Example: Send data to the backend
        /*
        fetch("your_api_endpoint", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
        */
    };

    return (
        <div className="blog-form">
            <div className="blogForm-header">
                <h2>Create a Blog Post</h2>
            </div>
            <form onSubmit={handleSubmit} className="blogForm-form" action="submit">
                <div className="blogForm-form-inputs">
                    {/* WYSIWYG Content Input */}
                    <div className="blogForm-groupContent">
                        <label className="blogForm-groupContent-label" >Content:</label>
                        <ReactQuill
                            value={formData.content || ""}
                            onChange={handleContentChange}
                            className="blogForm-editor"
                            placeholder="Write something amazing..."
                        />
                    </div>
                    <div className="blogForm-form-group">
                        <div className="blogForm-input-group">
                            {/* Title Input */}
                            <div className="blogForm-groupTitle">
                                <label className="blogForm-gt-label" >Title:</label>
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
                            {/* Category Dropdown */}
                            <div className="blogForm-groupCategory">
                                <label className="blogForm-gc-label" >Category:</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="blogForm-select"
                                >
                                    <option value="">Select a category</option>
                                    <option value="technology">Technology</option>
                                    <option value="health">Health</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="education">Education</option>
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
                            <button type="submit" className="blogForm-button">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

// Styles


export default BlogForm;
