import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  FiBox, FiDatabase, FiShoppingCart, FiBarChart2
} from "react-icons/fi";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




const Home = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales 2023",
        data: [3000, 4500, 3200, 5600, 4200, 6100],
        borderColor: "#3B82F6",
        tension: 0.4
      }
    ]
  };

  const quickStats = [
    { title: "Total Products", value: "2,456", icon: <FiBox />, color: "bgBlue" },
    { title: "Total Orders", value: "1,285", icon: <FiShoppingCart />, color: "bgGreen" },
    { title: "Today's Sales", value: "$8,459", icon: <FiBarChart2 />, color: "bgPurple" },
    { title: "Pending Orders", value: "48", icon: <FiDatabase />, color: "bgYellow" },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      stock: 45,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 49.99,
      stock: 122,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"
    }
  ];

  return (
    <>
      <div className={styles.quickStats}>
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${styles.statCard} `}
          >
            <div className={styles.iconContainer}>
              <div
                className={`${styles.icon} ${styles[stat.color]}`}
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div className={styles.textContainer}>
                <p className={styles.title} >
                  {stat.title}
                </p>
                <p className={styles.value}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartContainer}>
        <h2>Sales Overview</h2>
        <Line data={salesData} />
      </div>
      <div className={`${styles.tableContainer}`}>
        <h2 className={styles.heading}>
          Recent Products
        </h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={`${styles.thead}}`}>
              <tr>
                <th className={styles.th}>Product</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={`${styles.tr}}`}>
                  <td className={styles.td}>
                    <div className={styles.product}>
                      <img src={product.image} alt={product.name} className={styles.image} />
                      <span >{product.name}</span>
                    </div>
                  </td>
                  <td className={styles.td}>${product.price}</td>
                  <td className={styles.td}>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
