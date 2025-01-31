import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import GoogleLogo from "../../assets/google.png";
import { FaGithub, FaFacebook, FaFacebookMessenger, FaEye} from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import callApi from "../../utils/axiosConfig";

const x_api_key = import.meta.env.VITE_X_API_KEY;

const Access = () => {

  const currentUrl = useLocation();
  const isLogin = currentUrl.pathname === '/login';
  

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
        {isLogin ? <Login/> : <Signup/>}
      </div>
    </div>
  );
};

const Login = () => {

  return (
    <div className={styles.signupRight}>
        <h2>Login with us !</h2>
        <div className={styles.Form}>
          <input type="email" placeholder="Email Address" />
          <div className={styles.passwordContainer}>
            <input type="password" placeholder="Password" />
            <i><FaEye/></i>
          </div>
          <button type="submit">Đăng Nhập</button>
        </div>
        <p>
          You don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
        <div className={styles.divider}>
          <span>or Login with</span>
        </div>
        <div className={styles.socialLogin}>
          <button className={styles.googleBtn}>
            <i><img src={GoogleLogo} style={{width: '15px'}} alt="" /></i>  Login  with Google
          </button>
          <button className={styles.githubBtn}><i><FaGithub/></i>  Login with Github</button>
        </div>
      </div>
  )
}
const Signup = () => {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();

  const handleInputChanges = (e, callBack) => {
    callBack(e.target.value);
  }
  const handleCreaeAcount = async() => {
    try {
      const response = await callApi.post('/abc', {
        name,
        email,
        password
      })

      console.log("Singup::: ", response);
      if(response.status === 200)
        navigate('/login');
    } catch (error) {
      console.error("Singup::: ", error);
    }
  }

  return (
    <div className={styles.signupRight}>
        <h2>Create Account</h2>
        <div className={styles.Form}>
          <input type="text" placeholder="Full Name" onChange={(e) => handleInputChanges(e, setName)}/>
          <input type="email" placeholder="Email Address" onChange={(e) => handleInputChanges(e, setEmail)}/>
          <div className={styles.passwordContainer}>
            <input type="password" placeholder="Password" onChange={(e) => handleInputChanges(e, setPassword)}/>
            <i><FaEye/></i>
          </div>
          <button onClick={handleCreaeAcount} >Create Account</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
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
  )
}

export default Access;
