import React from "react";
import styles from './index.module.scss'
import { FaCartPlus } from 'react-icons/fa'

const NavBar = () => {
    
    return (
        <header className={styles.header}>
            <nav className={styles.navbar} >
                <h1 className={styles.logo} >ShopBee</h1>
                <div style={{display: 'flex', gap: '50px'}} >
                    <li className={styles.navLinks}>
                        <a href="/">HOME</a>
                        <a href="/">CART</a>
                        <a href="/">PRE ORDER</a>
                    </li>
                    <div style={{display: 'flex', gap: '50px'}}>
                        <div>
                            <button>
                                Login
                            </button>
                            <button>
                                Logout
                            </button>
                        </div>
                        <div>
                            <button>
                                <FaCartPlus />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )

}

export default NavBar