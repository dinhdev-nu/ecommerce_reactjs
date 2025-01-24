import React from "react";
import styles from "./index.module.scss";

const CategoryButtons = () => {
  const categories = ["New Collection", "Special Promo", "Casual Bag", "Party Bag"];
  return (
    <div className={styles.categoryContainer}>
      {categories.map((category, index) => (
        <button
          key={index}
          className={styles.categoryButton}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
