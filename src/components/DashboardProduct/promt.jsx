import React from "react";

import styles from "./index.module.scss";

import callApi from "../../utils/axiosConfig";
import { toast } from "react-toastify";


const ShowPromtChangeStatus = ({ product, onShow, onMount }) => {
  const handleChangeStatus = async ({ product }) => {
    if (!product.status) return;

    const status = product.status === 'published' ? 'draft' : 'publish';

    try {
      await callApi.patch(`/product/update/${status}/${product._id}`, {}, {
        requiresAuth: true,
      })
      onShow(false);
      onMount();
      toast.success(`Product status ${product.product_name} changed to ${status}`);
    } catch (error) {
      toast.error('Failed to update product status');
    }

  }


  return (
    <div className={styles.modalDeleteOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Confirm Deletion</h3>
        <p className={styles.modalText}>
          Are you sure you want to change "<b style={{ color: 'red' }}>{product.product_name}
          </b> to <b style={{ color: 'red' }}>{product.status === 'published' ? 'draft' : 'publish'}</b>
          "? This action cannot be undone.
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={() => onShow(false)} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={() => handleChangeStatus({ product })} className={styles.deleteButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
};


const ShowPromtDelete = ({ product, onShow, onMount }) => {

  const confirmDelete = async (product) => {
    if (product.status === 'published') {
      toast.info('Please change the status to draft before deleting the product');
      return;
    }
    try {
      await callApi.delete('/product/delete/' + product._id, {
        requiresAuth: true,
      })

      toast.success(`Product ${product.product_name} deleted successfully`);
      callApi.post('upload/remove', { url: product.product_thumb });
      onShow(false);
      onMount();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  }

  return (
    <div className={styles.modalDeleteOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Confirm Deletion</h3>
        <p className={styles.modalText}>
          Are you sure you want to delete "<b style={{ color: 'red' }}>{product.product_name}</b>"? This action cannot be undone.
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={() => onShow(false)} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={() => confirmDelete(product)} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export {
  ShowPromtChangeStatus,
  ShowPromtDelete
}
