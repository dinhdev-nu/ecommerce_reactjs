import React, { useState, useCallback } from "react";

import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from "./index.module.scss";

import { debounce } from 'lodash';


const ProductManage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      status: "published",
      createdAt: "2024-01-15",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 199.99,
      status: "draft",
      createdAt: "2024-01-14",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Ultra HD Camera",
      price: 899.99,
      status: "published",
      createdAt: "2024-01-13",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    status: "draft",
    image: ""
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    price: "",
    status: "draft",
    image: ""
  });

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || product.status === filter;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleEdit = (product) => {
    setEditFormData(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    setProducts(products.map(p => p.id === editFormData.id ? editFormData : p));
    setShowEditModal(false);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = () => {
    const newProduct = {
      ...addFormData,
      id: products.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    setAddFormData({
      name: "",
      price: "",
      status: "draft",
      image: ""
    });
  };


  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
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

        <button onClick={() => handleAdd()} className={styles.addButton}>
          <FiPlus size={23} /> Add Product
        </button>
      </div>
      <div className={styles.gridContainer}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                }}
              />
            </div>
            <div className={styles.productDetails}>
              <div className={styles.productHeader}>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={`${styles.status} ${product.status === "published" ? styles.published : styles.draft}`}>
                  {product.status}
                </span>
              </div>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              <p className={styles.productDate}>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(product)} className={styles.editButton} aria-label="Edit product">
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(product)} className={styles.deleteButton} aria-label="Delete product">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
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
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Confirm Deletion</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete "<b style={{ color: 'red' }}>{selectedProduct.name}</b>"? This action cannot be undone.
            </p>
            <div className={styles.buttonGroup}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={confirmDelete} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Edit Product</h3>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className={styles.inputField}
                placeholder="Product name"
              />
              <input
                type="number"
                value={editFormData.price}
                onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                className={styles.inputField}
                placeholder="Price"
              />
              <select
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className={styles.inputField}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <input
                type="text"
                value={editFormData.image}
                onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                className={styles.inputField}
                placeholder="Image URL"
              />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => setShowEditModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleEditSubmit} className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Add New Product</h3>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={addFormData.name}
                onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                className={styles.inputField}
                placeholder="Product name"
              />
              <input
                type="number"
                value={addFormData.price}
                onChange={(e) => setAddFormData({ ...addFormData, price: parseFloat(e.target.value) })}
                className={styles.inputField}
                placeholder="Price"
              />
              <select
                value={addFormData.status}
                onChange={(e) => setAddFormData({ ...addFormData, status: e.target.value })}
                className={styles.inputField}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <input
                type="text"
                value={addFormData.image}
                onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
                className={styles.inputField}
                placeholder="Image URL"
              />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => setShowAddModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleAddSubmit} className={styles.addButton}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default ProductManage;
