import React, {  useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FiUser} from "react-icons/fi";
import { Link } from "react-router-dom";

import { getFromLocalStorage, removeFromLocalStorage } from '../../utils/localStorage'
import { toast } from "react-toastify";
import callApi from '../../utils/axiosConfig'



const UserForNavbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [ userName, setUserName ] = useState('')

  const toggleUserMenu = () => {
    return setIsUserMenuOpen(!isUserMenuOpen);
  } 

  useEffect(() => {
    const user = getFromLocalStorage("_IT_YOU")
    setUserName(user?.name || '')
  }, [])

  const handleLogout = async() => {
    try {
      await callApi.post('/access/logout/customer', {}, { 
        withCredentials: true,
        requiresAuth: true 
      })

      removeFromLocalStorage('_IT_YOU')
      removeFromLocalStorage('_DEV_2')
      setUserName('')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <button 
    className={ `${styles.iconButton} ${styles.userButton}` }
    onClick={toggleUserMenu}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FiUser size={24} />
      <div className={styles.userMenu} style={{ display: isUserMenuOpen ? "block" : "none" }}>
        {
          userName ? (
            <>
              <Link to="/" onClick={handleLogout}>Logout</Link>
              <Link to="/account">Account</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Register</Link>
            </> )
        }
      </div>
      <span>{userName}</span>
    </button>
  )
}

export default React.memo(UserForNavbar)

