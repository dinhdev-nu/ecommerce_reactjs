import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  FiHome, FiBox, FiDatabase, FiShoppingCart,
  FiBarChart2, FiSettings, FiSun, FiMoon, FiBell,
  FiUser, FiMenu, FiX
} from "react-icons/fi";
import logo from "../../assets/logo1.png";
import Home from "../DashboardHome";
import ProductManage from "../DashboardProduct";
import { useNavigate } from "react-router-dom";





const ShopManagerDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const nagitive = useNavigate()

  const sidebarItems = [
    { icon: <FiHome />, label: "Dashboard", id: "dashboard" },
    { icon: <FiBox />, label: "Products", id: "products" },
    { icon: <FiDatabase />, label: "Inventory", id: "inventory" },
    { icon: <FiShoppingCart />, label: "Orders", id: "orders" },
    { icon: <FiBarChart2 />, label: "Analytics", id: "analytics" },
    { icon: <FiSettings />, label: "Settings", id: "settings" }
  ];

  return (
    <div className={`${styles.container}`}>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            className={styles.logo}
            onClick={() => nagitive('/')}
          />
        </div>
        <nav className={styles.navMenu}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ""}`}
            >
              <span className={styles.navIcon}>{item.icon} </span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className={styles.mainContent}>
        <button onClick={() => setIsOpen(!isOpen)} className={`${styles.menuButton} ${isOpen ? styles.openBtn : ""}`}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>Shop Manager Dashboard</h1>
          <div className={styles.actions}>
            <button onClick={() => setDarkMode(!darkMode)} className={styles.iconButton}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={() => setShowNotifications(!showNotifications)} className={styles.iconButton}>
              <FiBell />
            </button>
            <button className={styles.iconButton}><FiUser /></button>
          </div>
        </header>

        {activeSection !== 'products' ? <Home /> : <ProductManage />}
      </div>

    </div>
  );
};

export default ShopManagerDashboard;
