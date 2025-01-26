import React, { useRef } from "react";
import styles from "./index.module.scss";
import anh1 from '../../assets/logo.jpg';
import anh2 from '../../assets/google.png';


const ProductCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          {/* Hình ảnh chính */}
          <div className={styles.mainImage}>
            <img
              src={anh1}
              alt="Main Product"
              className={styles.image}
            />
          </div>
          {/* Thumbnails */}
          <div className={styles.thumbnails}>
            {["red", "black", "blue", "white"].map((color, index) => (
              <img
                key={index}
                src={anh2}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <span className={styles.newTag}>New!</span>
          <h1 className={styles.productName}>Nike Air Zoom Flight 95</h1>
          <p className={styles.productType}>Men's Shoes</p>
          <p className={styles.price}>$129.97</p>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <h4>Size</h4>
            <div className={styles.sizes}>
              {["XS", "S", "M", "L"].map((size) => (
                <button key={size} className={styles.sizeButton}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button className={styles.addToCart}>Add to cart</button>
            <button className={styles.favorite}>Favorite ♥</button>
          </div>

          {/* Shipping Info */}
          <div className={styles.shipping}>
            <p>Shipping*</p>
            <p>
              To get accurate shipping information <a href="#edit">Edit Location</a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1>Comment here ...</h1>
      </div>
    </div>
  );
};

export default ProductCard;
