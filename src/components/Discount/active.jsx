import React from "react";
import styles from "./index.module.scss";

const Active = ({ id, status }) => {

  const handleStatusChange = (id) => {
    console.log(`Status change requested for discount with id: ${id}`);
  }

  return (
    <button
      onClick={() => handleStatusChange(id)}
      className={status === "Active" ? styles.active : styles.inactive}
    >
      {status}
    </button>
  );
};

export default Active;

