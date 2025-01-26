import React from "react";
import styles from "./index.module.scss";
import GoogleLogo from "../../assets/google.png";
import { FaGithub, FaFacebook, FaFacebookMessenger, FaEye} from "react-icons/fa";


const Access = () => {


  const categories = ["New Collection", "Special Promo", "Casual Bag", "Party Bag"];
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
        <div className={styles.signupRight}>
          <h2>Create Account</h2>
          <div className={styles.Form}>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <div className={styles.passwordContainer}>
              <input type="password" placeholder="Password" />
              <i><FaEye/></i>
            </div>
            <button type="submit">Create Account</button>
          </div>
          <p>
            Already have an account? <a href="#">Log in</a>
          </p>
          <div className={styles.divider}>
            <span>or Sign In with</span>
          </div>
          <div className={styles.socialLogin}>
            <button className={styles.googleBtn}>
              <i><img src={GoogleLogo} style={{width: '15px'}} alt="" /></i>Sign up with Google
              </button>
            <button className={styles.githubBtn}><i><FaGithub/></i>Sign up with Github</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
