import React, { useState, useCallback, useEffect, useRef } from "react";

import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from "./index.module.scss";

import { debounce } from 'lodash';
import ProductForm from "../ProductForm";
import EditProductForm from "../ProductForm/edit";
import callApi from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { ShowPromtChangeStatus, ShowPromtDelete } from "./promt";


const ProductManage = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [productToChangeStatus, setProductToChangeStatus] = useState(null);

  const [mount, setMount] = useState(false);
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    const effect = async () => {

      try {
        const response = await callApi.get('/product/shop/products', {
          requiresAuth: true,
        });
        const data = response.data.metadata;
        data.forEach((dt, i) => {
          data[i]['status'] = dt.isPublic ? 'published' : 'draft';
        });

        return setProducts(data);
      } catch (error) {
        return
      }
    }
    effect();
  }, [mount]);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || product.status === filter;
    return matchesSearch && matchesFilter;
  });
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };




  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by product name or code"
            onChange={handleSearch}
            className={styles.input}
          />
        </div>

        <div className={styles.filterButtons}>
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`${styles.filterButton} ${filter === status ? styles.active : ""
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button onClick={() => setShowAddModal(true)} className={styles.addButton}>
          <FiPlus size={23} /> Add Product
        </button>
      </div>
      <div className={styles.gridContainer}>
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <img
                src={product.product_thumb}
                alt={product.product_name}
                className={styles.productImage}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                }}
              />
            </div>
            <div className={styles.productDetails}>
              <div className={styles.productHeader}>
                <h3 className={styles.productName}>{product.product_name}</h3>
                <span
                  onClick={() => { setProductToChangeStatus(product); setShowChangeStatusModal(true) }}
                  style={{ cursor: 'pointer' }}
                  className={`${styles.status} ${product.status === "published" ? styles.published : styles.draft}`}>
                  {product.status}
                </span>
              </div>
              <p className={styles.productPrice}>$ {product.product_price.toFixed(2)}</p>
              <p className={styles.productDate}>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
              <div className={styles.actions}>
                <button onClick={() => { setShowEditModal(true); setProductToEdit(product) }} className={styles.editButton} aria-label="Edit product">
                  <FiEdit2 />
                </button>
                <button onClick={() => { setShowDeleteModal(true); setProductToDelete(product) }} className={styles.deleteButton} aria-label="Delete product">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (<b>Bạn chưa bán sản phẩm nào!!</b>)}
      </div>
      <div className={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
          >
            {page}
          </button>
        ))}
      </div>
      {showDeleteModal && <ShowPromtDelete
        product={productToDelete}
        onShow={() => setShowDeleteModal(false)}
        onMount={() => setMount(!mount)} />}
      {showChangeStatusModal && <ShowPromtChangeStatus
        product={productToChangeStatus}
        onShow={() => setShowChangeStatusModal(false)}
        onMount={() => setMount(!mount)} />}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <EditProductForm
            onClose={() => setShowEditModal(false)}
            product={productToEdit}
            onMount={() => setMount(!mount)} />
        </div>
      )}
      {showAddModal &&
        (
          <div className={styles.modalOverlay}>
            <ProductForm
              onClose={() => setShowAddModal(false)}
              onMount={() => setMount(!mount)} />
          </div>
        )}
    </div>
  )
};

export default ProductManage;
