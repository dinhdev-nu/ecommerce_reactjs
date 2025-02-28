import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { motion } from "framer-motion";
import { FiAlertCircle, FiUpload, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

import _ from 'lodash'
import callApi from '../../utils/axiosConfig'
import { categories } from '../../const'
import { getFromLocalStorage } from "../../utils/localStorage";


const schema = z.discriminatedUnion("product_type", [
  z.object({
    product_type: z.literal("Electronics"),
    product_name: z.string().min(3, "Product name must be at least 3 characters"),
    product_description: z.string().optional(),
    product_price: z.number().min(0, "Price must be positive"),
    brand: z.string().min(1, "Brand must be at least 1 character"),
    model: z.string().min(1, "Model must be at least 1 character"),
    power: z.string().min(1, "Power must be at least 1 character"),
  }),
  z.object({
    product_type: z.literal("Clothing"),
    product_name: z.string().min(3, "Product name must be at least 3 characters"),
    product_description: z.string().optional(),
    product_price: z.number().min(0, "Price must be positive"),
    size: z.string().min(1, "Size must be at least 1 character"),
    color: z.string().min(1, "Color must be at least 1 character"),
    material: z.string().min(1, "Material must be at least 1 character")
  }),
  z.object({
    product_type: z.literal("Furniture"),
    product_name: z.string().min(3, "Product name must be at least 3 characters"),
    product_description: z.string().optional(),
    product_price: z.number().min(0, "Price must be positive"),
    material: z.string().min(1, "Material must be at least 1 character"),
    weight: z.string().min(1, "Weight must be at least 1 character"),
    color: z.string().min(1, "Color must be at least 1 character"),

  })
]);


const ProductForm = ({ onClose, onMount }) => {
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const selectType = watch("product_type");

  const handleImageDrop = async (e) => {
    e.preventDefault()

    resetImage()

    const selectFile = e.target.files?.[0] || e.dataTransfer.files?.[0];
    if (!selectFile) return;

    // const formData = new FormData()
    // formData.append('file', selectFile)
    // try {
    //   const response = await callApi.post('/upload/thumb',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }
    //   )
    //   setImages(response.data.url)
    // } catch (error) {
    //   toast.error("Failed to upload image")
    // }

  };
  const onSubmit = async (data) => {
    // setLoading(true);
    try {
      //   const payload = _.pick(data, [
      //     "product_name",
      //     "product_description",
      //     "product_price",
      //     "product_type",
      //     "product_quantity"
      //   ])
      //   payload['product_attributes'] = _.omit(data, Object.keys(payload))
      //   payload['product_thumb'] = images
      //   payload['product_shop'] = getFromLocalStorage('_IT_YOU')._id
      //   // Simulated API call
      //   const response = await callApi.post('/product', payload, {
      //     requiresAuth: true
      //   })
      //   if (response.status !== 200) {
      //     throw new Error(response.data.message)
      //   }
      //   toast.success("Product registered successfully!");
      //   reset();
      //   setImages('')
      //   onMount();
      console.log(data);
    } catch (error) {
      toast.error("Failed to register product");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    reset();
    resetImage();
    onClose();
  }
  const resetImage = () => {
    if (images) {
      callApi.post('/upload/remove', {
        url: images
      })
      setImages('')
    }

  }

  return (
    <div className={styles.container} >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.formWrapper}>
        <div className={styles.overlay} onClick={() => handleClose()}><FiX /></div>
        <h2 className={styles.title}>Product Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="text" {...register("product_name")} placeholder=" " className={styles.input} />
            <label className={styles.label}>Product Name *</label>
            <SpanError errors={errors.product_name} />
          </div>

          <div className={styles.inputGroup}>
            <textarea {...register("product_description")} rows="4" placeholder=" " className={styles.input}></textarea>
            <label className={styles.label}>Description</label>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.uploadBox} onDragOver={(e) => e.preventDefault()} onDrop={handleImageDrop}>
              <input type="file" id="imageUpload" accept="image/*" onChange={handleImageDrop} className={styles.hiddenInput} />
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <FiUpload className={styles.uploadIcon} />
                <p>Drag & drop images or click to upload</p>
              </label>
              {images !== '' && (
                <div className={styles.imageGrid}>
                  <img src={images} className={styles.imagePreview} />
                </div>
              )}
            </div>
            <label className={styles.label}>Thumbnail</label>
          </div>


          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <input type="number" step="0.01" {...register("product_price", { valueAsNumber: true })} placeholder=" " className={styles.input} />
              <label className={styles.label}>Price *</label>
              <SpanError errors={errors.product_price} />
            </div>

            <div className={styles.inputGroup}>
              <select {...register("product_type")}
                className={styles.input}
                style={{ width: '100%', paddingLeft: '1rem' }}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <SpanError errors={errors?.product_type} />
            </div>
          </div>
          { /* render commponent */}
          {/* {selectType === 'Clothing' && (<Clothing_Atributes register={register} errors={errors} />)}
          {selectType === 'Electronics' && (<Electrics_Atributes register={register} errors={errors} />)}
          {selectType === 'Furniture' && (<Furniture_Atributes register={register} errors={errors} />)} */}

          <div className={styles.inputGroup}>
            <input type="number" {...register("product_quantity", { valueAsNumber: true })} placeholder=" " className={styles.input} />
            <label className={styles.label}>Stock Quantity *</label>
            <SpanError errors={errors.product_quantity} />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={!isValid || loading} className={styles.submitButton}>
              {loading ? "Registering..." : "Register Product"}
            </button>
            <button type="button" onClick={() => { reset(); resetImage(); }} className={styles.resetButton}>
              Reset
            </button>
          </div>
        </form>
      </motion.div>
    </div >
  );
};


export default ProductForm;

const SpanError = ({ errors }) => {


  return (
    errors &&
    <span className={styles.error}>
      <FiAlertCircle style={{ paddingRight: '5px' }} />
      {errors.message}
    </span>
  );
}

const Clothing_Atributes = ({ register, errors }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
      }}
    >
      <div className={styles.inputGroup}>
        <input {...register('size')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Size</label>
        <SpanError errors={errors.size} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('color')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Color</label>
        <SpanError errors={errors.color} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('material')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Material</label>
        <SpanError errors={errors.material} />
      </div>
    </div>
  )
}


const Electrics_Atributes = ({ register, errors }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
      }}
    >
      <div className={styles.inputGroup}>
        <input {...register('brand')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Brand</label>
        <SpanError errors={errors.brand} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('model')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Model</label>
        <SpanError errors={errors.model} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('power')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Power</label>
        <SpanError errors={errors.power} />
      </div>
    </div>
  )
}

const Furniture_Atributes = ({ register, errors }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
      }}
    >
      <div className={styles.inputGroup}>
        <input {...register('material')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Material</label>
        <SpanError errors={errors.material} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('weight')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Weight</label>
        <SpanError errors={errors.weight} />
      </div>
      <div className={styles.inputGroup}>
        <input {...register('color')} placeholder=" " className={styles.input} />
        <label className={styles.label}>Color</label>
        <SpanError errors={errors.color} />
      </div>
    </div>
  )
}
