import React from "react";
import styles from './index.module.scss'

const NavBar = () => {
    
    return (
        <nav className={styles.navbar} >
            <h1 className={styles.logo}>ShopBee</h1>
            <li className={styles.navLinks}>
                <a href="/">HOME</a>
                <a href="/">CART</a>
                <a href="/">PRE ORDER</a>
                <a href="/">ABOUT</a>
                <a href="/">CONTACT</a>
            </li>
        </nav>
    )

}

export default NavBar