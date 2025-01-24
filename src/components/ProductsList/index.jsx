import React from "react";
import styles from './index.module.scss'
import anh from '../../assets/backgroundimage.png'

const products = [
    { id: 1, name: "Beige Casual Bag", price: "$68,56", image: anh },
    { id: 2, name: "Brown Casual Bag", price: "$68,56", image: anh },
    { id: 3, name: "Orange Casual Bag", price: "$68,56", image: anh },
  ];
  
  const ProductList = () => {
    return (
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
            <button className={styles.addButton}>
              Add
            </button>
          </div>
        ))}
      </div>
    );
  };

  export default ProductList;
  