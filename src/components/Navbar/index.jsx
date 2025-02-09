import React, { useState } from "react";
import styles from "./index.module.scss";
import logo from '../../assets/logo1.png'
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

import CartForNavbar from "./cart";
import UserForNavbar from "./user";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`${styles.navbar} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.menuButton}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        {/* Center Navigation */}
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
          <ul onClick={() => setIsMenuOpen(false)}>  {/* Đóng menu khi click vào link */}
            <li><a href="#">Home</a></li>
            <li><MyShop /></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.icon} />
            <input type="text" placeholder="Search products..." />
          </div>
          <CartForNavbar />
          <UserForNavbar />
          <button onClick={toggleDarkMode} className={styles.iconButton}>
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


const MyShop = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const role = getFromLocalStorage("_IT_YOU");

    if (role?.roles === "shop") {
      navigate('/dashboard')
    } else {
      toast.info(
        <div style={{ textAlign: "center" }}>
          <p>You are not a shop owner</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => navigate(`/login?r=5`)}
              className={styles.accessButton}
            >
              🔑 Go to Login
            </button>
            <button
              onClick={() => navigate(`/signup?r=5`)}
              className={styles.accessButton}
            >
              📝 Sign Up
            </button>
          </div>
        </div>
      );
      console.log("You need to login as a shop to access this page.");
    }
  }
  return (
    <span className={styles.myShop} onClick={handleClick}>
      My Shop
    </span>
  )
}


