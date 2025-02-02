import React, { useState } from "react";
import styles from "./index.module.scss";
import GoogleLogo from "../../assets/google.png";
import { FaGithub, FaEye} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 character'),
  // password1: z.string()
  //             .min(8, 'Password must be at least 6 character')
  //             .regex(/[A-Z]/ , 'Password must contain at least one uppercase letter')
  //             .regex(/[a-z]/ , 'Password must contain at least one lowercase letter')
  //             .regex(/[0-9]/ , 'Password must contain at least one number')
  //             .regex(/[^A-Za-z0-9]/ , 'Password must contain at least one special character')
  //  Product .... 
  
})


const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  
  const onSubmit = ( data ) => {
    console.log(data);
  }

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signupRight}>
        <h2>Login with us !</h2>
        <div className={styles.Form}>
          <input type="email" {...register("email")} placeholder="Email Address"/>
          <SpanError errors={errors.email} />
          <div className={styles.passwordContainer}>
            <input type="password" {...register("password")} placeholder="Password" />
            <i><FaEye/></i>
          </div>
          <SpanError errors={errors.password} />
          <button type="submit">Đăng Nhập</button>
        </div>
        <p>
          You don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
        <div className={styles.divider}>
          <span>or Login with</span>
        </div>
        <div className={styles.socialLogin}>
          <button className={styles.googleBtn}>
            <i><img src={GoogleLogo} style={{width: '15px'}} alt="" /></i>  Login  with Google
          </button>
          <button className={styles.githubBtn}><i><FaGithub/></i>  Login with Github</button>
        </div>
      </form>
  )
}

export default Login;


const SpanError = ( { errors } ) => {
  return (
    errors &&
    <span className={styles.error}>
      <FiAlertCircle style={{paddingRight: '5px'}}/> {errors.message}
    </span>
  );
}