import styles from "./index.module.scss";

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
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
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
