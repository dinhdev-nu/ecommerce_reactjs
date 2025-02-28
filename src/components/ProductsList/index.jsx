import styles from "./index.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { useEffect, useState } from "react";
import callApi from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { setToLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState()


  useEffect(() => {
    const effect = async () => {
      try {
        const response = await callApi.get('/product')
        setProducts(response.data.metadata)
      } catch (error) {
        console.log('error: ', error)
      }
    }
    effect()
  }, [])

  const handleAddToCart = async (product) => {
    const payload = {
      product_id: product._id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_thumb: product.product_thumb,
    }
    try {
      const cart = await callApi.post('/cart/addtocart', payload, {
        requiresAuth: true,
      })
      toast.success('Added to cart')
      setToLocalStorage({
        key: '_MY_CART',
        values: cart.data.metadata.cart_preview
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error('Failed to add to cart')
    }
  }

  const nagivive = useNavigate()
  const handleShowDetail = (product_id) => {
    nagivive(`/product/${product_id}`)
  }

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Products</h2>
        <div className={styles.grid}>
          {products?.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.product_thumb} alt={product.name} className={styles.image} />
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(product)}
                ><TiShoppingCart /></button>
              </div>
              <div className={styles.details}>
                <h3
                  className={styles.productName}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleShowDetail(product._id)}
                >{product.product_name}</h3>
                <div className={styles.bottom}>
                  <p className={styles.price}>$ {product.product_price}</p>
                  <p style={{
                    color: "yellow", fontWeight: 'bold'
                  }}>10</p>
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
