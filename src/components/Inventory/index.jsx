import React, { useState, useEffect } from "react";
import { FaEdit, FaHistory, FaSearch, FaFileExport, FaChartLine } from "react-icons/fa";
import { format } from "date-fns";
import styles from "./index.module.scss";
import UpdateInventory from "./update";
import HistoryIventory from "./history";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [mount, setMount] = useState(false);


  useEffect(() => {
    const fecthInventory = async () => {
      try {
        const response = await callApi.get("/inventory/get", {
          requiresAuth: true,
        })
        setProducts(response.data.metadata);
      } catch (error) {
        setProducts([]);
        toast.error("Something went wrong");
      }
    }
    fecthInventory();
  }, [mount])

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { color: "#6B7280", text: "Out of Stock" };
    if (quantity < 20) return { color: "#EAB308", text: "Low Stock" };
    return { color: "#22C55E", text: "Sufficient" };
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.inventory_productId?.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Inventory Management</h1>
            <div className={styles.actions}>
              <div className={styles.searchWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button className={styles.exportButton}>
                <FaFileExport className={styles.exportIcon} /> Export
              </button>
            </div>
          </div>
          {filteredProducts.length === 0 && (<b style={{ textAlign: 'center' }}>Bạn chưa có sản phẩm nào !!</b>)}
          {filteredProducts.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeaderRow}>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>Product Name</th>
                    <th className={styles.tableHeader}>Quantity</th>
                    <th className={styles.tableHeader}>Status</th>
                    <th className={styles.tableHeader}>Last Updated</th>
                    <th className={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {filteredProducts.map((product) => {
                    const status = getStockStatus(product.inventory_stock);
                    return (
                      <tr key={product._id} className={styles.tableRow}>
                        <td className={`${styles.tableCell} ${styles.hThumb}`} >
                          <img className={styles.thumb} src={product.inventory_productId.product_thumb}>
                          </img></td>
                        <td className={styles.tableCell}>{product.inventory_productId.product_name}</td>
                        <td className={styles.tableCell}>{product.inventory_stock}</td>
                        <td className={styles.tableCell}>
                          <span className={`${styles.statusBadge} `} style={{ backgroundColor: status.color }}>
                            {status.text}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          {format(product.createdAt, "PPpp")}
                        </td>
                        <td className={styles.tableCell}>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className={styles.editButton}
                          >
                            <FaEdit className={styles.editIcon} /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsHistoryModalOpen(true);
                            }}
                            className={styles.historyButton}
                          >
                            <FaHistory className={styles.historyIcon} /> History
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isModalOpen &&
        <UpdateInventory
          inventory_id={selectedProduct._id}
          quantity={selectedProduct.inventory_stock}
          onClose={() => setIsModalOpen(false)}
          onMount={() => setMount(!mount)}
        />}
      {isHistoryModalOpen &&
        <HistoryIventory
          product_id={selectedProduct._id}
          onClose={() => setIsHistoryModalOpen(false)}
        />}
    </div>
  );
};

export default InventoryDashboard;