import React, { useState } from "react";
import styles from "./index.module.scss";

import { FaCheckCircle } from "react-icons/fa";
import LocationRegistrationForm from "./Location";
import ReviewOrder from "./review";
import PaymentForm from "./payment";
import { FaShippingFast, FaMoneyCheckAlt, FaRegSmile, FaClipboardCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";

const steps = ["shipping", "reviews", "payment", "finish"];
const icons = [<FaShippingFast />, <FaClipboardCheck />, <FaMoneyCheckAlt />, <FaRegSmile />];
const titles = ["Shipping", "Review", "Payment", "Finish"];


const Order = ({ onClose, productData }) => {


  const [currentStep, setCurrentStep] = useState('shipping');
  const [orderData, setOrderData] = useState(null);

  const handleNextStep = () => {
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);
  }

  const handleCreateOrder = async (location) => {
    if (!location) return;
    if (!productData) return;
    try {
      const { product, discount } = productData;
      const order_item = {
        ...product,
        final_price: product.product_price * product.product_quantity,
      }
      if (discount) {
        order_item.discount_id = discount.discount_id;
        order_item.final_price = discount.discount_type === 'percentage' ?
          order_item.final_price - (order_item.final_price * discount.discount_value / 100) :
          order_item.final_price - discount.discount_value;
      }
      const payload = {
        order_items: [order_item],
        order_address: location
      }

      const response = await callApi.post('/order/create', payload, {
        requiresAuth: true,
      })
      setOrderData(response.data.metadata);
      if (response.data.metadata) {
        handleNextStep();
      }

    } catch (error) {
      onClose();
      console.log("error", error);
      toast.error("Failed to create order. Please try again.");
    }
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.buttonClose}
        onClick={onClose}
      ><FiX /></button>
      {currentStep === 'shipping' && <LocationRegistrationForm
        onCreateOrder={handleCreateOrder}
      />}
      {currentStep === 'reviews' && <ReviewOrder
        sendDataToParent={handleNextStep}
        orderDetails={orderData}
      />}
      {currentStep === 'payment' && <PaymentForm
        sendDataToParent={handleNextStep}
        onFalsePayment={onClose}
        orderPayment={{
          orderId: orderData.orderId,
          order_items: orderData.order_items,
        }}
      />}
      {currentStep === 'finish' && <FinishProcess sendDataToParent={handleNextStep} />}

    </div>
  )
};

export default Order;

const FinishProcess = () => {

  const finishSteps = () => {
    window.location.reload();
  }

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.card}>

        <div className={styles.header} style={{ height: '300px' }}>
          <FaCheckCircle className={styles.icon} style={{ marginTop: '50px' }} />
          <h1 className={styles.title}>Thank You</h1>
          <p className={styles.subtitle}>Thank you for your purchase!</p>
          <button
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '20px'
            }}
            onClick={finishSteps}
          >GO BACK</button>
        </div>
      </div>
    </div>
  )
}