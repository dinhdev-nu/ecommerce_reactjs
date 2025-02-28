import React from "react";
import { format } from "date-fns";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import styles from "./index.module.scss";



const ReviewOrder = ({ sendDataToParent, orderDetails }) => {

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaCheckCircle className={styles.icon} />
          <h1 className={styles.title}>Order Comfirm</h1>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.orderId}>
            <span>Order ID:</span>
            <span className={styles.orderNumber}>#{orderDetails.orderId}</span>
          </div>
          <div className={styles.orderDate}>
            <FaCalendarAlt />
            <span>{format(orderDetails.order_date, "dd MMM yyyy")}</span>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeader}>Item</th>
                <th className={styles.tableHeader}>Price</th>
                <th className={styles.tableHeader}>Qty</th>
                <th className={styles.tableHeader}>Dcount</th>
                <th className={styles.tableHeader}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.order_items.map((item) => (
                <tr key={item.orderId * Math.random()} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.product_name}</td>
                  <td className={styles.tableCell}>${item.product_price.toFixed(2)}</td>
                  <td className={styles.tableCell}>{item.product_quantity}</td>
                  <td className={styles.tableCell}>{item.discount_amount || 0}</td>
                  <td className={styles.tableCell}>${item.final_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.summaryContainer}>
          <div className={styles.summaryBox}>
            {[{ label: "Subtotal", value: orderDetails.order_total },
            { label: "Tax", value: orderDetails.tax || 0 },
            { label: "Shipping", value: orderDetails.shipping || 0 }].map(({ label, value }) => (
              <div key={label} className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{label}</span>
                <span className={styles.summaryValue}>${value.toFixed(2)}</span>
              </div>
            ))}
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>${
                orderDetails.order_total + (orderDetails.tax || 0) + (orderDetails.shipping || 0)
              }</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.blue}`}
              onClick={() => sendDataToParent(orderDetails)}
            >Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewOrder;