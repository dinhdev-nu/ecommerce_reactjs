import React from "react";
import styles from "../styles/NotFound.module.scss";
import anh from '../assets/backgroundimage.png'

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className={styles.button}>
          Go Back Home
        </a>
      </div>
      <div className={styles.robot}>
        <img src={anh} alt="Lost Robot" />
      </div>
    </div>
  );
};

export default NotFoundPage;
