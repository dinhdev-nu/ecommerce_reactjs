import React from "react";
import styles from "./index.module.scss";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { SiApplepay } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import callApi from "../../utils/axiosConfig";

const PaymentForm = ({ sendDataToParent, orderPayment, onFalsePayment }) => {

    const handlePayment = async () => {
        try {
            await callApi.post('/payment/create', orderPayment, {
                requiresAuth: true,
            })
            sendDataToParent();
            toast.success("Order created successfully.");
        } catch (error) {
            onFalsePayment();
            console.log("error", error);
            toast.error("Failed to create order. Please try again.");
        }
    }

    return (
        <div className={styles.paymentContainer}>
            <h2 className={styles.paymentTitle}>Payment</h2>
            <div className={styles.paymentOptions}>
                <button className={styles.paymentButton}>
                    <FaCreditCard className={styles.creditCardIcon} />
                    <span>Credit Card</span>
                </button>
                <button className={styles.paymentButton}>
                    <FaPaypal className={styles.paypalIcon} />
                    <span>PayPal</span>
                </button>
                <button className={styles.paymentButton}>
                    <SiApplepay className={styles.applePayIcon} />
                </button>
                <button className={styles.paymentButton}>
                    <FcGoogle className={styles.googlePayIcon} />
                    <span>Pay</span>
                </button>
            </div>

            <div className={styles.inputFields}>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className={`${styles.input} `}
                />
                <input
                    type="text"
                    name="cardHolder"
                    placeholder="Cardholder Name"
                    className={`${styles.input} `}
                />
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        className={`${styles.input} `}
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        className={`${styles.input} `}
                    />
                </div>
            </div>
            <button
                className={styles.payButton}
                onClick={handlePayment}
            >Pay</button>
        </div>
    );
};

export default PaymentForm;