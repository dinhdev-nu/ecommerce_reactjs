import styles from "./index.module.scss";

import heroSection from "../../assets/banner.jpg"

const HeroSelection = () => {
  return (
    <section className={styles.heroes}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <h1>Summer Collection 2024</h1>
            <p>Up to 50% off on selected items</p>
            <button className={styles.shopButton}>Shop Now</button>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={heroSection}
              alt="Hero"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSelection;
