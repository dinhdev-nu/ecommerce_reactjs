import React, { useState } from "react";
import styles from "./index.module.scss";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";

const CartForNavbar = () => {
  const [isCartMenu, setIsCartMenu] = useState(false);

  const [cartItems, setCartItems] = useState(
    getFromLocalStorage("_MY_CART") || []
  );

  const cartLength = getFromLocalStorage('_MY_CART')?.length || 0;

  const toggleCartMenu = async () => {
    setIsCartMenu(!isCartMenu);
    const user = getFromLocalStorage('_IT_YOU');
    if (!user) return;

    const cart = getFromLocalStorage('_MY_CART');
    if (cart) {
      setCartItems(cart);
      return;
    }
    try {
      const response = await callApi.get('/cart/get', {
        requiresAuth: true,
      })
      setCartItems(response.data.metadata)
      setToLocalStorage({
        key: '_MY_CART',
        values: response.data.metadata
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error('Failed to fetch cart items')
    }
  }
  const nagitive = useNavigate()
  const handleOnclick = () => {
    nagitive('/cart')
  }


  return (

    <span
      className={`${styles.iconButton} ${styles.cartButton}`}
      style={{ padding: "0 5px 0 10px" }}
      onClick={toggleCartMenu}
    >
      <FiShoppingCart size={24} />
      <span className={styles.cartCount}>{cartLength}</span>
      <div className={styles.cartMenu} style={{ display: isCartMenu ? "block" : "none" }}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className={`${styles.cartSidebar}`}>
            <div className={styles.cartContent}>
              <div className={styles.cartHeader}>
                <h2>Your Cart</h2>
                <button onClick={toggleCartMenu} aria-label="Close Cart">
                  <FiX className={styles.icon} />
                </button>
              </div>
              <>
                <div className={styles.cartItems}>
                  {cartItems.map((item) => (
                    <div key={item.product_id} className={styles.cartItem}>
                      <img
                        src={item.product_thumb}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a";
                        }}
                      />
                      <div className={styles.itemDetails}>
                        <h4>{item.product_name}</h4>
                        <p>${item.product_price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.cartFooter}>
                  <button onClick={handleOnclick} className={styles.checkoutButton}>Xem thêm...</button>
                </div>
              </>
            </div>
          </div>
        )}

      </div>
    </span>
  )

}


export default CartForNavbar
