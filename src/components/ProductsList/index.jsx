import styles from "./index.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { useEffect, useState } from "react";
import callApi from "../../utils/axiosConfig";


const products1 = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: "$399.99",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
  },
  {
    id: 4,
    name: "Premium Sunglasses",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f"
  }
];

const FeaturedProducts = () => {
  const [ products, setProducts] = useState()


  useEffect( () => {
    const effect = async () => {
        try {
        const response = await callApi.get('/products')
        console.log('response: ', response.data)
        } catch (error) {
        console.error('error fetching products: ', error)
      }}
      effect()
  },[])

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Products</h2>
        <div className={styles.grid}>
          {products1.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.image} />
                <button className={styles.addToCart}><TiShoppingCart/></button>
              </div>
              <div className={styles.details}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.bottom}>
                  <p className={styles.price}>{product.price}</p>
                  <button className={styles.buy}>Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
