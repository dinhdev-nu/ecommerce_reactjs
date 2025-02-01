import React, { useState } from "react";
import styles from "./index.module.scss";
import logo from '../../assets/logo1.png'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

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

const CartForNavbar = () => {
  const [isCartMenu, setIsCartMenu] = useState(false);

  const toggleCartMenu = () => {
    setIsCartMenu(!isCartMenu);
  }

  return (
    <button 
    className={`${styles.iconButton} ${styles.cartButton}`}
    onClick={toggleCartMenu}
    >
      <FiShoppingCart size={24} />
      <span className={styles.cartCount}>0</span>
      <div className={styles.cartMenu} style={{ display: isCartMenu ? "block" : "none" }}>
        <p>Your cart is empty</p>
      </div>
    </button>
  )

}

const UserForNavbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toogleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  } 

  return (
    <button 
    className={ `${styles.iconButton} ${styles.userButton}` }
    onClick={toogleUserMenu}
    >
      <FiUser size={24} />
      <div className={styles.userMenu} style={{ display: isUserMenuOpen ? "block" : "none" }}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Register</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </button>
  )
}
