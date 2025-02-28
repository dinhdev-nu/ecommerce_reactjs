import { useState, useEffect } from "react";
import { FiShoppingCart, FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";
import { setToLocalStorage } from "../../utils/localStorage";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await callApi.get("/cart/get/detail", {
          requiresAuth: true,
        });
        setProducts(response.data.metadata.cart);
        setOriginalPrice(response.data.metadata.total);
      } catch (error) {
        toast.error("Error while fetching products");
      }
    }
    fetchProducts();
  }, []);

  const handleUpdateQuantity = async (productId, quantityOld, quantityNew) => {
    if (quantityOld === quantityNew) return;
    if (quantityNew < 0) return;
    try {
      await callApi.put("/cart/updatequanity", {
        product_id: productId,
        quantityOld,
        quantityNew,
      }, {
        requiresAuth: true,
      })
      toast.success("Quantity updated successfully");
    } catch (error) {
      toast.error("Error while updating quantity");
    }
  }

  const handleDeleteItem = async (productId) => {
    if (!productId) return;
    try {
      const response = await callApi.delete("/cart/deleteitem/" + productId, {
        requiresAuth: true,
      })
      toast.success("Item deleted successfully");
      setToLocalStorage({
        key: "_MY_CART",
        values: response.data.metadata?.cart_preview,
      })
    } catch (error) {
      toast.error("Error while deleting item");

    }
  }

  if (products.length === 0) {
    return (
      <div className={styles.emmtyCart}>
        <div className={styles.content}>
          <div className={styles.textCenter}>
            <FiShoppingCart className={styles.icon} />
            <h2 className={styles.title}>Your cart is empty</h2>
            <p className={styles.subtitle}>Start adding some items to your cart!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product._id + Math.random()} className={styles.productCard}>
              <div className={styles.productDetails}>
                <img
                  src={product.product_thumb}
                  alt={product.product_name}
                  className={styles.productImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                  }}
                />
                <div className={styles.productInfo}>
                  <h3>{product.product_name}</h3>
                  <p>${product.product_price.toFixed(2)}</p>

                  <div className={styles.actions}>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => {
                          handleUpdateQuantity(product._id, product.quantity, product.quantity - 1);
                        }}
                      >-</button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => {
                          handleUpdateQuantity(product._id, product.quantity, product.quantity + 1);
                        }}
                      >+</button>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => {
                        handleDeleteItem(product._id);
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className={styles.productPrice}>
                  <p>$ {product.product_price * product.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartSummary}>
          <div className={styles.summaryDetails}>
            <div className={styles.row}>
              <span>Subtotal</span>
              <span>$ {originalPrice}</span>
            </div>
            <div className={styles.rowDiscount}>
              <span>Total Discount</span>
              <span>- $0</span>
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>$ {originalPrice}</span>
              </div>
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;