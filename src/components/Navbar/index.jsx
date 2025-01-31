import React, { useState } from "react";
import styles from "./index.module.scss";
import logo from '../../assets/logo1.png'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

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
            <li><a href="#">Shop</a></li>
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
          <button className={styles.iconButton}><FiShoppingCart size={24} /></button>
          <button className={styles.iconButton}><FiUser size={24} /></button>
          <button onClick={toggleDarkMode} className={styles.iconButton}>
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
