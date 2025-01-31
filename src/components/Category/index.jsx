import styles from "./index.module.scss";

const categories = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050" },
  { name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" }
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