import styles from "./index.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h4>About Us</h4>
            <p>Your one-stop shop for all things trendy and fashionable.</p>
          </div>
          <div>
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
          <div>
            <h4>Newsletter</h4>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Enter your email" />
              <button><FiMail /></button>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© 2024 Your E-commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;