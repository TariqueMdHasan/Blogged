

import { useState, useEffect } from "react";
import "./navbar.css";
import { useTheme } from "../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import axios from 'axios';
import pen from '../photos/bloggg.png'

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please Login");
        return;
      }
      try {
        const response = await axios.get("https://blogbackend-wi2j.onrender.com/api/outh/getuserdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setError(""); 
      } catch (error) {
        setError("Failed to get user data");
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]); 
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleAuthentication = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } else {
      navigate("/auth");
    }
  };

  return (
    <div>
      <nav className="navbar">
        {/* {error && <p className="error-message">{error}</p>} */}
        
        <div className='ProfileImage-nav' onClick={() => navigate('/myProfile')}>
          {user && user.profilePicture ? (
            <img src={user.profilePicture} alt="profile identity" className='profile-visual-identity' />
          ) : null}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="nav-menu">
          <button onClick={() => navigate("/")} className="nav-filter-Icon">
            <img src={pen} alt="logo of website" className="nav-penImage" />
          </button>
          <button onClick={() => navigate("/feed")} className="nav-filter-Icon">
            <IoHomeSharp />
          </button>
          <button onClick={toggleTheme} className="nav-theme-toggle-btn">
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>
          <button className={`nav-profile-Icon ${isLoggedIn ? "logout-btn" : "register-btn"}`} onClick={handleAuthentication}>
            {isLoggedIn ? "Logout" : "Register"}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
