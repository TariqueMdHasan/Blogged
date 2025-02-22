import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogForm.css";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
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
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file)); // Generate preview
        }
    };

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


    };

    return (
        <div className="blog-form">
            <div className="blogForm-header">
                <h2>Create a Blog Post</h2>
            </div>
            <button
                className="blogForm-cancel"
                onClick={() => navigate('/feed')}
                // onClick={() => window.location.href = '/feed'}
                type="button"

            >Cancel</button>
            <form onSubmit={handleSubmit} className="blogForm-form" action="submit">
                <div className="blogForm-form-inputs">
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
                            <button type="submit" className="blogForm-button">Submit</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default BlogForm;









// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./BlogForm.css";

// const BlogForm = () => {
//     const [formData, setFormData] = useState({
//         title: "",
//         content: "",
//         category: "",
//         image: null,
//     });

//     const [imagePreview, setImagePreview] = useState(null);
//     const [step, setStep] = useState(1);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

//     // Handle screen resizing
//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 992);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleContentChange = (value) => {
//         setFormData({ ...formData, content: value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, image: file });
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form Data Submitted:", formData);
//         const data = new FormData();
//         data.append("title", formData.title);
//         data.append("content", formData.content);
//         data.append("category", formData.category);
//         if (formData.image) {
//             data.append("image", formData.image);
//         }
//     };

//     return (
//         <div className="blog-form">
//             <div className="blogForm-header">
//                 <h2>Create a Blog Post</h2>
//             </div>
//             <form onSubmit={handleSubmit} className="blogForm-form">
//                 {/* Desktop View (Normal Layout) */}
//                 {!isMobile && (
//                     <div className="blogForm-form-inputs">
//                         <div className="blogForm-groupContent">
//                             <label className="blogForm-groupContent-label">Content:</label>
//                             <ReactQuill
//                                 value={formData.content || ""}
//                                 onChange={handleContentChange}
//                                 className="blogForm-editor"
//                                 placeholder="Write something amazing..."
//                             />
//                         </div>
//                         <div className="blogForm-form-group">
//                             <div className="blogForm-input-group">
//                                 <div className="blogForm-groupTitle">
//                                     <label className="blogForm-gt-label">Title:</label>
//                                     <input
//                                         className="blogForm-inputTitle"
//                                         type="text"
//                                         name="title"
//                                         placeholder="Enter title"
//                                         value={formData.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="blogForm-groupCategory">
//                                     <label className="blogForm-gc-label">Category:</label>
//                                     <select
//                                         name="category"
//                                         value={formData.category}
//                                         onChange={handleChange}
//                                         required
//                                         className="blogForm-select"
//                                     >
//                                         <option value="">Select a category</option>
//                                         <option value="technology">Technology</option>
//                                         <option value="health">Health</option>
//                                         <option value="lifestyle">Lifestyle</option>
//                                         <option value="education">Education</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="blogForm-groupImage">
//                                 <label>Upload Image:</label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                     className="blogForm-fileInput"
//                                 />
//                                 {imagePreview && (
//                                     <img
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         className="blogForm-imagePreview"
//                                     />
//                                 )}
//                             </div>
//                             <button type="submit" className="blogForm-button">Submit</button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Mobile View (Step-based Layout) */}
//                 {isMobile && (
//                     <>
//                         {step === 1 && (
//                             <div className="blogForm-form-group">
//                                 <div className="blogForm-input-group">
//                                     <div className="blogForm-groupTitle">
//                                         <label className="blogForm-gt-label">Title:</label>
//                                         <input
//                                             className="blogForm-inputTitle"
//                                             type="text"
//                                             name="title"
//                                             placeholder="Enter title"
//                                             value={formData.title}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="blogForm-groupCategory">
//                                         <label className="blogForm-gc-label">Category:</label>
//                                         <select
//                                             name="category"
//                                             value={formData.category}
//                                             onChange={handleChange}
//                                             required
//                                             className="blogForm-select"
//                                         >
//                                             <option value="">Select a category</option>
//                                             <option value="technology">Technology</option>
//                                             <option value="health">Health</option>
//                                             <option value="lifestyle">Lifestyle</option>
//                                             <option value="education">Education</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="blogForm-groupImage">
//                                     <label>Upload Image:</label>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                         className="blogForm-fileInput"
//                                     />
//                                     {imagePreview && (
//                                         <img
//                                             src={imagePreview}
//                                             alt="Preview"
//                                             className="blogForm-imagePreview"
//                                         />
//                                     )}
//                                 </div>
//                                 <button type="button" className="blogForm-button next" onClick={() => setStep(2)}>
//                                     Next
//                                 </button>
//                             </div>
//                         )}

//                         {step === 2 && (
//                             <div className="blogForm-groupContent">
//                                 <label className="blogForm-groupContent-label">Content:</label>
//                                 <ReactQuill
//                                     value={formData.content || ""}
//                                     onChange={handleContentChange}
//                                     className="blogForm-editor"
//                                     placeholder="Write something amazing..."
//                                 />
//                                 <div className="blogForm-navigation">
//                                     <button type="button" className="blogForm-button back" onClick={() => setStep(1)}>
//                                         Back
//                                     </button>
//                                     <button type="submit" className="blogForm-button submit">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default BlogForm;
