import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { FaGithub, FaFacebook, FaFacebookMessenger} from "react-icons/fa";
import { useLocation} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

import { motion } from 'framer-motion'


const Access = () => {
  const [ role, setRole ] = React.useState(false);

  const currentUrl = useLocation();
  const isLogin = currentUrl.pathname === '/login';

  useEffect(() => {
    if(currentUrl.search === '?r=5') {
      setRole(true);
    }
  }, [currentUrl.search])

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <div className={styles.signupLeft}>
          <h1>ShopBee</h1>
          <div style={{ marginTop : '-30px'}}>
            <h2>Wellcome 🐝 {role ? 'Shop' : 'Customer' }!</h2>
            <div onClick={() => setRole(!role)} style={{marginTop: '20px', cursor: 'pointer'}}>
              <AnimationText role={!role}/>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <i><FaGithub/></i>
            <i><FaFacebook/></i>
            <i><FaFacebookMessenger/></i>
          </div>
        </div>
        {isLogin ? <Login role={role}/> : <Signup role={role}/>}
      </div>

    </div>
  );
};

export default Access;


const AnimationText = ({role}) => {

  return (
    <motion.div
      style={{ fontWeight: "bold", color: "white" }}
      animate={{
        x: [-2, 2, 0, 0, 0], // Lắc qua lại
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
      }}
    >
      I am a Bee {role ? 'Shop' : 'Customer' } 🐝 !! Click here...
    </motion.div>
  );
}

