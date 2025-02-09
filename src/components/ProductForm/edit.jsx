import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { FiAlertCircle, FiUpload, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import styles from "./index.module.scss";

import _ from 'lodash'
import callApi from '../../utils/axiosConfig'

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


const EditProductForm = ({ onClose, product, onMount }) => {
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);
  const imageOld = useRef(product.product_thumb)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      product_name: product.product_name,
      product_description: product.product_description,
      product_price: product.product_price,
      product_type: product.product_type,
      product_quantity: product.product_quantity,
      size: product.product_attributes?.size,
      color: product.product_attributes?.color,
      material: product.product_attributes?.material,
      brand: product.product_attributes?.brand,
      model: product.product_attributes?.model,
      power: product.product_attributes?.power,
      weight: product.product_attributes?.weight
    }
  });

  const handleImageDrop = async (e) => {
    e.preventDefault()

    resetImage()

    const selectFile = e.target.files?.[0] || e.dataTransfer.files?.[0];
    if (!selectFile) return;

    const formData = new FormData()
    formData.append('file', selectFile)
    try {
      const response = await callApi.post('/upload/thumb',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setImages(response.data.url)
    } catch (error) {
      toast.error("Failed to upload image")
    }

  };
  const onSubmit = async (data) => {
    if (product.status !== 'draft') {
      console.log(data)
      toast.error("Can't edit puslish product! Please change status to draft")
      onClose(false)
      return
    }
    setLoading(true);
    try {
      const payload = _.pick(data, [
        "product_name",
        "product_description",
        "product_price",
        "product_type",
        "product_quantity"
      ])
      payload['product_attributes'] = _.omit(data, [
        "product_name",
        "product_description",
        "product_price",
        "product_type",
        "product_quantity"
      ])
      payload['product_thumb'] = images ? images : imageOld.current
      console.log(payload)
      // // Simulated API call
      await callApi.put('/product/update/' + product._id, payload, {
        requiresAuth: true
      })
      toast.success("Product registered successfully!");
      reset();
      setImages('')
      onClose(true);
      onMount()
      if (images !== imageOld.current && images) {
        callApi.post('/upload/remove', {
          url: imageOld.current
        })
      }
    } catch (error) {
      toast.error("Failed to update product");
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
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.formWrapper}>
        <div className={styles.overlay} onClick={() => handleClose()}><FiX /></div>
        <h2 className={styles.title}>Product Edit</h2>
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


          <div className={styles.grid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginBottom: '1rem' }}>
            <div className={styles.inputGroup}>
              <input type="number" step="0.01" {...register("product_price", { valueAsNumber: true })} placeholder=" " className={styles.input} />
              <label className={styles.label}>Price *</label>
              <SpanError errors={errors.product_price} />
            </div>
          </div>
          { /* render commponent */}
          {product.product_type === 'Clothing' && (<Clothing_Atributes register={register} errors={errors} />)}
          {product.product_type === 'Electronics' && (<Electrics_Atributes register={register} errors={errors} />)}
          {product.product_type === 'Furniture' && (<Furniture_Atributes register={register} errors={errors} />)}

          <div className={styles.buttonGroup}>
            <button type="submit" disabled={!isValid || loading} className={styles.submitButton}>
              {loading ? "Saving..." : "Save Product"}
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


export default EditProductForm;


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
