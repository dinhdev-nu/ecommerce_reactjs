import React, { useState } from "react";
import styles from "./index.module.scss";
import { FiAlertCircle } from "react-icons/fi";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { toast } from "react-toastify";

import callApi from '../../utils/axiosConfig'
import { getFromLocalStorage } from "../../utils/localStorage";

const schema = z.object({
  discount_name: z.string().nonempty("Discount name is required"),
  discount_description: z.string().optional(),
  discount_type: z.enum(["Percentage", "Fixed Amount"]),
  discount_value: z.number().min(1, "Discount value must be greater than 0"),
  discount_start_date: z.string().nonempty("Start date is required"),
  discount_end_date: z.string().nonempty("End date is required"),
  discount_code: z.string().nonempty("Discount code is required").transform((val) => val.toUpperCase()),
  discount_max_usage: z.number().min(1, "Max usage must be greater than 0"),
  discount_min_order: z.number().min(1, "Minimum order must be greater than 0"),
  discount_apply_to: z.enum(["All Products", "Specific Products"]),
  discount_specific_products: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.discount_apply_to === "Specific Products" && !data.discount_specific_products) {
    ctx.addIssue({
      path: ["discount_specific_products"],
      message: "This field is required when 'Discount Apply To' is 'Specific Products'",
    });
  }
  if (data.discount_type === "Percentage" && (data.discount_value < 5 || data.discount_value > 60)) {
    ctx.addIssue({
      path: ["discount_value"],
      message: "Percentage discount must be between 5 and 60",
    });
  }

  if (data.discount_type === "Fixed Amount" && data.discount_value <= 0) {
    ctx.addIssue({
      path: ["discount_value"],
      message: "Fixed amount discount must be greater than 0",
    })
  }
  if (data.discount_start_date > data.discount_end_date) {
    ctx.addIssue({
      path: ["discount_start_date"],
      message: "Start date must be before end date",
    })
    ctx.addIssue({
      path: ["discount_end_date"],
      message: "End date must be after start date",
    })
  }
  if (data.discount_end_date < new Date().toISOString().split('T')[0]) {
    ctx.addIssue({
      path: ["discount_end_date"],
      message: "End date must be in the future",
    })
  }
});

const DiscountForm = ({ onClose }) => {

  const [specificProducts, setSpecificProducts] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  // const discount_apply = watch("discount_apply_to");
  // const getSpecificProducts = async () => {
  //   if (specificProducts.length > 0) return;
  //   try {
  //     const Id = getFromLocalStorage('_IT_YOU')?._id
  //     const response = await callApi.get('/product/shop/publish/' + Id, {
  //       requiredAuth: true,
  //     })
  //     setSpecificProducts(response.data.metadata);
  //   } catch (error) {
  //     return;
  //   }
  // };


  const onSubmit = async (data) => {
    data.discount_start_date = new Date(data.discount_start_date).toISOString();
    data.discount_end_date = new Date(data.discount_end_date).toISOString();
    if (data.discount_type === "Percentage")
      data.discount_type = 'percentage';
    else
      data.discount_type = 'fix_amount';
    if (data.discount_apply_to === "All Products")
      data.discount_apply_to = 'all';
    else
      data.discount_apply_to = 'specific_products';
    const payload = {
      ...data,
      discount_is_active: false,
    }
    try {
      await callApi.post('/discount/create', payload, {
        requiresAuth: true,
      });

      toast.success("Discount created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create discount");
    }
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create New Discount</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(data => onSubmit(data))} className={styles.form}>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.label}>Discount Name</label>
              <input
                type="text"
                required
                className={styles.inputField}
                {...register("discount_name")}
              />
              <SpanError errors={errors.discount_name} />
            </div>
            <div>
              <label className={styles.label}>Discount Code</label>
              <input
                type="text"
                required
                className={styles.inputField}
                {...register("discount_code")}
              />
              <SpanError errors={errors.discount_code} />
            </div>
          </div>
          <div>
            <label className={styles.label}>Discount Description</label>
            <textarea
              type="text"
              required
              className={styles.inputField}
              {...register("discount_description")}
            />
            <SpanError errors={errors.discount_description} />
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.label}>Discount Type</label>
              <select
                className={styles.inputField}
                {...register("discount_type")}
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed Amount">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Value</label>
              <input
                type="number"
                required
                className={styles.inputField}
                {...register("discount_value", { valueAsNumber: true })}
              />
              <SpanError errors={errors.discount_value} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.label}>Start Date</label>
              <input
                type="date"
                required
                className={styles.inputField}
                {...register("discount_start_date")}
              />
              <SpanError errors={errors.discount_start_date} />
            </div>
            <div>
              <label className={styles.label}>End Date</label>
              <input
                type="date"
                required
                className={styles.inputField}
                {...register("discount_end_date")}
              />
              <SpanError errors={errors.discount_end_date} />
            </div>
          </div>
          <div>
            <label className={styles.label}>Usage Limit</label>
            <input
              type="number"
              required
              className={styles.inputField}
              {...register("discount_max_usage", { valueAsNumber: true })}
            />
            <SpanError errors={errors.discount_max_usage} />
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.label}>Min Order</label>
              <input
                type="number"
                required
                className={styles.inputField}
                {...register("discount_min_order", { valueAsNumber: true })}
              />
              <SpanError errors={errors.discount_min_order} />
            </div>
            <div>
              <label className={styles.label}>Discount Apply</label>
              <select
                className={styles.inputField}
                {...register("discount_apply_to")}
              >
                <option>All Products</option>
                <option>Specific Products</option>
              </select>
            </div>
          </div>
          {
            <p>Products</p>
          }
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.createButton}>
              Create Discount
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default DiscountForm;

const SpanError = ({ errors }) => {
  if (!errors) {
    return null
  }

  return (
    <span className={styles.error}>
      <FiAlertCircle style={{ paddingRight: '5px' }} />
      {Array.isArray(errors) ? errors.map(err => err.message).join(", ") : errors.message}
    </span>
  );
}
