import { useState, useEffect } from "react";
import "./navbar.css";
import { useTheme } from "../ThemeContext";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";


function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation();

  useEffect(() => {
    
        const token = localStorage.getItem("token")
        // if (token) {
        //   setIsLoggedIn(true)
        // } else {
        //   setIsLoggedIn(false)
        // }

        // same as if else condidition
        setIsLoggedIn(!!token)
     
  }, [location.pathname])

  const handleAuthentication = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token")
      setIsLoggedIn(false)
      navigate('/')
    } else {
      navigate("/auth")
    }
  }



  return (
    <div>
      <nav className="navbar">
        <h1
          className="nav-logo"
          onClick={() => {
            navigate("/");
          }}
        >BLOGGED</h1>
        <div className="nav-menu">
          <button
          onClick={() => {
            navigate("/feed");
          }}
          className="nav-filter-Icon"
          
          >
            <IoHomeSharp />
          </button>
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="nav-theme-toggle-btn"
          >
            {
              theme === "light" ? <FaSun /> : <FaMoon />
            }
          </button>
          <button
            // className="nav-profile-Icon"
            className={`nav-profile-Icon ${isLoggedIn ? "logout-btn" : "register-btn"}`}
            onClick={handleAuthentication}
          >
            {
              isLoggedIn ? "Logout" : "Register"
            }
          </button>
        </div>

      </nav>
    </div>
  );
}

export default Navbar;
