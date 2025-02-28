import styles from "./index.module.scss";

import category_1 from '../../assets/category_1.jpg';
import category_2 from '../../assets/category_2.jpg';
import category_3 from '../../assets/category_3.jpg';
import category_4 from '../../assets/category_4.jpg';
import category_5 from '../../assets/category_5.jpg';


const categories = [
  { name: "Electronics", image: category_1 },
  { name: "Fashion", image: category_2 },
  { name: "Home & Kitchen", image: category_3 },
  { name: "Beauty", image: category_4 },
  { name: "Accessories", image: category_5 }
];

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <h2 className={styles.title}>Shop by Category</h2>
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryItem}>
              <img src={category.image} alt={category.name} className={styles.image} />
              <div className={styles.overlay}>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;