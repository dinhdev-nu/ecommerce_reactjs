import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShare, FaMinus, FaPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import styles from "./index.module.scss";
import Comment from "../Comment";



const ProductComponent = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    name: "Premium Leather Backpack",
    price: 199.99,
    discount: 20,
    description: "Handcrafted premium leather backpack with multiple compartments and laptop sleeve. Perfect for daily use and travel.",
    specifications: "Genuine leather construction, 15-inch laptop compartment, Water-resistant coating, Adjustable straps",
    technical: "Dimensions: 18 inches x 12 inches x 6 inches, Weight: 2.5 lbs, Material: Full-grain leather",
    colors: ["Brown", "Black", "Tan"],
    sizes: ["Small", "Medium", "Large"],
    stock: 15,
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887",
    ]
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.productWrapper}>
        <div className={styles.productGrid}>
          <ShowImage product={product}/>

          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <div className={styles.productMeta}>
              <div className={styles.rating}>
                <span>{product.rating} ⭐ ({product.reviewCount} reviews)</span>
              </div>
              <button onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? <FaHeart className={styles.favorite} /> : <FaRegHeart />}
              </button>
              <button><FaShare /></button>
            </div>
            
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>${(product.price - (product.price * product.discount / 100)).toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className={styles.originalPrice}>${product.price}</span>
                  <span className={styles.discount}>{product.discount}% OFF</span>
                </>
              )}
            </div>
            
            <div className={styles.options}>
              <div className={styles.option}>
                <label>Color</label>
                <div className={styles.choices}>
                  {product.colors.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={selectedColor === color ? styles.selected : ""}>{color}</button>
                  ))}
                </div>
              </div>
              
              <div className={styles.option}>
                <label>Size</label>
                <div className={styles.choices}>
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? styles.selected : ""}>{size}</button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><FaPlus /></button>
              <span style={{ marginLeft: '10px' }}>{product.stock} available</span>
            </div>
            
            <div className={styles.actions}>
              <button className={styles.addToCart}><MdShoppingCart size={23} style={{margin: '0 5px -5px 0'}}/> Add to Cart</button>
              <button className={styles.buyNow}>Buy Now</button>
            </div>
          </div>
        </div>
        <ProductTabs product={product} />

        <Comment />
      </div>
      <h1></h1>
    </div>

  );
};



export default ProductComponent;



const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={styles.productTabs}>
      <div className={styles.tabNav}>
        {["description", "specifications", "technical"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              `${styles.tabButton} ${activeTab === tab ? styles.active : ""}`
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab === "description" && <p>{product.description}</p>}
        {activeTab === "specifications" && <p>{product.specifications}</p>}
        {activeTab === "technical" && <p>{product.technical}</p>}
      </div>
    </div>
  );
};


const ShowImage = ({product}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImage}>
        <img src={product.images[selectedImage]} alt={product.name} />
      </div>
      <div className={styles.thumbnailGrid}>
        {product.images.map((images, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`${styles.thumbnail} ${selectedImage === index ? styles.selected : ""}`}
          >
            <img src={images} alt={`${product.name} ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
