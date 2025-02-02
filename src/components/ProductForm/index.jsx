import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { motion } from "framer-motion";
import { FiAlertCircle, FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import styles from "./index.module.scss";

const categories = ["Electronics", "Clothing", "Home & Kitchen", "Sports"];

const schema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Please select a category"),
  stockQuantity: z.number().int().min(0, "Stock quantity must be positive")
});

const ProductForm = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ 
    resolver: zodResolver(schema),
    mode: "onChange"
   });

   const handleImageDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    setImages(prev => [...prev, ...imageFiles.map(file => ({
      preview: URL.createObjectURL(file),
      file
    }))]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Product registered successfully!");
      reset();
      setImages([]);
    } catch (error) {
      toast.error("Failed to register product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.formWrapper}>
        <h2 className={styles.title}>Product Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="text" {...register("productName")} placeholder=" " className={styles.input} />
            <label className={styles.label}>Product Name *</label>
            <SpanError errors={errors.productName} />
          </div>

          <div className={styles.inputGroup}>
            <textarea {...register("description")} rows="4" placeholder=" " className={styles.input}></textarea>
            <label className={styles.label}>Description</label>
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} placeholder=" " className={styles.input} />
              <label className={styles.label}>Price *</label>
              <SpanError errors={errors.price} />
            </div>

            <div className={styles.inputGroup}>
              <select {...register("category")}
               className={styles.input}
               style={{ width: '100%' }}
               >
                <option value="" >Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <SpanError errors={errors.category} />
            </div>
          </div>

          <div className={styles.uploadBox} onDragOver={(e) => e.preventDefault()} onDrop={handleImageDrop}>
            <input type="file" multiple accept="image/*" onChange={handleImageDrop} className={styles.hiddenInput} id="imageUpload" />
            <label htmlFor="imageUpload" className={styles.uploadLabel}>
              <FiUpload className={styles.uploadIcon} />
              <p>Drag & drop images or click to upload</p>
            </label>
            {images.length > 0 && (
              <div className={styles.imageGrid}>
                {images.map((image, index) => (
                  <img key={index} src={image.preview} alt={`Preview ${index + 1}`} className={styles.imagePreview} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input type="number" {...register("stockQuantity", { valueAsNumber: true })} placeholder=" " className={styles.input} />
            <label className={styles.label}>Stock Quantity *</label>
            <SpanError errors={errors.stockQuantity} />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" disabled={!isValid || loading} className={styles.submitButton}>
              {loading ? "Registering..." : "Register Product"}
            </button>
            <button type="button" onClick={() => { reset(); setImages([]); }} className={styles.resetButton}>
              Reset
            </button>
          </div>
        </form>
      </motion.div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}  // Đóng toast sau 5 giây
        hideProgressBar={false}  // Hiển thị progress bar
        newestOnTop={true}  // Đảm bảo toast mới sẽ xuất hiện ở trên cùng
        closeOnClick={true}  // Đóng khi người dùng click vào toast 
      />
    </div>
  );
};

export default ProductForm;


const SpanError = ( { errors } ) => {
  
  return (
    errors &&
    <span className={styles.error}>
      <FiAlertCircle style={{paddingRight: '5px'}}/> {errors.message}
    </span>
  );
}
