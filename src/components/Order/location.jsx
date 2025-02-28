import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";

import { FiPhone, FiUser, FiMapPin, FiMap } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema Validation
const schema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(5, "Full name must be at least 5 characters long"),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^(?:\+84|0)\d{9,10}$/, "Invalid phone number format"),
    province: z.string().min(1, "Please select a province"),
    district: z.string().min(1, "Please select a district"),
    ward: z.string().min(1, "Please select a ward"),
  })
  .superRefine((data, ctx) => {
    if (!data.province && data.district) {
      ctx.addIssue({
        path: ["district"],
        message: "District cannot be selected without a province",
      });
    }
    if (!data.district && data.ward) {
      ctx.addIssue({
        path: ["ward"],
        message: "Ward cannot be selected without a district",
      });
    }
  });

const LocationForm = ({ onCreateOrder }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const provinceId = watch("province");
  const districtId = watch("district");

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchDistricts(provinceId);
  }, [provinceId]);

  useEffect(() => {
    fetchWards(districtId);
  }, [districtId]);

  const fetchProvinces = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      setProvinces(
        response.data.map((province) => ({
          id: province.code,
          name: province.name,
        })) || []
      );
    } catch (error) {
      setApiError("Failed to load provinces. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceId) => {
    if (!provinceId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceId}?depth=2`
      );
      setDistricts(
        response.data.districts.map((district) => ({
          id: district.code,
          name: district.name,
        })) || []
      );
    } catch (error) {
      setApiError("Failed to load districts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (districtId) => {
    if (!districtId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtId}?depth=2`
      );
      setWards(
        response.data.wards.map((ward) => ({
          id: ward.code,
          name: ward.name,
        })) || []
      );
    } catch (error) {
      setApiError("Failed to load wards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const location = await Promise.all([
      provinces.find((province) => province.id == data.province).name,
      districts.find((district) => district.id == data.district).name
    ])
    const payload = {
      full_name: data.fullName,
      phone_number: data.phoneNumber,
      province: location[0],
      district: location[1],
      ward: data.ward
    }
    onCreateOrder(payload);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Shipping Location</h2>

        {apiError && <div className={styles.apiError}>{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <FiUser className={styles.icon} />
              <input
                type="text"
                {...register("fullName")}
                className={`${styles.input} ${errors.fullName ? styles.errorInput : ""}`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && <SpanError error={errors.fullName} />}
          </div>

          <div>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputWrapper}>
              <FiPhone className={styles.icon} />
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`${styles.input} ${errors.phoneNumber ? styles.errorInput : ""}`}
                placeholder="+84 (___) ___-____"
              />
            </div>
            {errors.phoneNumber && <SpanError error={errors.phoneNumber} />}
          </div>

          <div>
            <label className={styles.label}>Province</label>
            <div className={styles.inputWrapper}>
              <FiMapPin className={styles.icon} />
              <select
                {...register("province")}
                className={`${styles.input} ${errors.province ? styles.errorInput : ""}`}
                disabled={loading}
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.province && <SpanError error={errors.province} />}
          </div>

          <div>
            <label className={styles.label}>District</label>
            <div className={styles.inputWrapper}>
              <FiMap className={styles.icon} />
              <select
                {...register("district")}
                className={`${styles.input} ${errors.district ? styles.errorInput : ""}`}
                disabled={!provinceId || loading}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.district && <SpanError error={errors.district} />}
          </div>

          <div>
            <label className={styles.label}>Ward</label>
            <div className={styles.inputWrapper}>
              <RiUserLocationLine className={styles.icon} />
              <select
                {...register("ward")}
                className={`${styles.input} ${errors.ward ? styles.errorInput : ""}`}
                disabled={!districtId || loading}
              >
                <option value="">Select Ward</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.ward && <SpanError error={errors.ward} />}
          </div>

          <button type="submit" disabled={submitting || loading} className={styles.button}>
            {submitting || loading ? <AiOutlineLoading3Quarters className={styles.icon} /> : "Register"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default LocationForm;

const SpanError = ({ error }) => <span className={styles.errorText}>{error.message}</span>;
