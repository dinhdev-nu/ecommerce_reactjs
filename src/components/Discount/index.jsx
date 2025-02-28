import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { format } from "date-fns";
import styles from "./index.module.scss";
import DiscountForm from "./form";

import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";
import DeleteConfirmationModal from "./delete";

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await callApi.get('/discount/shop', {
          requiresAuth: true,
        });
        const discounts = response.data.metadata
        discounts.forEach(discount => {
          discount.status = discount.discount_is_active ? "Active" : "Inactive"
          discount.discount_type = discount.discount_type === "percentage" ? "Percentage" : "Fixed Amount"
        });

        setDiscounts(discounts);
      } catch (error) {
        toast.error("Failed to fetch discounts");
      }
    }
    fetchDiscounts();
  }, [mounted]);


  const handleStatusChange = async (discountId) => {
    try {
      await callApi.patch('/discount/update/status/' + discountId, {}, {
        requiresAuth: true,
      });
      setMounted(!mounted);
      toast.success("Discount status updated successfully");

    } catch (error) {
      toast.error("Failed to update discount status");
    }
  };

  const DiscountStats = () => {

    return (
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.title}>Active Discounts</h3>
          <p className={`${styles.value} ${styles.active}`}>{
            discounts.filter(discount => discount.status === "Active").length
          }</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>Total Discounts</h3>
          <p className={`${styles.value} ${styles.total}`}>{
            discounts.length
          }</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>Expired Discounts</h3>
          <p className={`${styles.value} ${styles.expired}`}>{
            discounts.filter(discount => discount.status === "Inactive").length
          }</p>
        </div>
      </div>
    )
  };

  const TableRow = ({ discount }) => (
    <tr key={discount._id + Math.random()} className={styles.row}>
      <td className={styles.cell}>
        <div className={styles.code}>{discount.discount_code}</div>
        <div className={styles.name}>{discount.discount_name}</div>
      </td>
      <td className={styles.cell}>{discount.discount_type}</td>
      <td className={styles.cell}>
        {discount.type === "Percentage" ? `${discount.discount_value}%` : `$${discount.discount_value}`}
      </td>
      <td className={styles.cell}>
        <div>{format(new Date(discount.discount_start_date), "MMM d, yyyy")}</div>
        <div>{format(new Date(discount.discount_end_date), "MMM d, yyyy")}</div>
      </td>
      <td className={styles.cell}>
        <button
          onClick={() => handleStatusChange(discount._id)}
          className={discount.status === "Active" ? styles.active : styles.inactive}
        >
          {discount.status}
        </button>
      </td>
      <td className={styles.actions}>
        <button className={styles.edit}>
          <FiEdit2 className={styles.icon} />
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            setSelectedDiscount(discount._id);
            setShowDeleteModal(true);
          }}
        >
          <FiTrash2 className={styles.icon} />
        </button>
      </td>
    </tr>
  );

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount?.discount_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount?.discount_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || discount.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Discount Management</h1>
          <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
            <FiPlus className={styles.icon} /> Add New Discount
          </button>
        </div>

        <DiscountStats />

        <div className={styles.containerDiscount}>
          <div className={styles.wrapper}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search discounts..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterContainer}>
              <select
                className={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Discount Code</th>
                  <th className={styles.th}>Type</th>
                  <th className={styles.th}>Value</th>
                  <th className={styles.th}>Dates</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id} discount={discount} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && <DiscountForm onClose={() => setIsModalOpen(false)} />}
      {showDeleteModal &&
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          discount_id={selectedDiscount}
          onMount={() => setMounted(!mounted)}
        />}
    </div>
  );
};

export default DiscountManagement;


