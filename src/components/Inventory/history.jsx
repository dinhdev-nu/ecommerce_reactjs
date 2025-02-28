import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { format } from "date-fns";
import styles from "./index.module.scss";

import callApi from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const HistoryIventory = ({ product_id, onClose }) => {

  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await callApi.get("/inventory/history/" + product_id, {
          requiresAuth: true,
        });
        setHistory(response.data.metadata);

      } catch (error) {
        toast.error("Something went wrong");

      }
    }
    fetchHistory();
  }, [product_id])

  return (
    <div className={styles.modalHistoryOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Inventory History</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <FiX />
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>{format(record.date, "PPpp")}</td>
                  <td>{record.quantity}</td>
                  <td>{record.action}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryIventory;