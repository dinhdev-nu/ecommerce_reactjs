import React, { useState } from "react";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";

const UpdateInventory = ({ inventory_id, quantity, onClose, onMount }) => {

  const [adjustmentData, setAdjustmentData] = useState({
    quantity: quantity,
    reason: ""
  });


  const handleAdjustment = async () => {
    try {
      const payload = {
        inventory_id: inventory_id,
        quantity_new: adjustmentData.quantity,
        quantity_old: quantity,
      }
      await callApi.put(`/inventory/update`, payload, {
        requiresAuth: true
      })

      toast.success("Stock product updated successfully");
      onClose();
      onMount();
    } catch (error) {
      toast.error("Update stock product failed");
    }
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>Adjust Inventory</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>New Quantity</label>
          <input
            type="number"
            min="0"
            value={adjustmentData.quantity}
            onChange={(e) =>
              setAdjustmentData({ ...adjustmentData, quantity: Number(e.target.value) })
            }
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Reason for Adjustment</label>
          <textarea
            value={adjustmentData.reason}
            onChange={(e) =>
              setAdjustmentData({ ...adjustmentData, reason: e.target.value })
            }
            className={styles.textarea}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleAdjustment} className={styles.saveButton}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventory;