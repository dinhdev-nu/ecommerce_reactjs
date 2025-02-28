import React, { useState } from "react";
import { FaPercent, FaTimes, FaTag, FaCopy } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "./index.module.scss";
import callApi from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const DiscountButton = ({ product, setDiscount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");
  const [discounts, setDiscounts] = useState([]);

  const handleClick = async () => {
    if (discounts.length > 0) {
      setIsOpen(!isOpen)
      return
    }
    try {
      const response = await callApi.get(`/discount/product/${product._id}?shopId=${product.shop_id}`)
      setDiscounts(response.data.metadata)
      setIsOpen(!isOpen)
    } catch (error) {
      return
    }
  }

  const onSelectDiscount = async (discount) => {
    try {
      if (discount?.inValid === false) {
        toast.error(discount.message)
        return
      }
      const response = await callApi.post(`/discount/apply`, {
        discount_id: discount._id,
        product: {
          quantity: product.quantity,
          product_price: product.product_price,
        }
      })
      response.data.metadata.discount_type = discount.discount_type
      response.data.metadata.discount_value = discount.discount_value
      response.data.metadata.discount_id = discount._id
      setDiscount(response.data.metadata)
      setIsOpen(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className={styles.dropdownContainer} >
      <button
        onClick={handleClick}
        className={styles.dropdownButton}
      >
        <FaTag className={styles.icon} />
        <span className={styles.text}>View Offers</span>
        <IoMdArrowDropdown className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </button>
      {isOpen && (
        <div className={styles.popupContainer}>
          <div className={styles.header}>
            <h3>Available Discounts</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.discountList}>
            {discounts.map((discount) => (
              <div
                key={discount._id + Math.random().toString()}
                onClick={() => {
                  onSelectDiscount(discount)
                }}
                className={`${styles.discountItem}`}
              >
                <div className={styles.discountInfo}>
                  <div
                    className={`${styles.icon} ${discount.discount_type === "percentage" ? styles.percentage : styles.tag
                      }`}
                  >
                    {discount.discount_type === "percentage" ? <FaPercent /> : <FaTag />}
                  </div>
                  <div className={styles.details}>
                    <p className={styles.category}>{discount.discount_name}</p>
                    <p className={styles.value}>{discount.discount_value}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={styles.copyButton}
                  title="Copy code"
                >
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className={styles.input}
              />
              <button className={styles.applyButton}>
                Apply
              </button>
            </div>
            {error && <p className={error.includes("successfully") ? styles.success : styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountButton;