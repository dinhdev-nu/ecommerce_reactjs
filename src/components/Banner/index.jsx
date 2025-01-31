import styles from "./index.module.scss";

const PromotionalBanners = () => {
  return (
    <section className={styles.promotionalSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.bannerPink}>
            <h3 className={styles.title}>New Arrivals</h3>
            <p className={styles.description}>Discover the latest fashion trends</p>
            <button className={styles.shopNow}>Shop Now</button>
          </div>
          <div className={styles.bannerBlue}>
            <h3 className={styles.title}>Special Offers</h3>
            <p className={styles.description}>Up to 70% off on selected items</p>
            <button className={styles.learnMore}>Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;