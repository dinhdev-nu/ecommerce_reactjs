import React from "react";
import styles from "./index.module.scss";
import { FaGithub, FaFacebook, FaFacebookMessenger} from "react-icons/fa";
import { useLocation} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";


const Access = () => {

  const currentUrl = useLocation();
  const isLogin = currentUrl.pathname === '/login';
    
  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <div className={styles.signupLeft}>
          <h1>Website</h1>
          <div style={{ marginTop : '-30px'}}>
            <h2>LOREM IPSUM DOLOR</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus gravida ac.</p>
          </div>
          <div className={styles.socialIcons}>
            <i><FaGithub/></i>
            <i><FaFacebook/></i>
            <i><FaFacebookMessenger/></i>
          </div>
        </div>
        {isLogin ? <Login/> : <Signup/>}
      </div>
    </div>
  );
};

export default Access;

