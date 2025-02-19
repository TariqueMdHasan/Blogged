import { useState } from "react";
import "./navbar.css";
import { useTheme } from "../ThemeContext";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Catagory from "./catagory";


function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [showCatagory, setShowCatagory] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <h1 className="nav-logo">BLOGGED</h1>
        <div className="nav-menu">
          <button
            className="nav-filter-Icon"
            onClick={() =>
              setShowCatagory(!showCatagory)
            }
          >
            <FaFilter />
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
          <button className="nav-profile-Icon">

          </button>
        </div>

      </nav>
      {showCatagory && <Catagory />}
    </div>
  );
}

export default Navbar;
