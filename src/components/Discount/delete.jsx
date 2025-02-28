import React, { useState } from "react";
import styles from "./index.module.scss";


import { toast } from "react-toastify";

import callApi from '../../utils/axiosConfig'


const DeleteConfirmationModal = ({ discount_id, onClose, onMount }) => {

  const handleDelete = async () => {
    try {
      await callApi.delete('/discount/delete/' + discount_id, {
        requiresAuth: true,
      })
      toast.success("Discount deleted successfully");
      onMount();
      onClose();
    } catch (error) {
      toast.error("Failed to delete discount");

    }
  }


  return (
    <div className={styles.modalDeleteOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Confirm Delete</h2>
        <p className={styles.message}>Are you sure you want to delete this discount?</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
