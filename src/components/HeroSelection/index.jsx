import React, { useRef } from 'react'
import styles from './index.module.scss'
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const HeroSelection = () => {
     

    const inputRef = useRef(null);
    const handleFocus = () => {
        if (inputRef.current) {
          inputRef.current.focus(); // Focus vào input
        }
        
      };

    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>OUR NEW PORDUCT</h1>
            <div className={styles.searchBar}>
                <FaSearch className={styles.icon} onClick={handleFocus}/>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search here ...'
                    className={styles.input}
                />
            </div>
        </div>
    )

}

export default HeroSelection
