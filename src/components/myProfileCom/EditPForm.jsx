import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader";
import './EditPForm.css'
import { useNavigate } from "react-router-dom";

function EditPForm() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    profilePicture: "",
    // bio: ""
  });
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false)


  const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(URL.createObjectURL(file));
    }
    console.log("Selected Image:", file);
    setFormData({ ...formData, profilePicture: file });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      name: formData.name,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      profilePicture: formData.profilePicture,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://blogbackend-wi2j.onrender.com/api/outh/update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("User updated sucessfully");
      } else {
        toast.error("Update failed, Please try again later");
      }
      setFormData({
        ...formData,
        name: "",
        userName: "",
        email: "",
        password: "",
        profilePicture: ""
      });

      console.log(formData)

      navigate('/myProfile')
      



    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error while updating data", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="personalEdit">
      {loading ? (
        <Loader />
      ) : (
        <div className="personalEdit-container">
          
          <form
            action="submit"
            className="personalEdit-form"
            onSubmit={handleSubmit}
          >
            <button
            className="personalEdit-cancel"
            onClick={()=>{
              navigate('/myProfile')
            }}
          >X</button>
            <div className="personalEdit-form-right">
              <label htmlFor="personalEdit-photo">Upload Photo: </label> <br />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="personalEdit-photo"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="personalEdit-photo"
                />
              )}
            </div>

            <div className="personalEdit-form-left">
              <label htmlFor="personalEdit-name">Update Name</label>
              <input
                type="text"
                name="name"
                id="personalEdit-name"
                placeholder="Md Tarique Hasan"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="personalEdit-userName">Update UserName</label>
              <input
                type="text"
                name="userName"
                id="personalEdit-userName"
                placeholder="@mdtariquehasan"
                value={formData.userName}
                onChange={handleChange}
              />
              <label htmlFor="personalEdit-email">Update Email</label>
              <input
                type="email"
                name="email"
                id="personalEdit-email"
                placeholder="mdtariquehasan@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="personalEdit-bio">Update Bio</label>
              <textarea
                color="40"
                rows="5"
                type="text"
                id="personalEdit-bio"
                placeholder="Your bio"
                name="bio"
                // value={formData.bio}
                // onChange={handleChange}
              />
              <label htmlFor="personalEdit-password">Update Passwod</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="personalEdit-password"
                placeholder="12345"
                value={formData.password}
                onChange={handleChange}
              />
              <div className='reg-class-checkbox'>
                <input
                    type="checkbox"
                    id='reg-pw-cd'
                    onChange={handleShowPassword}
                />
                <h5 >Show Password</h5>
            </div>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditPForm;
