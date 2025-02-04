import React, { useState } from "react";
import styles from "./index.module.scss";
import {FiShoppingCart } from "react-icons/fi";

import { getFromLocalStorage } from '../../utils/localStorage'

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


export default CartForNavbar
